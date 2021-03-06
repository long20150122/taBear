const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BabiliWebpackPlugin = require("babili-webpack-plugin"); // 由于webpack.optimize.UglifyJsPlugin不支持es6，用它代替来压缩文件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 将css抽离出来
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //  分享性能
const root = path.resolve(__dirname);
const entries = {};
const htmlWebpackPlugins = [];
const chunks = [];
const isProduction = process.env.NODE_ENV == "production"; // 是开发环境还是生产环境(请看package.json的script）
const proxyOpts = require("./build/proxyOpts") || {};

glob.sync(`${root}/src/views/**/main.js`).forEach(file => {
    const rootPosix = root.replace(/\\+/g, "/");
    const array = file.replace(/^\//, "").split("/");
    const rootArray = `${rootPosix}/src/views`.replace(/^\//, "").split("/");
    const index = array.slice(rootArray.length, array.length - 1).join("/");
    entries[index] = file;
    chunks.push(index);
    // 为每个main.js生成一个对应的html文件
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        "template": `${root}/src/views/${index}/index.html`, // 模板名
        "filename": `${index}.html`, // 生成的文件名
        "hash": false, // 是否加上hash
        "chunks": [ "common", index], // 添加进去的js chunk
        "xhtml": true, // 是否用<tag />表示自闭合
        "chunksSortMode": "dependency", // chunk排序方式
        // https://github.com/kangax/html-minifier#options-quick-reference
        "minify": !isProduction ? false : { // 是否压缩
            "removeComments": true,
            "collapseWhitespace": true
        }
    }));
});

// 用到的插件
const plugins = [
    // https://github.com/ampedandwired/html-webpack-plugin
    ...htmlWebpackPlugins,
    new webpack.optimize.OccurrenceOrderPlugin(), // 根据模板使用次数而配给更短的id
    new webpack.DefinePlugin({ // 定义js里可以使用的环境变量
        __DEBUG__: !isProduction
    }),
    new ExtractTextPlugin({ // 抽离出css
        filename: `css/[name].css${isProduction ? '?v=[contenthash]' : ''}`,
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 将通用css抽出来
        name: "common", // 公共模块的名称
        chunks: chunks, // chunks是需要提取的模块
        minChunks: chunks.length
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    }),
    // new UglifyJsPlugin({
    //     uglifyOptions: {
    //         compress: {
    //             warnings: false,
    //             drop_debugger: true,
    //             drop_console: true
    //         }
    //     },
    //     sourceMap: config.build.productionSourceMap,
    //     parallel: true
    // }),
];

if (isProduction) {
    console.log("-----------------正在使用生产模式构建工程------------------");

    plugins.push(new BabiliWebpackPlugin({"presets": [
            ["minify", {
                "removeConsole": true,
                "removeDebugger": true
            }]
        ]}, {
            "comments": false,
        })
    );

    plugins.push(new BundleAnalyzerPlugin());

} else if (process.env.NODE_ENV == "dev") {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

const dist = path.resolve(root, "./dist");

module.exports = {
    "entry": entries,
    "output": {
        "path": dist,
        "publicPath": isProduction ? "./" : "/",//"./", 
        "filename": `js/[name].js${isProduction ? '?v=[chunkhash]' : ''}`,
        "chunkFilename": `js/[id].js${isProduction ? '?v=[chunkhash]' : ''}`
    },
    "devServer": {
        contentBase: dist,
        inline: true,
        host: '10.103.1.30',
        port: 8087,
        hot: true,
        open: true,
        proxy: proxyOpts,
        watchContentBase: false,
        watchOptions: {
            poll: true
        }
    },
    "resolve": {
        "extensions": [".js", ".vue"],
        "alias": Object.assign({
            "vue$": "vue/dist/vue.min.js",
            // "mockjs$": "mockjs/dist/mock-min.js",
            "axios$": "axios/dist/axios.min.js",
            "babel-polyfill$": "babel-polyfill/dist/polyfill.min.js",
            "comp": `${root}/src/comp`,
            "conf": `${root}/src/conf`,
            "sprites": `${root}/src/sprites`,
            "store": `${root}/src/store`,
            "utils": `${root}/src/utils`
        }, {
            // 'vue': 'vue/dist/vue.js',
            'vuex': 'vuex/dist/vuex.js',
            'vue-router': 'vue-router/dist/vue-router.js',
            'fastclick': 'fastclick/lib/fastclick.js',
        }, {
            "lib": path.resolve(root, "src/lib"),
            "vlib": path.resolve(root, "src/vlib"),
            "views": path.resolve(root, "src/views"),
            "common": path.resolve(root, "src/common")
        })
    },
    "module": {
        "rules": [{
                "test": /\.js$/,
                "loader": "babel-loader?presets[]=babel-preset-es2015",
                "include": root,
                "exclude": /node_modules/
            },
            {
                "test": /\.vue$/,
                "loader": "vue-loader",
                "options": {
                    extract: isProduction,
                    "loaders": {
                        js: "babel-loader?presets[]=babel-preset-es2015",
                        scss: `vue-style-loader!css-loader?minimize=${isProduction}!postcss-loader!sass-loader`,
                    }
                }
            },
            // {
            //     test: /\.(scss|sass)$/,
            //     loader: ExtractTextPlugin.extract({
            //         "fallback": "style-loader",
            //         "use": `css-loader?minimize=${isProduction}!postcss-loader!sass-loader`
            //     }),
            //     exclude: /node_modules/
            // },
            {
                'test': /\.(css)$/,
                'loader': ExtractTextPlugin.extract({
                    "fallback": "style-loader",
                    "use": `css-loader?minimize=${isProduction}`
                }),
                "exclude":  [/swiper/,/node_modules/] //build 注释掉  不知道为什么
            },
            {
                "test": /\.json$/,
                "loader": "json-loader"
            },
            {
                "test": /\.(jpe?g|png|gif|svg)$/,
                "loader": "url-loader",
                "options": {
                    "limit": "1024",
                    "name": "images/[name]-[hash:8].[ext]"
                }
            }
        ],
        // 不对某些文件解析依赖
        "noParse": [/vue\.min\.js$/, /mockjs\/dist\/mock-min\.js$/, /axios\.min\.js$/, /polyfill\.min\.js$/]
    },
    "devtool": isProduction ? "cheap-module-source-map" : "",
    "plugins": plugins
}
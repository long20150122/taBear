"use strict";
var webpackConfig = require("../webpack.config");
var webpackMerge = require("webpack-merge");
const isProduction = process.env.NODE_ENV == "production";

var devConfig = {
    devtool: "#eval",

    module: {
        "rules": [{
                test: /\.(scss|sass)$/,
                loader: `style-loader!css-loader?minimize=${isProduction}!postcss-loader!sass-loader`,
            },
            {
                test: /\.(css)$/,
                loader: `style-loader!css-loader?minimize=${isProduction}`,
            }
        ]
    }
};

module.exports = webpackMerge(webpackConfig, devConfig);
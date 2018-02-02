# 项目架构说明
项目采用的是采用的是vue 多页面跳转地址 + vue的ydui,UI框架 (本来计划用jquery工具库,后还是使用原生js)

## 使用说明
在package.json 运行  $npm install 或者 $cnpm install 安装依赖
编译文件采用 $webpack -w (一边监控,开发时用)
上线前采用	 $webpack -build

#项目文件目录结构说明
build --- 打包脚本webpack的一些配置
dist  --- 打包后文件所在目录
images -- 雪碧图及其图片
src  ---- 开发目录
package.json ------- 依赖配置
postcss.config.js -- css预处理配置
webpack.config.js -- 打包脚本

#开发目录文件结构说明(src目录文件说明)
common ---- 存放公共的组件等
lib ------- 工具类文件夹
vlib ------ 工具类文件夹
views ----- 里面存放个个开发页面文件

#页面开发顺序
index.html --- 页面
main.js ------ 路口js
App.vue ------ 组件总容器 (内部可以通过conponents 引入子组件)

## 接口说明
首先采用mock数据的形式

## 开启项目后 直接访问 dist/目录下的文件 各个html页面

## ydui,UI框架使用说明
http://vue.ydui.org/


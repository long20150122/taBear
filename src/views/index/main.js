import Vue from 'vue'
import App from './App.vue'
import Axios from 'common/utils/diyaxios'
import viewport from 'vlib/comp/viewport'
import 'common/plugin/href'
import {index_proxy } from 'common/config'
import lazyImage from 'common/plugin/lazyImage'
import scrollLoad from 'common/plugin/scrollLoad'
import appNav from 'common/plugin/appNav'

import FastClick from 'fastclick' // 解决移动端300毫秒延迟
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
    }, false)
}

Vue.use(lazyImage);
Vue.use(scrollLoad);
Vue.use(appNav);

viewport.init(1);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
    el: "#app",
    data () {
        return {
            options,
            index_proxy
        }
    },
    template: '<app :options="options" :proxy="index_proxy"></app>',
    components: { App }
});
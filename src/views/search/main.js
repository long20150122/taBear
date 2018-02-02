import Vue from 'vue'
import App from './App.vue'
import Axios from 'common/utils/diyaxios'
import viewport from 'vlib/comp/viewport'
import 'common/plugin/href'
import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';


import FastClick from 'fastclick' // 解决移动端300毫秒延迟
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
    }, false)
}
Vue.use(YDUI);
viewport.init(1);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
    el: "#app",
    data() {
        return {
            options
        }
    },
    template: '<app :options="options"></app>',
    components: { App }
});
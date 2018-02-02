import Vue from 'vue'
import App from './App.vue'
import Axios from 'common/utils/diyaxios'
import viewport from 'vlib/comp/viewport'
import 'common/plugin/href'

import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
    }, false)
}
viewport.init(1);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
    el: "#app",
    data() {
        return {
            options,
        }
    },
    template: '<app :options="options"></app>',
    components: { App }
});
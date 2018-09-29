/*******
 * ft
 * 底部导航 20170817
 */
import appNavItems from './appNavItems.vue';
import appItem from './appItem.vue';

const plugin = {
    install (Vue) {
        Vue.component('app-nav-items',appNavItems);
        Vue.component('app-item',appItem);
    }
};

export default plugin;
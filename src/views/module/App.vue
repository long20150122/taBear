<template>
    <div class="">

        <!-- <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items> -->
    </div>
</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'

export default {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
    },
    data () {
        return {}
    },
    mounted () {},
    methods: {}
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common.scss';
</style>

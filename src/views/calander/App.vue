<template>
    <div class="">

        <!-- <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items> -->
        <div class="test">
            <img :src="img" alt="">
        </div>
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
        return {
            img: 'http://img17.3lian.com/d/file/201703/06/ea0b5efc8ab75167dd7655bcc16defca.jpg'
        }
    },
    created () {},
    mounted () {},
    methods: {}
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common.scss';
    .test {
        width: 10rem;
        position: relative;
        height: 3rem;
        overflow: hidden;
        background-color: pink;
        img {
            width: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>

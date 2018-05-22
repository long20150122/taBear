<template>
    <div class="m-count m-views-index">
        <ul class="m-index-tab fixed-top" v-if="show">
            <li class="item selected" v-href="location">正在热映</li>
            <li class="item" v-href="options.href.urlNew">即将上映</li>
            <li class="item vh-center hide"><span>票房榜<!-- testabc --></span><i class="arrow-right"></i></li>
        </ul>
        <div class="scrolling">
            <app-header :images="options.bannerImage"></app-header>
            <app-content :options="options"></app-content>
        </div>
        <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items>
    </div>
</template>

<script>
import appHeader from './Header.vue'
import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'

export default {
    props: ["options", "proxy"],
    components: {
        appHeader,
        appContent
    },
    data () {
        return {
            image: this.options.bannerImage && this.options.bannerImage.length > 0,
            show: false,
            height: 312,
            location: 'http://www.baidu.com'
        }
    },
    created() {
    },
    /*渲染到页面上去*/
    mounted () {
        this.image && window.addEventListener("scroll", this.scroll);
        this.height = viewport.rem() / 75 * this.height;
        this.show = !this.image;
    },
    methods: {
        scroll () {
            this.show = window.scrollY > this.height;
        },
    }
}

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .m-index-tab{
        @include display-flex;
        @include justify-content(space-around);
        @include align-items(center);
        @include height(80px);
        padding: rem(0 20px);
        width: 100%;
        @include box-sizing;
        &.fixed-top{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 12;
        }
        .item{
            @include font-size(28px);
            width: 100%;
            text-align: center;
            .arrow-right{
                @include arrow-right;
                margin: rem(0 -10px 0 10px);
            }
        }
        .selected{
            position: relative;
            &:before{
                content: "";
                position: absolute;
                @include wh(54px, 4px);
                bottom: rem(-24px);
                left: 50%;
                margin-left: rem(-27px);
            }
        }
    }
</style>

<!-- 
    vue's swiper  https://www.swiper.com.cn/api/index2.html
    https://www.npmjs.com/package/vue-awesome-swiper
-->
<template>
    <div class="">
        <!-- <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items> -->
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide>
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1151633707,1349380576&fm=27&gp=0.jpg" alt="" @click.prevent >
            </swiper-slide>
            <swiper-slide>
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2574143795,2580807578&fm=27&gp=0.jpg" alt="" @click.prevent >
            </swiper-slide>
            <swiper-slide>
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2066536647,1234828296&fm=27&gp=0.jpg" alt="" @click.prevent>
            </swiper-slide>
            <swiper-slide>
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3936503504,1815894526&fm=27&gp=0.jpg" alt="" @click.prevent>
            </swiper-slide>
            <swiper-slide>
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3380649550,1992781749&fm=27&gp=0.jpg" alt="" @click.prevent>
            </swiper-slide>
            <swiper-slide>
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=774121337,1948081632&fm=27&gp=0.jpg" alt="" @click.prevent>
            </swiper-slide>
            <swiper-slide>
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=734739261,2548030601&fm=27&gp=0.jpg" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
    </div>
</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /*{
    on: {
        click() {
            alert(this.clickedIndex);
        }
    }
}*/)

export default {
    props: ["options", "proxy"],
    data() {
        return {
            swiperOption: {
                // some swiper options/callbacks
                // 所有的参数同 swiper 官方 api 参数
                // ...
                loop : true,
                autoplay : 4000,
                // pagination : '.swiper-pagination2',
                // effect : 'coverflow',
                slidesPerView: "auto",
                loopedSlides : 4,
                centeredSlides: true,
                autoplayDisableOnInteraction: false,
                /*pagination: {
                  el: '.swiper-pagination',
                  clickable: true
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                  hideOnClick: true
                },*/
                on: {
                    click() {
                        // alert(this.clickedIndex);
                        console.log(this.realIndex);
                        console.log(this);
                    }/*,
                    slideChange: function(){
                        //this.isEnd
                    },
                    slideNextTransitionStart: function(){
                        console.log('开始切换');
                    },*/
                }
            }
        }
    },
    components: {
        // appHeader,
        // appContent
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted () {
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        // console.log('this is current swiper instance object', this.swiper)
        // this.swiper.slideTo(3, 1000, false)
    },
    methods: {}
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common.scss';

    .swiper-container {
        .swiper-wrapper {
            .swiper-slide {
                width: r(680);
                height: r(616);
                background-size: 100% 100%;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    border-radius: r(10);
                }
            }
            .swiper-slide-prev {
                transform: translate3d(r(-20), 0, 0) rotateX(30deg) rotateY(0deg);
                opacity: 0.6;
            }
            .swiper-slide-next {
                transform: translate3d(r(20), 0, 0) rotateX(-30deg) rotateY(0deg);
                opacity: 0.6;
            }
        }
        /* .swiper-button-next{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");} */
    }
</style>

<template>
    <div class="page-index">
        <!-- <Button @click.native="handleLoginOut">退出登录</Button> -->
        <!-- 轮播banner -->
        <div class="banner">
            <!-- <mt-swipe :auto="0" refs='swipe'>
              <mt-swipe-item class="swip-item-1 item" @click="handleBannerClick">1</mt-swipe-item>
              <mt-swipe-item class="swip-item-2 item" @click="handleBannerClick">2</mt-swipe-item>
              <mt-swipe-item class="swip-item-3 item" @click="handleBannerClick">3</mt-swipe-item>
            </mt-swipe> -->
            <yd-slider autoplay="3000">
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                    </a>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                    </a>
                </yd-slider-item>
            </yd-slider>
        </div>
        <!-- 探索大鹏 -->
        <div class="research-dp">
            <h2>探索大鹏</h2>
            <div class="dp-wrapper">
                <div class="item-wrapper">
                    <div class="item">
                        <img :src="src" alt="img">
                        <div class="text">房源</div>
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="item">
                        <img :src="src" alt="img">
                        <div class="text">房源</div>
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="item">
                        <img :src="src" alt="img">
                        <div class="text">房源</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 民宿预定 -->
        <div class="prede-ms">
            <h2>民宿预定</h2>
            <div class="prede-wrapper">
                <div class="item-wrapper">
                    <div class="address-item">
                        <span class="spot-name">
                            深圳大鹏
                        </span>
                        <span class="spot-map">
                            地图
                        </span>
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="date-item">
                        <div class="start-time">
                            <span class="start-date">12月21日</span>
                            <span class="start-week">周四</span>
                        </div>
                        <div class="stay">1晚</div>
                        <div class="end-time">
                            <span class="end-date">12月22日</span>
                            <span class="end-week">周五</span>
                        </div>
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="search-item">
                        <span></span>
                        输入目的地体验,热搜:活力名宿
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="btn-item">
                        搜索
                    </div>
                </div>
            </div>
        </div>
        <!-- 当季节热门体验 -->
        <div class="hot-feel">
            <h2>当季热门体验</h2>
            <div class="feel-wrapper">
                <ul class="item-wrapper">
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>大鹏较场尾·海滩·烧烤</span>
                            <span>人均 ¥150</span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>大鹏较场尾·海滩·烧烤</span>
                            <span>人均 ¥150</span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>大鹏较场尾·海滩·烧烤</span>
                            <span>人均 ¥150</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 民宿私人定制 -->
        <div class="private-make">
            <h2>民宿·私人定制</h2>
            <div class="private-wrapper">
                <ul class="item-wrapper">
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>起
                            </span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>起
                            </span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>起
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
// import viewport from 'vlib/comp/viewport'

import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);

export default {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
    },
    data () {
        return {
            src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4202999563,2452815770&fm=27&gp=0.jpg'
        };
    },
    mounted () {},
    methods: {
        handleBannerClick() {
            //this.$router.push('/homestayDetail');
        },
        /* 退出登录 */
        handleLoginOut() {
            // this.loginOut();
            // this.$router.push('/login');
            this.$toast('test');
        },
        handleButtonClick() {
            console.log(123456);
            this.$router.push('/homestayDetail');
        },
    }
}

</script>

<style lang="scss">
    @import '../../common/style/reset.scss';
    @import '../../common/style/mixin';
   .page-index {
       .banner {
           width: 100%;
           height: rem(300px);
           .yd-slider {
               height: 100%;
               overflow: hidden;
               .yd-slider-item {
                   // a {
                   //     img {
                   //         width: 100%;
                   //     }
                   // }
               }
           }
       }
       .research-dp {
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .dp-wrapper {
               width: 100%;
               display: flex;
               .item-wrapper {
                   height: rem(210px);
                   -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */ 
                   -moz-box-flex: 1; /* OLD - Firefox 19- */ 
                   -webkit-flex: 1; /* Chrome */ 
                   -ms-flex: 1; /* IE 10 */ 
                   flex: 1;
                   background-color: pink;
                   text-align: center;
                   .item {
                       background-color: red;
                       height: 100%;
                       width: rem(210px);
                       margin: 0 auto;
                       border-radius: rem(6px);
                       img {
                           width: rem(210px);
                           height: rem(138px);
                           border-radius: rem(6px);
                       }
                       .text {
                           text-align: left;
                           margin-left: rem(30px);
                           margin-top: rem(6px);
                           font-size: rem(30px);
                       }
                   }
               }
           }
       }
       .prede-ms {
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .prede-wrapper {
               height: rem(360px);
               width: rem(660px);
               margin: 0 auto;
               background-color: pink;
               border: rem(1px) solid #ccc;
               border-radius: rem(12px);
               .item-wrapper {
                   width: 100%;
                   height: rem(90px);
                   // padding: 0 0.6rem;
                   .address-item {
                       height: rem(90px);
                       line-height: rem(90px);
                       border-bottom: rem(1px) solid #999;
                       display: flex;
                       margin: 0 rem(30px);
                       color: #333;
                       .spot-name {
                           -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */ 
                           -moz-box-flex: 1; /* OLD - Firefox 19- */ 
                           -webkit-flex: 1; /* Chrome */ 
                           -ms-flex: 1; /* IE 10 */ 
                           flex: 1;
                       }
                       .spot-map {
                           -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */ 
                           -moz-box-flex: 1; /* OLD - Firefox 19- */ 
                           -webkit-flex: 1; /* Chrome */ 
                           -ms-flex: 1; /* IE 10 */ 
                           flex: 1;
                           text-align: right;
                       }
                   }
                   .date-item {
                       height: rem(90px);
                       line-height: rem(90px);
                       border-bottom: rem(1px) solid #999;
                       display: flex;
                       margin: 0 rem(30px);
                       color: #333;
                       .start-time {
                           -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */ 
                           -moz-box-flex: 1; /* OLD - Firefox 19- */ 
                           -webkit-flex: 1; /* Chrome */ 
                           -ms-flex: 1; /* IE 10 */ 
                           flex: 1;
                           .start-date {
                               font-size: rem(30px);
                           }
                           .start-week {
                               font-size: rem(24px);
                               vertical-align: sub;
                           }
                       }
                       .stay {
                           -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */ 
                           -moz-box-flex: 1; /* OLD - Firefox 19- */ 
                           -webkit-flex: 1; /* Chrome */ 
                           -ms-flex: 1; /* IE 10 */ 
                           flex: 1;
                           text-align: center;
                       }
                       .end-time {
                           -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */ 
                           -moz-box-flex: 1; /* OLD - Firefox 19- */ 
                           -webkit-flex: 1; /* Chrome */ 
                           -ms-flex: 1; /* IE 10 */ 
                           flex: 1;
                           text-align: right;
                           .end-date {
                               font-size: rem(30px);
                           }
                           .end-week {
                               font-size: rem(24px);
                               vertical-align: sub;
                           }
                       }

                   }
                   .search-item {
                       height: rem(90px);
                       line-height: rem(90px);
                       margin: 0 rem(30px);
                       color: #666
                   }
                   .btn-item {
                       text-align: center;
                       vertical-align: middle;
                       height: rem(60px);
                       line-height: rem(60px);
                       border-radius: rem(12px);
                       background-color: yellow;
                       margin: 0 rem(30px);
                   }
               }
           }
       }
       .hot-feel {
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .feel-wrapper {
               .item-wrapper {
                   display: block;
                   white-space:nowrap;//处理块元素中的空白符和换行 
                   overflow-x: auto;
                   overflow-y: hidden;
                   .item {
                       width: rem(480px);
                       height: rem(390px);
                       display: inline-block;//使li对象显示为一行
                       list-style: none;
                       margin-left: rem(60px);
                       color: #666;
                       >img {
                           width: 100%;
                       }
                       span:nth-child(1) {
                           display: block;
                       }
                   }
               }
           }
       }
       .private-make {
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .private-wrapper {
               .item-wrapper {
                   display: block;
                   white-space:nowrap;//处理块元素中的空白符和换行 
                   overflow-x: auto;
                   overflow-y: hidden;
                   .item {
                       width: rem(360px);
                       height: rem(300px);
                       display: inline-block;//使li对象显示为一行
                       list-style: none;
                       // margin-left: 2rem;
                       color: #666;
                       >img {
                           width: 100%;
                       }
                       p {
                           span {
                               font-weight: 600;
                           }
                           >span:nth-child(1) {
                               display: block;
                               font-weight: 400;
                           }
                           .price {
                               color:#FF6600;
                           }
                       }
                   }
                   .item:nth-child(1) {
                       margin-left: rem(9px);
                   }
               }
           }

       }
   }
</style>

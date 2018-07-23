<template>
    <div class="page-index" :cost='cost':options='options' @click="userCommit">
    <!-- {{options}} -->
        <!-- 轮播banner -->
        <div class="header">
            <div class="title-dialog">海景北欧分隔</div>
            <i class="icon-dialog-close"></i>
        </div>
        <div class="banner">
            <yd-slider autoplay="10000">
                <yd-slider-item>
                    <a href="">
                        <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
                    </a>
                    <p>私奔驿站——古韵塔塔米房</p>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="">
                        <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                    </a>
                    <p>私奔驿站——111111111111</p>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="">
                        <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                    </a>
                    <p>私奔驿站——22222222222</p>
                </yd-slider-item>
            </yd-slider>
        </div>
        <!-- 房间配置 -->
        <div class="house-deploy">
            <div class="deploy-wrapper">
                <div class="deploy-item">
                    <!-- <p class="img-icon">@</p> -->
                    <p class="door-wrapper"><i class="icon-door"></i></p>
                    <p class="text-content">3室2厅 1卫1厨</p>
                    <p class="item-1">
                        <span>普通公寓</span>
                        <span>90平米</span>
                    </p>
                    <p class="item-2">
                        <span>可聚会</span>
                        <span>做饭</span>
                    </p>
                </div>
                <div class="deploy-item">
                    <!-- <p class="img-icon">@</p> -->
                    <p class="bed-wrapper"><i class="icon-bed"></i></p>
                    <p class="text-content">3室2厅 1卫1厨</p>
                    <p class="item-1">
                        <span>普通公寓</span>
                        <span>90平米</span>
                    </p>
                    <p class="item-2">
                        <span>可聚会</span>
                        <span>做饭</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- 时间选择 -->
        <div class="time-wrapper">
            <div class="in-date">
                <p>入住时间</p>
                <p>1月29日</p>
            </div>
            <div class="durt-date">
                <p>共<span>2</span>晚</p>
            </div>
            <div class="out-date">
                <p>离店时间</p>
                <p>2月1日</p>
            </div>
            <div class="change-date">
                更改日期
            </div>
        </div>
        <!-- 可用优惠券 -->
        <!-- <div class="usable-coupon">
            <h2>可用优惠</h2>
            <div class="usable-wrapper">
                <p>平台抵用券</p>
                <p>本店专属抵用券</p>
            </div>
        </div> -->
        <!-- 总价格展示 -->
        <div class="footer">
            <div class="price-wrapper">
                <div class="price-item">
                    <span class="total-price">总价</span>
                    <span>¥</span>
                    <span>300</span>
                </div>
                <div class="pre-item">
                    <p>
                        申请预定
                    </p>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'


import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
console.log(Slider);
Slider.props.showPagination = false;
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);


export default {
    props: {
        options: {},
        cost: null,
    },
    components: {
        // appHeader,
        // appContent
    },
    data () {
        return {
            src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4202999563,2452815770&fm=27&gp=0.jpg',
            options: this.options,
            cost: this.cost
        };
    },
    mounted () {
        // this.$post('/data.json',{}, true).then(res => {
        //     alert(1);
        // })
        console.log('this.options--11--',this.options);
        console.log('this.cost---111---',this.cost.houseid);

    },
    methods: {
        userCommit() {
            console.log('this.options----',this.options);
            console.log('this.cost------s',this.cost.houseid);
        }
    }
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common';
   .page-index {
       background-color: #fff;
       .header {
            height: r(90);
            width: r(750);
            position: relative;
            .title-dialog {
                font-size: r(36);
                color: $c-rule;
                text-align: center;
                line-height: r(90);
            }
            .icon-dialog-close {
                position: absolute;
                top: r(22);
                right: r(20);
            }
       }
       .banner {
           width: 100%;
           height: rem(300px);
           background-color: #fff;
           .yd-slider {
               height: 100%;
               // overflow: hidden;
               .yd-slider-item {
                   a {
                       height: 100%;

                       img {
                           width: 100%;
                           height: rem(300px);
                       }
                   }
                   p {
                       position: absolute;
                       bottom: 0;
                       width: 100%;
                       height: rem(60px);
                       line-height: rem(60px);
                       background-color: rgba(0,0,0,0.4);
                       font-size: rem(30px);
                       font-weight: 600;
                       color: #fff;
                       margin-left: rem(12px);
                   }
               }
           }
       }
       /* 房屋配置 */
       .house-deploy {
            width: r(700);
            height: r(230);
            margin: 0 auto;
            background-color: #fff;
            margin-top: r(20);
            border: 1px solid rgba(255,255,255,0);
            .deploy-wrapper {
               display: flex;
               background-color: #F5F5F4;
               border-radius: r(10);
               .deploy-item {
                   height: rem(156px);
                   padding: rem(18px) 0; 
                   flex: 1;
                   .bed-wrapper,.door-wrapper {
                        width: r(350);
                        margin: 0 auto;
                        text-align: center;
                        margin-bottom: r(10);
                   }
                   p {
                       width: 100%;
                       text-align: center;
                       height: rem(42px);
                   }
                   .img-icon {
                       height: rem(54px);
                   }
                   .text-content {
                       font-size: rem(30px);
                       color: $c-rule1;
                       font-weight: 600;
                   }
                   .item-1,.item-2 {
                       height: rem(36px);
                       font-size: rem(24px);
                       color: #9E9E9E;
                   }
               }
           }

       }
       /* 自定义样式 */
       .selectDate {
           background-color: #fff;
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .wrapper-date {
               background-color: #fff;
           }
       }
       /* 时间选择 */
       .time-wrapper {
            @include box-shadow(0 0 r(3) rgba(0, 0, 0, 0.3));
            @include display-flex();
            @include justify-content(center);
            @include align-items(center);
            width: r(670);
            height: r(140);
            background-color: #fff;
            margin: 0 auto;
            border-radius: r(10);
            div {
                @include flex(1);
            }
            .in-date {
                p:nth-child(1) {
                    font-size: r(24);
                    color: #9E9E9E;
                    text-align: center;
                    line-height: r(32);
                }
                p:nth-child(2) {
                    font-size: r(32);
                    color: $c-rule;
                    text-align: center;
                    line-height: r(42);
                }
                
            }
            .durt-date {
                p {
                    width: r(90);
                    height: r(34);
                    line-height: r(34);
                    margin: 0 auto;
                    border: r(1) solid #DEDCD8;
                    color: $c-rule;
                    font-size: r(22);
                    padding: r(6) r(10);
                    border-radius: r(17);
                    text-align: center;
                }
            }
            .out-date {
                p:nth-child(1) {
                    font-size: r(24);
                    color: #9E9E9E;
                    text-align: center;
                    line-height: r(32);
                }
                p:nth-child(2) {
                    font-size: r(32);
                    color: $c-rule;
                    text-align: center;
                    line-height: r(42);
                }
                border-right: r(1) solid #DEDCD8; 
            }
            .change-date {
                height: r(140);
                line-height: r(140);
                font-size: r(24);
                color: $c-rule1;
                text-align: center;
            }

       }
       /* 可用优惠 */
       /* .usable-coupon {
           margin-top: rem(24px);
           padding-bottom: rem(114px);
           background-color: #fff;
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .usable-wrapper {
               margin-left: rem(102px);
               p {
                   height: rem(36px);
                   color: #333;
               }
           }
       } */
       /* 总价格展示 */
       .footer {
           position: fixed;
           bottom: 0;
           height: rem(90px);
           width: 100%;
           border-top: 1px solid #ccc;
           background-color: #fff;
           .price-wrapper {
               display: flex;
               height: 100%;
               // justify-content: center;
               align-items: baseline;
               .price-item {
                   flex: 1;
                   text-align: center;
                   span {
                       // font-weight: 600;
                       font-size: rem(42px);
                       color: $c-rule1;
                   }
                   span:nth-child(2) {
                        font-size: r(30);
                   }
                   .total-price {
                       font-weight: 600;
                       font-size: rem(30px);
                       color: #000;
                   }

               }
               .pre-item {
                    @include gradient-horizontal-repeating(#FFC300, #FF9000);
                   flex: 1;
                   height: rem(90px);
                   line-height: rem(90px);
                   text-align: center;
                   background-color: #FF9058;
                   font-size: rem(36px);
                   color: #fff;
               }
           }
       }

   }

    .icon-bed {
        @include mix-bed();
    }
    .icon-door {
        @include mix-door();
    }
    .icon-dialog-close {
        @include mix-dialog-close();
    }
</style>

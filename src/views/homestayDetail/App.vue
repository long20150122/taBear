<template>
    <div class="page-index" :homestayObject="homestayObject">
        <!-- 轮播banner -->
        <div class="banner">
            <!-- <mt-swipe :auto="0" refs='swipe'>
              <mt-swipe-item class="swip-item-1 item" @click="handleBannerClick">1</mt-swipe-item>
              <mt-swipe-item class="swip-item-2 item" @click="handleBannerClick">2</mt-swipe-item>
              <mt-swipe-item class="swip-item-3 item" @click="handleBannerClick">3</mt-swipe-item>
            </mt-swipe> -->
            <yd-slider autoplay="0">
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img :src="homestayObject.cover">
                    </a>
                    <p v-if="homestayObject.baseInfo !== undefined">
                      <span>{{homestayObject.baseInfo.name}}</span>
                      <span>{{homestayObject.baseInfo.address}}</span>
                    </p>
                    <!-- <p v-if="homestayObject.baseInfo !== undefined">{{homestayObject.baseInfo.name}}</p>
                    <p v-if="homestayObject.baseInfo !== undefined">{{homestayObject.baseInfo.address}}</p> -->
                </yd-slider-item>
                <!-- <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
                    </a>
                    <p>私奔驿站——111111111111</p>
                </yd-slider-item>
                <yd-slider-item>
                    <a href="http://www.ydcss.com">
                        <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
                    </a>
                    <p>私奔驿站——111111111111</p>
                </yd-slider-item> -->
            </yd-slider>
        </div>
        <!-- 全部套房 -->
        <div class="suite-house" :houseList="houseList">
            <h2>全部<span v-if="houseList !== undefined">{{houseList.length}}</span>套房间</h2>
            <div class="suite-wrapper">
                <ul class="item-wrapper">
<!--                 <div v-for="item in houseList" :key="item.id">
                  {{ item.room_name }}
                </div> -->

                    <li class="item" v-for="item in houseList" :key="item.id">
                        <img :src="item.cover" alt="test">
                        <p>
                            <span>{{item.room_name}}</span>
                            <span>
                                <span class="price">¥{{item.week_day_price}}</span>
                                <span>{{item.floor}}楼,{{item.window}}窗</span>
                            </span>
                        </p>
                    </li>
                     <li class="item">
                         <img :src="src" alt="test">
                         <p>
                             <span>私奔驿站</span>
                             <span>
                                 <span class="price">¥150</span>
                                 <span>3楼,大床</span>
                             </span>
                         </p>
                     </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>
                                <span>3楼,大床</span>
                            </span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>
                                <span>3楼,大床</span>
                            </span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>
                                <span>3楼,大床</span>
                            </span>
                        </p>
                    </li>
                    <li class="item">
                        <img :src="src" alt="test">
                        <p>
                            <span>私奔驿站</span>
                            <span>
                                <span class="price">¥150</span>
                                <span>3楼,大床</span>
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 设施服务 -->
        <div class="facility-server">
            <h2>设施服务</h2>
            <div class="facility-wrapper">
                <ul class="facility-list">
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                    <li class="facility-item">
                        <div class="tv">
                            <i>$</i>
                        </div>
                        <span>电视</span>
                    </li>
                </ul>
                <div class="map-wrapper">
                    <div class="map"></div>
                    <div class="search">
                        <span class="location-icon">@</span>
                        <span class="search-text">1111龙岗大鹏龙岗大鹏龙岗大鹏龙岗大</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 民宿介绍 -->
        <div class="ms-introduce">
            <h2>民宿介绍</h2>
            <div class="introduce-wrapper">
                <p>2017年11月27日 - weui应该上万star了吧,做微信端首选的就是weui,用了vue就会选择vux,在加上尤大好几次推荐。从这几点说,vux起点很高的。当然作者也很勤快,前段时间发布..</p>
                <span>阅读更多</span>
            </div>
        </div>
        <!-- 入住须知 -->
        <div class="check-notice">
            <h2>入住须知</h2>
            <div class="notice-wrapper">
                <p class="in-time">
                    <span>入住时间:</span>
                    <span>13:00</span>
                </p>
                <p class="out-time">
                    <span>退房时间:</span>
                    <span>12:00</span>
                </p>
                <p class="recevi-time">
                    <span>接待时间:</span>
                    <span>07:00-09:00;12:00-13:00;19:00-24:00</span>
                </p>
                <p class="cash-pladge">
                    <span>入住押金:</span>
                    <span class="mind">办理入住时缴纳300押金</span>
                </p>
            </div>
            <div class="normal">
                <p class="house-rule">房屋守则</p>
                <div class="rule-wrapper">
                    <div class="row">
                        <div>
                            <span>@</span>
                            <span>接待儿童</span>
                        </div>
                        <div>
                            <span>@</span>
                            <span>接待儿童</span>
                        </div>
                        <div>
                            <span>@</span>
                            <span>接待儿童</span>
                        </div>
                    </div>
                    <div class="row">
                        <div>
                            <span>@</span>
                            <span>接待儿童</span>
                        </div>
                        <div>
                            <span>@</span>
                            <span>接待儿童</span>
                        </div>
                        <div>
                            <span>@</span>
                            <span>接待儿童</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- 退订政策 -->
        <div class="debook-method">
            <h2>退订政策</h2>
            <div>宽松:入住前1天12::00前取消,可获100%退款。之后不能退订</div>
            <div>
                <p>
                    <span>全额预付:</span>
                    <span class="item-content">需预付全额房费</span>
                </p>
                <p>
                    <span>需确认:</span>
                    <span class="item-content">提交订单后,需等待房东确认,确认后会提示支付。</span>
                </p>
            </div>
        </div>

        <Button @click="handleLoginOut">退出登录</Button>
        <div>
            <yd-button type="primary" @click.native="goHouseType">primary</yd-button>
            <yd-button type="danger">danger</yd-button>
            <yd-button type="warning">warning</yd-button>
            <yd-button type="hollow">hollow</yd-button>
            <yd-button type="disabled" disabled>disabled</yd-button>
        </div>

    </div>
</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
// import viewport from 'vlib/comp/viewport';

import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
Slider.props.showPagination = false;
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};

export default {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
    },
    data () {
        return {
            src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4202999563,2452815770&fm=27&gp=0.jpg',
            homestayObject: {},
            houseList: {}
        };
    },
    mounted () {
      this.$http.get('../data.json', {
          params: {
              shopId: '1'
          }
      }).then((res) => {
          let data = res.data;
          this.homestayObject = data;
          console.log(data);
          console.log("res=>",res);
      }).catch((err) => {
          // dialogManager.toast(err.msg || "");
          console.log("err=>",err);
      })

      this.$http.get('../msHouseList.json', {
          params: {
              shopId: '1'
          }
      }).then((res) => {
          let data = res.data;
          this.houseList = data;
          console.log(data);
          console.log("res=>",res);
      }).catch((err) => {
          // dialogManager.toast(err.msg || "");
          console.log("err=>",err);
      })

    },
    methods: {
        handleLoginOut() {
            this.loginOut();
            this.$router.push('/login');
        },
        goHouseType() {
            this.$dialog.toast({
                mes: "go houseType",
                timeout: 20000 
            });
            //this.$router.push('/houseType');
        }
    }
}

</script>

<style lang="scss">
    @import '../../common/style/reset.scss';
    @import '../../common/style/mixin';
   .page-index {
       background-color: #e4e4e4;
       .banner {
           width: 100%;
           height: rem(300px);
           background-color: #fff;
           .yd-slider {
               height: 100%;
               overflow: hidden;
               .yd-slider-item {
               }
               p {
                   position: absolute;
                   bottom: 0;
                   width: 100%;
                   height: rem(90px);
                   line-height: rem(45px);
                   //background-color: rgba(0,0,0,0.4);
                   font-size: rem(30px);
                   font-weight: 600;
                   color: #fff;
                   margin-left: rem(12px);
                   span:nth-child(1) {
                      display: block;
                      height: rem(45px);
                      line-height: rem(45px);
                   }
               }
           }
       }

       .suite-house {
           background-color: #fff;
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .suite-wrapper {
                //font-size: rem(30px);
               .item-wrapper {
                   display: block;
                   white-space:nowrap;//处理块元素中的空白符和换行 
                   overflow-x: auto;
                   overflow-y: hidden;
                   .item {
                       width: rem(540px);
                       height: rem(480px);
                       display: inline-block;
                       list-style: none;
                       border: rem(6px) solid #ccc;
                       // margin-left: 2rem;
                       color: #666;
                       >img {
                           width: 100%;
                       }
                       p {
                            font-size: rem(30px);
                           margin-left: rem(30px);
                           span {
                               font-weight: 600;
                               height: rem(60px);
                               line-height: rem(60px);
                           }
                           >span:nth-child(1) {
                               display: block;
                               font-weight: 400;
                           }
                           .price {
                               color: #cc0000;
                           }
                       }
                   }
                   .item:nth-child(1) {
                       margin-left: rem(9px);
                   }
               }
           }

       }

       .facility-server {
           background-color: #fff;
           margin-top: rem(30px);
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .facility-wrapper {
               .facility-list {
                   display: block;
                   white-space:nowrap; 
                   overflow-x: auto;
                   .facility-item {
                       width: rem(144px);
                       height: rem(144px);
                       display: inline-block;
                       list-style: none;
                       color: #666;
                       .tv {
                           height: rem(90px);
                           width: rem(90px);
                           margin: 0 auto;
                           border-radius: 50%;
                           background-color: #ccc;
                           text-align: center;
                           i {
                               height: rem(90px);
                               line-height: rem(90px);
                           }
                       }
                       span {
                           display: inline-block;
                           width: 100%;
                           text-align: center;
                           font-size: rem(27px);
                       }
                   }
               }
               .map-wrapper {
                   width: rem(750px);
                   height: rem(360px);
                   position: relative;
                   .map {
                       width: 100%;
                       height: 100%;
                       background-color: green;
                   }
                   .search {
                       height: rem(108px);
                       width: rem(672px);
                       position: absolute;
                       left: rem(24px);
                       bottom: rem(24px);
                       background-color: #fff;
                       padding-left: rem(30px);
                       .location-icon {}
                       .search-text {
                           display: inline-block;
                           height: rem(108px);
                           line-height: rem(108px);
                           color: #999;
                       }

                   }

               }
           }
       }

       .ms-introduce {
           background-color: #fff;
           margin-top: rem(30px);
           position: relative;
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .introduce-wrapper {
               margin: 0 rem(42px);
               line-height: rem(42px);
               padding-bottom: rem(42px);
           }
           span {
               position: absolute;
               right: rem(42px);
               bottom: rem(3px);
               color: #cc0000;
           }
       }
       .check-notice {
           background-color: #fff;
           margin-top: rem(30px);
           position: relative;
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           .notice-wrapper {
               margin:0 rem(42px);
               p {
                   height: rem(45px);
                   line-height: rem(42px);
                   span:nth-child(1) {
                       font-weight: 600;
                   }
               }
               .cash-pladge {
                   span {
                       font-weight: 600;
                   }
               }
           }
           .normal {
               padding: rem(30px) rem(42px);
               .house-rule {
                   font-weight: 600;
               }
               .rule-wrapper {

                   .row {
                       display: flex;
                       margin-top: rem(30px);
                       >div {
                           flex: 1;
                       }
                   }
               }
           }
       }

       .debook-method {
           background-color: #fff;
           margin-top: rem(30px);
           position: relative;
           font-size: rem(30px);
           h2 {
               height: rem(90px);
               line-height: rem(90px);
               font-weight: 600;
               margin-left: rem(18px);
               font-size: rem(32px);
           }
           div {
               margin:0 rem(42px);
               border-bottom: rem(1px) solid #ccc;
               // height: 2rem;
               line-height: rem(42px);
               padding-top: rem(12px);
               padding-bottom: rem(12px);
               p {
                   // position: relative;
                   // .item-content {
                   //     position: absolute;
                   //     left: 6rem;
                   // }
                   span {
                       font-weight: 600;
                   }
               }
           }
       }
   }
</style>

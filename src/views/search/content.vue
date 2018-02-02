<template>
    <div class="m-content">
        <div class="term" >
            <div class="date" @click="conditions" ref="date">
                <span class="time">
                    <i>住1-24</i>
                    <i>离1-25</i>
                </span>
                <span class="arrow-up"></span>
            </div>
            <div class="location" @click="conditions" ref="location">
                <span>位置</span>
                <span class="arrow-up"></span>
            </div>
            <div class="recommend" @click="conditions" ref="recommend">
                <span>{{recommendDefault}}</span>
                <span class="arrow-up"></span>
            </div>
            <div class="filter" @click="conditions" ref="filter">
                <span>筛选</span>
                <span class="arrow-up"></span>
            </div>
        </div>
        <div class="main">
            <div class="item">
                <div class="picture">
                    <img src="../../../images/house.jpg" alt="">
                    <div class="collect"></div>
                    <div class="price">¥1800</div>
                    <div class="photo"><img src="../../../images/pay-success.png" alt=""></div>
                </div>
                <div class="address">深圳市福田区沙咀</div>
                <div class="more">独立单间·可住1人| 距离10000km</div>
            </div>
        </div>
        <div class="m-location" v-show="isLocation">
            <div class="left" @click="location" ref="allLocation">
                <div class="bgc">附近</div>
                <div>热门推荐</div>
                <div>行政区</div>
            </div>
            <div class="right">
                <div class="distance" v-show="flagLocation[0]" @click="locationChoose">
                    <div>1km</div>
                    <div>2km</div>
                    <div>3km</div>
                    <div>4km</div>
                </div>
                <div class="hot" v-show="flagLocation[1]" @click="locationChoose"></div>
                <div class="area" v-show="flagLocation[2]" @click="locationChoose"></div>
            </div>
        </div>
        <div class="m-recommend" v-show="isRecommend" @click="recommend" ref="recommendContent">
            <div class="active">推荐排序</div>
            <div>好评优先</div>
            <div>低价优先</div>
            <div>高价优先</div>
            <div>人气优先</div>
        </div>
        <div class="m-filter" v-show="isFilter">
            <div class="live-num">
                <div>居住人数</div>
                <div>
                    <span>-</span><span>1</span><span>+</span>
                </div>
            </div>
            <div class="price-area">
                <div>价格区间</div>
                <div></div>
            </div>
            <div class="house-style">
                <div>房间风格</div>
                <div><span>海景房</span>
                <span>HelloKitty</span>
                <span>烧烤</span>
                <span>复古</span></div>
            </div>
            <div class="house-resource">
                <div>房源户型</div>
                <div><span>1室</span>
                <span>2室</span>
                <span>3室</span>
                <span>4室及以上</span></div>
            </div>
            <div class="house-device">
                <div>房间设施</div>
                <div><span>允许做饭</span>
                <span>WiFi</span>
                <span>空调</span>
                <span>热水淋浴</span>
                <span>24小时入住</span>
                <span>床品每客更换</span>
                <span>电视</span>
                <span>电吹风</span></div>
            </div>
            <div class="button">
                <div>重置</div>
                <div>完成</div>
            </div>
        </div>
    </div>
</template>
<script>
import popup from "vlib/layer/popup";
import date from './date';

export default {
    props: ["options"],
    data() {
        return {
            recommendDefault: '推荐排序',
            isRecommend: false,
            isLocation: false,
            isFilter: false,
            flagLocation: [1, 0, 0]
        }
    },
    mounted() {
        const vm = this;
        vm.m_dialog_date = popup("<date @close='close' :options='options'></date>", {
            options: {
                autoHide: true,
                animate: {
                    name: "slide-bottom"
                }
            },
            popup: {
                data() {
                    return {
                        options: {}
                    };
                },
                methods: {
                    close() {
                        vm.m_dialog_date.hide();
                        vm.$refs.date.children[0].classList.toggle("active");
                        vm.$refs.date.children[1].classList.toggle("arrow-up");
                        vm.$refs.date.children[1].classList.toggle("arrow-down");
                    }
                },
                components: {
                    date
                }
            }
        });
        vm.m_dialog_date.setPosition(0, "auto", "auto", 0);
    },
    methods: {
        conditions(ev) {
            const vm = this;
            let node = null;
            if(ev.target.tagName.toLowerCase() == "span") {
                node = ev.target.parentNode;
            } else if(ev.target.tagName.toLowerCase() == "i") {
                node = ev.target.parentNode.parentNode;
            }
            if(!node) return;
            node.children[0].classList.toggle("active");
            node.children[1].classList.toggle("arrow-up");
            node.children[1].classList.toggle("arrow-down");
            switch (node.className) {
                case 'date':
                    vm.m_dialog_date.show();
                    break;
                case 'location':
                    vm.isLocation = !vm.isLocation;
                    break;
                case 'recommend':
                    vm.isRecommend = !vm.isRecommend;
                    break;
                case 'filter':
                    vm.isFilter = !vm.isFilter;
                    break;
            }
        },
        recommend(ev) {
            const vm = this;
            for(let i = 0; i < vm.$refs.recommendContent.children.length; i++) {
                if(vm.$refs.recommendContent.children[i].classList.contains("active")) {
                    vm.$refs.recommendContent.children[i].classList.remove('active');
                }
            }
            if(ev.target.children.length == 0) {
                ev.target.classList.add("active");
                vm.recommendDefault = ev.target.innerHTML;
                vm.isRecommend = false;
                vm.$refs.recommend.children[0].classList.toggle("active");
                vm.$refs.recommend.children[1].classList.toggle("arrow-up");
                vm.$refs.recommend.children[1].classList.toggle("arrow-down");
            }
        },
        location(ev) {
            const vm = this;
            for(let i = 0; i < vm.$refs.allLocation.children.length; i++) {
                if(vm.$refs.allLocation.children[i].classList.contains("bgc")) {
                    vm.$refs.allLocation.children[i].classList.remove("bgc");
                }
            }
            if(ev.target.children.length == 0) {
                ev.target.classList.add("bgc");
                switch (ev.target.innerHTML) {
                    case '附近':
                        vm.flagLocation = [1,0,0];
                        break;
                    case '热门推荐': 
                        vm.flagLocation = [0,1,0];
                        break;
                    case '行政区':
                        vm.flagLocation = [0,0,1];
                        break;
                }
            }
        },
        locationChoose(ev) {
            const vm = this;
            if(ev.target.children.length == 0) {
                console.log(ev.target.innerHTML);
                vm.isLocation = false;
                vm.$refs.location.children[0].classList.toggle("active");
                vm.$refs.location.children[1].classList.toggle("arrow-up");
                vm.$refs.location.children[1].classList.toggle("arrow-down");
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/style/mixin';
.m-content {
    padding: rem(10px 0);
    background: #ffffff;
    border-top: 1px solid #cccccc;
    .active {
        color: #ff9600;
    }
    .bgc {
        color: #ff9600;
        background: #ffffff;
    }
    .arrow-up {
        display: inline-block;
        position: relative;
        width: rem(40px);
        height: rem(40px);
        @include arrows-u(4px, 0, #4d4b4b, 8px, #ffffff);
    }
    .arrow-down {
        display: inline-block;
        position: relative;
        width: rem(40px);
        height: rem(40px);
        @include arrows-d(10px, 0, #ff9600, 8px, #ffffff);
    }
    .term {
        @include display-flex();
        @include align-items(center);
        font-size: rem(28px);
        border-bottom: 1px solid #cccccc;
        >div {
            flex: 1;
            text-align: center;
        }
    }
    .date {
        @include display-flex();
        @include justify-content(center);
        @include align-items(center);
    }
    .time {
        @include display-flex();
        flex-direction: column;
    }
    .item {
        padding: rem(10px 20px);
    }
    .picture {
        position: relative;
        height: rem(400px);
        img {
            width: 100%;
            height: 100%;
        }
        .collect {
            position: absolute;
            top: rem(10px);
            right: rem(10px);
            width: rem(30px);
            height: rem(30px);
            background: red;
        }
        .price {
            position: absolute;
            bottom: 0;
            left: rem(10px);
            padding: rem(0 10px);
            font-size: rem(30px);
            line-height: rem(50px);
            text-align: center;
            color: #ffffff;
            background: rgba(0,0,0, 0.5);
        }
        .photo {
            position: absolute;
            bottom: rem(-50px);
            right: rem(20px);
            width: rem(100px);
            height: rem(100px);
            border-radius: 100%;
            overflow: hidden;
        }
    }
    .address {
        padding-top: rem(10px);
        font-size: rem(28px);
        color: #434343;
    }
    .more {
        padding-top: rem(10px);
        font-size: rem(24px);
        color: #cccccc;
    }
    .m-recommend, .m-location, .m-filter {
        position: fixed;
        top: rem(165px);
        width: rem(750px);
        height: 100%;
    }
    .m-recommend {
        background: #ffffff;
        font-size: rem(28px);
        line-height: rem(80px);
        text-align: center;
        color: #434343;
        transition: all ease-in 800ms;
    }
    .m-location {
        background: #cccccc;
        @include display-flex();
        font-size: rem(28px);
        line-height: rem(80px);
        .left {
            width: rem(200px);
            >div {
                 padding-left: rem(40px);
            }
        }
        .right {
            flex:1;
            text-align: center;
            background: #ffffff;
        }
    }
    .m-filter {
        background: #ffffff;
        padding: rem(20px);
        font-size: rem(28px);
        line-height: rem(60px);
        >div>div {
            padding-top: rem(20px);
        }
        span {
            font-size: rem(24px);
        }
        .button {
            @include display-flex();
            margin-top: rem(30px);
            text-align: center;
            div:nth-child(1) {
                padding: rem(10px 0);
                width: rem(200px);
                background: #cccccc;
                border-radius: rem(10px);
            }
            div:nth-child(2) {
                margin-left: rem(20px);
                padding: rem(10px 0);
                width: 100%;
                background: #ff9600;
                color: #ffffff;
                border-radius: rem(10px);
            }
        }
    }
    .live-num {
        span {
            padding: rem(10px 20px);
            border:1px solid #cccccc;
        }
        span:nth-child(2) {
            border-left: none;
            border-right: none;
        }
        span:nth-child(3) {
            color: #ff9600;
        }

    }
    .house-style {
        span {
            padding: rem(5px 20px);
            margin-left: rem(20px);
            border: 1px solid #4e9feb;
            border-radius: rem(10px);
        }
        span:first-child {
            margin-left: 0;
        }
    }
    .house-resource, .house-device{
        span {
            display: inline-block;
            width: rem(150px);
            height: rem(50px);
            line-height: rem(50px);
            margin-left: rem(20px);
            text-align: center;
            border: 1px solid #cccccc;
            border-radius: rem(10px);
        }
        span:nth-child(4n+1) {
            margin-left: 0;
        }
    }
}
</style>
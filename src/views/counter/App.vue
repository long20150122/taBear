<template>
    <div class="counter-wrapper">

        <!-- <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items> -->
        <div class="face">
            <div class="screen">{{showNum}}</div>
            <div class="keyboard">
                <div class="item1 active" @click="clearZero()">C</div>
                <div class="item2 active" @click="select('+/-')">+/-</div>
                <div class="item3 active" @click="select('%')">%</div>
                <div class="item4 active" @click="select('÷')">÷</div>
                <div class="item5 active" @click="select(7)">7</div>
                <div class="item6 active" @click="select(8)">8</div>
                <div class="item7 active"  @click="select(9)">9</div>
                <div class="item8 active" @click="select('×')">×</div>
                <div class="item9 active"  @click="select(4)">4</div>
                <div class="item10 active"  @click="select(5)">5</div>
                <div class="item11 active"  @click="select(6)">6</div>
                <div class="item12 active"   @click="select('-')">-</div>
                <div class="item13 active"  @click="select(1)">1</div>
                <div class="item14 active"  @click="select(2)">2</div>
                <div class="item15 active"  @click="select(3)">3</div>
                <div class="item16 active"  @click="select('+')">+</div>
                <div class="item17 active" @click="back()">←</div>
                <div class="item18 active" @click="select(0)">0</div>
                <div class="item19 active" @click="select('.')">.</div>
                <div class="item20 active" @click="getRes()">=</div>
            </div>
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
            showNum: 0,
        }
    },
    mounted () {},
    methods: {
        clearZero() {
            this.showNum = 0;
        },
        select(num) {
            //处理第一个数字为运算符时
            if (this.showNum == 0 && /[-+×÷]/.test(num)) return;
            // 处理只能输入一次的情况 处理点击多个'.'的情况
            if (num == '.') {
                this.showNum = this.showNum.toString();
                let mVal = this.showNum.match(/\./g);
                if ( mVal != null && /[-+×÷]/g.test(this.showNum) && mVal.length >= 2) return;//有运算符 同时有两个点
                if ( mVal != null && !(/[-+×÷]/g.test(this.showNum)) && mVal.length == 1) return;//有运算符 同时有两个点
                /*let flag = /\./g.test(this.showNum);
                if (flag) return;*/
            }
            if (num != '+/-' && /[-+×÷]/g.test(num)) {
                let flag = /[-+×÷]/g.test(this.showNum);
                if (flag) return;
            }
            if (this.showNum == '0') {
                if (num == '.') {//用户第一个点击的就是'.'的情况
                    this.showNum = '0.';
                } else {//第一个不是'.'的情况
                    this.showNum = num;
                }
            } else {
                if (num == '+/-') {
                    if (/[-+]/g.test(this.showNum)) {
                        if (/\-/g.test(this.showNum)) {
                            this.showNum = this.showNum.replace(/\-/g, "+");
                        } else {
                            this.showNum = this.showNum.replace(/\+/g, "-");
                        }
                    }
                } else {//字符直接在后面添加
                    this.showNum = this.showNum+''+num;
                }
            }
        },
        getRes() {

            let arr = this.showNum.replace(/[-+×÷]/g, ',').split(',');
            if (/\-/g.test(this.showNum)) {
                this.showNum = parseFloat(arr[0]) - parseFloat(arr[1]);
            }
            if (/\+/g.test(this.showNum)) {
                this.showNum = parseFloat(arr[0]) + parseFloat(arr[1]);
            }
            if (/\×/g.test(this.showNum)) {
                this.showNum = parseFloat(arr[0]) * parseFloat(arr[1]);
            }
            if (/\÷/g.test(this.showNum)) {
                this.showNum = parseFloat(arr[0]) / parseFloat(arr[1]);
            }
            
            if (/\./g.test(this.showNum)) {
                this.showNum = this.showNum.toFixed(2);
            } else {
                this.showNum = parseInt(this.showNum);
            }
            
        },
        back() {
            let len = this.showNum.length;
            if (len > 1) {
                this.showNum = this.showNum.substring(0, len-1)
            } else if (len = 1) {
                this.showNum = 0;
            }
        }
    }
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common.scss';

    .counter-wrapper {
        background-color: #000;
        .face {
            height: 100vh;
            .screen {
                width: r(750);
                height: r(380);
                color: #fff;
                font-size: r(80);
                text-align: right;
                word-wrap: break-word;
            }
            .keyboard {
                @include display-flex();
                @include flex-wrap(wrap);
                position: absolute;
                bottom: 0;
                div {
                    width: r(180);
                    height: r(180);
                    border-radius: 50%;
                    line-height: r(180);
                    text-align: center;
                    font-size: r(80);
                    color: #fff;
                    background-color: #ccc;
                    margin: r(3.75);
                    @include active();
                }
            }
        }
    }
    *{
        -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
        -webkit-user-select:none; /*webkit浏览器*/
        -khtml-user-select:none; /*早期浏览器*/
        -moz-user-select:none;/*火狐*/
        -ms-user-select:none; /*IE10*/
        user-select:none;
    }
    input,textarea {
        -webkit-user-select:auto; /*webkit浏览器*/
        margin: 0px;
        padding: 0px;
        outline: none;
    }
</style>

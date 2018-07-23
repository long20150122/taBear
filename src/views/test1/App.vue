<template>
    <div class="wrapper">
        <!-- <div class="register-dialog">
            <i class="icon-dialog-close"></i>
            <h2>{{this.dialogTitle}}</h2>
            <p class="detail">验证码已发送至+86 15989497934</p>
            <div class="input-word phone-verify">
                <span class="item0">{{this.verify0}}</span>
                <span class="item1">{{this.verify1}}</span>
                <span class="item2">{{this.verify2}}</span>
                <span class="item3">{{this.verify3}}</span>
                <input type="text" v-model='inputVerify' maxlength="4">
            </div>
            <p class="count-down">49s 后可重新发送</p>
            <p class="protocal">输入即同意<span>《****》</span></p>
        </div> -->

        <div class='wrapper-price'>
            <div class="bgh"></div>
            <!-- <div class="bgq"></div> -->
            <div class="bgq" v-bind:style="{left: leftStart + 'rem', right: (10-leftEnd) + 'rem'}"></div>
            <div class="btn-start" v-bind:style="{left: leftStart + 'rem' }" @touchstart='moveStart1' @touchmove='move1' @touchend='moveEnd1'></div>
            <div class="btn-end" v-bind:style="{left: leftEnd + 'rem' }" @touchstart='moveStart2' @touchmove='move2' @touchend='moveEnd2'></div>

            <div class="price-wrap">
                <span class="text1" :class="{'select1': 1 == startSelect, 'select': 1 == endSelect,}">100</span>
                <span class="text2" :class="{'select1': 2 == startSelect, 'select': 2 == endSelect,}">200</span>
                <span class="text3" :class="{'select1': 3 == startSelect, 'select': 3 == endSelect,}">300</span>
                <span class="text4" :class="{'select1': 4 == startSelect, 'select': 4 == endSelect,}">400</span>
                <span class="text5" :class="{'select1': 5 == startSelect, 'select': 5 == endSelect,}">500</span>
                <span class="text6" :class="{'select1': 6 == startSelect, 'select': 6 == endSelect,}">600</span>
                <span class="text7" :class="{'select1': 7 == startSelect, 'select': 7 == endSelect,}">700</span>
                <span class="text8" :class="{'select1': 8 == startSelect, 'select': 8 == endSelect,}">不限</span>
            </div>

        </div>
        <div class="search-wrapper">
            <input type="search" class="search" placeholder="去掉type='search'时输入文字右边出现x">
        </div>
        <!-- <div class="div-mock-wwrapper">
            <div contenteditable class="text" id="content" @focus="getFocus">{{placeholderText}}</div>
        </div> -->
        <div contenteditable class="text needsclick" id="content" :class="inputClassObj" @focus="getFocus" @blur="getBlur" style="-webkit-user-select:text" @input="changeVal">请输入文字<!-- {{placeholderText}} --></div>

    </div>



</template>

<script>
import viewport from 'vlib/comp/viewport';
import closest from 'lib/dom/closest'
import Vue from 'vue';



export default {
    props: ["options", "proxy"],
    components: {
    },
    data () {
        return {
            isActive: false,
            phone: '',
            dialogTitle: '请输入短信验证码',//'请输入短信验证码',//'请输入图片验证',//'绑定手机',

            picUrl: '11',
            inputVerify: '',
            verify0: '',
            verify1: '',
            verify2: '',
            verify3: '',
            verifyUrl: 'http://192.168.1.105/itx/user/bind/mobile/captcha',

            //初始选亮价格
            startSelect: 1,
            endSelect: 8,
            //两个选择按钮初始位置
            startDot: 0.35,//0.5,//viewport.px2rem(20),
            endDot: 9.15,//9,//viewport.px2rem(335),
            //两个按钮滑动变化的值
            leftStart: 0.35,//viewport.px2rem(20),
            leftEnd: 9.15,//viewport.px2rem(335),
            params1: {},
            params2: {},

            placeholderText: '请输入文字',
            inputText: '',
            fFlag: true,
            inputUserVal: '',
        };
    },
    created () {
        // viewport.init();
    },
    beforeMount () {},
    mounted () {
        // this.$post('/data.json',{}, true).then(res => {
        //     alert(1);
        // })


    },
    computed: {
        inputClassObj() {
            return this.inputText ? "" :"placeholderClass";
        }
    },
    methods: {
        /*sendImgVerify() {
            let vm = this;
            if (vm.isActive) {
                console.log('发送验证码');
            }
        },
        flashVerify() {
            let vm = this;
            console.log(1);
            vm.verifyUrl = vm.verifyUrl+'?a='+parseInt(Math.random()*1000);
        },*/
        moveStart1(event) {
            let vm = this, e = event.changedTouches[0];
            vm.params1.flag = true;
            vm.params1.currentX = e.clientX;//记录下鼠标按下时的坐标
        },
        move1(event) {
            let vm = this, e = event;
                e.stopPropagation();
                e.preventDefault();
                e = e.changedTouches[0];

                if (vm.params1.flag) {
                    let nowX = viewport.px2rem(e.clientX);
                    vm.leftStart = nowX;

                    if (nowX <= vm.startDot) {
                        vm.leftStart = vm.startDot;
                    }
                    if (nowX >= vm.leftEnd - 0.55) {
                        vm.leftStart = vm.leftEnd - 0.55;
                    }
                }
        },
        moveEnd1(event) {
            let vm = this;
            vm.startSelect = Math.round((vm.leftStart + 0.65)*0.86);
            vm.params1.flag = false;//拖拽停止  
        },

        moveStart2(event) {
            let vm = this, e = event.changedTouches[0];
            vm.params2.flag = true;
            vm.params2.currentX = e.clientX;//记录下鼠标按下时的坐标
        },
        move2(event) {
            let vm = this, e = event;
                e.stopPropagation();
                e.preventDefault();
                e = e.changedTouches[0];

                if (vm.params2.flag) {
                    let nowX = viewport.px2rem(e.clientX);
                    vm.leftEnd = nowX;
                    if (nowX <= vm.leftStart + 0.55) {
                        vm.leftEnd = vm.leftStart + 0.55;
                    }
                    if (nowX >= vm.endDot) {
                        vm.leftEnd = vm.endDot;
                    }
                }
        },
        moveEnd2(event) {
            let vm = this;
            vm.endSelect = Math.round((vm.leftEnd + 0.9)*0.81);
            vm.params2.flag = false;//拖拽停止  
        },
        /* div 模拟 输入框 */
        getFocus (val) {
            console.log(123456);
            if (!this.inputText) {
                val.target.innerText = '';
                // this.placeholderText = '';
            }
        },
        getBlur (val) {
            console.log(11111);
            if (val.target.innerText == '') {
                val.target.innerText = '请输入文字';
                // this.placeholderText = '请输入文字';
            }
        },
        changeVal(val) {
            this.inputText = val.target.innerText;
            console.log('this.inputText==>', this.inputText)
        },
    },
    watch: {
        /*phone(val) {
            let vm = this;
            var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (phoneReg.test(val)) {
                vm.isActive = true;
            } else {
                vm.isActive = false;
            }
        },
        picUrl(val) {
            let vm = this;
            if (val != '') {
                vm.dialogTitle = '请输入图片验证';
            }
        },
        inputVerify(val, oldVal) {
            console.log(val);
            let vm = this;
            var valArr = val.split('');
            for (let i=0; i<4; i++) {
                var vtext = valArr[i] ? valArr[i] : '';
                vm['verify'+i] = vtext;
            }
        }*/
        inputUserVal(val, oldVal) {
            console.log("val==>",val, "oldVal==>",oldVal);
        }    
    }
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common';
    body {
        // background-color: #abcdef;
    }
   /* .register-dialog {
        @include radius(r(20));
        width: r(570);
        height: r(460);
        margin: 0 auto;
        position: relative;
        background-color: #fff;
        .icon-dialog-close {
            position: absolute;
            top: r(20);
            right: r(20);
        }
        h2 {
            height: r(40);
            line-height: r(40);
            padding-top: r(80);
            text-align: center;
            color: #574324;
            font-size: r(36);
        }
        .input-phone {
            // @include placeholder(#C0B4AD);
            width: r(420);
            height: r(80);
            margin: 0 auto;
            line-height: r(80);
            text-align: center;
            border-bottom: r(1) solid #ECEBE9;
            margin-top: r(40);
            span {
                color: #574324;
                font-size: r(28);
            }
            input {
                height: r(70);
                width: r(300);
                font-size: r(30);
                border: 0;
                caret-color: #ff9000;
            }
            .icon-n {
   
            }
        }
        .btn {
            width: r(460);
            height: r(80);
            border-radius: r(40);
            margin: 0 auto;
            line-height: r(80);
            text-align: center;
            color: #fff;
            font-size: r(34);
            margin-top: r(40);
            background-color: #DADADA;
        }
        //输入图片验证码
        img {
            width: r(240);
            display: block;
            border: r(1) solid #CECECE;
            margin: 0 auto;
            margin-top: r(30);
        }
        .tip-text {
            width: r(200);
            height: r(32);
            line-height: r(32);
            font-size: r(24);
            color: #CECECE;
            margin: 0 auto;
            padding-top: r(20);
        }
        .input-word {
            width: r(460);
            height: r(100);
            margin: 0 auto; 
            margin-top: r(20);
            position: relative;
            overflow: hidden;
            span {
                box-sizing: border-box;
                display: inline-block;
                width: r(98);
                height: r(98);
                border-bottom: r(1) solid #ECEBE9;
                margin-right: r(12);
                text-align: center;
                font-size: r(48);
                padding-top: r(15);
                color: #574324;
                vertical-align: -webkit-baseline-middle;
            }
            span:nth-child(4) {
                margin-right: 0;
            }
            input {
                position: absolute;
                top: 0;
                right: 0;
                width: r(1000);
                height: r(100);
                opacity: 0;
                caret-color: #fff;
                color:transparent;
            }
        }
        //输入验手机证码
        .detail {
            font-size: r(28);
            color: #9E9E9E;
            text-align: center;
            margin-top: r(20);
        }
        .phone-verify {
            margin-top: r(40);
            span {
                color: #FF9000;
                border-bottom: r(1) solid #FF9000;
            }
        }
        .count-down {
            font-size: r(28);
            color: #9E9E9E;
            text-align: center;
            margin-top: r(20);
        }
        .protocal {
            font-size: r(28);
            color: #9E9E9E;
            margin-top: r(30);
            text-align: center;
            span {
                font-size: r(28);
                color: #270012;
            }
        }
   
   
   
        .active {
            @include gradient-horizontal-repeating(#FFC300, #ff9000);
        }
   
   } */

    .wrapper-price {
        position: relative;
        margin-top: r(100);
        .bgh {
            position: absolute;
            top: 0;
            left: r(40);
            width: r(670);
            height: r(10);
            background-color: #ccc;
        }
        .bgq {
            position: absolute;
            top: 0;
            left: r(140);
            right: r(470);
            height: r(10);
            background-color: #ff9000;
        }
        .btn-start {
            position: absolute;
            top: r(-18);
            left: r(100);
            width: r(40);
            height: r(40);
            border-radius: 100%;
            background-color: #fff;
            border: r(1) solid #ff9000;
        }
        .btn-end {
            position: absolute;
            top: r(-18);
            left: r(200);
            width: r(40);
            height: r(40);
            border-radius: 100%;
            background-color: #fff;
            border: r(1) solid #ff9000;
        }
        .price-wrap {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            background-color: #fff;
            padding-top: r(40);
            .select1 {
                color: #ff9000;
            }
            .select {
                color: #ff9000;
            }
            span {
                flex: 1;
                text-align: center;
                font-size: r(18);
            }
        }
    }
    .search-wrapper {
        text-align: center;
        .search {
            display: inline-block;
            height: r(90);
            width: r(600);
        }
        input[type=search]::-webkit-search-cancel-button{
            -webkit-appearance: none;//此处就是去掉默认的小×
        }
    }
    .div-mock-wwrapper {
        margin-top: r(50);
        text-align: center;
        background-color: #fff;
        .text {
            width: r(670);
            height: auto;
            min-height: r(160);
            max-height: r(200);
            border: r(1) solid #cecece;
            font-size: r(24);
            text-align: justify;
            overflow-y: auto;
            outline: none;
            margin: 0 auto;
        }
    }
    .text {
        width: r(670);
        height: auto;
        min-height: r(160);
        max-height: r(200);
        border: r(1) solid #cecece;
        font-size: r(24);
        text-align: justify;
        overflow-y: auto;
        outline: none;
        margin: 0 auto;
        margin-top: r(100);
    }
    .placeholderClass {
        color: #ccc;
    }
   /* .icon-dialog-close {
        @include mix-dialog-close();
   }
   .icon-n {
        @include mix-n();
   }
    */


</style>

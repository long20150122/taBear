<template>
    <div class="register-dialog">
        <i class="icon-dialog-close"></i>
        <h2>{{this.dialogTitle}}</h2>
        <!-- <div class="input-phone">
            <span>+86</span>
            <input type="text" v-model="phone" placeholder="请输入手机号"/>
            <i class="icon-n hide"></i>
        </div> -->
        <!-- <div class="btn" :class="{active:isActive}" @click="sendImgVerify">发送验证码</div> -->

        <!-- <img :src="this.verifyUrl" @click="flashVerify" alt="">
        <p class="tip-text">
            看不清?点击刷新
        </p>
        <div class="input-word">
            <span class="item0">{{this.verify0}}</span>
            <span class="item1">{{this.verify1}}</span>
            <span class="item2">{{this.verify2}}</span>
            <span class="item3">{{this.verify3}}</span>
            <input type="text" v-model='inputVerify' maxlength="4">
        </div> -->

        <p class="detail">验证码已发送至+86 15989497934</p>
        <div class="input-word phone-verify">
            <span class="item0">{{this.verify0}}</span>
            <span class="item1">{{this.verify1}}</span>
            <span class="item2">{{this.verify2}}</span>
            <span class="item3">{{this.verify3}}</span>
            <input type="text" v-model='inputVerify' maxlength="4">
        </div>
        <p class="count-down">49s 后可重新发送</p>
        <p class="protocal">输入即同意<span>《塔熊旅行协议》</span></p>
        


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
            // picVerify: 0,
            picUrl: '11',
            inputVerify: '',
            verify0: '',
            verify1: '',
            verify2: '',
            verify3: '',
            verifyUrl: 'http://192.168.1.105/itx/user/bind/mobile/captcha'
        };
    },
    beforeMount () {},
    mounted () {
        // this.$post('/data.json',{}, true).then(res => {
        //     alert(1);
        // })
    },
    methods: {
        sendImgVerify() {
            let vm = this;
            if (vm.isActive) {
                console.log('发送验证码');
            }
        },
        flashVerify() {
            let vm = this;
            console.log(1);
            vm.verifyUrl = vm.verifyUrl+'?a='+parseInt(Math.random()*1000);
        }
    },
    watch: {
        phone(val) {
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
        }
    }
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common';
    body {
        background-color: #abcdef;
    }
   .register-dialog {
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
            @include placeholder(#C0B4AD);
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


   }
   .icon-dialog-close {
        @include mix-dialog-close();
   }
   .icon-n {
        @include mix-n();
   }



</style>

<template>
    <div class="register-dialog">
        <i class="icon-dialog-close"></i>
        <h2>绑定手机</h2>
        <div class="input-phone">
            <span>+86</span>
            <input type="text" v-model="phone" placeholder="请输入手机号"/>
            <i class="icon-n hide"></i>
        </div>
        <div class="btn" :class="{active:isActive}" @click="sendImgVerify">发送验证码</div>
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

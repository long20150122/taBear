<template>
    <div class="form m-bind-member-card-form">
        <div class="writing">
            <div class="row row-1">
                <div class="label">会员卡号</div>
                <div class="content">
                    <span v-if="!isCardCodeInput">{{cardCode}}</span>
                    <input type="text" placeholder="请输入卡号" v-else v-model="cardCode" @click="focus">
                </div>
            </div>
            <div class="row row-2">
                <div class="label">密码</div>
                <div class="content">
                    <!-- <span v-if="!isPasswordInput">· · · · · ·</span> -->
                    <input type="password" placeholder="请输入密码" v-model="cardPassword" @click="focus">
                </div>
            </div>
            <div class="row row-3">
                <div class="label">验证码</div>
                <div class="content">
                    <input type="text" placeholder="请输入验证码" v-model="messageCode" @click="focus">
                </div>
                <div :class="{btn: true, 'btn-vcode': true, disabled: isCountingDown}" @click="vcode">
                    <span v-if="!isCountingDown">获取验证码</span>
                    <countdown v-show="isCountingDown" :time="59 * 1000" ref="countdown" :autoStart="false" @countdownstart="countdownstart" @countdownend="countdownend">
                        <template scope="props">
                            <span>重新发送</span>
                            <span v-if="props.minutes">{{ props.minutes }}m</span>
                            <span>{{ props.seconds }}s</span>
                        </template>
                    </countdown>
                </div>
            </div>
            <div class="row row-4" v-if="mobile">
                <span>验证码将发送至您的绑定手机号{{mobile.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2")}}</span>
            </div>
            <div class="row row-5">温馨提示：为防止会员信息泄露，若您设置的密码过于简单，请至影院前台进行修改。</div>
        </div>
        <div class="footer">
            <div :class="{btn: true, 'btn-submit': true, disabled: !canSubmit}"
            @click="onSubmitClicked"
            >{{submitBtnText}}</div>
        </div>
    </div>
</template>

<script>
import * as comp from "vlib/comp/bus";
import dialogManager from "common/plugin/dialog";
import verify from 'vlib/form/verify';
import appendQuery from "lib/str/appendQuery";
import crypt from "vlib/util/base64";

export default {
    props: {
        operation: {
            type: String,
            default: "bind"
        },
        mobile: {
            type: String,
            default: ""
        },
        cinemaCode: {
            type: null
        },

        cardCode: {
            type: null
        },
        cardID: {
            type: null
        },
        password: {
            type: String
        },

        apiSubmit: {
            type: String,
            default: ""
        },
        apiMessage: {
            type: String,
            default: ""
        },
        urlTarget: {
            type: String,
            default: ""
        },
        options: {
            type: Object
        },

    },
    data() {
        return {
            isCountingDown: false,
            isShowPasswordRow: false,
            isCardCodeInput: false,
            isPasswordInput: false,
            messageCode: "",
            checker: null,
            cardPassword: ""
        }
    },
    computed: {
        canSubmit() {
            const vm = this;
            return vm.cardCode && vm.cardPassword && vm.messageCode.length >= 4
        },
        submitBtnText() {
            return this.operation === "bind" ? "确认绑定" : "确认解绑";
        },
        isBindOperation() {
            return this.operation === "bind";
        }
    },
    components: {

    },
    created() {
        const vm = this;
        vm.cardPassword = ""; //vm.password ? crypt.decode(vm.password) : "";
        vm.isShowPasswordRow = !vm.cardPassword;
        vm.isCardCodeInput = !vm.cardCode;
        vm.isPasswordInput = !vm.cardPassword;
    },
    mounted() {
        const vm = this;
        console.dir(vm);
        vm.checker = verify();
        vm.checker.add({
            cardCode: {
                Required: true,
                Text: "卡号"
            },
            cardPassword: {
                Required: true,
                Text: "密码"
            },
            messageCode: {
                Required: true,
                Text: "短信验证码",
                MinLength: 4
            }
        });
    },
    methods: {
        focus(ev) {
            ev.target.focus();
        },
        vcode() {
            const vm = this;
            if (vm.isCountingDown) {
                return;
            }
            if (comp.isLock()) {
                return;
            }
            comp.lock();
            dialogManager.wait();
            vm.$http.get(vm.apiMessage, {
                params: {
                    mobile: vm.mobile,
                }
            }).then(function(res) {
                let data = res.data || {};
                dialogManager.toast(res.msg || data.msg || "");
                vm.startCountDown();
                comp.unLock();
                dialogManager.closeWait();
            }).catch(function(err) {
                dialogManager.toast(err.msg || "");
                comp.unLock();
                dialogManager.closeWait();
            });
        },
        startCountDown() {
            const vm = this;
            vm.isCountingDown = true;
            vm.$refs.countdown.start();
        },
        countdownend() {
            this.isCountingDown = false;
        },
        onSubmitClicked() {
            const vm = this;
            if (!vm.canSubmit) {
                return;
            }
            const params = {
                cardCode: vm.cardCode,
                cardPassword: crypt.encode(vm.cardPassword),
                messageCode: vm.messageCode
            };
            vm.checker.run(params).then(function () {
                vm.submit(params);
            }).catch(function (res) {
                dialogManager.toast(res.statusText);
            });
        },
        submit(params) {
            const vm = this;
            const _params = vm.isBindOperation ? {
                    cinema_code: vm.cinemaCode,
                    card_code: params.cardCode,
                    sms_code: params.messageCode,
                    password: params.cardPassword
                } : {
                    card_id: vm.cardID,
                    card_code: params.cardCode,
                    sms_code: params.messageCode,
                    password: params.cardPassword
                }
            if (comp.isLock()) {
                return;
            }
            comp.lock();
            vm.$http.post(vm.apiSubmit, _params).then(function(res) {
                let data = res.data || {};
                dialogManager.toast(res.msg || data.msg || "")
                .then(vm.goTarget);
                comp.unLock();
            }).catch(function(err) {
                dialogManager.toast(err.msg || "");
                comp.unLock();
            });
        },
        goTarget() {
            const vm = this;
            let url = vm.urlTarget;
            if (!url) {
                history.go(-1);
                return;
            }

            location.replace(url);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../style/mixin";
.form {
    @include flex(1);
    @include display-flex();
    @include flex-direction(column);
    @include justify-content(space-between);
    height: 100%;
}

.row {
    @include display-flex();
    @include align-items(center);
    margin-left: r(24);
    padding-right: r(24);
    line-height: r(100);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    font-size: r(30);

    .label {
        width: r(176);
    }
    .content {
        @include flex(1);
    }
    input {
        width: 100%;
        font-size: r(30);
        padding: 0;
        margin: 0;
        border: 0;
    }

    &.row-4 {
        @include justify-content(center);
        height: r(60);
        line-height: r(60);
        font-size: r(22);
        text-align: center;
        border: 0;
    }
    &.row-5 {
        padding-top: r(22);
        padding-left: r(24);
        margin: 0;
        border: 0;
        line-height: r(32);
        font-size: r(22);
    }
}

.btn-vcode {
    min-width: r(200);
    height: r(62);
    line-height: r(62);
    text-align: center;
    border-width: r(2);
    border-style: solid;
    border-radius: r(62);
}

.footer {
    @include display-flex();
    @include justify-content(center);
    @include align-items(center);
    height: r(130);

    .btn-submit {
        width: r(702);
        height: r(82);
        line-height: r(82);
        border-radius: r(41);
        text-align: center;
        font-size: r(36);

        &.disabled {
            opacity: .5;
        }
    }
}
</style>

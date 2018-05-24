import Vue from 'vue';
// import api from './api';

export function computedStyle(el,style){
    if(el==null){
        return false;
    }
    var cs;
    if(typeof el.currentStyle != 'undefined'){
        cs = el.currentStyle;
    }else{
        cs = window.getComputedStyle(el,null);
        console.log('computedStyle===>',style);
    }
    return cs[style];
}


//公共手机号验证
export function checkPhone(phoneNum) {
    let flag = false;
    if (!regList.tel.test(phoneNum)) {
        // 提示语可公共配置
        // Vue.prototype.$toast('请输入正确的手机号');
        flag = false;
    } else {
        flag = true;
    }
    return flag;
}

//验证密码
export function checkPwd(pwd) {
    if (/^.*?[\d]+.*$/.test(pwd) && /^.*?[A-Za-z].*$/.test(pwd) && /^.{6,16}$/.test(pwd)) {
        return true;
    }else{
        return false;
    }
}


/**
 * fn:去除空格
 * @param val:要去除空格的值
 */
export function removeSpace(val) {
    if (!val) {
        return '';
    }
    return val.replace(/\s/g, '');
}

// 表单验证所需要的正则或者函数
export const regList = {
    // 手机
    tel: /^1[3456789]\d{9}$/,
    //登录密码规则
    loginPwd: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
    //注册密码规则
    pwd: /(^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,16}$)|^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,16}$/,
    //验证码
    code: /^\d{6}$/,
    // 身份证
    id: function (sId) {
        var iSum = 0;
        if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
        sId = sId.replace(/x$/i, "a");
        var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;
        for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        if (iSum % 11 != 1) return false;
        return true;
    },
    // 输入的金额
    money: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/,
    // 银行卡
    bankNum: function (bankno) {
        if (bankno.length > 15 && bankno.length < 20) {
            return true;
        } else {
            return false;
        }
    }
};

// 倒计时函数
/*
*   @params dom: 需要开启倒计时变化的dom元素
*   @params param: 接口入参 type:Object  tel: 手机
*   @params type: 获取验证码的接口名称
*   @params cb: 获取验证码的回调
*   @params flag: 是否需要请求接口
*   @params time: 倒计时时间设置
* */
export default function countdown(dom, type, param, cb, flag, time=60) {
    var $this = new Vue(),
        vdom = document.querySelector(dom);
    // 获取有派投验证码
    if (type == 'captcha') {
        if (!param.phone) {
            $this.$toast('请输入手机号')
            return
        } else if (!regList.tel.test(param.phone)) {
            $this.$toast('请输入正确手机号')
            return
        }
        getCode('get')
        // 获取通联验证码
    } else if (type == 'createUserAccount') {
        if (!param.telNo) {
            $this.$toast('请输入手机号')
            return
        } else if (!regList.tel.test(param.telNo)) {
            $this.$toast('请输入正确手机号')
            return
        }
        getCode('post')
    } else {
        console.log('验证码接口有误');
    }

    function getCode(methods) {
        if (vdom.innerHTML != '获取验证码' && vdom.innerHTML != '重新获取') {
            return
        }
        if (flag) {
            innerHTML();
        }
        //发送验证码
        if (!flag) {
            if (methods == 'get') {
                /*$this.$get(api[type], param).then(res => {
                    if(res.code === 0) {
                        innerHTML();
                        cb && cb(res);
                    }
                })*/
            } else if (methods == 'post') {
                /*return $this.$post(api[type], param).then(res => {
                    if(res.code === 0) {
                        innerHTML();
                        cb && cb(res);
                    }
                })*/
            }
        }
    }

    function innerHTML() {
        vdom.classList.add('isCounting')
        vdom.innerHTML = `重新获取(${--time}s)`;
        var times = setInterval(() => {
            vdom.innerHTML = `重新获取(${--time}s)`;
            if (time == 0) {
                clearInterval(times);
                vdom.classList.remove('isCounting')
                vdom.innerHTML = '重新获取'
            }
        }, 1000);
    }
}

/*判断终端设备*/
export function deviceType() {
    let u = navigator.userAgent;
    return {
        isAndroid() {
            // return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1||u.indexOf('Windows') > -1||u.indexOf('Macintosh') > -1;
            return !u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        },
        isIos() {
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        },
        isWeixin() {
            return u.match(/MicroMessenger/i) == 'MicroMessenger';
        }
    }
}

/*地址中获取参数*/
export function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

/*日历函数*/
export function calenderDate() {

    return {
        
    }
}
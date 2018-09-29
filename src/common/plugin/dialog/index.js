/**********
 * 弹框
 * ft 20170802
 */

import dialog from "vlib/layer/dialog";
import popup from 'vlib/layer/popup';
import { isFunction, isObject, isArray, isNumber } from "vlib/util/dataType";
import content from "./content.vue";
import toast from './toast.vue';
import { bus, bind } from 'vlib/comp/bus';

const common = function(msg, config = {}, type){
    return new Promise((resolve, reject) => {
        let opts = Object.assign({
            okText: "确定",
            cancelText: "取消",
            wait: false,
            alert: true,
            top: null,
            left: null,
            animate: "scale",
            ok: function(){},
            cancel: function(){}
        }, config);

        if(type === "open" && isArray(config.buts)){
            if(config.buts.length === 1){
                config.buts[0] && (config.buts[0] = Object.assign(config.buts[0], {id: "ok"}));
            }else if(config.buts.length >= 2){
                config.buts[1] && (config.buts[1] = Object.assign(config.buts[1], {id: "ok"}));
                config.buts[0] && (config.buts[0] = Object.assign(config.buts[0], {id: "cancel"}));
            }
        }else if(type === "open" && !config.buts){
            config.buts = [];
        }

        const m_dialog = dialog(type === "open" ? msg : content, type === "open" ? Object.assign({animate: "scale"}, config) :{
            msg: msg,
            alert: opts.alert,
            wait: opts.wait,
            animate: opts.animate,
            opacity: opts.opacity,
            buts: ([{text: opts.okText, type: "ok", id: "ok"}].concat(type === "confirm" ? [{text: opts.cancelText, id: "cancel"}] : [])).reverse()
        });
        m_dialog.show(opts.left, opts.top);

        if(type === "wait") {
            _closeWait = m_dialog;
            bus.$once(m_dialog.get("ok"), function(result){
                resolve(result);
                m_dialog.hide(m_dialog.destroy, "wait");
            });
            return;
        }

        if((type === "open" && config.buts.length > 0) || type !== "open"){
            const fn = function(result){
                opts.ok(type === "open" ? Object.assign(result, {popup: m_dialog}) : result);
                resolve(type === "open" ? Object.assign(result, {popup: m_dialog}) : result);
                if(config.tapClose === false && type === "open") return;
                m_dialog.hide(m_dialog.destroy, "ok");
            };
            if(config.tapClose === false && type === "open"){
                bind(m_dialog.get("ok"), fn);
            }else{
                bus.$once(m_dialog.get("ok"), fn);
            }
        }

        if(type === "confirm" || (type === "open" && config.buts.length > 1)){
            bus.$once(m_dialog.get("cancel"), function(result){
                opts.cancel(type === "open" ? Object.assign(result, {popup: m_dialog}) : result);
                reject(type === "open" ? Object.assign(result, {popup: m_dialog}) : result);
                m_dialog.hide(m_dialog.destroy, "cancel");
            });
        }
    });
};

let _closeWait = null;

const DialogManager = {
    toast (msg, config) {
        this.closeWait();
        return new Promise((resolve) => {
            let opts = Object.assign({
                overlay: true,
                barShow: true,
                barColor: "#fff",
                showTime: 2,
                top: "30%",
                left: null,
                callback: function () {}
            }, isObject(config) ? config : {});
            const m_dialog = popup("<toast :msg='msg'></toast>", {
                option: {
                    showCenter: true,
                    autoHide: false,
                    overlay: {
                        show: opts.overlay,
                        opacity: 0
                    },
                    progressBar: {
                        show: opts.barShow,
                        showTime: opts.showTime,
                        color: opts.barColor
                    }
                },
                popup: {
                    data () {
                        return { msg };
                    },
                    components: {
                        toast
                    }
                }
            });
            m_dialog.show(opts.left, opts.top);
            bus.$once(m_dialog.get("hide"), function(result){
                resolve(result);
                isFunction(config) && (opts.callback = config);
                opts.callback(result);
            });        
        });
    },
    wait () {
        if(_closeWait) return;
        return common(null, {wait: true, alert: false, opacity: 0, animate: "slide"}, "wait");
    },
    closeWait () {
        if(_closeWait) {
            _closeWait.hide();
            _closeWait = null;
        }
    },
    open (vue, opts) {
        this.closeWait();
        return common(vue, opts, "open");
    },
    alert (msg, config) {
        this.closeWait();
        let option = {};
        if(isObject(config)){
            option = config;
        }else if(isFunction(config)){
            option.ok = config;
        }
        return common(msg, option, "alert");
    },
    confirm (msg, fn1, fn2) {
        this.closeWait();
        let option = {};
        if(isObject(fn1)){
            option = fn1;
        }else if(isFunction(fn1)){
            option.ok = fn1;
            if(isFunction(fn2)){
                option.cancel = fn2;
            }
        }
        return common(msg, option, "confirm");
    }
};

export default DialogManager;

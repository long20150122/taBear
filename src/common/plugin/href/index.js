import Vue from 'vue';

let _vHrefList = {bind: true};
import {getUniqueId } from 'vlib/comp/bus'
import closest from 'lib/dom/closest'

function _bodyClickJump(ev){
    let key = ev.target.dataset.vkey;
    let query = ev.target.dataset.query;
    if(!key){
        const node = closest(ev.target, "[data-vkey]");
        if(node){
            key = node.dataset.vkey;
            query = node.dataset.query;
        }
    }
    const obj = _vHrefList[key];
    if(obj) {
        const value = obj.value;
        const arg = obj.arg;
        const lazy = obj.lazy;
        function openURL(){
            let url = query ? (value.includes("?") ? value + "&" + query : value + "?" + query) : value;
            if(arg === "top") {
                window.top.location.href = url;
            }else{
                location.href = url;
            }
        }
        document.body.removeEventListener("click", _bodyClickJump, false);
        _vHrefList.bind = false;
        if(lazy){
            setTimeout(openURL, 20);
        }else {
            openURL();
        }
    }
}

document.body.addEventListener("click", _bodyClickJump, false);
window.addEventListener('pageshow', function(e) {
    if(e.persisted && !_vHrefList.bind){
        document.body.addEventListener("click", _bodyClickJump, false);
    }
}, false);

Vue.directive('href', {
    bind (el, binding) {
        const value = binding.value;
        if(typeof value !== "string" || value === "") return;
        const arg = binding.arg;
        el.dataset.vkey = getUniqueId();
        _vHrefList[el.dataset.vkey] = {arg: arg, value: value, lazy: binding.modifiers.lazy};
    }
});
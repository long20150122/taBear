import Vue from 'vue';
import {
    getUniqueId
} from 'vlib/comp/bus'
import closest from 'lib/dom/closest'
import {
    saveAs
} from './fileSaver'
import axios from 'common/utils/diyaxios'
let _vHrefList = {
    bind: true
};
let f_name = "";
let f_ref = "";
let f_type = "";

function reqListener(res) {
    if (!f_name) {
        f_name = f_ref;
    }
    let blobObject = this.response;
    saveAs(blobObject, f_name, {type: f_type})
}

function myDownload(evt, href, name, type="image/png") {
    f_name = name;
    f_ref = href;
    f_type = type;
    evt.preventDefault();
    let oReq1 = new XMLHttpRequest();
    oReq1.addEventListener("load", reqListener, false);
    oReq1.open("get", f_ref, true);
    oReq1.responseType = 'blob';
    oReq1.send();

    // axios.get(f_ref, {
    //     responseType: "blob"
    // }).then(reqListener)
}

function _bodyClickJump(ev) {
    let key = ev.target.dataset.vkey;
    let query = ev.target.dataset.query;
    let node;
    if (!key) {
        node = closest(ev.target, "[data-vkey]");
        if (node) {
            key = node.dataset.vkey;
            query = node.dataset.query;
        }
    }
    const obj = _vHrefList[key];
    if (obj) {
        const value = obj.value;
        const arg = obj.arg;
        const lazy = obj.lazy;
        myDownload.call(node, ev, value.href, value.name, value.type)
    }
}

document.body.addEventListener("click", _bodyClickJump, false);
window.addEventListener('pageshow', function (e) {
    if (e.persisted && !_vHrefList.bind) {
        document.body.addEventListener("click", _bodyClickJump, false);
    }
}, false);

Vue.directive('download', {
    bind(el, binding) {
        const value = binding.value;
        const arg = binding.arg;
        el.dataset.vkey = getUniqueId();
        _vHrefList[el.dataset.vkey] = {
            arg: arg,
            value: value,
            lazy: binding.modifiers.lazy
        };
    }
});
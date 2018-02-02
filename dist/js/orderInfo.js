webpackJsonp([8],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _status = __webpack_require__(186);

var _status2 = _interopRequireDefault(_status);

var _content = __webpack_require__(185);

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

exports.default = {
    props: ["options"],
    data: function data() {
        return {};
    },

    components: {
        orderStatus: _status2.default,
        appContent: _content2.default
    },
    methods: {}
};

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: ["options"],
    data: function data() {
        return {
            status: this.options.status || 0,
            orderNum: 1234343432,
            payment: 111
        };
    },

    methods: {
        submit: function submit() {
            console.log("submit");
        }
    }
};

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: ["options"],
    data: function data() {
        return {
            status: this.options.status || 0
        };
    },

    computed: {},
    methods: {}

};

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(92);

var _App2 = _interopRequireDefault(_App);

var _diyaxios = __webpack_require__(7);

var _diyaxios2 = _interopRequireDefault(_diyaxios);

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

__webpack_require__(6);

var _fastclick = __webpack_require__(8);

var _fastclick2 = _interopRequireDefault(_fastclick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        _fastclick2.default.attach(document.body);
    }, false);
}
_viewport2.default.init(1);

_vue2.default.config.productionTip = false;
_vue2.default.prototype.$http = _diyaxios2.default;

new _vue2.default({
    el: "#app",
    data: function data() {
        return {
            options: options
        };
    },

    template: '<app :options="options"></app>',
    components: { App: _App2.default }
});

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-content .order[data-v-408860ba] {\n  padding: 0.26667rem 0.26667rem 0.26667rem 0.4rem;\n}\n.m-content .order-num[data-v-408860ba] {\n  font-size: 0.4rem;\n  line-height: 1.33333rem;\n  color: #333333;\n  border-top: 1px solid #cccccc;\n}\n.m-content .details > div[data-v-408860ba] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: space-between;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-align-items: center;\n  -webkit-box-align: center;\n          align-items: center;\n  font-size: 0.37333rem;\n  line-height: 0.66667rem;\n  color: #cccccc;\n}\n.m-content .details .phone[data-v-408860ba] {\n  padding: 0.26667rem 0;\n  border-bottom: 1px solid #cccccc;\n}\n.m-content .details .total[data-v-408860ba] {\n  font-size: 0.53333rem;\n  color: #ff9600;\n}\n.m-content .text[data-v-408860ba] {\n  padding: 0.4rem 0.26667rem 0.26667rem 0.4rem;\n}\n.m-content .text p[data-v-408860ba]:nth-child(1) {\n    font-size: 0.48rem;\n    color: #ff9600;\n}\n.m-content .text p[data-v-408860ba]:nth-child(2) {\n    padding-top: 0.26667rem;\n    font-size: 0.37333rem;\n    color: #cccccc;\n}\n.m-content .goOrder[data-v-408860ba] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  margin-top: 1.33333rem;\n}\n.m-content .goOrder > div[data-v-408860ba] {\n    width: 4rem;\n    font-size: 0.37333rem;\n    line-height: 1.06667rem;\n    text-align: center;\n    border: 1px solid #333333;\n    border-radius: 0.13333rem;\n}\n.m-content .footer[data-v-408860ba] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background: #ffffff;\n}\n.m-content .footer > div[data-v-408860ba] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    font-size: 0.4rem;\n    line-height: 1.33333rem;\n    text-align: center;\n}\n.m-content .footer > div[data-v-408860ba]:nth-child(2) {\n      color: #ffffff;\n      background: #ff9600;\n}\n.m-content .footer .money[data-v-408860ba] {\n    margin-left: 0.13333rem;\n    color: #ff9600;\n}\n", ""]);

// exports


/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-status .action[data-v-6c62f241] {\n  background: #13b313 !important;\n}\n.m-status .action1[data-v-6c62f241] {\n  color: #13b313;\n}\n.m-status .status-one[data-v-6c62f241], .m-status .status-two[data-v-6c62f241] {\n  font-size: 0.48rem;\n  line-height: 2rem;\n  text-align: center;\n  color: #13b313;\n}\n.m-status .circle[data-v-6c62f241] {\n  width: 0.4rem;\n  height: 0.4rem;\n  border-radius: 50%;\n  background: #cccccc;\n}\n.m-status .status-box > div[data-v-6c62f241]:nth-child(1) {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.m-status .status-box .msg[data-v-6c62f241] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  font-size: 0.34667rem;\n  line-height: 1.33333rem;\n  text-align: center;\n  color: #cccccc;\n}\n.m-status .status-box .msg div[data-v-6c62f241] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n}\n.m-status .line[data-v-6c62f241] {\n  width: 2rem;\n  height: 0.06667rem;\n  background: #cccccc;\n}\n", ""]);

// exports


/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(227)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(118),
  /* template */
  __webpack_require__(199),
  /* scopeId */
  "data-v-408860ba",
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\views\\orderInfo\\content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-408860ba", Component.options)
  } else {
    hotAPI.reload("data-v-408860ba", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(234)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(119),
  /* template */
  __webpack_require__(208),
  /* scopeId */
  "data-v-6c62f241",
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\views\\orderInfo\\status.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] status.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c62f241", Component.options)
  } else {
    hotAPI.reload("data-v-6c62f241", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-content"
  }, [_c('div', {
    staticClass: "order"
  }, [_c('div', {
    staticClass: "order-num"
  }, [_vm._v("订单号：" + _vm._s(_vm.orderNum))]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_c('p', [_vm._v("重要提示：")]), _vm._v(" "), (_vm.status == 0) ? [_c('p', [_vm._v("房东将会在30分钟内确认该订单，请关注订单状态。")])] : _vm._e(), _vm._v(" "), (_vm.status == 1) ? [_c('p', [_vm._v("我们已经为您保留房间，请在30分钟内完成支付。如果订单在30分钟没有完成支付，系统将自动取消该订单。")])] : _vm._e()], 2), _vm._v(" "), (_vm.status == 0) ? [_vm._m(1)] : _vm._e(), _vm._v(" "), (_vm.status == 1) ? [_c('div', {
    staticClass: "footer"
  }, [_c('div', [_vm._v("线上支付"), _c('span', {
    staticClass: "money"
  }, [_vm._v("¥" + _vm._s(_vm.payment))])]), _vm._v(" "), _c('div', {
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("支付")])])] : _vm._e()], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details"
  }, [_c('div', [_c('div', [_vm._v("入离日期")]), _vm._v(" "), _c('div', [_vm._v("2017-12-26至2017-12-27")])]), _vm._v(" "), _c('div', [_c('div', [_vm._v("古韵榻榻米房")]), _vm._v(" "), _c('div', [_vm._v("￥150x1")])]), _vm._v(" "), _c('div', [_c('div', [_vm._v("平台抵用券")]), _vm._v(" "), _c('div', [_vm._v("-¥10x1")])]), _vm._v(" "), _c('div', {
    staticClass: "phone"
  }, [_c('div', [_vm._v("手机号：11111111")]), _vm._v(" "), _c('div', {
    staticClass: "total"
  }, [_vm._v("总金额 ¥140")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "goOrder"
  }, [_c('div', [_vm._v("查看订单")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-408860ba", module.exports)
  }
}

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-orderInfo"
  }, [_c('order-status', {
    attrs: {
      "options": _vm.options
    }
  }), _vm._v(" "), _c('app-content', {
    attrs: {
      "options": _vm.options
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6160b27c", module.exports)
  }
}

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-status"
  }, [(_vm.status == 0) ? _c('div', {
    staticClass: "status-one"
  }, [_vm._v("\n        订单提交成功，等待房东确认\n    ")]) : _vm._e(), _vm._v(" "), (_vm.status == 1) ? _c('div', {
    staticClass: "status-two"
  }, [_vm._v("\n        订单：待支付\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "status-box"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "msg"
  }, [_c('div', {
    staticClass: "action1"
  }, [_vm._v("提交订单")]), _vm._v(" "), (_vm.status == 0) ? [_c('div', {
    staticClass: "action1"
  }, [_vm._v("房东确认中")]), _vm._v(" "), _c('div', [_vm._v("支付")])] : _vm._e(), _vm._v(" "), (_vm.status == 1) ? [_c('div', [_vm._v("支付")]), _vm._v(" "), _c('div', [_vm._v("房东确认中")])] : _vm._e(), _vm._v(" "), _c('div', [_vm._v("预定成功")])], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('i', {
    staticClass: "circle action"
  }), _vm._v(" "), _c('i', {
    staticClass: "line action"
  }), _vm._v(" "), _c('i', {
    staticClass: "circle action"
  }), _vm._v(" "), _c('i', {
    staticClass: "line"
  }), _vm._v(" "), _c('i', {
    staticClass: "circle"
  }), _vm._v(" "), _c('i', {
    staticClass: "line"
  }), _vm._v(" "), _c('i', {
    staticClass: "circle"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6c62f241", module.exports)
  }
}

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(152);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0a10c512", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-408860ba\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./content.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-408860ba\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./content.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(159);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("cff7e786", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6c62f241\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./status.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6c62f241\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./status.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(117),
  /* template */
  __webpack_require__(207),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\views\\orderInfo\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6160b27c", Component.options)
  } else {
    hotAPI.reload("data-v-6160b27c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

},[140]);
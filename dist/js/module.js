webpackJsonp([6],{

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(75);

var _App2 = _interopRequireDefault(_App);

var _diyaxios = __webpack_require__(11);

var _diyaxios2 = _interopRequireDefault(_diyaxios);

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

__webpack_require__(8);

var _config = __webpack_require__(5);

var _lazyImage = __webpack_require__(9);

var _lazyImage2 = _interopRequireDefault(_lazyImage);

var _scrollLoad = __webpack_require__(10);

var _scrollLoad2 = _interopRequireDefault(_scrollLoad);

var _appNav = __webpack_require__(6);

var _appNav2 = _interopRequireDefault(_appNav);

var _fastclick = __webpack_require__(12);

var _fastclick2 = _interopRequireDefault(_fastclick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 解决移动端300毫秒延迟
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        _fastclick2.default.attach(document.body);
    }, false);
} //data-href


_vue2.default.use(_lazyImage2.default);
_vue2.default.use(_scrollLoad2.default);
_vue2.default.use(_appNav2.default);

_viewport2.default.init(1);

_vue2.default.config.productionTip = false;
_vue2.default.prototype.$http = _diyaxios2.default;

new _vue2.default({
    el: "#app",
    data: function data() {
        return {
            options: options,
            index_proxy: _config.index_proxy
        };
    },

    template: '<app :options="options" :proxy="index_proxy"></app>',
    components: { App: _App2.default }
});

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* reset */\nhtml, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu {\n  margin: 0;\n  padding: 0;\n}\nheader, footer, section, article, aside, nav, hgroup, address, figure, figcaption, menu, details {\n  display: block;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ncaption, th {\n  text-align: left;\n  font-weight: normal;\n}\nhtml, body, fieldset, img, iframe, abbr {\n  border: 0;\n}\ni, cite, em, var, address, dfn {\n  font-style: normal;\n}\n[hidefocus], summary {\n  outline: 0;\n}\nli {\n  list-style: none;\n}\nh1, h2, h3, h4, h5, h6, small {\n  font-size: 100%;\n}\nsup, sub {\n  font-size: 83%;\n}\npre, code, kbd, samp {\n  font-family: inherit;\n}\nq:before, q:after {\n  content: none;\n}\ntextarea {\n  overflow: auto;\n  resize: none;\n}\nlabel, summary {\n  cursor: default;\n}\na, button {\n  cursor: pointer;\n}\nh1, h2, h3, h4, h5, h6, em, strong, b {\n  font-weight: bold;\n}\ndel, ins, u, s, a, a:hover {\n  text-decoration: none;\n}\nbody, textarea, input, button, select, keygen, legend {\n  font: 12px/1.14 Microsoft YaHei, sans-serif;\n  color: #333;\n  outline: 0;\n}\nbody {\n  background: #fff;\n}\na, a:hover {\n  color: #333;\n}\n", ""]);

// exports


/***/ }),

/***/ 14:
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

var _appItems = [];
exports.default = {
    props: ["icon", "selected", "name", "href"],
    data: function data() {
        return {
            isSelect: this.selected,
            isHover: false
        };
    },
    mounted: function mounted() {
        var _this = this;

        _appItems.push(this);
        window.addEventListener('pageshow', function (e) {
            e.persisted && _this.resetSelect();
        }, false);
    },

    methods: {
        resetSelect: function resetSelect() {
            _appItems.forEach(function (item) {
                item.isSelect = item.selected;
                item.isHover = false;
            });
        },
        changeSelect: function changeSelect() {
            var _this2 = this;

            this.isSelect = true;
            this.isHover = true;
            _appItems.forEach(function (item) {
                if (item !== _this2) item.isSelect = false;
            });
        }
    }
};

/***/ }),

/***/ 15:
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

exports.default = {
    props: []
};

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.nav-item[data-v-6c3199fa] {\n  text-align: center;\n  width: 100%;\n  height: 1.30667rem;\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-align-content: flex-start;\n  align-content: flex-start;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.nav-item i[data-v-6c3199fa] {\n    margin-top: 0.16rem;\n}\n.nav-item .name[data-v-6c3199fa] {\n    padding-top: 0.08rem;\n    display: block;\n    width: 100%;\n    font-size: 0.29333rem;\n}\n", ""]);

// exports


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-nav-items[data-v-94851278] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n  -webkit-align-items: center;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  height: 1.30667rem;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n}\n", ""]);

// exports


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {})
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bea18f4c", module.exports)
  }
}

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(22)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  "data-v-6c3199fa",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\appNav\\appItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] appItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c3199fa", Component.options)
  } else {
    hotAPI.reload("data-v-6c3199fa", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  "data-v-94851278",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\appNav\\appNavItems.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] appNavItems.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-94851278", Component.options)
  } else {
    hotAPI.reload("data-v-94851278", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(136);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b995818a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-bea18f4c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-bea18f4c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "href",
      rawName: "v-href.lazy",
      value: (_vm.href),
      expression: "href",
      modifiers: {
        "lazy": true
      }
    }],
    staticClass: "nav-item",
    on: {
      "click": _vm.changeSelect
    }
  }, [_c('i', {
    class: 'icon-' + _vm.icon + (_vm.isSelect ? '-selected' : '')
  }), _vm._v(" "), _c('span', {
    class: 'name' + (_vm.isSelect ? ' selected' : '')
  }, [_vm._v(_vm._s(_vm.name))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6c3199fa", module.exports)
  }
}

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-nav-items"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-94851278", module.exports)
  }
}

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9db5dc20", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6c3199fa\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./appItem.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6c3199fa\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./appItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("64ff821a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-94851278\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./appNavItems.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-94851278\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./appNavItems.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*******
 * 通过配置文件
 */

var home_proxy = exports.home_proxy = {
    default: '/proxy/qu'
};

var index_proxy = exports.index_proxy = {
    default: '/proxy/qu'
};

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appNavItems = __webpack_require__(19);

var _appNavItems2 = _interopRequireDefault(_appNavItems);

var _appItem = __webpack_require__(18);

var _appItem2 = _interopRequireDefault(_appItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*******
 * 璩小孩
 * 底部导航 20170817
 */
var plugin = {
    install: function install(Vue) {
        Vue.component('app-nav-items', _appNavItems2.default);
        Vue.component('app-item', _appItem2.default);
    }
};

exports.default = plugin;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(192)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(93),
  /* template */
  __webpack_require__(173),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\module\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bea18f4c", Component.options)
  } else {
    hotAPI.reload("data-v-bea18f4c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
    },
    data: function data() {
        return {};
    },
    mounted: function mounted() {},

    methods: {}
}; //
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

// import appHeader from './Header.vue'
// import appContent from './Content.vue'

/***/ })

},[114]);
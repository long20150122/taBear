webpackJsonp([7],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lazyImage = __webpack_require__(23);

var _lazyImage2 = _interopRequireDefault(_lazyImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_lazyImage2.default.install = function (Vue) {
  return Vue.component('lazy-image', _lazyImage2.default);
}; /*******
    * 璩小孩
    * 懒加载图片 20170817
    */
exports.default = _lazyImage2.default;

/***/ }),

/***/ 107:
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

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scrollLoad = __webpack_require__(24);

var _scrollLoad2 = _interopRequireDefault(_scrollLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scrollLoad2.default.install = function (Vue) {
  return Vue.component('scroll-load', _scrollLoad2.default);
}; /*******
    * 璩小孩
    * 滚动加载 20170817
    */
exports.default = _scrollLoad2.default;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (element) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

    function find(node) {
        var display = (0, _getStyle2.default)(node, "display");
        var bool = !!node.style.display;
        node.style.display = "none";
        var height = (0, _getStyle2.default)(node, "height");
        var maxHeight = (0, _getStyle2.default)(node, "maxHeight");
        var overflow = (0, _getStyle2.default)(node, "overflow");
        if (bool) node.style.display = display;else node.style.removeProperty("display");

        if ((height !== "auto" || maxHeight !== "none") && overflow === "auto") {
            return node;
        }
        if (node === document.body) {
            return root;
        } else {
            return find(node.parentNode);
        }
    }
    return find(element);
};

var _getStyle = __webpack_require__(9);

var _getStyle2 = _interopRequireDefault(_getStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(88);

var _App2 = _interopRequireDefault(_App);

var _diyaxios = __webpack_require__(7);

var _diyaxios2 = _interopRequireDefault(_diyaxios);

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

__webpack_require__(6);

var _config = __webpack_require__(14);

var _lazyImage = __webpack_require__(10);

var _lazyImage2 = _interopRequireDefault(_lazyImage);

var _scrollLoad = __webpack_require__(11);

var _scrollLoad2 = _interopRequireDefault(_scrollLoad);

var _appNav = __webpack_require__(15);

var _appNav2 = _interopRequireDefault(_appNav);

var _fastclick = __webpack_require__(8);

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

/***/ 14:
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

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appNavItems = __webpack_require__(33);

var _appNavItems2 = _interopRequireDefault(_appNavItems);

var _appItem = __webpack_require__(32);

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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 判断对象是否为一个节点，注意：元素、注释、文本内容都是一个node，具体请查阅DOM实现接口文档
 * 例子：
 *
 * HTML: <div id="node"></div>
 *
 * var isNode = require("../dom/isNode");
 * var node = document.getElementById("node");
 * console.log(isNode(node)); // true
 *
 */
module.exports = function (node) {
  return typeof node !== "undefined" && Boolean(node.nodeName) && Boolean(node.nodeType);
};

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* reset */\nhtml, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu {\n  margin: 0;\n  padding: 0;\n}\nheader, footer, section, article, aside, nav, hgroup, address, figure, figcaption, menu, details {\n  display: block;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ncaption, th {\n  text-align: left;\n  font-weight: normal;\n}\nhtml, body, fieldset, img, iframe, abbr {\n  border: 0;\n}\ni, cite, em, var, address, dfn {\n  font-style: normal;\n}\n[hidefocus], summary {\n  outline: 0;\n}\nli {\n  list-style: none;\n}\nh1, h2, h3, h4, h5, h6, small {\n  font-size: 100%;\n}\nsup, sub {\n  font-size: 83%;\n}\npre, code, kbd, samp {\n  font-family: inherit;\n}\nq:before, q:after {\n  content: none;\n}\ntextarea {\n  overflow: auto;\n  resize: none;\n}\nlabel, summary {\n  cursor: default;\n}\na, button {\n  cursor: pointer;\n}\nh1, h2, h3, h4, h5, h6, em, strong, b {\n  font-weight: bold;\n}\ndel, ins, u, s, a, a:hover {\n  text-decoration: none;\n}\nbody, textarea, input, button, select, keygen, legend {\n  font: 12px/1.14 Microsoft YaHei, sans-serif;\n  color: #333;\n  outline: 0;\n}\nbody {\n  background: #fff;\n}\na, a:hover {\n  color: #333;\n}\n", ""]);

// exports


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 检查传入的对象
 * 如果是null则返回null(typeof null是返回object)
 * 如果是数组则返回array(typeof []是返回object)
 *
 * var getType = require("../util/getType");
 * var type = getType([]); // array
 */
module.exports = function (obj) {
  var type;
  return ((type = typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" ? obj == null && "null" || Object.prototype.toString.call(obj).slice(8, -1) : type).toLowerCase();
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//

exports.default = {
    props: {
        src: {
            type: String,
            default: ""
        },
        initSrc: {
            type: String,
            default: ""
        },
        errorSrc: {
            type: String,
            default: ""
        },
        autoDestroy: {
            type: String,
            default: "yes" //|no
        }
    },
    data: function data() {
        return {
            defaultSrc: this.initSrc !== "" ? this.initSrc : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi/v//PwNAgAEACQsDAUdpTjcAAAAASUVORK5CYII=",
            img: null,
            cdn: "" //http://php.sztest.mopon.cn/dyh5/web
        };
    },
    mounted: function mounted() {
        this.loadImage();
    },

    watch: {
        src: function src() {
            this.loadImage();
        }
    },
    methods: {
        cdnUrl: function cdnUrl(src) {
            if (!/^(\/images\/common)/.test(src)) return src;
            return this.cdn + src;
        },
        setSrc: function setSrc(src) {
            if (this.autoDestroy === "no") {
                this.defaultSrc = this.cdnUrl(src);
            } else {
                this.$el.src = this.cdnUrl(src);
            }
            this.$emit("load", src);
        },
        loadImage: function loadImage() {
            if (this.src === "") {
                this.err();
                return;
            }
            this.img = new Image();
            this.img.src = this.src;
            if (this.img.complete) {
                this.suc();
            } else {
                this.img.onload = this.suc;
                this.img.onerror = this.err;
            }
        },
        suc: function suc() {
            this.setSrc(this.src);
            this.$emit("suc", { src: this.src, width: this.img.width, height: this.img.height });
            this.destroy();
        },
        err: function err() {
            if (this.errorSrc !== "") {
                this.setSrc(this.errorSrc);
            }
            this.$emit("err", { src: this.src });
            this.destroy();
        },
        destroy: function destroy() {
            if (this.autoDestroy === "no") return;
            this.img = null;
            this.$destroy();
        }
    }
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

var _animate = __webpack_require__(20);

var _animate2 = _interopRequireDefault(_animate);

var _debounce = __webpack_require__(21);

var _debounce2 = _interopRequireDefault(_debounce);

var _getScrollNode = __webpack_require__(13);

var _getScrollNode2 = _interopRequireDefault(_getScrollNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

exports.default = {
    props: {
        delta: {
            type: Number,
            default: 10
        },
        loading: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: "正在拼命加载"
        },
        node: null
    },
    data: function data() {
        return {
            bindNode: null,
            height: 0,
            style: { height: "0px" },
            lastScrollTop: 0,
            debounced: null
        };
    },
    mounted: function mounted() {
        this.height = 70 * _viewport2.default.rem() / 75;
        this.debounced = (0, _debounce2.default)(this.scroll, 50);
    },

    watch: {
        node: function node(_node) {
            this.bindNode = (0, _getScrollNode2.default)(_node);
            this.bind();
        },
        loading: function loading(bool) {
            if (bool) {
                this.unbind();
            } else {
                this.bind();
            }
        }
    },
    methods: {
        bind: function bind() {
            this.bindNode.addEventListener("scroll", this.debounced);
        },
        unbind: function unbind() {
            this.bindNode.removeEventListener("scroll", this.debounced);
        },
        scroll: function scroll() {
            var node = this.bindNode === window ? document.body : this.bindNode;
            var clientHeight = node === document.body ? document.documentElement.clientHeight : node.clientHeight;
            var scrollTop = node.scrollTop;
            if (scrollTop > this.lastScrollTop && node.scrollHeight - (scrollTop + clientHeight) <= this.delta) {
                this.$emit("load", { top: scrollTop });
            }
            this.lastScrollTop = scrollTop;
        },
        destroy: function destroy() {
            this.unbind();
            this.bindNode = null;
            this.$destroy();
        }
    }
};

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 璩小孩
 * 循环动画
 */
module.exports = function (duration, progress, easing) {

    easing = easing || function (p) {
        return p;
    };
    var animators = null;

    var requestAniFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }();

    return {
        start: function start(finished) {
            var startTime = Date.now();
            requestAniFrame(function step() {
                var p = (Date.now() - startTime) / duration;
                var next = true;

                if (p < 1.0) {
                    progress(easing(p), p);
                } else {
                    if (typeof finished === 'function') {
                        next = finished() === false;
                    } else {
                        next = finished === false;
                    }

                    if (!next) {
                        progress(easing(1.0), 1.0);
                    } else {
                        startTime += duration;
                        progress(easing(p), p);
                    }
                }

                if (next) requestAniFrame(step);
            });
        },
        queue: function queue(ani) {
            animators = ani || [];
            return {
                append: function append() {
                    var args = [].slice.call(arguments);
                    animators.push.apply(animators, args);
                },
                flush: function flush() {
                    if (animators.length) {
                        var play = function play() {
                            var animator = animators.shift();
                            animator.start(function () {
                                if (animators.length) {
                                    play();
                                }
                            });
                        };

                        play();
                    }
                }
            };
        }
    };
};

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataType = __webpack_require__(5);

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }))
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * jQuery(source).on('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel)
 */
function debounce(func, wait, options) {
  var lastArgs = void 0,
      lastThis = void 0,
      maxWait = void 0,
      result = void 0,
      timerId = void 0,
      lastCallTime = void 0;

  var lastInvokeTime = 0;
  var leading = false;
  var maxing = false;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if ((0, _dataType.isObject)(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs;
    var thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced() {
    var time = Date.now();
    var isInvoking = shouldInvoke(time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

exports.default = debounce;

/***/ }),

/***/ 215:
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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-scroll-loading[data-v-231fa66c] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-align-content: space-between;\n  align-content: space-between;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 2.66667rem;\n  height: 0.93333rem;\n  margin: 0 auto;\n}\n.m-scroll-loading .ani-loading .ani-1[data-v-231fa66c], .m-scroll-loading .ani-loading .ani-2[data-v-231fa66c], .m-scroll-loading .ani-loading .ani-3[data-v-231fa66c] {\n    width: 0.34667rem;\n    height: 0.34667rem;\n    border-radius: 100%;\n    margin: 0 0.34667rem;\n    -webkit-animation-name: aniScaleLoading;\n    animation-name: aniScaleLoading;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n}\n.m-scroll-loading .ani-loading .ani-2[data-v-231fa66c] {\n    -webkit-animation-delay: 0.2s;\n    animation-delay: 0.2s;\n}\n.m-scroll-loading .ani-loading .ani-3[data-v-231fa66c] {\n    -webkit-animation-delay: 0.4s;\n    animation-delay: 0.4s;\n}\n.m-scroll-loading .text[data-v-231fa66c] {\n    text-align: center;\n    font-size: 0.32rem;\n}\n@-webkit-keyframes aniScaleLoading {\n0%, 50%, 100% {\n    -webkit-transform: scale(1);\n}\n25% {\n    -webkit-transform: scale(1.5);\n}\n}\n@keyframes aniScaleLoading {\n0%, 50%, 100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n25% {\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(26),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\common\\plugin\\lazyImage\\lazyImage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] lazyImage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a05409c", Component.options)
  } else {
    hotAPI.reload("data-v-3a05409c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(25),
  /* scopeId */
  "data-v-231fa66c",
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\common\\plugin\\scrollLoad\\scrollLoad.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] scrollLoad.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-231fa66c", Component.options)
  } else {
    hotAPI.reload("data-v-231fa66c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(166);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7e9bb54a", content, false, {});
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "m-scroll-loading"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ani-loading vh-center"
  }, [_c('span', {
    staticClass: "ani-1"
  }), _c('span', {
    staticClass: "ani-2"
  }), _c('span', {
    staticClass: "ani-3"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-231fa66c", module.exports)
  }
}

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('img', {
    attrs: {
      "src": _vm.defaultSrc
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3a05409c", module.exports)
  }
}

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("17bbef19", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-231fa66c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./scrollLoad.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-231fa66c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./scrollLoad.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 28:
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

/***/ 29:
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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.nav-item[data-v-6c3199fa] {\n  text-align: center;\n  width: 100%;\n  height: 1.30667rem;\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-align-content: flex-start;\n  align-content: flex-start;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.nav-item i[data-v-6c3199fa] {\n    margin-top: 0.16rem;\n}\n.nav-item .name[data-v-6c3199fa] {\n    padding-top: 0.08rem;\n    display: block;\n    width: 100%;\n    font-size: 0.29333rem;\n}\n", ""]);

// exports


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-nav-items[data-v-94851278] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n  -webkit-align-items: center;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  height: 1.30667rem;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n}\n", ""]);

// exports


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(36)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(34),
  /* scopeId */
  "data-v-6c3199fa",
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\common\\plugin\\appNav\\appItem.vue"
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

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(37)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(35),
  /* scopeId */
  "data-v-94851278",
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\common\\plugin\\appNav\\appNavItems.vue"
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

/***/ 34:
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

/***/ 35:
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("49d5e85c", content, false, {});
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

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("06f61974", content, false, {});
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
exports.isElement = exports.isNode = exports.isUndefined = exports.isNull = exports.isFunction = exports.isBoolean = exports.isObject = exports.isArray = exports.isString = exports.isNumber = undefined;

var _getType = __webpack_require__(17);

var _getType2 = _interopRequireDefault(_getType);

var _isNode = __webpack_require__(16);

var _isNode2 = _interopRequireDefault(_isNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***********
 * 数据类型
 * @type {obj}
 */
var isNumber = exports.isNumber = function isNumber(obj) {
  return (0, _getType2.default)(obj) === "number";
};
var isString = exports.isString = function isString(obj) {
  return (0, _getType2.default)(obj) === "string";
};
var isArray = exports.isArray = function isArray(obj) {
  return (0, _getType2.default)(obj) === "array";
};
var isObject = exports.isObject = function isObject(obj) {
  return (0, _getType2.default)(obj) === "object";
};
var isBoolean = exports.isBoolean = function isBoolean(obj) {
  return (0, _getType2.default)(obj) === "boolean";
};
var isFunction = exports.isFunction = function isFunction(obj) {
  return (0, _getType2.default)(obj) === "function";
};
var isNull = exports.isNull = function isNull(obj) {
  return (0, _getType2.default)(obj) === "null";
};
var isUndefined = exports.isUndefined = function isUndefined(obj) {
  return (0, _getType2.default)(obj) === "undefined";
};
var isNode = exports.isNode = function isNode(node) {
  return (0, _isNode2.default)(node);
};
var isElement = exports.isElement = function isElement(element) {
  return isNode(element) && element.nodeType === 1;
};

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(241)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(107),
  /* template */
  __webpack_require__(215),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\myApache\\htdocs\\myTest\\vueList\\taBear\\src\\views\\module\\App.vue"
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

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, styleName) {
  return element.style[styleName] ? element.style[styleName] : element.currentStyle ? element.currentStyle[styleName] : window.getComputedStyle(element, null)[styleName];
};

; /*****
   * 获取样式属性值
   */

/***/ })

},[136]);
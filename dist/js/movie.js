webpackJsonp([0],Array(24).concat([
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dialog = __webpack_require__(44);

var _dialog2 = _interopRequireDefault(_dialog);

var _popup = __webpack_require__(26);

var _popup2 = _interopRequireDefault(_popup);

var _dataType = __webpack_require__(13);

var _content = __webpack_require__(52);

var _content2 = _interopRequireDefault(_content);

var _toast2 = __webpack_require__(53);

var _toast3 = _interopRequireDefault(_toast2);

var _bus = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**********
 * 弹框
 * 璩小孩 20170802
 */

var common = function common(msg) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var type = arguments[2];

    return new Promise(function (resolve, reject) {
        var opts = Object.assign({
            okText: "确定",
            cancelText: "取消",
            wait: false,
            alert: true,
            top: null,
            left: null,
            animate: "scale",
            ok: function ok() {},
            cancel: function cancel() {}
        }, config);

        if (type === "open" && (0, _dataType.isArray)(config.buts)) {
            if (config.buts.length === 1) {
                config.buts[0] && (config.buts[0] = Object.assign(config.buts[0], { id: "ok" }));
            } else if (config.buts.length >= 2) {
                config.buts[1] && (config.buts[1] = Object.assign(config.buts[1], { id: "ok" }));
                config.buts[0] && (config.buts[0] = Object.assign(config.buts[0], { id: "cancel" }));
            }
        } else if (type === "open" && !config.buts) {
            config.buts = [];
        }

        var m_dialog = (0, _dialog2.default)(type === "open" ? msg : _content2.default, type === "open" ? Object.assign({ animate: "scale" }, config) : {
            msg: msg,
            alert: opts.alert,
            wait: opts.wait,
            animate: opts.animate,
            opacity: opts.opacity,
            buts: [{ text: opts.okText, type: "ok", id: "ok" }].concat(type === "confirm" ? [{ text: opts.cancelText, id: "cancel" }] : []).reverse()
        });
        m_dialog.show(opts.left, opts.top);

        if (type === "wait") {
            _closeWait = m_dialog;
            _bus.bus.$once(m_dialog.get("ok"), function (result) {
                resolve(result);
                m_dialog.hide(m_dialog.destroy, "wait");
            });
            return;
        }

        if (type === "open" && config.buts.length > 0 || type !== "open") {
            var fn = function fn(result) {
                opts.ok(type === "open" ? Object.assign(result, { popup: m_dialog }) : result);
                resolve(type === "open" ? Object.assign(result, { popup: m_dialog }) : result);
                if (config.tapClose === false && type === "open") return;
                m_dialog.hide(m_dialog.destroy, "ok");
            };
            if (config.tapClose === false && type === "open") {
                (0, _bus.bind)(m_dialog.get("ok"), fn);
            } else {
                _bus.bus.$once(m_dialog.get("ok"), fn);
            }
        }

        if (type === "confirm" || type === "open" && config.buts.length > 1) {
            _bus.bus.$once(m_dialog.get("cancel"), function (result) {
                opts.cancel(type === "open" ? Object.assign(result, { popup: m_dialog }) : result);
                reject(type === "open" ? Object.assign(result, { popup: m_dialog }) : result);
                m_dialog.hide(m_dialog.destroy, "cancel");
            });
        }
    });
};

var _closeWait = null;

var DialogManager = {
    toast: function toast(msg, config) {
        this.closeWait();
        return new Promise(function (resolve) {
            var opts = Object.assign({
                overlay: true,
                barShow: true,
                barColor: "#fff",
                showTime: 2,
                top: "30%",
                left: null,
                callback: function callback() {}
            }, (0, _dataType.isObject)(config) ? config : {});
            var m_dialog = (0, _popup2.default)("<toast :msg='msg'></toast>", {
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
                    data: function data() {
                        return { msg: msg };
                    },

                    components: {
                        toast: _toast3.default
                    }
                }
            });
            m_dialog.show(opts.left, opts.top);
            _bus.bus.$once(m_dialog.get("hide"), function (result) {
                resolve(result);
                (0, _dataType.isFunction)(config) && (opts.callback = config);
                opts.callback(result);
            });
        });
    },
    wait: function wait() {
        if (_closeWait) return;
        return common(null, { wait: true, alert: false, opacity: 0, animate: "slide" }, "wait");
    },
    closeWait: function closeWait() {
        if (_closeWait) {
            _closeWait.hide();
            _closeWait = null;
        }
    },
    open: function open(vue, opts) {
        this.closeWait();
        return common(vue, opts, "open");
    },
    alert: function alert(msg, config) {
        this.closeWait();
        var option = {};
        if ((0, _dataType.isObject)(config)) {
            option = config;
        } else if ((0, _dataType.isFunction)(config)) {
            option.ok = config;
        }
        return common(msg, option, "alert");
    },
    confirm: function confirm(msg, fn1, fn2) {
        this.closeWait();
        var option = {};
        if ((0, _dataType.isObject)(fn1)) {
            option = fn1;
        } else if ((0, _dataType.isFunction)(fn1)) {
            option.ok = fn1;
            if ((0, _dataType.isFunction)(fn2)) {
                option.cancel = fn2;
            }
        }
        return common(msg, option, "confirm");
    }
};

exports.default = DialogManager;

/***/ }),
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _popup = __webpack_require__(58);

var _popup2 = _interopRequireDefault(_popup);

var _closest = __webpack_require__(25);

var _closest2 = _interopRequireDefault(_closest);

var _bus = __webpack_require__(7);

var _delay = __webpack_require__(27);

var _delay2 = _interopRequireDefault(_delay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _popup_queueing = []; /**
                           * popup浮层
                           * 璩小孩
                           */

_vue2.default.prototype.$message = function (fn) {
    var _this = this;

    (0, _delay2.default)(function () {
        var stop = false;
        var node = (0, _closest2.default)(_this.$el, ".m-popup");
        _popup_queueing.forEach(function (p) {
            if (!stop && p.$el === node) {
                stop = true;
                p.pushMessage(fn);
                _bus.bus.$once(p.get("destroy"), function () {
                    var _this2 = this;

                    var _break = false;
                    _popup_queueing.forEach(function (p, index) {
                        if (!_break && _this2 === p) {
                            _break = true;
                            _popup_queueing.splice(index, 1);
                        }
                    });
                }.bind(p));
            }
        });
    }, 0).defer();
};

var PopupManager = function PopupManager(html) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { option: {}, popup: {} };

    var Popup = _vue2.default.extend(_popup2.default);
    var Content = opts.popup.components ? _vue2.default.extend(opts.popup) : null;
    var popup = null;
    var that = {
        create: function create() {
            popup = new Popup().$mount(document.createElement("DIV"));
            popup = Object.assign(popup, opts.option);
            popup.$refs.content.innerHTML = html;
            opts.popup.components && (popup.popup = new Content().$mount(popup.$refs.content));
        }
    };

    that.create();

    _popup_queueing.push(popup);

    return popup;
};
exports.default = PopupManager;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (fnc, duration, options) {

    var worker = [],
        timer = [],
        timerId = null,
        loop = false,
        defaultThis = null,
        defaultArgs = null,
        interval = +duration || 10,
        easing = function easing(p) {
        return p;
    };

    if ((0, _dataType.isObject)(options)) {
        loop = (0, _dataType.isBoolean)(options.loop) ? options.loop : loop;
        interval = (0, _dataType.isNumber)(options.interval) ? +options.interval : interval;
        easing = (0, _dataType.isFunction)(options.easing) ? options.easing : easing;
    }

    var requestAniFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || _delay;

    function _delay(func, wait, args) {
        return setTimeout.apply(undefined, [func.bind(defaultThis), +wait || 1000 / 60].concat(_toConsumableArray(args)));
    }

    function _run() {
        if (loop) {
            if (timer.length > 0) return;
            timer.push(setInterval(function () {
                worker.forEach(function (res) {
                    if (!res.stop && Date.now() - res.now >= res.time) {
                        res.fn.apply(defaultThis, res.args);
                        res.stop = true;
                    }
                });
                _clear();
                worker.length === 0 && _cancel();
            }, interval));
        } else {
            worker.forEach(function (res) {
                if (!res.stop) {
                    timer.push(_delay(res.fn, res.time, res.args));
                    res.stop = true;
                }
            });
            _clear();
        }
    }

    function _clear() {
        var count = 0;
        worker.forEach(function (item, index) {
            item.stop && worker.splice(index - count++, 1);
        });
    }

    function _cancel() {
        if (timer.length > 0) {
            timer.forEach(function (id) {
                return loop ? clearInterval(id) : clearTimeout(id);
            });
            worker = [];
            timer = [];
        }
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    return {
        bind: function bind(self) {
            defaultThis = self;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            defaultArgs = args;
            return this;
        },
        ani: function ani(finished) {
            var startTime = Date.now();
            requestAniFrame(function step() {
                var p = (Date.now() - startTime) / duration;
                var next = true;
                if (p < 1) {
                    fnc(easing(p), p);
                } else {
                    if ((0, _dataType.isFunction)(finished)) {
                        next = finished() === false;
                    } else {
                        next = finished === false;
                    }

                    if (!next) {
                        fnc(easing(1), 1);
                    } else {
                        startTime += duration;
                        fnc(easing(p), p);
                    }
                }

                if (next) requestAniFrame(step);
            });
            return this;
        },
        run: function run() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            if (timerId !== null) return this;
            timerId = setInterval(function () {
                fnc.apply(defaultThis, args);
            }, interval);
            return this;
        },
        defer: function defer() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            timer.push(_delay(fnc, duration, args));
            return this;
        },
        cancel: function cancel() {
            _cancel();
            return this;
        },
        flush: function flush() {
            var all = worker;
            this.cancel();
            all.forEach(function (res) {
                if (Date.now() - res.now <= res.time) {
                    res.fn.apply(null, res.args);
                }
            });
            return this;
        },
        append: function append(fn, time) {
            for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                args[_key4 - 2] = arguments[_key4];
            }

            worker.push({ fn: fn || fnc, args: args || defaultArgs, time: +time || duration, now: Date.now() });
            _run();
            return this;
        }
    };
};

var _dataType = __webpack_require__(13);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * 延时动画管理
                                                                                                                                                                                                     * by:璩 2017/9/7
                                                                                                                                                                                                     */

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
    'use strict';

    var $;

    /*===========================
    Swiper
    ===========================*/
    var Swiper = function Swiper(container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            flip: {
                slideShadows: true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',

            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            onKeyPress: function (swiper, keyCode)
            */

        };
        var initialVirtualTranslate = params && params.virtualTranslate;

        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (_typeof(params[param]) === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || typeof Dom7 !== 'undefined' && params[param] instanceof Dom7 || typeof jQuery !== 'undefined' && params[param] instanceof jQuery)) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            } else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            } else if (_typeof(params[def]) === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }

        // Swiper
        var s = this;

        // Params
        s.params = params;
        s.originalParams = originalParams;

        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined') {
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            } else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;

        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [],
                point;
            for (point in s.params.breakpoints) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;
                for (var param in breakPointsParams) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if (needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }

        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }

        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);

        s.classNames.push(s.params.containerModifierClass + s.params.direction);

        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            } else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }

        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }

        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);

        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }

            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            } else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }

        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;

        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }

        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }

        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }

        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }

        // Add classes
        s.container.addClass(s.classNames.join(' '));

        // Translate
        s.translate = 0;

        // Progress
        s.progress = 0;

        // Velocity
        s.velocity = 0;

        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };

        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function (moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing' : 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;

        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady() {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
            } else {
                //image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src'), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset'), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };

        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                } else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    } else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        } else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            } else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    } else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return -s.snapGrid[0];
        };
        s.maxTranslate = function () {
            return -s.snapGrid[s.snapGrid.length - 1];
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;

            // Find slides currently in view
            if (s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if (index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }

            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }

            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            } else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            } else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }

            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);

            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };

        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];

            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }

            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({ marginLeft: '', marginTop: '' });else s.slides.css({ marginRight: '', marginBottom: '' });

            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                } else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }

            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide.css({
                            '-webkit-box-ordinal-group': newSlideOrderIndex,
                            '-moz-box-ordinal-group': newSlideOrderIndex,
                            '-ms-flex-order': newSlideOrderIndex,
                            '-webkit-order': newSlideOrderIndex,
                            'order': newSlideOrderIndex
                        });
                    } else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide.css('margin-' + (s.isHorizontal() ? 'top' : 'left'), row !== 0 && s.params.spaceBetween && s.params.spaceBetween + 'px').attr('data-swiper-column', column).attr('data-swiper-row', row);
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                } else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);

                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    } else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);

                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                } else {
                    if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }

                s.virtualSize += slideSize + spaceBetween;

                prevSlideSize = slideSize;

                index++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;

            if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
            }

            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({ width: s.virtualSize + s.params.spaceBetween + 'px' });else s.wrapper.css({ height: s.virtualSize + s.params.spaceBetween + 'px' });
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }

            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];

            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({ marginLeft: spaceBetween + 'px' });else s.slides.css({ marginRight: spaceBetween + 'px' });
                } else s.slides.css({ marginBottom: spaceBetween + 'px' });
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };

        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1,
                i,
                j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            } else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();

            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;

            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            } else {
                s.progress = (translate - s.minTranslate()) / translatesDiff;
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);

            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                } else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if (s.params.normalizeSlideIndex) {
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
            // if (- translate >= s.slidesGrid[i]) {
            // newActiveIndex = i;
            // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;

            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function () {
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };

        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                } else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }

            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                } else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    } else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    } else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }

            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    } else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    } else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };

        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        } else {
                            paginationHTML += '<' + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationCurrentClass + '"></span>' + ' / ' + '<span class="' + s.params.paginationTotalClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    } else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                } else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    } else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            } else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };

        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }

            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;

            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();

                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            } else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                } else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
            if (s.params.onAfterResize) s.params.onAfterResize(s);
        };

        /*=========================
          Events
          ===========================*/

        //Define Touch Events
        s.touchEventsDesktop = { start: 'mousedown', move: 'mousemove', end: 'mouseup' };
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = { start: 'pointerdown', move: 'pointermove', end: 'pointerup' };else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = { start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp' };
        s.touchEvents = {
            start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : s.touchEventsDesktop.start,
            move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end: s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };

        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }

        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;

            var moveCapture = s.params.nested ? true : false;

            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            } else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android || params.simulateTouch && !s.support.touch && s.device.ios) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);

            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }

            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };

        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };

        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                } else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }

            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            } else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if (slideToIndex < s.loopedSlides - slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + slidesPerView / 2) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        } else {
                            s.slideTo(slideToIndex);
                        }
                    } else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        } else {
                            s.slideTo(slideToIndex);
                        }
                    }
                } else {
                    s.slideTo(slideToIndex);
                }
            }
        };

        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,

        // Form elements to match
        formElements = 'input, select, textarea, button, video',

        // Last click time
        lastClickTime = Date.now(),
            clickTimeout,

        //Velocities
        velocities = [],
            allowMomentumBounce;

        // Animating Flag
        s.animating = false;

        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };

        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }

            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }

            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };

        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate() || s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate()) {
                        return;
                    }
                } else {
                    if (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate() || s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate()) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;

            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                } else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle;
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling) {
                isTouched = false;
                return;
            }
            if (!startMoving) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }

            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    } else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;

            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;

            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;

            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;

            var disableParentSwiper = true;
            if (diff > 0 && currentTranslate > s.minTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }

            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }

            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }

            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                } else {
                    currentTranslate = startTranslate;
                    return;
                }
            }

            if (!s.params.followFinger) return;

            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: new window.Date().getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }

            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;

            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && touchEndTime - lastClickTime > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
                }
                if (timeDiff < 300 && touchEndTime - lastClickTime < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }

            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);

            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;

            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            } else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                } else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    } else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }

                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(),
                            velocityEvent = velocities.pop();

                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || new window.Date().getTime() - lastMoveEvent.time > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;

                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;

                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = -newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.maxTranslate();
                        }
                    } else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.minTranslate();
                        }
                    } else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = -newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        } else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    } else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }

                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);

                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
                    } else {
                        s.updateProgress(newPosition);
                    }

                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }

            // Find current slide
            var i,
                stopIndex = 0,
                groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                } else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }

            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;

            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > 1 - s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);else s.slideTo(stopIndex);
                }
            } else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;

            var translate = -s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                } else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);

            // Normalize slideIndex
            if (s.params.normalizeSlideIndex) {
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }

            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex) return false;
            }

            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if (s.rtl && -translate === s.translate || !s.rtl && translate === s.translate) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);

            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            } else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
            }

            return true;
        };

        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    } else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    } else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };

        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };

        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0,
                y = 0,
                z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            } else {
                y = translate;
            }

            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }

            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }

            s.translate = s.isHorizontal() ? x : y;

            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            } else {
                progress = (translate - s.minTranslate()) / translatesDiff;
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }

            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };

        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;

            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }

            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }

            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function (a) {
                        return a.replace(',', '.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
                    //Normal Browsers
                    else curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
                    //Normal Browsers
                    else curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };

        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });

            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });

            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }

            // Observe container
            initObserver(s.container[0], { childList: false });

            // Observe wrapper
            initObserver(s.wrapper[0], { attributes: false });
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();

            var slides = s.wrapper.children('.' + s.params.slideClass);

            if (s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;

            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }

            var prependSlides = [],
                appendSlides = [],
                i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if (s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2 || s.activeIndex > s.slides.length - s.params.slidesPerView * 2) {
                    newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            } else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if ((typeof slides === 'undefined' ? 'undefined' : _typeof(slides)) === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            } else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if ((typeof slidesIndexes === 'undefined' ? 'undefined' : _typeof(slidesIndexes)) === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            } else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }

            if (s.params.loop) {
                s.createLoop();
            }

            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            } else {
                s.slideTo(newActiveIndex, 0, false);
            }
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function setTranslate() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide.css({
                            opacity: slideOpacity
                        }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function setTranslate() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        } else if (s.rtl) {
                            rotateY = -rotateY;
                        }

                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;

                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }

                        slide.transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function setTranslate() {
                    var wrapperRotate = 0,
                        cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({ height: s.width + 'px' });
                        } else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0,
                            ty = 0,
                            tz = 0;
                        if (i % 4 === 0) {
                            tx = -round * 4 * s.size;
                            tz = 0;
                        } else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = -round * 4 * s.size;
                        } else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        } else if ((i - 3) % 4 === 0) {
                            tx = -s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }

                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }

                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        '-moz-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        '-ms-transform-origin': '50% 50% -' + s.size / 2 + 'px',
                        'transform-origin': '50% 50% -' + s.size / 2 + 'px'
                    });

                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + -s.width / 2 + 'px) rotateX(90deg) rotateZ(0deg) scale(' + s.params.cube.shadowScale + ')');
                        } else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + -s.height / 2 / scale2 + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = s.isSafari || s.isUiWebView ? -s.size / 2 : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function setTranslate() {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;

                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);

                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * offsetMultiplier;
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * offsetMultiplier : 0;

                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;

                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                        }
                    }

                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function setTransition(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function loadImageInSlide(index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;

                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;

                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], src || background, srcset, sizes, false, function () {
                        if (typeof s === 'undefined' || s === null || !s) return;
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        } else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
                        }

                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            } else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });

                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
            },
            load: function load() {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                } else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());

                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function onTransitionStart() {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function onTransitionEnd() {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function setDragPosition(e) {
                var sb = s.scrollbar;
                var x = 0,
                    y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ? e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX : e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
                var position = pointerPosition - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                } else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function dragStart(e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();

                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);

                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function dragMove(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function dragEnd(e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: function () {
                if (s.params.simulateTouch === false && !s.support.touch) return s.touchEventsDesktop;else return s.touchEvents;
            }(),
            enableDraggable: function enableDraggable() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function disableDraggable() {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
            },
            set: function set() {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;

                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;

                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                } else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }

                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                } else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function setTranslate() {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;

                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    } else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                } else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    } else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + newPos + 'px, 0, 0)');
                    } else {
                        sb.drag.transform('translateX(' + newPos + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                } else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + newPos + 'px, 0)');
                    } else {
                        sb.drag.transform('translateY(' + newPos + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function setTransition(duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function LinearSpline(x, y) {
                var binarySearch = function () {
                    var maxIndex, minIndex, guess;
                    return function (array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1) {
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        }return maxIndex;
                    };
                }();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;

                this.interpolate = function (x2) {
                    if (!x2) return 0;

                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;

                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function getInterpolateFunction(c) {
                if (!s.controller.spline) s.controller.spline = s.params.loop ? new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) : new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function setTranslate(translate, byController) {
                var controlled = s.params.control;
                var multiplier, controlledTranslate;
                function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }

                    if (!controlledTranslate || s.params.controlBy === 'container') {
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }

                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
                }
                if (Array.isArray(controlled)) {
                    for (var i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTranslate(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {

                    setControlledTranslate(controlled);
                }
            },
            setTransition: function setTransition(duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function () {
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
                        });
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function onHashCange(e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + newHash + '"]').index());
                }
            },
            attachEvents: function attachEvents(detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function setHash() {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, '#' + s.slides.eq(s.activeIndex).attr('data-hash') || '');
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function init() {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function destroy() {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function init() {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function setHistoryPopState() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function getPathValues() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function setHistory(key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function slugify(text) {
                return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
            },
            scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + s.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + s.height], [swiperOffset.left + s.width, swiperOffset.top + s.height]];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
                        inView = true;
                    }
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                }
                if (kc === 39 && !s.rtl || kc === 37 && s.rtl) s.slideNext();
                if (kc === 37 && !s.rtl || kc === 39 && s.rtl) s.slidePrev();
            } else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
            s.emit('onKeyPress', s, kc);
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: new window.Date().getTime()
        };
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;

            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }

            if (!isSupported && document.implementation && document.implementation.hasFeature &&
            // always returns true in newer browsers as per the standard.
            // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
            document.implementation.hasFeature('', '') !== true) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }

            return isSupported;
        }
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/event) /*object*/{
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;

            var sX = 0,
                sY = 0,
                // spinX, spinY
            pX = 0,
                pY = 0; // pixelX, pixelY

            // Legacy
            if ('detail' in event) {
                sY = event.detail;
            }
            if ('wheelDelta' in event) {
                sY = -event.wheelDelta / 120;
            }
            if ('wheelDeltaY' in event) {
                sY = -event.wheelDeltaY / 120;
            }
            if ('wheelDeltaX' in event) {
                sX = -event.wheelDeltaX / 120;
            }

            // side scrolling on FF with DOMMouseScroll
            if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }

            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;

            if ('deltaY' in event) {
                pY = event.deltaY;
            }
            if ('deltaX' in event) {
                pX = event.deltaX;
            }

            if ((pX || pY) && event.deltaMode) {
                if (event.deltaMode === 1) {
                    // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {
                    // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }

            // Fall-back if spin cannot be determined
            if (pX && !sX) {
                sX = pX < 1 ? -1 : 1;
            }
            if (pY && !sY) {
                sY = pY < 1 ? -1 : 1;
            }

            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = navigator.userAgent.indexOf('firefox') > -1 ? 'DOMMouseScroll' : isEventSupported() ? 'wheel' : 'mousewheel';
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;

            var data = normalizeWheel(e);

            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;else return;
                } else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;else return;
                }
            } else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            }

            if (delta === 0) return;

            if (s.params.mousewheelInvert) delta = -delta;

            if (!s.params.freeMode) {
                if (new window.Date().getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        } else if (s.params.mousewheelReleaseOnEdges) return true;
                    } else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        } else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = new window.Date().getTime();
            } else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;

                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();

                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();

                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }

                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                } else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);

                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();

                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }

            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = false;
            return true;
        };

        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;

            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            } else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                } else {
                    pY = p;
                    pX = '0';
                }
            }

            if (pX.indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            } else {
                pX = pX * progress * rtlFactor + 'px';
            }
            if (pY.indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            } else {
                pY = pY * progress + 'px';
            }

            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function setTranslate() {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                    setParallaxTransform(this, s.progress);
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function setTransition(duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function onGestureStart(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function onGestureChange(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                } else {
                    z.scale = z.gesture.scaleMove / z.gesture.scaleStart * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow(z.scale - z.gesture.zoomMax + 1, 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale = s.params.zoomMin + 1 - Math.pow(s.params.zoomMin - z.scale + 1, 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function onGestureEnd(e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function onTouchStart(s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function onTouchMove(e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;

                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;

                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;

                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
                z.image.maxY = -z.image.minY;

                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() && Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x || Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x) {
                        z.image.isTouched = false;
                        return;
                    } else if (!s.isHorizontal() && Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y || Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();

                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;

                if (z.image.currentX < z.image.minX) {
                    z.image.currentX = z.image.minX + 1 - Math.pow(z.image.minX - z.image.currentX + 1, 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow(z.image.currentX - z.image.maxX + 1, 0.8);
                }

                if (z.image.currentY < z.image.minY) {
                    z.image.currentY = z.image.minY + 1 - Math.pow(z.image.minY - z.image.currentY + 1, 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow(z.image.currentY - z.image.maxY + 1, 0.8);
                }

                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();

                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function onTouchEnd(s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;

                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;

                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min(z.gesture.slideWidth / 2 - scaledWidth / 2, 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min(z.gesture.slideHeight / 2 - scaledHeight / 2, 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);

                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function onTransitionEnd(s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function toggleZoom(s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;

                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;

                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                } else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }

                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                } else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth / 2 - touchX;
                        diffY = offsetY + slideHeight / 2 - touchY;

                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;

                        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
                        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;

                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;

                        if (translateX < translateMinX) {
                            translateX = translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }

                        if (translateY < translateMinY) {
                            translateY = translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    } else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function attachEvents(detach) {
                var action = detach ? 'off' : 'on';

                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? { passive: true, capture: false } : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    } else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }

                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide) {
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);

                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function init() {
                s.zoom.attachEvents();
            },
            destroy: function destroy() {
                s.zoom.attachEvents(true);
            }
        };

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName(eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                } else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {};
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function _handler() {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function makeFocusable($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function addRole($el, role) {
                $el.attr('role', role);
                return $el;
            },

            addLabel: function addLabel($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },

            disable: function disable($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },

            enable: function enable($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },

            onEnterKey: function onEnterKey(event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    } else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                } else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    } else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },

            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),

            notify: function notify(message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function init() {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }

                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function initPagination() {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function destroy() {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            } else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };

        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');

            // Wrapper
            s.wrapper.removeAttr('style');

            // Slides
            if (s.slides && s.slides.length) {
                s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
            }

            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }

            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);

            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };

        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();

            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };

        s.init();

        // Return swiper instance
        return s;
    };

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function isArray(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function () {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            }()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        }(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch: window.Modernizr && Modernizr.touch === true || function () {
                return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(),

            transforms3d: window.Modernizr && Modernizr.csstransforms3d === true || function () {
                var div = document.createElement('div').style;
                return 'webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div;
            }(),

            flexbox: function () {
                var div = document.createElement('div').style;
                var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            }(),

            observer: function () {
                return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
            }(),

            passiveListener: function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            }(),

            gestures: function () {
                return 'ongesturestart' in window;
            }()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = function () {
        var Dom7 = function Dom7(arr) {
            var _this = this,
                i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function $(selector, context) {
            var arr = [],
                i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els,
                        tempParent,
                        html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    } else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        } else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                        arr.push(selector);
                    }
                    //Array of elements or instance of Dom
                    else if (selector.length > 0 && selector[0].nodeType) {
                            for (i = 0; i < selector.length; i++) {
                                arr.push(selector[i]);
                            }
                        }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function addClass(className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function removeClass(className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function hasClass(className) {
                if (!this[0]) return false;else return this[0].classList.contains(className);
            },
            toggleClass: function toggleClass(className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function attr(attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);else return undefined;
                } else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        } else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function removeAttr(attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function data(key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;else if (this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage) return this[0].dom7ElementDataStorage[key];else return undefined;
                    } else return undefined;
                } else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform: function transform(_transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = _transform;
                }
                return this;
            },
            transition: function transition(duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function on(eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    } else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({ listener: listener, liveListener: handleLiveEvent });
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }

                return this;
            },
            off: function off(eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        } else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function once(eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function trigger(eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, { detail: eventData, bubbles: true, cancelable: true });
                    } catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function transitionEnd(callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i,
                    j,
                    dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function width() {
                if (this[0] === window) {
                    return window.innerWidth;
                } else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    } else {
                        return null;
                    }
                }
            },
            outerWidth: function outerWidth(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
                } else return null;
            },
            height: function height() {
                if (this[0] === window) {
                    return window.innerHeight;
                } else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    } else {
                        return null;
                    }
                }
            },
            outerHeight: function outerHeight(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));else return this[0].offsetHeight;
                } else return null;
            },
            offset: function offset() {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop = el.clientTop || body.clientTop || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top + scrollTop - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                } else {
                    return null;
                }
            },
            css: function css(props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    } else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },

            //Dom manipulation
            each: function each(callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function html(_html) {
                if (typeof _html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = _html;
                    }
                    return this;
                }
            },
            text: function text(_text) {
                if (typeof _text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    } else return null;
                } else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = _text;
                    }
                    return this;
                }
            },
            is: function is(selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;

                    if (el.matches) return el.matches(selector);else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);else if (el.msMatchesSelector) return el.msMatchesSelector(selector);else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                } else if (selector === document) return this[0] === document;else if (selector === window) return this[0] === window;else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
            },
            index: function index() {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                } else return undefined;
            },
            eq: function eq(index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function append(newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    } else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    } else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function prepend(newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    } else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    } else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function insertBefore(selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    } else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function insertAfter(selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    } else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function next(selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
                    } else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);
                    }
                } else return new Dom7([]);
            },
            nextAll: function nextAll(selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if ($(next).is(selector)) nextEls.push(next);
                    } else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function prev(selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
                    } else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);
                    }
                } else return new Dom7([]);
            },
            prevAll: function prevAll(selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if ($(prev).is(selector)) prevEls.push(prev);
                    } else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function parent(selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    } else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function parents(selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        } else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find: function find(selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function children(selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;

                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        } else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function remove() {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function add() {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };

        return $;
    }();

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
            addLibraryPlugin(window[swiperDomPlugins[i]]);
        }
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
        domLib = window.Dom7 || window.Zepto || window.jQuery;
    } else {
        domLib = Dom7;
    }

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }

    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i,
                    j,
                    dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));else return this[0].offsetWidth;
                } else return null;
            };
        }
    }

    window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (true) {
    module.exports = window.Swiper;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';

        return window.Swiper;
    });
}

//# sourceMappingURL=maps/swiper.js.map

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(31)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Vue-awesome-swiper
 * @author Surmon.me
 */

var Swiper = __webpack_require__(28);
var SwiperComponent = __webpack_require__(55);
var SlideComponent = __webpack_require__(54);
SwiperComponent = SwiperComponent.default || SwiperComponent;
SlideComponent = SlideComponent.default || SlideComponent;
if (typeof window !== 'undefined') {
  window.Swiper = Swiper;
}

var swiper = {
  swiperSlide: SlideComponent,
  swiper: SwiperComponent,
  swiperPlugins: Swiper.prototype.plugins,
  install: function install(Vue) {
    Vue.component(SwiperComponent.name, SwiperComponent);
    Vue.component(SlideComponent.name, SlideComponent);
  }
};

module.exports = swiper;

/***/ }),
/* 34 */
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
    props: {
        option: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    }
};

/***/ }),
/* 35 */
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
    props: ["msg"]
};

/***/ }),
/* 36 */
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

exports.default = {
  name: 'swiper-slide',
  data: function data() {
    return {
      slideClass: 'swiper-slide'
    };
  },
  ready: function ready() {
    this.update();
  },
  mounted: function mounted() {
    this.update();
    if (this.$parent.options.slideClass) {
      this.slideClass = this.$parent.options.slideClass;
    }
  },
  updated: function updated() {
    this.update();
  },
  attached: function attached() {
    this.update();
  },

  methods: {
    update: function update() {
      if (this.$parent && this.$parent.swiper && this.$parent.swiper.update) {
        this.$parent.swiper.update(true);
        if (this.$parent.options.loop) {
          this.$parent.swiper.reLoop();
        }
      }
    }
  }
};

/***/ }),
/* 37 */
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

var browser = typeof window !== 'undefined';
if (browser) {
  window.Swiper = __webpack_require__(28);
  __webpack_require__(51);
}
exports.default = {
  name: 'swiper',
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {
          autoplay: 3500
        };
      }
    }
  },
  data: function data() {
    return {
      defaultSwiperClasses: {
        wrapperClass: 'swiper-wrapper'
      }
    };
  },
  ready: function ready() {
    if (!this.swiper && browser) {
      this.swiper = new Swiper(this.$el, this.options);
    }
  },
  mounted: function mounted() {
    var self = this;
    var mount = function mount() {
      if (!self.swiper && browser) {
        delete self.options.notNextTick;
        var setClassName = false;
        for (var className in self.defaultSwiperClasses) {
          if (self.defaultSwiperClasses.hasOwnProperty(className)) {
            if (self.options[className]) {
              setClassName = true;
              self.defaultSwiperClasses[className] = self.options[className];
            }
          }
        }
        var mountInstance = function mountInstance() {
          self.swiper = new Swiper(self.$el, self.options);
        };
        setClassName ? self.$nextTick(mountInstance) : mountInstance();
      }
    };
    this.options.notNextTick ? mount() : this.$nextTick(mount);
  },
  updated: function updated() {
    if (this.swiper) {
      this.swiper.update();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  }
};

/***/ }),
/* 38 */
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

exports.default = {
    props: {
        option: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        fire: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    data: function data() {
        return {
            myOption: {
                alert: false,
                wait: false,
                buts: []
            }
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
            _this.myOption = Object.assign(_this.myOption, _this.option);
        });
    },

    methods: {
        butClick: function butClick(key, item) {
            this.$emit("click", { key: key, item: item });
        },
        closeDialog: function closeDialog() {
            this.$emit("close");
        }
    }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bus = __webpack_require__(7);

exports.default = {
    props: {
        opacity: {
            type: Number,
            default: 0.4
        },
        color: {
            type: String,
            default: '#000'
        }
    },
    data: function data() {
        return {
            show: false,
            zIndex: (0, _bus.getZIndex)(),
            fire: {
                overlayClick: (0, _bus.getUniqueId)()
            }
        };
    },

    computed: {
        style: function style() {
            return {
                'opacity': this.opacity,
                'background-color': this.color,
                'z-index': this.zIndex
            };
        }
    },
    methods: {
        get: function get(key) {
            return this.fire[key];
        },
        afterLeave: function afterLeave() {
            document.body.removeChild(this.$el);
            this.$destroy();
        },
        setStyle: function setStyle(option) {
            this.color = option.color;
            this.opacity = option.opacity;
            this.zIndex = option.zIndex;
        },
        handlerClick: function handlerClick() {
            (0, _bus.fire)(this.get("overlayClick"), { type: "overlay" });
        }
    }
}; //
//
//
//
//

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _overlay = __webpack_require__(45);

var _overlay2 = _interopRequireDefault(_overlay);

var _bus = __webpack_require__(7);

var _getSize = __webpack_require__(46);

var _getSize2 = _interopRequireDefault(_getSize);

var _closest = __webpack_require__(25);

var _closest2 = _interopRequireDefault(_closest);

var _delay = __webpack_require__(27);

var _delay2 = _interopRequireDefault(_delay);

var _stopScroll = __webpack_require__(43);

var _stopScroll2 = _interopRequireDefault(_stopScroll);

var _dataType = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: {
        fixed: {
            type: Boolean,
            default: false
        },
        top: {
            type: String,
            default: "40%"
        },
        left: {
            type: String,
            default: "20%"
        },
        right: {
            type: String,
            default: "auto"
        },
        bottom: {
            type: String,
            default: "auto"
        },
        progressBar: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        overlay: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        escHide: {
            type: Boolean,
            default: false
        },
        autoHide: {
            type: Boolean,
            default: false
        },
        showCenter: { // 显示的时候保持居中
            type: Boolean,
            default: false
        },
        animate: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.showPromise = new Promise(function (resolve) {
            _this.$nextTick(function () {
                _this.myOverlay = Object.assign(_this.myOverlay, _this.overlay, { overlayClick: _this.get("overlayClick") });
                _this.myProgressBar = Object.assign(_this.myProgressBar, _this.progressBar);
                _this.myAnimate = Object.assign(_this.myAnimate, _this.animate);
                resolve();
            });
        });
        this.delay = (0, _delay2.default)();
        this.stopScroll = (0, _stopScroll2.default)(document.body, this.filter);
    },
    data: function data() {
        return {
            zIndex: (0, _bus.getZIndex)(),
            isShow: false,
            status: false,
            showFinish: null,
            control: '',
            delay: null,
            stopScroll: null,
            showPromise: null,
            hidePromise: null,
            animateShowResolve: null,
            animateHideResolve: null,
            animateStop: false,
            myAnimate: {
                name: "scale",
                beforeEnter: function beforeEnter() {},
                enter: function enter() {},
                leave: function leave() {},
                custom: false
            },
            myOverlay: {
                show: true,
                color: '',
                opacity: ''
            },
            myProgressBar: {
                show: false,
                color: '#6AEE00',
                opacity: 1,
                showTime: 0 //默认显示时间0秒,不自动关闭
            },
            fire: {},
            child: [],
            nodeList: []
        };
    },

    computed: {
        setStyle: function setStyle() {
            return {
                'position': this.fixed ? 'fixed' : '',
                'left': this.left ? this.left : null,
                'top': this.top ? this.top : null,
                'right': this.right ? this.right : null,
                'bottom': this.bottom ? this.bottom : null,
                'z-index': this.zIndex
            };
        },
        setTime: function setTime() {
            return {
                'transition': 'all ' + this.myProgressBar.showTime + 's linear',
                'background': this.myProgressBar.color
            };
        }
    },
    methods: {
        addUnit: function addUnit(value) {
            return (/\d$/.test(value) ? value + "px" : value
            );
        },
        filter: function filter(node) {
            return node.classList.contains("m-popup") || node.classList.contains("m-overlay") || "style,script".includes(node.nodeName.toLowerCase());
        },
        bindEvent: function bindEvent() {
            var _this2 = this;

            this.delay.append(function (self) {
                self.autoHide && window.addEventListener('click', self.autoClickHide);
                self.escHide && window.addEventListener("keyup", self.escPress);
                _this2.stopScroll.start();
            }, 10, this);
        },
        unbindEvent: function unbindEvent() {
            this.autoHide && window.removeEventListener('click', this.autoClickHide);
            this.escHide && window.removeEventListener("keyup", this.escPress);
            this.stopScroll.end();
        },
        autoClickHide: function autoClickHide(evt) {
            if (_overlay2.default.isTop(this.zIndex)) {
                return;
            }
            var node = (0, _closest2.default)(evt.target, ".m-popup");
            if (node === this.$el) return;
            this.hide(null, "auto");
        },
        escPress: function escPress(ev) {
            if (ev.keyCode === 27) {
                // ESC
                this.hide(null, "esc");
            }
        },
        afterEnter: function afterEnter() {
            this.animateShowResolve();
        },
        afterLeave: function afterLeave() {
            this.animateHideResolve();
        },
        useProgress: function useProgress() {
            if (this.myProgressBar.showTime > 0) {
                if (this.myProgressBar.show) {
                    this.delay.append(function (self) {
                        self.control = "progress-leave";
                    }, 30, this);
                }
                this.delay.append(function (self, state) {
                    self.hide(null, state);
                }, this.myProgressBar.showTime * 1000, this, "time");
            }
        },
        initProgress: function initProgress() {
            this.myProgressBar.show && (this.control = "");
        },
        get: function get(key) {
            if (this.fire[key]) {
                return this.fire[key];
            } else {
                this.fire[key] = (0, _bus.getUniqueId)();
            }
            return this.fire[key];
        },
        pushMessage: function pushMessage(fn) {
            (0, _dataType.isFunction)(fn) && this.child.push(fn);
        },
        postMessage: function postMessage(option) {
            //通讯模块
            this.child.forEach(function (fn) {
                return fn(option);
            });
        },
        setTop: function setTop() {
            this.zIndex = (0, _bus.getZIndex)();
        },
        setMiddle: function setMiddle(left, top) {
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            var size = (0, _getSize2.default)(this.$el);
            var format = function format(total, value) {
                if (/^\d+$/.test(parseInt(value))) {
                    if (/%$/.test(value)) {
                        return total * parseInt(value) / 100;
                    } else {
                        return parseInt(value);
                    }
                }
                return value;
            };
            var x = (0, _dataType.isNumber)(left) || (0, _dataType.isString)(left) ? format(screenWidth, left) : (screenWidth - size.width) / 2;
            var y = (0, _dataType.isNumber)(top) || (0, _dataType.isString)(top) ? format(screenHeight, top) : (screenHeight - size.height) / 2;
            this.setPosition(x, y);
        },
        setPosition: function setPosition(left, top, right, bottom) {
            !(0, _dataType.isUndefined)(left) && (this.left = this.addUnit(left));
            !(0, _dataType.isUndefined)(top) && (this.top = this.addUnit(top));
            !(0, _dataType.isUndefined)(right) && (this.right = this.addUnit(right));
            !(0, _dataType.isUndefined)(bottom) && (this.bottom = this.addUnit(bottom));
        },
        setLayout: function setLayout(left, top, right, bottom) {
            this.showCenter && this.setMiddle(left, top);
            !this.showCenter && this.setPosition(left, top, right, bottom);
        },
        getStatus: function getStatus() {
            return this.status;
        },
        destroy: function destroy() {
            (0, _bus.fire)(this.get("destroy"), { type: "destroy" });
            this.$destroy();
        },
        show: function show(left, top, right, bottom, callback) {
            var _this3 = this;

            if (this.getStatus()) {
                this.setLayout(left, top, right, bottom);
                return;
            }
            this.status = true;
            this.showPromise.then(function () {
                document.body.appendChild(_this3.$el);
                _this3.delay.append(function (self) {
                    self.setLayout(left, top, right, bottom);
                }, 10, _this3).append(function (self) {
                    self.isShow = true;
                    self.bindEvent();
                    if (self.myOverlay.show) {
                        _overlay2.default.open(self.myOverlay);
                        self.setTop();
                    }
                    self.useProgress();
                }, 30, _this3);
            });

            new Promise(function (resolve) {
                _this3.animateShowResolve = resolve;
            }).then(function () {
                (0, _bus.fire)(_this3.get("show"), { type: "show" });
                (0, _dataType.isFunction)(callback) && callback();
                _this3.animateShowResolve = null;
                if ((0, _dataType.isObject)(_this3.showFinish)) {
                    var _callback = _this3.showFinish.callback;
                    var state = _this3.showFinish.state;
                    _this3.showFinish = true;
                    _this3.hide(_callback, state);
                } else _this3.showFinish = true;
            });

            this.hidePromise = new Promise(function (resolve) {
                _this3.animateHideResolve = resolve;
            });
        },
        hide: function hide(callback, state) {
            var _this4 = this;

            if (this.getStatus() && !this.showFinish) {
                this.showFinish = { callback: callback, state: state };
            }
            if (!this.isShow || (0, _dataType.isObject)(this.showFinish)) return;
            this.isShow = false;
            this.delay.cancel();
            this.unbindEvent();
            this.hidePromise.then(function () {
                (0, _bus.fire)(_this4.get("hide"), { type: "hide", state: state || "close" });
                (0, _dataType.isFunction)(callback) && callback();
                _this4.initProgress();
                document.body.removeChild(_this4.$el);
                _this4.status = _this4.isShow;
                _this4.myOverlay.show && _overlay2.default.close(_this4.myOverlay);
                _this4.animateHideResolve = null;
                _this4.showFinish = null;
            });
        }
    }
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
//
//
//
//

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*******
 * props默认值
 */

var array = exports.array = {
    type: Array,
    default: function _default() {
        return [];
    }
};

var object = exports.object = {
    type: Object,
    default: function _default() {
        return [];
    }
};

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (node, filter) {
    node = (0, _dataType.isNode)(node) ? node : document.body;
    filter = (0, _dataType.isFunction)(filter) ? filter : function () {};
    var nodeList = [];

    function _init() {
        if (nodeList.length > 0) return;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = node.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var n = _step.value;

                if ((0, _dataType.isElement)(n) && !filter(n)) {
                    nodeList.push({ node: n, position: "static", top: 0, scrollTop: 0 });
                    // const scrolling = n.querySelectorAll(".scrolling");
                    // for(let s of scrolling){
                    //     nodeList.push({node: s, position: "static", top: 0, scrollTop: 0});
                    // }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        nodeList.forEach(function (item) {
            item.position = (0, _getStyle2.default)(item.node, "position");
            item.top = (0, _getStyle2.default)(item.node, "top");
            item.position_bool = !!item.node.style.position;
            item.top_bool = !!item.node.style.top;
            item.scrollTop = (0, _getScrollNode2.default)(item.node, document.body).scrollTop;
            item.node.style.top = -item.scrollTop + "px";
            item.node.style.position = "fixed";
        });
        // fire("plugin.stop:scroll", true);
    }

    function _clear() {
        if (nodeList.length === 0) return;
        nodeList.forEach(function (item) {
            if (item.top_bool) {
                item.node.style.top = item.top;
            } else {
                item.node.style.removeProperty("top");
            }
            if (item.position_bool) {
                item.node.style.position = item.position;
            } else {
                item.node.style.removeProperty("position");
            }
            (0, _getScrollNode2.default)(item.node, document.body).scrollTop = item.scrollTop;
        });
        nodeList = [];
        // fire("plugin.stop:scroll", false);
    }

    return {
        start: _init,
        end: _clear
    };
};

var _getStyle = __webpack_require__(29);

var _getStyle2 = _interopRequireDefault(_getStyle);

var _dataType = __webpack_require__(13);

var _getScrollNode = __webpack_require__(42);

var _getScrollNode2 = _interopRequireDefault(_getScrollNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popup = __webpack_require__(26);

var _popup2 = _interopRequireDefault(_popup);

var _dialog = __webpack_require__(56);

var _dialog2 = _interopRequireDefault(_dialog);

var _bus = __webpack_require__(7);

var _dataType = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**********
 * 弹框
 * 璩小孩 20170802
 */
var DialogManager = function DialogManager(myContent) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var m_dialog = (0, _popup2.default)("<my-dialog @close='hideDialog' @click='butClick' :option='option'><my-content ref='content' @close='hideDialog' :option='option'></my-content></my-dialog>", {
        option: {
            showCenter: true,
            autoHide: false,
            overlay: {
                opacity: option.opacity
            },
            animate: {
                name: option.animate
            }
        },
        popup: {
            data: function data() {
                return { option: option };
            },

            components: {
                myDialog: _dialog2.default,
                myContent: myContent
            },
            methods: {
                butClick: function butClick(opt) {
                    (0, _bus.fire)(m_dialog.get(opt.key), opt.item);
                },
                hideDialog: function hideDialog() {
                    m_dialog.hide(m_dialog.destroy);
                }
            }
        }
    });

    var child = m_dialog.popup.$refs.content;
    (0, _dataType.isFunction)(child.dialogShow) && _bus.bus.$once(m_dialog.get("show"), child.dialogShow);
    (0, _dataType.isFunction)(child.dialogHide) && _bus.bus.$once(m_dialog.get("hide"), child.dialogHide);

    return m_dialog;
};

exports.default = DialogManager;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _overlay = __webpack_require__(57);

var _overlay2 = _interopRequireDefault(_overlay);

var _bus = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Overlay = _vue2.default.extend(_overlay2.default); /************
                                                        * 遮罩层
                                                        * 璩小孩 20170801
                                                        */


var OverlayManager = {
    preventDefault: function preventDefault(e) {
        e.preventDefault();
    },

    options: [],
    overlay: false,
    open: function open(option) {
        if (!option || this.options.indexOf(option) !== -1) return;
        if (this.options.length === 0) {
            this.showOverlay();
        }
        option.zIndex = (0, _bus.getZIndex)();
        this.options.push(option);
        this.changeOverlayStyle();
    },
    close: function close(option) {
        var _this = this;

        var index = this.options.indexOf(option);
        if (index === -1) return;
        _vue2.default.nextTick(function () {
            _this.options.splice(index, 1);
            if (_this.options.length === 0) {
                _this.closeOverlay();
            }
            _this.changeOverlayStyle();
        });
    },
    showOverlay: function showOverlay() {
        this.overlay = new Overlay().$mount(document.createElement("DIV"));
        (0, _bus.bind)(this.overlay.get("overlayClick"), this.handlerOverlayClick.bind(this));
        document.body.appendChild(this.overlay.$el);
        this.overlay.show = true;
        this.overlay.$el.addEventListener("touchmove", this.preventDefault);
    },
    closeOverlay: function closeOverlay(touchMove) {
        if (!this.overlay) return;
        this.overlay.$el.removeEventListener("touchmove", this.preventDefault);
        this.overlay.show = false;
        this.overlay = null;
    },
    changeOverlayStyle: function changeOverlayStyle() {
        if (!this.overlay || this.options.length === 0) return;
        var option = this.options[this.options.length - 1];
        this.overlay.setStyle(option);
    },
    isTop: function isTop(zIndex) {
        if (this.options.length === 0) {
            return false;
        }
        return this.overlay.zIndex > zIndex;
    },
    handlerOverlayClick: function handlerOverlayClick() {
        if (this.options.length === 0) return;
        var option = this.options[this.options.length - 1];
        (0, _bus.fire)(option.overlayClick, option);
    }
};

exports.default = OverlayManager;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (element) {
    var disType = 0,
        visType = 0;
    if (element.style.display === "none") {
        element.style.display = "block";
        disType = 1;
    } else if ((0, _getStyle2.default)(element, "display") === "none") {
        element.style.display = "block";
        disType = 2;
    }

    if ((0, _getStyle2.default)(element, "visibility") !== "hidden" && disType > 0) {
        element.style.visibility = "hidden";
        visType = 1;
    }

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (disType === 1) {
        element.style.display = "none";
    } else if (disType === 2) {
        element.style.removeProperty("display");
    }

    if (visType === 1) {
        element.style.removeProperty("visibility");
    }

    return { width: width, height: height };
};

var _getStyle = __webpack_require__(29);

var _getStyle2 = _interopRequireDefault(_getStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/********
 * 获取元素的宽高
 * @param element
 * @returns {{width: number, height: number}}
 * 璩小孩：20170803
 */
;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-overlay[data-v-1e1f718e] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #000;\n  opacity: .4;\n  z-index: 1000;\n}\n.fade-enter-active[data-v-1e1f718e],.fade-leave-active[data-v-1e1f718e]{\n  -webkit-transition: all .3s linear;\n  transition: all .3s linear;\n}\n.fade-enter[data-v-1e1f718e],.fade-leave-to[data-v-1e1f718e] {\n  opacity: 0 !important;\n}\n", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-dialog-toast[data-v-4bbbdfd3] {\n  padding: 15px 25px;\n  font-size: 0.37333rem;\n  color: #fff;\n  min-width: 120px;\n  background-color: rgba(0, 0, 0, 0.8);\n  border-radius: 5px;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-popup[data-v-66477006] {\n  position: fixed;\n  left: 0;\n  top: 0;\n}\n.slide-enter-active[data-v-66477006], .slide-leave-active[data-v-66477006],\n.slide-left-enter-active[data-v-66477006], .slide-left-leave-active[data-v-66477006],\n.slide-top-enter-active[data-v-66477006], .slide-top-leave-active[data-v-66477006],\n.slide-right-enter-active[data-v-66477006], .slide-right-leave-active[data-v-66477006],\n.slide-bottom-enter-active[data-v-66477006], .slide-bottom-leave-active[data-v-66477006],\n.fade-enter-active[data-v-66477006], .fade-leave-active[data-v-66477006],\n.scale-enter-active[data-v-66477006], .scale-leave-active[data-v-66477006] {\n  -webkit-transition: all .3s linear;\n  transition: all .3s linear;\n}\n.scale-enter[data-v-66477006], .scale-leave-to[data-v-66477006] {\n  -webkit-transform: scale(0.5) !important;\n          transform: scale(0.5) !important;\n  opacity: 0.5 !important;\n}\n.fade-enter[data-v-66477006], .fade-leave-to[data-v-66477006] {\n  opacity: 0 !important;\n}\n.slide-enter[data-v-66477006] {\n  -webkit-transform: translateY(-100%) !important;\n          transform: translateY(-100%) !important;\n  opacity: 0 !important;\n}\n.slide-leave-to[data-v-66477006] {\n  -webkit-transform: translateY(100%) !important;\n          transform: translateY(100%) !important;\n  opacity: 0 !important;\n}\n.slide-left-enter[data-v-66477006], .slide-left-leave-to[data-v-66477006] {\n  -webkit-transform: translateX(-200%) !important;\n          transform: translateX(-200%) !important;\n}\n.slide-top-enter[data-v-66477006], .slide-top-leave-to[data-v-66477006] {\n  -webkit-transform: translateY(-200%) !important;\n          transform: translateY(-200%) !important;\n}\n.slide-right-enter[data-v-66477006], .slide-right-leave-to[data-v-66477006] {\n  -webkit-transform: translateX(200%) !important;\n          transform: translateX(200%) !important;\n}\n.slide-bottom-enter[data-v-66477006], .slide-bottom-leave-to[data-v-66477006] {\n  -webkit-transform: translateY(200%) !important;\n          transform: translateY(200%) !important;\n}\n.progress-bar[data-v-66477006] {\n  width: 100%;\n  height: 2px;\n  z-index: 1000;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n.progress-bar .bar[data-v-66477006] {\n    width: 100%;\n    background: #000;\n    height: 2px;\n    -webkit-transform: translateZ(0);\n            transform: translateZ(0);\n}\n.progress-bar .bar.progress-leave[data-v-66477006] {\n      -webkit-transform: translate3d(-100%, 0, 0);\n              transform: translate3d(-100%, 0, 0);\n}\n", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-mobile-dialog .dialog-msg[data-v-e3aa9ba8] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.m-mobile-dialog[data-v-e3aa9ba8] {\n  border-radius: 5px;\n  box-sizing: border-box;\n  max-width: 7.46667rem;\n  /*box-shadow: 0 19px 60px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);*/\n}\n.m-mobile-dialog.mobile-wait[data-v-e3aa9ba8] {\n    background: none;\n    box-shadow: none;\n}\n.m-mobile-dialog .dialog-msg[data-v-e3aa9ba8] {\n    font-size: 0.34667rem;\n    height: 1.65333rem;\n    min-height: 1.65333rem;\n    max-height: 1.65333rem;\n    line-height: 1.65333rem;\n    padding: 0 1.06667rem;\n    text-align: center;\n    max-width: 100%;\n}\n.m-mobile-dialog .dialog-wait[data-v-e3aa9ba8] {\n    width: 2.66667rem;\n    height: 2.66667rem;\n    border-radius: 10px;\n}\n.m-mobile-dialog .dialog-wait .loading[data-v-e3aa9ba8] {\n      position: relative;\n      margin-bottom: 0.24rem;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8] {\n        display: block;\n        height: 0.26667rem;\n        width: 4px;\n        border-radius: 4px;\n        position: absolute;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(1) {\n        top: 0.33333rem;\n        left: 0;\n        -webkit-animation: waitLoading 1s ease 0s infinite;\n        animation: waitLoading 1s ease 0s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(2) {\n        top: 0.22667rem;\n        left: 0.22667rem;\n        -webkit-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n        -webkit-animation: waitLoading 1s ease -0.12s infinite;\n        animation: waitLoading 1s ease -0.12s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(3) {\n        top: 0;\n        left: 0.33333rem;\n        -webkit-transform: rotate(-90deg);\n        transform: rotate(-90deg);\n        -webkit-animation: waitLoading 1s ease -0.24s infinite;\n        animation: waitLoading 1s ease -0.24s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(4) {\n        top: -0.22667rem;\n        left: 0.22667rem;\n        -webkit-transform: rotate(45deg);\n        transform: rotate(45deg);\n        -webkit-animation: waitLoading 1s ease -0.36s infinite;\n        animation: waitLoading 1s ease -0.36s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(5) {\n        top: -0.33333rem;\n        left: 0;\n        -webkit-animation: waitLoading 1s ease -0.48s infinite;\n        animation: waitLoading 1s ease -0.48s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(6) {\n        top: -0.22667rem;\n        left: -0.22667rem;\n        -webkit-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n        -webkit-animation: waitLoading 1s ease -0.6s infinite;\n        animation: waitLoading 1s ease -0.6s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(7) {\n        top: 0;\n        left: -0.33333rem;\n        -webkit-transform: rotate(-90deg);\n        transform: rotate(-90deg);\n        -webkit-animation: waitLoading 1s ease -0.72s infinite;\n        animation: waitLoading 1s ease -0.72s infinite;\n}\n.m-mobile-dialog .dialog-wait .loading i[data-v-e3aa9ba8]:nth-child(8) {\n        top: 0.22667rem;\n        left: -0.22667rem;\n        -webkit-transform: rotate(45deg);\n        transform: rotate(45deg);\n        -webkit-animation: waitLoading 1s ease -0.84s infinite;\n        animation: waitLoading 1s ease -0.84s infinite;\n}\n.m-mobile-dialog .dialog-content[data-v-e3aa9ba8] {\n    padding: 0.10667rem;\n    width: 7.46667rem;\n    min-height: 1.6rem;\n    word-break: break-all;\n    font-size: 0.34667rem;\n    box-sizing: border-box;\n}\n.m-mobile-dialog .dialog-content.alert[data-v-e3aa9ba8] {\n      text-align: center;\n      padding: 0.66667rem 0.8rem 0;\n      word-break: break-all;\n      line-height: 0.8rem;\n      font-size: 0.45333rem;\n}\n.m-mobile-dialog .dialog-items[data-v-e3aa9ba8] {\n    text-align: center;\n    height: 1.6rem;\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-justify-content: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-align-items: center;\n    -webkit-box-align: center;\n            align-items: center;\n    padding-bottom: 0.33333rem;\n}\n.m-mobile-dialog .dialog-items .q-btn[data-v-e3aa9ba8] {\n      width: 2.66667rem;\n      height: 0.93333rem;\n      display: -webkit-flex;\n      display: -webkit-box;\n      display: flex;\n      -webkit-align-items: center;\n      -webkit-box-align: center;\n              align-items: center;\n      -webkit-justify-content: center;\n      -webkit-box-pack: center;\n              justify-content: center;\n      border-radius: 200px;\n      box-sizing: border-box;\n      font-size: 0.4rem;\n      margin: 0 0.26667rem;\n}\n@-webkit-keyframes waitLoading {\n50% {\n    opacity: 0.1;\n}\n100% {\n    opacity: 1;\n}\n}\n@keyframes waitLoading {\n50% {\n    opacity: 0.1;\n}\n100% {\n    opacity: 1;\n}\n}\n", ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(64),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\dialog\\content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a82a9fb6", Component.options)
  } else {
    hotAPI.reload("data-v-a82a9fb6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(67)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(61),
  /* scopeId */
  "data-v-4bbbdfd3",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\dialog\\toast.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] toast.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4bbbdfd3", Component.options)
  } else {
    hotAPI.reload("data-v-4bbbdfd3", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(59),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\swiper\\slide.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] slide.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1003218d", Component.options)
  } else {
    hotAPI.reload("data-v-1003218d", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(62),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\swiper\\swiper.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] swiper.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-648bb468", Component.options)
  } else {
    hotAPI.reload("data-v-648bb468", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(69)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(65),
  /* scopeId */
  "data-v-e3aa9ba8",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\vlib\\layer\\dialog\\dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e3aa9ba8", Component.options)
  } else {
    hotAPI.reload("data-v-e3aa9ba8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(66)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(60),
  /* scopeId */
  "data-v-1e1f718e",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\vlib\\layer\\overlay\\overlay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] overlay.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e1f718e", Component.options)
  } else {
    hotAPI.reload("data-v-1e1f718e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(68)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(63),
  /* scopeId */
  "data-v-66477006",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\vlib\\layer\\popup\\popup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] popup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66477006", Component.options)
  } else {
    hotAPI.reload("data-v-66477006", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.slideClass
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1003218d", module.exports)
  }
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    },
    on: {
      "afterLeave": _vm.afterLeave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "m-overlay",
    style: (_vm.style),
    on: {
      "click": _vm.handlerClick
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1e1f718e", module.exports)
  }
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-dialog-toast"
  }, [_vm._v("\n    " + _vm._s(_vm.msg) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4bbbdfd3", module.exports)
  }
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "swiper-container"
  }, [_vm._t("parallax-bg"), _vm._v(" "), _c('div', {
    class: _vm.defaultSwiperClasses.wrapperClass
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("pagination"), _vm._v(" "), _vm._t("button-prev"), _vm._v(" "), _vm._t("button-next"), _vm._v(" "), _vm._t("scrollbar")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-648bb468", module.exports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": _vm.myAnimate.name,
      "css": true
    },
    on: {
      "before-enter": _vm.myAnimate.beforeEnter,
      "enter": _vm.myAnimate.enter,
      "leave": _vm.myAnimate.leave,
      "after-enter": _vm.afterEnter,
      "after-leave": _vm.afterLeave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    staticClass: "m-popup",
    style: (_vm.setStyle)
  }, [_c('div', {
    ref: "content"
  }), _vm._v(" "), (_vm.myProgressBar.show && _vm.myProgressBar.showTime > 0) ? _c('div', {
    staticClass: "progress-bar"
  }, [_c('div', {
    staticClass: "bar",
    class: _vm.control,
    style: (_vm.setTime)
  })]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-66477006", module.exports)
  }
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-dialog-alert"
  }, [_vm._v("\n    " + _vm._s(_vm.option.msg) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a82a9fb6", module.exports)
  }
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-mobile-dialog",
    class: {
      'mobile-wait': _vm.myOption.wait
    }
  }, [(_vm.myOption.wait) ? _c('div', {
    staticClass: "dialog-wait vh-center"
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), (!_vm.myOption.wait) ? _c('div', {
    staticClass: "dialog-content",
    class: {
      alert: _vm.myOption.alert
    }
  }, [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), (!_vm.myOption.wait && _vm.myOption.buts.length > 0) ? _c('div', {
    staticClass: "dialog-items"
  }, _vm._l((_vm.myOption.buts), function(item) {
    return _c('span', {
      class: item.type == 'ok' ? 'q-btn q-ok' : 'q-btn',
      on: {
        "click": function($event) {
          _vm.butClick(item.id, item)
        }
      }
    }, [_vm._v(_vm._s(item.text))])
  })) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loading"
  }, [_c('i'), _c('i'), _c('i'), _c('i'), _c('i'), _c('i'), _c('i'), _c('i')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-e3aa9ba8", module.exports)
  }
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(30)("54e78b4b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1e1f718e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./overlay.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1e1f718e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./overlay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("323edd16", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4bbbdfd3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./toast.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4bbbdfd3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./toast.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3de04a94", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-66477006\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./popup.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-66477006\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./popup.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(50);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ec9078c0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e3aa9ba8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./dialog.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e3aa9ba8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(167),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ccb36d6", Component.options)
  } else {
    hotAPI.reload("data-v-5ccb36d6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popup = __webpack_require__(26);

var _popup2 = _interopRequireDefault(_popup);

var _content = __webpack_require__(143);

var _content2 = _interopRequireDefault(_content);

var _bus = __webpack_require__(7);

var _dialog = __webpack_require__(24);

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//

exports.default = {
    props: {
        show: Boolean,
        url: {
            type: String,
            default: "../user/sendsmscode"
        },
        subUrl: {
            type: String,
            default: "../weixin/bindmobile"
        }
    },
    data: function data() {
        return {
            m_bind: null
        };
    },
    mounted: function mounted() {
        var self = this;
        self.m_bind = (0, _popup2.default)("<mobile @click='submit' :url='url' @close='close'/>", {
            option: {
                autoHide: true,
                animate: {
                    name: "slide-bottom"
                }
            },
            popup: {
                components: {
                    mobile: _content2.default
                },
                data: function data() {
                    return {
                        url: self.url
                    };
                },

                methods: {
                    close: function close() {
                        self.m_bind.hide();
                        self.changeShow();
                    },
                    submit: function submit(opt) {
                        _dialog2.default.wait();
                        this.$http.post(self.subUrl, opt).then(function () {
                            _dialog2.default.toast("绑定成功！");
                            self.$emit("onBindSuccess", opt);
                            self.m_bind.hide();
                        }).catch(function (res) {
                            _dialog2.default.alert(res.msg);
                        });
                    }
                }
            }
        });
        this.m_bind.setPosition(0, "auto", "auto", 0);
        this.show && this.m_bind.show();
        (0, _bus.bind)(this.m_bind.get("hide"), this.changeShow);
    },

    methods: {
        changeShow: function changeShow() {
            this.$emit('update:show', false);
            //父模块绑定 :show.sync=""
        }
    },
    watch: {
        show: function show(bool) {
            if (bool) {
                this.m_bind.show();
            } else {
                this.m_bind.hide();
            }
        }
    }
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regular = __webpack_require__(119);

var _regular2 = _interopRequireDefault(_regular);

var _dialog = __webpack_require__(24);

var _dialog2 = _interopRequireDefault(_dialog);

var _delay = __webpack_require__(27);

var _delay2 = _interopRequireDefault(_delay);

var _inputControl = __webpack_require__(104);

var _inputControl2 = _interopRequireDefault(_inputControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    props: {
        url: {
            type: String,
            default: ""
        }
    },
    data: function data() {
        return {
            isSend: false,
            second: 59,
            delay: null,
            inputControl: null
        };
    },

    computed: {
        text: function text() {
            if (!this.isSend) return "获取验证码";else return this.second + "秒可重发";
        }
    },
    mounted: function mounted() {
        this.delay = (0, _delay2.default)(this.timer, 1000).bind(this);
        this.inputControl = (0, _inputControl2.default)();
        this.inputControl.add(this.$refs.mobile);
        this.inputControl.add(this.$refs.code);
    },

    methods: {
        close: function close() {
            this.$emit("close");
        },
        sendCode: function sendCode() {
            var _this = this;

            if (this.isSend) return;
            this.isSend = false;
            var mobile = this.$refs.mobile.value.trim();
            if (!_regular2.default.mobile(mobile)) {
                _dialog2.default.toast("手机号格式不正确！");
                return;
            }
            _dialog2.default.wait();
            this.$http.get(this.url, {
                params: { mobile: mobile }
            }).then(function (res) {
                _dialog2.default.toast("验证码已经发送!");
                _this.isSend = true;
                _this.delay.run();
            }).catch(function (res) {
                _dialog2.default.alert(res.msg);
            });
        },
        init: function init() {
            this.isSend = false;
            this.second = 59;
            this.delay.cancel();
        },
        timer: function timer() {
            this.second--;
            if (this.second <= 0) {
                this.init();
            }
        },
        submit: function submit() {
            var mobile = this.$refs.mobile.value.trim();
            var code = this.$refs.code.value.trim();
            if (!_regular2.default.mobile(mobile)) {
                _dialog2.default.toast("手机号格式不正确！");
                return;
            } else if (!_regular2.default.number(code) || code.length < 6) {
                _dialog2.default.toast("验证码为6位数字！");
                return;
            }
            this.init();
            this.$emit("click", { mobile: mobile, sms_code: code });
        }
    }
};

/***/ }),
/* 84 */,
/* 85 */,
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _closest = __webpack_require__(25);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: {
        rating: {
            type: Number,
            default: 0
        },
        mode: {
            type: Number,
            default: 10
        },
        use: {
            type: String,
            default: "rating"
        }
    },
    data: function data() {
        return {
            total: 5,
            _rating: this.rating
        };
    },

    computed: {
        ratingArr: function ratingArr() {
            var arr = [];
            var map = {
                empty: 0,
                full: 1
            };
            var total = this.total;
            for (var i = 0; i < total; i++) {
                if (i < this.$props.rating) {
                    arr[i] = {
                        num: 1,
                        text: "full"
                    };
                } else {
                    arr[i] = {
                        num: 0,
                        text: "empty"
                    };
                }
            }

            return arr;
        },
        ratingArray: function ratingArray() {
            var vm = this;
            var arr = [];
            var total = vm.total;
            var fullSize = parseInt(vm.rating / 2);
            var isHalf = parseInt(vm.rating % 2);

            for (var i = 0; i < total; i++) {
                if (i < fullSize) {
                    arr[i] = {
                        text: "full",
                        num: vm.mapMark("full")
                    };
                } else if (i === fullSize && isHalf) {
                    arr[i] = {
                        text: "half",
                        num: vm.mapMark("half")
                    };
                } else {
                    arr[i] = {
                        text: "empty",
                        num: vm.mapMark("empty")
                    };
                }
            }
            return arr;
        }
    },
    components: {},
    methods: {
        onClick: function onClick(ev) {
            var vm = this;
            if (vm.use !== "rating") {
                return;
            }
            var el = (0, _closest2.default)(ev.target, ".item");
            vm.setRatingBy(+el.dataset.index);
        },
        setRatingBy: function setRatingBy(index) {
            index = +index;
            var vm = this;
            var keyItem = vm.ratingArray[index];
            var counter = 0;
            var markNum = keyItem.num;
            for (var i = 0; i < vm.total; i++) {
                if (i < index) {
                    counter += 2;
                }if (i === index) {
                    counter += (markNum + 1) % 3;
                    if (vm.rating > counter + 2) {
                        counter += 1;
                    }
                }
            }
            if (index === 0 && counter === 0) {
                counter = 1;
            }
            vm.rating = counter;
            vm.$emit("ratingChange", {
                rating: vm.rating
            });
        },
        mapMark: function mapMark(key) {
            var mapArr = ["empty", "half", "full"];
            var map = {
                empty: 0,
                half: 1,
                full: 2
            };
            if (typeof key === "string") {
                return map[key];
            }
            if (typeof key === "number") {
                return mapArr[key];
            }
        }
    }
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

/***/ }),
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _content = __webpack_require__(152);

var _content2 = _interopRequireDefault(_content);

var _footer = __webpack_require__(153);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        return {};
    },

    components: {
        contentModule: _content2.default,
        footerNav: _footer2.default
    },
    methods: {
        setBindMobile: function setBindMobile(data) {
            this.options.data.bindMobile = data.isBound;
        },
        hideFooter: function hideFooter() {
            this.$refs.footerNav.hide();
        },
        showFooter: function showFooter() {
            this.$refs.footerNav.show();
        },
        resetComments: function resetComments() {
            this.$refs.contentModule.resetComments();
        }
    }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _swiper = __webpack_require__(33);

exports.default = {
    props: {
        list: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    components: {
        swiper: _swiper.swiper, swiperSlide: _swiper.swiperSlide
    },
    data: function data() {
        return {
            notNextTick: true,
            swiperOption: {
                initialSlide: 0,
                slidesPerView: 4,
                spaceBetween: window.innerWidth * 90 / 750,
                slidesOffsetAfter: window.innerWidth * 48 / 750,
                onTap: function onTap(swiper) {},
                onSlideChangeStart: function onSlideChangeStart(swiper) {},
                onInit: function onInit(swiper) {}
            }
        };
    },

    computed: {
        swiper: function swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    methods: {
        goActor: function goActor() {}
    }
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
//
//
//
//
//

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _starRating = __webpack_require__(146);

var _starRating2 = _interopRequireDefault(_starRating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: {
        comments: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        size: {
            type: Number,
            default: 0
        },
        isMoreComments: {
            type: Boolean
        }
    },
    computed: {
        commentsLength: function commentsLength() {
            return comments.length;
        }
    },
    components: {
        starDisplay: _starRating2.default
    },
    methods: {
        sliceDate: function sliceDate(str) {
            return str.split(" ")[0];
        }
    }
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

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actors = __webpack_require__(150);

var _actors2 = _interopRequireDefault(_actors);

var _lightbox = __webpack_require__(154);

var _lightbox2 = _interopRequireDefault(_lightbox);

var _player = __webpack_require__(155);

var _player2 = _interopRequireDefault(_player);

var _comments = __webpack_require__(151);

var _comments2 = _interopRequireDefault(_comments);

var _dialog = __webpack_require__(24);

var _dialog2 = _interopRequireDefault(_dialog);

var _dataType = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
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
//

exports.default = {
    props: ["options"],
    data: function data() {
        var vm = this;
        return {
            stagePhotoActive: false,
            film: vm.options.data.film,
            badges: vm.options.data.film.show_type_names.split(","),
            contentExpanded: false,
            stagePhotos: vm.options.data.film.stills.split(","),
            creators: vm.options.data.film.creator,
            comments: [],
            commentsPage: 1,
            commentsSize: 5,
            isMoreComments: true,
            isMoreLoading: false,
            scrollContainer: null, //this.$refs.scrollContainer,
            trailers: vm.options.data.film.trailers[0],
            commentsCount: 0,
            playerActive: false,

            scrollTextDuration: 0,

            apiCommentlist: vm.options.href.apiCommentlist
        };
    },

    computed: {
        videoProps: function videoProps() {
            var vm = this;
            return {
                src: vm.trailers.vedio_url,
                poster: vm.film.poster,
                autoplay: true
            };
        }
    },
    watch: {},
    components: {
        actors: _actors2.default,
        lightbox: _lightbox2.default,
        player: _player2.default,
        comments: _comments2.default
    },
    mounted: function mounted() {
        var vm = this;
        vm.getComments(vm.commentsPage, vm.commentsSize);
        vm.scrollContainer = vm.$el;
    },

    methods: {
        expandContent: function expandContent(ev) {
            this.contentExpanded = !this.contentExpanded;
        },
        toggleStagePhoto: function toggleStagePhoto() {
            var vm = this;
            vm.stagePhotoActive = !vm.stagePhotoActive;
            if (vm.stagePhotoActive) {
                vm.$emit("lightboxShow");
            } else {
                vm.$emit("lightboxHide");
            }
        },
        sliceDate: function sliceDate(str) {
            return str.split(" ")[0];
        },
        loadMore: function loadMore() {
            var vm = this;
            vm.isMoreLoading = true;
            vm.isMoreComments = true;
            setTimeout(function () {
                vm.getComments(vm.commentsPage, vm.commentsSize);
            }, 800);
        },
        getComments: function getComments() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

            var vm = this;
            if (!vm.isMoreComments) {
                vm.isMoreLoading = false;
                return;
            }
            vm.$http.get(vm.apiCommentlist, { params: { film_code: vm.film.code, page_no: page, page_size: size } }).then(function (res) {
                var data = res.data;
                var comments = data.comments;
                if (!(0, _dataType.isObject)(data)) {
                    vm.isMoreComments = false;
                    vm.isMoreLoading = false;
                    return;
                }
                if (!comments.length) {
                    vm.isMoreComments = false;
                }
                vm.comments = [].concat(_toConsumableArray(vm.comments), _toConsumableArray(comments));

                // 评论总数
                vm.commentsCount = data.count;

                vm.commentsPage += 1;
                vm.isMoreLoading = false;
            }).catch(function (err) {
                //dialogManager.toast(err.msg);
                console.warn(err.msg);
                vm.isMoreComments = false;
                vm.isMoreLoading = false;
            });
        },
        resetComments: function resetComments() {
            var vm = this;
            vm.comments = [];
            vm.commentsPage = 1;
            vm.isMoreComments = true;
            vm.getComments(vm.commentsPage, vm.commentsSize);
        },
        _toString: function _toString(num) {
            return "" + num;
        },
        togglePlayer: function togglePlayer(bool) {
            var vm = this;
            vm.playerActive = bool;
        }
    }
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popup = __webpack_require__(26);

var _popup2 = _interopRequireDefault(_popup);

var _bindMobile = __webpack_require__(103);

var _bindMobile2 = _interopRequireDefault(_bindMobile);

var _bus = __webpack_require__(7);

var bus = _interopRequireWildcard(_bus);

var _dialog = __webpack_require__(24);

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// import review from "./review";
exports.default = {
    props: {
        options: {
            type: Object,
            default: function _default() {
                return {};
            }
        },

        isShow: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            m_dialog: null,
            footerMsg: "",
            scrollTextDuration: 0,
            isBindMobileShow: false,
            filmCode: this.options.data.film.code,
            commentRating: 0,
            commentText: "",
            apiFirstComment: this.options.href.apiFirstcomment
        };
    },

    computed: {
        isBindMobile: function isBindMobile() {
            return +this.options.data.bindMobile;
        },
        isShowBtn: function isShowBtn() {
            return +this.options.data.film_shows;
        }
    },
    watch: {
        commentText: function commentText(newVal) {
            console.log("commentText", newVal);
        }
    },
    components: {
        bindMobile: _bindMobile2.default
    },
    mounted: function mounted() {
        var vm = this;
        vm.m_dialog = (0, _popup2.default)("<review :href='href' :code='code' :rating='rating' :text='text' :options='options'  @hide='close' @submited='resetComments'></review>", {
            option: {
                autoHide: true,
                animate: {
                    name: "slide-bottom"
                }
            },
            popup: {
                data: function data() {
                    return {
                        href: vm.options.href,
                        code: vm.options.data.film.code,
                        // rating: vm.commentRating,
                        // text: vm.commentText,
                        options: vm.options
                    };
                },

                computed: {
                    rating: function rating() {
                        return vm.commentRating;
                    },
                    text: function text() {
                        return vm.commentText;
                    }
                },
                watch: {
                    text: function text(val) {
                        console.log("comment.Text", val);
                    }
                },
                methods: {
                    close: function close() {
                        vm.m_dialog.hide();
                    },
                    resetComments: function resetComments() {
                        vm.resetComments();
                    }
                },
                components: {
                    //review
                }
            }
        });

        if (vm.$refs.scrollText) {
            vm.scrollTextDuration = vm.$refs.scrollText.offsetWidth / 30;
        }

        vm.m_dialog.setPosition(0, "auto", "auto", 0);
    },

    methods: {
        goReview: function goReview() {
            var vm = this;
            if (!vm.isBindMobile) {
                vm.openBindMobile();
                return;
            }
            // vm.checkFirstComment();
            vm.m_dialog.show();
        },
        checkFirstComment: function checkFirstComment() {
            var vm = this;
            if (bus.isLock()) {
                return;
            }
            vm.lock();
            vm.$http.get(vm.apiFirstComment, {
                params: {
                    film_code: vm.filmCode
                }
            }).then(function (res) {
                var data = res.data;
                if (data) {
                    vm.commentText = data.content;
                    vm.commentRating = data.score;
                } else {
                    vm.commentText = "";
                    vm.commentRating = 0;
                }
                vm.m_dialog.show();
                vm.unlock();
            }).catch(function (err) {
                // dialogManager.toast(err.msg || "");
                vm.m_dialog.show();
                vm.unlock();
            });
        },
        openBindMobile: function openBindMobile() {
            this.isBindMobileShow = true;
        },
        bindMobileSuccess: function bindMobileSuccess() {
            this.$emit("bindMobileSuccess", {
                isBound: true
            });
        },
        hide: function hide() {
            this.isShow = false;
        },
        show: function show() {
            this.isShow = true;
        },
        resetComments: function resetComments() {
            this.$emit("resetComments");
        },
        lock: function lock() {
            bus.lock();
            _dialog2.default.wait();
        },
        unlock: function unlock() {
            bus.unLock();
            _dialog2.default.closeWait();
        }
    }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _swiper = __webpack_require__(33);

var _dialog = __webpack_require__(24);

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    props: {
        active: {
            type: Boolean,
            default: false
        },
        imgs: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        downloadOperation: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        active: function active(newVal) {
            if (newVal && this.swiper) {
                this.swiper.update();
            }
        }
    },
    components: {
        swiper: _swiper.swiper, swiperSlide: _swiper.swiperSlide
    },
    data: function data() {
        var vm = this;
        return {
            swiper: null,
            indicatorLength: 0,
            indicatorNum: 0,
            notNextTick: true,
            swiperOption: {
                initialSlide: 0,
                loop: true,
                spaceBetween: 24,
                observer: true,
                observeParents: true,
                lazyLoading: true,
                onSlideChangeStart: function onSlideChangeStart(swiper) {},
                onSlideChangeEnd: function onSlideChangeEnd(swiper) {
                    var num = swiper.params.loop ? swiper.realIndex : swiper.activeIndex;
                    vm.indicatorNum = num + 1;
                },
                onInit: function onInit(swiper) {
                    var len = swiper.slides.length;
                    vm.indicatorLength = swiper.params.loop ? len - 2 : len;
                    var num = swiper.params.loop ? swiper.realIndex : swiper.activeIndex;
                    vm.indicatorNum = num + 1;
                    vm.swiper = swiper;
                    swiper.update();
                }
            }
        };
    },

    computed: {
        currentImgUrl: function currentImgUrl() {
            var vm = this;
            var index = vm.indicatorNum - 1;
            return vm.imgs[index];
        }
    },
    methods: {
        _hide: function _hide() {
            this.$emit("hide");
        },
        prevent: function prevent(ev) {
            ev.preventDefault();
        },
        tip: function tip() {
            _dialog2.default.toast("请长按图片，进行下载");
        }
    }
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defaultProps = __webpack_require__(41);

exports.default = {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        video: _defaultProps.object
    },
    data: function data() {},

    methods: {
        hidePlayer: function hidePlayer() {
            this.$emit("hide", false);
        },
        prevent: function prevent(ev) {
            ev.preventDefault();
        }
    }
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
//
//
//
//
//
//

/***/ }),
/* 101 */,
/* 102 */,
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bindMobile = __webpack_require__(142);

var _bindMobile2 = _interopRequireDefault(_bindMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bindMobile2.default.install = function (Vue) {
  return Vue.component('bind-mobile', _bindMobile2.default);
}; /*******
    * 璩小孩
    * 绑定手机号 20170822
    */
exports.default = _bindMobile2.default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _domUtil = __webpack_require__(106);

var _closest = __webpack_require__(25);

var _closest2 = _interopRequireDefault(_closest);

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputControl = function inputControl(element, isAll) {

    if (!isAll && _viewport2.default.isIPhone) {
        return { add: function add() {}, remove: function remove() {} };
    }

    var events = [],
        tid = null,
        count = 0,
        node = null,
        curEl = null,
        run = false,
        stop = false;
    var screen = window.innerHeight;

    function start(el) {
        var height = window.innerHeight;
        if (node === null) {
            node = (0, _closest2.default)(el, element || ".m-popup");
            if (!node) {
                end();
                stop = true;
                return;
            }
        }
        if (screen !== height && !run) {
            var result = screen - height;
            var pos = (0, _domUtil.getOffset)(el);
            if (!node.style.transform) {
                result = Math.min(result, screen - result - pos.top - 30);
            } else {
                result = Math.min(result, screen - pos.top - 30);
            }
            node.style.transform = "translateY(" + result + "px)";
            run = true;
        } else if (screen === height && run) {
            node.style.removeProperty("transform");
            run = false;
        }
        count++;
        if (count > 100 && !run) {
            end();
        }
    }

    function end() {
        clearInterval(tid);
        tid = null;
        count = 0;
        curEl = null;
        run = false;
        if (stop) {
            document.body.removeEventListener("click", _inputSet, false);
            events = [];
        }
    }

    function _inputSet(ev) {
        var target = ev.target;
        if ("input,textarea".includes(target.nodeName.toLowerCase())) {
            if (events.indexOf(target) > -1) {
                if (tid === null) {
                    tid = setInterval(start, 10, target);
                } else if (curEl !== target) {
                    count = 0;
                    run = false;
                }
                curEl = target;
            }
        } else if (tid !== null && run) {
            node.style.removeProperty("transform");
            end();
        }
    }

    document.body.addEventListener("click", _inputSet, false);

    return {
        add: function add(el) {
            !stop && events.push(el);
        },
        remove: function remove(el) {
            if (stop) return;
            var index = events.indexOf(el);
            if (index > -1) {
                events.splice(index, 1);
            }
        }
    };
}; /**
    * 对安卓手机键盘弹出会把页面顶上去的问题做兼容处理
    * 璩：2017-09-13
    */
exports.default = inputControl;

/***/ }),
/* 105 */,
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getOffset = exports.getOffset = function getOffset(el) {
    var box = el.getBoundingClientRect();
    var body = document.body;
    var clientTop = el.clientTop || body.clientTop || 0;
    var clientLeft = el.clientLeft || body.clientLeft || 0;
    var scrollTop = window.pageYOffset || el.scrollTop;
    var scrollLeft = window.pageXOffset || el.scrollLeft;
    return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
    };
};

var transitionEnd = exports.transitionEnd = function transitionEnd(el, fun) {
    var arr = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
    var handler = {
        handleEvent: function handleEvent(event) {
            arr.forEach(function (eventName) {
                el.removeEventListener(eventName, handler, false);
            });
            fun.apply(el, arguments);
        }
    };
    arr.forEach(function (eventName) {
        el.addEventListener(eventName, handler, false);
    });
};

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(76);

var _App2 = _interopRequireDefault(_App);

var _diyaxios = __webpack_require__(11);

var _diyaxios2 = _interopRequireDefault(_diyaxios);

var _viewport = __webpack_require__(4);

var _viewport2 = _interopRequireDefault(_viewport);

__webpack_require__(8);

var _fastclick = __webpack_require__(12);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _lazyImage = __webpack_require__(9);

var _lazyImage2 = _interopRequireDefault(_lazyImage);

var _scrollLoad = __webpack_require__(10);

var _scrollLoad2 = _interopRequireDefault(_scrollLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 解决移动端300毫秒延迟
/**
 * 影片详情
 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        _fastclick2.default.attach(document.body);
    }, false);
}

_vue2.default.use(_lazyImage2.default);
_vue2.default.use(_scrollLoad2.default);

_viewport2.default.init(1);
_vue2.default.config.productionTip = false;
_vue2.default.prototype.$http = _diyaxios2.default; // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
document.body.classList.add("m-views-movie");

new _vue2.default({
    el: '#app',
    data: function data() {
        return {
            options: options
        };
    },
    template: '<app :options="options"></app>',
    components: { App: _App2.default }
});

/***/ }),
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 最新版
 正则验证
 by:璩小孩
 **/
//----------------require--------------
module.exports = {
    mobile: function mobile() {
        //手机
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /^((1[3-8]{1}[0-9]{1})+\d{8})$/;
        return reg.test(val);
    },
    phone: function phone() {
        //电话
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /^(((0\d{2,3}-)+\d{7,8})|((0\d{2,3})+\d{7,8})|(\+\d{6,20})|(\d{6,20})|((0\d{2,3}-)+\d{7,8}-)+\d{1,6})$/;
        return reg.test(val);
    },
    email: function email() {
        //邮箱
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg1 = /@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; //防止输入过长的时候，卡死
        var reg2 = /^([a-zA-Z0-9_-]+[_|\_|\.]?)+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (reg1.test(val)) {
            return reg2.test(val);
        }
        return false;
    },
    code: function code() {
        //邮政编码验证
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /^(([1-9]{1})\d{5})$/;
        return reg.test(val);
    },
    number: function number() {
        //只能输入数字
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /^(-?\d+)$/;
        return reg.test(val);
    },
    double: function double() {
        //小数或整数
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /^(-?\d+)\.?\d*$/;
        return reg.test(val);
    },
    url: function url() {
        //网址
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return reg.test(val);
    },
    chinese: function chinese() {
        //验证中文
        var val = arguments[0];
        if ("undefined" === typeof val) return false;
        var reg = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/gi;
        return reg.test(val);
    }
};

/***/ }),
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.fade-in-active[data-v-115f1c70], .fade-out-active[data-v-115f1c70] {\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n}\n.fade-in-enter[data-v-115f1c70], .fade-out-active[data-v-115f1c70] {\n  opacity: 0;\n}\n.lightbox[data-v-115f1c70] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-flex-direction: column;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-justify-content: space-between;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n.lightbox .header[data-v-115f1c70] {\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-align-items: center;\n    -webkit-box-align: center;\n            align-items: center;\n    position: absolute;\n    z-index: 2;\n    width: 100%;\n    padding-top: 0.69333rem;\n}\n.lightbox .header .indicator[data-v-115f1c70] {\n      -webkit-flex: 1;\n      -webkit-box-flex: 1;\n              flex: 1;\n      text-align: center;\n      font-size: 0.42667rem;\n}\n.lightbox .header .btn-close[data-v-115f1c70] {\n      position: absolute;\n      right: 0;\n      display: -webkit-flex;\n      display: -webkit-box;\n      display: flex;\n      -webkit-align-items: center;\n      -webkit-box-align: center;\n              align-items: center;\n      height: 0.96rem;\n      font-size: 0.85333rem;\n      padding-right: 0.26667rem;\n}\n.lightbox .body[data-v-115f1c70] {\n    -webkit-flex: 1;\n    -webkit-box-flex: 1;\n            flex: 1;\n    overflow: hidden;\n    width: 100%;\n    background-color: transparent;\n}\n.lightbox .footer[data-v-115f1c70] {\n    position: absolute;\n    z-index: 2;\n    bottom: 0;\n    left: 0;\n    padding-bottom: 0.69333rem;\n    width: 100%;\n    text-align: center;\n}\n.lightbox .footer .btn[data-v-115f1c70] {\n      display: inline-block;\n      min-width: 2.4rem;\n      border-width: 0.01333rem;\n      border-style: solid;\n      border-radius: 60px;\n      padding: 0.13333rem 0.4rem;\n}\n.lightbox .footer .btn > i[data-v-115f1c70] {\n        margin-right: 0.16rem;\n        vertical-align: bottom;\n}\n.lightbox .swiper-container[data-v-115f1c70] {\n    height: 100%;\n}\n.lightbox .swiper-wrapper[data-v-115f1c70] {\n    height: 100%;\n}\n.lightbox .swiper-slide[data-v-115f1c70] {\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n            align-items: center;\n    text-align: center;\n    height: 100%;\n}\n.lightbox .slide-img[data-v-115f1c70] {\n    max-width: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 124 */,
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.m-bind-mobile[data-v-2627d21c] {\n  width: 10rem;\n  padding-bottom: 5.44rem;\n}\n.m-bind-mobile .title[data-v-2627d21c] {\n    height: 1.33333rem;\n    position: relative;\n}\n.m-bind-mobile .title .name[data-v-2627d21c] {\n      -webkit-flex: 1;\n      -webkit-box-flex: 1;\n              flex: 1;\n      font-size: 0.42667rem;\n      text-align: center;\n}\n.m-bind-mobile .title .icon-dialog-close[data-v-2627d21c] {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n      transform: translateY(-50%);\n      right: 0.45333rem;\n}\n.form-items[data-v-2627d21c] {\n  padding: 0 0.93333rem;\n}\n.form-items .item[data-v-2627d21c] {\n    width: 100%;\n    height: 1.73333rem;\n    box-sizing: border-box;\n    padding-top: 0.50667rem;\n    overflow: hidden;\n}\n.form-items .item input[data-v-2627d21c] {\n      -webkit-flex: 1;\n      -webkit-box-flex: 1;\n              flex: 1;\n      height: 0.53333rem;\n      min-height: 0.53333rem;\n      max-height: 0.53333rem;\n      line-height: 0.53333rem;\n      border: 0 none;\n      text-indent: 0.33333rem;\n      font-size: 0.42667rem;\n}\n.form-items .item .code[data-v-2627d21c] {\n      display: inline-block;\n      padding: 0.09333rem 0;\n      font-size: 0.37333rem;\n      width: 3.2rem;\n      text-align: center;\n}\n.btn[data-v-2627d21c] {\n  width: 8.13333rem;\n  height: 1.09333rem;\n  border-radius: 82px;\n  font-size: 0.48rem;\n  box-sizing: border-box;\n  margin: 0.66667rem auto 0;\n}\n", ""]);

// exports


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n@-webkit-keyframes scroll-text {\n0% {\n    -webkit-transform: translate(10rem, 0);\n}\n100% {\n    -webkit-transform: translate(-100%, 0);\n}\n}\n@keyframes scroll-text {\n0% {\n    -webkit-transform: translate(10rem, 0);\n            transform: translate(10rem, 0);\n}\n100% {\n    -webkit-transform: translate(-100%, 0);\n            transform: translate(-100%, 0);\n}\n}\n.footer[data-v-306a62d6] {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  z-index: 10;\n}\n.footer .msg[data-v-306a62d6] {\n    overflow: hidden;\n}\n.footer .msg .inner[data-v-306a62d6] {\n      display: inline-block;\n      padding-left: 0.32rem;\n      padding-right: 0.32rem;\n      line-height: 1.5;\n      white-space: nowrap;\n      -webkit-animation: scroll-text;\n      animation: scroll-text;\n      -webkit-animation-timing-function: linear;\n      animation-timing-function: linear;\n      -webkit-animation-delay: 3s;\n      animation-delay: 3s;\n      -webkit-animation-iteration-count: infinite;\n      animation-iteration-count: infinite;\n      -webkit-animation-fill-mode: both;\n      animation-fill-mode: both;\n}\n.footer .console[data-v-306a62d6] {\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-justify-content: space-between;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    -webkit-align-items: center;\n    -webkit-box-align: center;\n            align-items: center;\n    position: relative;\n    padding: 0.26667rem 0.32rem;\n}\n.footer .console[data-v-306a62d6]:before {\n      content: \"\";\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 0.26667rem;\n      -webkit-transform: translate(0, -100%);\n      transform: translate(0, -100%);\n}\n.footer .console .left[data-v-306a62d6] {\n      display: -webkit-flex;\n      display: -webkit-box;\n      display: flex;\n      -webkit-justify-content: space-between;\n      -webkit-box-pack: justify;\n              justify-content: space-between;\n      -webkit-align-items: center;\n      -webkit-box-align: center;\n              align-items: center;\n      -webkit-box-flex: 1;\n      -webkit-flex-grow: 1;\n              flex-grow: 1;\n      -webkit-flex-shrink: 0;\n              flex-shrink: 0;\n      margin-right: 0.2rem;\n      height: 1.2rem;\n}\n.footer .console .right .btn[data-v-306a62d6] {\n      width: 4.53333rem;\n      height: 1.2rem;\n      line-height: 1.2rem;\n      font-size: 0.50667rem;\n      border-radius: 0.6rem;\n      text-align: center;\n}\n.footer .console .right .btn.disabled[data-v-306a62d6] {\n        opacity: .5;\n}\n", ""]);

// exports


/***/ }),
/* 127 */,
/* 128 */,
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.reviews .media .right .row-1[data-v-556639ef] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.reviews .header[data-v-556639ef] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: space-between;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  min-height: 1.06667rem;\n  padding-left: 0.32rem;\n  padding-right: 0.32rem;\n  border-bottom-width: 0.01333rem;\n  border-bottom-style: solid;\n}\n.reviews .header .title[data-v-556639ef], .reviews .header .more[data-v-556639ef] {\n    line-height: 1.06667rem;\n    font-size: 0.4rem;\n}\n.reviews .header .title .arrow-right[data-v-556639ef], .reviews .header .more .arrow-right[data-v-556639ef] {\n      position: relative;\n      width: 0.26667rem;\n      height: 0.26667rem;\n}\n.reviews .header .title .arrow-right[data-v-556639ef]:before, .reviews .header .title .arrow-right[data-v-556639ef]:after, .reviews .header .more .arrow-right[data-v-556639ef]:before, .reviews .header .more .arrow-right[data-v-556639ef]:after {\n        content: \"\";\n        position: absolute;\n        right: 0;\n        top: 0;\n        width: 0;\n        height: 0;\n        border-top: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        border-left-width: 5px;\n        border-left-style: solid;\n}\n.reviews .header .title .arrow-right[data-v-556639ef]:after, .reviews .header .more .arrow-right[data-v-556639ef]:after {\n        right: 1px;\n}\n.reviews .header .more[data-v-556639ef] {\n    width: 1.6rem;\n    text-align: right;\n}\n.reviews .media[data-v-556639ef] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: flex-start;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-align-items: flex-start;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  margin-left: 0.32rem;\n  padding: 0.45333rem 0;\n  padding-right: 0.32rem;\n  border-bottom-width: 0.01333rem;\n  border-bottom-style: solid;\n}\n.reviews .media .left[data-v-556639ef] {\n    -webkit-flex-shrink: 0;\n            flex-shrink: 0;\n    width: 1.06667rem;\n    height: 1.06667rem;\n    border-radius: 80px;\n    margin-right: 0.32rem;\n}\n.reviews .media .left > img[data-v-556639ef] {\n      width: 100%;\n      height: 100%;\n      border-radius: 60%;\n}\n.reviews .media .right[data-v-556639ef] {\n    -webkit-flex: 1;\n    -webkit-box-flex: 1;\n            flex: 1;\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex-direction: column;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-justify-content: space-between;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n}\n.reviews .media .right .row-1[data-v-556639ef] {\n      width: 100%;\n      min-height: 1.06667rem;\n      width: 100%;\n}\n.reviews .media .right .row-1 .row-1-1[data-v-556639ef] {\n        padding-bottom: 0.21333rem;\n        line-height: 1.5;\n}\n.reviews .media .right .row-1 .row-1-2[data-v-556639ef] {\n        -webkit-transform: scale(0.6);\n        transform: scale(0.6);\n        -webkit-transform-origin: 0 0;\n        transform-origin: 0 0;\n        margin-bottom: -0.26667rem;\n}\n.reviews .media .right .row-2[data-v-556639ef] {\n      padding-top: 0.46667rem;\n      padding-bottom: 0.46667rem;\n      font-size: 0.37333rem;\n      line-height: 0.50667rem;\n      width: 8rem;\n      overflow-x: auto;\n}\n.reviews .media .right .row-last[data-v-556639ef] {\n      display: -webkit-flex;\n      display: -webkit-box;\n      display: flex;\n      -webkit-justify-content: space-between;\n      -webkit-box-pack: justify;\n              justify-content: space-between;\n      -webkit-align-items: center;\n      -webkit-box-align: center;\n              align-items: center;\n}\n.reviews .media .right .row-last .row-last-left[data-v-556639ef] {\n        font-size: 0.32rem;\n}\n.reviews .media .right .row-last .row-last-right[data-v-556639ef] {\n        display: -webkit-flex;\n        display: -webkit-box;\n        display: flex;\n        -webkit-justify-content: flex-end;\n        -webkit-box-pack: end;\n                justify-content: flex-end;\n        -webkit-align-items: center;\n        -webkit-box-align: center;\n                align-items: center;\n}\n.reviews .media .right .row-last .row-last-right > *[data-v-556639ef] {\n          display: inline-block;\n}\n.reviews .media .right .row-last .row-last-right > span[data-v-556639ef] {\n          font-size: 0.32rem;\n          margin-left: 0.13333rem;\n          width: 0.66667rem;\n}\n.reviews .footer[data-v-556639ef] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n  -webkit-box-align: center;\n          align-items: center;\n  padding-top: 0.32rem;\n  padding-bottom: 0.45333rem;\n  font-size: 0.34667rem;\n  text-align: center;\n}\n.reviews .footer .line[data-v-556639ef] {\n    display: inline-block;\n    width: 0.53333rem;\n    height: 1px;\n    margin: auto 0.32rem;\n}\n.reviews .footer.footer-1[data-v-556639ef] {\n    padding-top: 1.06667rem;\n    padding-bottom: 1.06667rem;\n}\n", ""]);

// exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.container[data-v-58aa351c] {\n  position: fixed;\n  z-index: 3;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-flex-direction: column;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-justify-content: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.close-btn[data-v-58aa351c] {\n  position: absolute;\n  top: 0.66667rem;\n  right: 0.4rem;\n}\n.video[data-v-58aa351c] {\n  width: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.item .row-2[data-v-e62c6e4e], .item .row-3[data-v-e62c6e4e] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.actors[data-v-e62c6e4e] {\n  padding: 0.45333rem 0.32rem;\n}\n.item[data-v-e62c6e4e] {\n  width: 2.05333rem;\n}\n.item .row-1[data-v-e62c6e4e] {\n    width: 2.05333rem;\n    height: 2.05333rem;\n    border-radius: 2.05333rem;\n    overflow: hidden;\n}\n.item .row-1 > img[data-v-e62c6e4e] {\n      width: 100%;\n      height: 100%;\n}\n.item .row-2[data-v-e62c6e4e], .item .row-3[data-v-e62c6e4e] {\n    text-align: center;\n    width: 100%;\n}\n.item .row-2[data-v-e62c6e4e] {\n    padding-top: 0.18667rem;\n    font-size: 0.37333rem;\n    line-height: 0.53333rem;\n}\n.item .row-3[data-v-e62c6e4e] {\n    font-size: 0.29333rem;\n    line-height: 0.45333rem;\n}\n", ""]);

// exports


/***/ }),
/* 138 */,
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.star-rating .item[data-v-f241ee28] {\n  display: inline-block;\n  min-width: 0.53333rem;\n  min-height: 0.53333rem;\n}\n.star-rating .item + .item[data-v-f241ee28] {\n    margin-left: 0.21333rem;\n}\n", ""]);

// exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.card > .row .switch[data-v-f2547264] {\n  display: inline-block;\n  border-style: solid;\n  border-width: 0 0.04rem 0.04rem 0;\n  padding: 0.13333rem;\n}\n.card > .row .switch.arrow-up[data-v-f2547264] {\n  transform: rotate(-135deg);\n  -webkit-transform: rotate(-135deg);\n}\n.card > .row .switch.arrow-down[data-v-f2547264] {\n  transform: rotate(45deg);\n  -webkit-transform: rotate(45deg);\n}\n.scrolling[data-v-f2547264] {\n  padding-bottom: 2rem;\n}\n.m-scroll-loading[data-v-f2547264] {\n  padding-top: 0.26667rem;\n}\n.banner[data-v-f2547264] {\n  position: relative;\n  height: 7.30667rem;\n  overflow: hidden;\n}\n.banner[data-v-f2547264]:before {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n}\n.banner > img[data-v-f2547264] {\n    width: 100%;\n}\n.banner .btn-photo[data-v-f2547264] {\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-justify-content: flex-start;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n    -webkit-align-items: center;\n    -webkit-box-align: center;\n            align-items: center;\n    position: absolute;\n    top: 0.45333rem;\n    right: 0.32rem;\n    width: 1.17333rem;\n    height: 0.53333rem;\n    font-size: 0.32rem;\n}\n.banner .btn-photo > i[data-v-f2547264] {\n      vertical-align: middle;\n}\n.banner .btn-photo .text[data-v-f2547264] {\n      display: inline-block;\n      vertical-align: middle;\n      padding-left: 0.10667rem;\n      font-size: 0.32rem;\n}\n.banner .btn-play[data-v-f2547264] {\n    position: absolute;\n    top: 2.85333rem;\n    left: 50%;\n    width: 1.06667rem;\n    height: 1.06667rem;\n    -webkit-transform: translatex(-50%);\n            transform: translatex(-50%);\n    border-radius: 80px;\n    border-width: 0.02667rem;\n    border-style: solid;\n}\n.banner .btn-play .icon[data-v-f2547264] {\n      position: absolute;\n      margin: auto;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      -webkit-transform: translate(0.06667rem, 0.02rem);\n              transform: translate(0.06667rem, 0.02rem);\n}\n.card[data-v-f2547264] {\n  position: relative;\n  top: -1.12rem;\n  margin-left: 0.32rem;\n  margin-right: 0.32rem;\n  margin-bottom: -1.12rem;\n  padding-left: 0.32rem;\n  padding-right: 0.32rem;\n  padding-top: 0.57333rem;\n  border-radius: 0.13333rem;\n  -webkit-transition-duration: 0.3s;\n          transition-duration: 0.3s;\n}\n.card .outer-side[data-v-f2547264] {\n    position: absolute;\n    left: 0;\n    top: -0.53333rem;\n    font-size: 0.32rem;\n}\n.card .outer-side > i[data-v-f2547264] {\n      vertical-align: middle;\n      margin-right: 0.13333rem;\n}\n.card .title[data-v-f2547264] {\n    font-size: 0.48rem;\n    line-height: 0.61333rem;\n    text-align: center;\n}\n.card .title > span[data-v-f2547264]:nth-of-type(2) {\n      font-size: 0.42667rem;\n}\n.card .title > span[data-v-f2547264]:nth-of-type(3) {\n      font-size: 0.26667rem;\n}\n.card .tags[data-v-f2547264] {\n    margin-top: 0.13333rem;\n    margin-bottom: 0.57333rem;\n    font-size: 0.32rem;\n    text-align: center;\n}\n.card .tags .badge[data-v-f2547264] {\n      font-size: 0.26667rem;\n      line-height: 1;\n      border-radius: 0.34667rem;\n      border-width: 0.01333rem;\n      border-style: solid;\n      padding: 0.05333rem 0.13333rem;\n      margin-left: 0.06667rem;\n      margin-right: 0.06667rem;\n}\n.card .tags .badge.left[data-v-f2547264] {\n        margin-right: 0;\n        border-radius: 26px 0 0 26px;\n}\n.card .tags .badge.right[data-v-f2547264] {\n        margin-left: -0.21333rem;\n        border-radius: 0 26px 26px 0;\n}\n.card .tags > *[data-v-f2547264] {\n      display: inline-block;\n      vertical-align: middle;\n}\n.card .content[data-v-f2547264] {\n    font-size: 0.4rem;\n    line-height: 0.56rem;\n    -webkit-transition-duration: 0.3s;\n            transition-duration: 0.3s;\n}\n.card .content-ellip[data-v-f2547264] {\n      display: -webkit-box;\n      -webkit-line-clamp: 3;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n      text-overflow: ellipsis;\n}\n.card > .row[data-v-f2547264] {\n    margin-top: 0.22667rem;\n    padding-bottom: 0.45333rem;\n    text-align: center;\n}\n.card > .row .switch[data-v-f2547264] {\n      -webkit-transition-duration: 0.3s;\n              transition-duration: 0.3s;\n}\n.actors[data-v-f2547264] {\n  margin-top: 0.32rem;\n  margin-bottom: 0.32rem;\n}\n.stat[data-v-f2547264] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  margin-top: 0.32rem;\n  margin-bottom: 0.32rem;\n  padding-top: 0.26667rem;\n  padding-bottom: 0.26667rem;\n}\n.stat .item[data-v-f2547264] {\n    -webkit-flex: 1;\n    -webkit-box-flex: 1;\n            flex: 1;\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-flex-direction: column;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-justify-content: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n    min-height: 1.2rem;\n    text-align: center;\n}\n.stat .item + .item[data-v-f2547264] {\n      border-left-width: 0.01333rem;\n      border-left-style: solid;\n}\n.stat .item .row-1[data-v-f2547264] {\n      font-size: 0.56rem;\n      margin-bottom: 0.29333rem;\n}\n.stat .item .row-1 > span[data-v-f2547264]:nth-of-type(2) {\n        font-size: 0.32rem;\n}\n.stat .item .row-2[data-v-f2547264] {\n      font-size: 0.29333rem;\n}\n.info .header[data-v-f2547264] {\n  display: -webkit-flex;\n  display: -webkit-box;\n  display: flex;\n  -webkit-justify-content: space-between;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  min-height: 1.06667rem;\n  padding-left: 0.32rem;\n  padding-right: 0.32rem;\n  border-bottom: 0.01333rem solid transparent;\n}\n.info .header .title[data-v-f2547264], .info .header .more[data-v-f2547264] {\n    line-height: 1.06667rem;\n    font-size: 0.4rem;\n}\n.info .header .title .arrow-right[data-v-f2547264], .info .header .more .arrow-right[data-v-f2547264] {\n      position: relative;\n      width: 0.26667rem;\n      height: 0.26667rem;\n}\n.info .header .title .arrow-right[data-v-f2547264]:before, .info .header .title .arrow-right[data-v-f2547264]:after, .info .header .more .arrow-right[data-v-f2547264]:before, .info .header .more .arrow-right[data-v-f2547264]:after {\n        content: \"\";\n        position: absolute;\n        right: 0;\n        top: 0;\n        width: 0;\n        height: 0;\n        border-top: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        border-left-width: 5px;\n        border-left-style: solid;\n}\n.info .header .title .arrow-right[data-v-f2547264]:after, .info .header .more .arrow-right[data-v-f2547264]:after {\n        right: 1px;\n}\n.info .header .more[data-v-f2547264] {\n    width: 1.6rem;\n    text-align: right;\n}\n.info[data-v-f2547264] {\n  margin-top: 0.32rem;\n  margin-bottom: 0.32rem;\n}\n.info .media[data-v-f2547264] {\n    display: -webkit-flex;\n    display: -webkit-box;\n    display: flex;\n    -webkit-justify-content: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-align-items: center;\n    -webkit-box-align: center;\n            align-items: center;\n    margin-left: 0.32rem;\n    padding: 0.45333rem 0;\n    padding-right: 0.32rem;\n    border-bottom: 0.01333rem solid transparent;\n}\n.info .media .left[data-v-f2547264] {\n      width: 2.53333rem;\n      height: 1.92rem;\n      margin-right: 0.32rem;\n}\n.info .media .left > img[data-v-f2547264] {\n        width: 100%;\n        height: 100%;\n        border-radius: 0.13333rem;\n}\n.info .media .right[data-v-f2547264] {\n      -webkit-flex: 1;\n      -webkit-box-flex: 1;\n              flex: 1;\n      display: -webkit-flex;\n      display: -webkit-box;\n      display: flex;\n      -webkit-flex-direction: column;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n              flex-direction: column;\n      -webkit-justify-content: space-between;\n      -webkit-box-pack: justify;\n              justify-content: space-between;\n      height: 1.73333rem;\n}\n.info .media .right .row-1[data-v-f2547264] {\n        width: 100%;\n        display: -webkit-box;\n        -webkit-line-clamp: 2;\n        -webkit-box-orient: vertical;\n        overflow: hidden;\n        text-overflow: ellipsis;\n}\n.info .media .right .row-last[data-v-f2547264] {\n        display: -webkit-flex;\n        display: -webkit-box;\n        display: flex;\n        -webkit-justify-content: space-between;\n        -webkit-box-pack: justify;\n                justify-content: space-between;\n}\n.info .media .right .row-last-right[data-v-f2547264] {\n          display: -webkit-flex;\n          display: -webkit-box;\n          display: flex;\n          -webkit-justify-content: space-between;\n          -webkit-box-pack: justify;\n                  justify-content: space-between;\n          -webkit-align-items: center;\n          -webkit-box-align: center;\n                  align-items: center;\n          text-align: right;\n}\n.lightbox[data-v-f2547264] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 141 */,
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(82),
  /* template */
  __webpack_require__(159),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\bindMobile\\bindMobile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] bindMobile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29588a28", Component.options)
  } else {
    hotAPI.reload("data-v-29588a28", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(181)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(83),
  /* template */
  __webpack_require__(158),
  /* scopeId */
  "data-v-2627d21c",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\bindMobile\\content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2627d21c", Component.options)
  } else {
    hotAPI.reload("data-v-2627d21c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 144 */,
/* 145 */,
/* 146 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(195)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(86),
  /* template */
  __webpack_require__(176),
  /* scopeId */
  "data-v-f241ee28",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\common\\plugin\\starRating\\starRating.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] starRating.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f241ee28", Component.options)
  } else {
    hotAPI.reload("data-v-f241ee28", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(193)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(95),
  /* template */
  __webpack_require__(174),
  /* scopeId */
  "data-v-e62c6e4e",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\actors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] actors.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e62c6e4e", Component.options)
  } else {
    hotAPI.reload("data-v-e62c6e4e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(185)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(96),
  /* template */
  __webpack_require__(165),
  /* scopeId */
  "data-v-556639ef",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\comments.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] comments.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-556639ef", Component.options)
  } else {
    hotAPI.reload("data-v-556639ef", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(196)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(177),
  /* scopeId */
  "data-v-f2547264",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2547264", Component.options)
  } else {
    hotAPI.reload("data-v-f2547264", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(182)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(98),
  /* template */
  __webpack_require__(160),
  /* scopeId */
  "data-v-306a62d6",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] footer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-306a62d6", Component.options)
  } else {
    hotAPI.reload("data-v-306a62d6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(179)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(99),
  /* template */
  __webpack_require__(156),
  /* scopeId */
  "data-v-115f1c70",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\lightbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] lightbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-115f1c70", Component.options)
  } else {
    hotAPI.reload("data-v-115f1c70", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(186)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(100),
  /* template */
  __webpack_require__(166),
  /* scopeId */
  "data-v-58aa351c",
  /* cssModules */
  null
)
Component.options.__file = "G:\\myProject\\taBearGitHub\\taBear\\src\\views\\movie\\player.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] player.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58aa351c", Component.options)
  } else {
    hotAPI.reload("data-v-58aa351c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade",
      "enter-class": "fade-in-enter",
      "enter-active-class": "fade-in-active",
      "leave-class": "fade-out-enter",
      "leave-active-class": "fade-out-active"
    }
  }, [(_vm.active) ? _c('div', {
    staticClass: "lightbox",
    on: {
      "touchmove": _vm.prevent
    }
  }, [_c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "indicator"
  }, [_vm._v("\n            " + _vm._s(_vm.indicatorNum) + " / " + _vm._s(_vm.indicatorLength) + "\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "btn-close",
    on: {
      "click": _vm._hide
    }
  }, [_c('i', {
    staticClass: "icon-dialog-close"
  })])]), _vm._v(" "), _c('swiper', {
    ref: "mySwiper",
    staticClass: "body",
    attrs: {
      "options": _vm.swiperOption,
      "not-next-tick": _vm.notNextTick
    }
  }, _vm._l((_vm.imgs), function(item) {
    return _c('swiper-slide', {
      key: item
    }, [_c('lazy-image', {
      staticClass: "slide-img",
      attrs: {
        "src": item,
        "initSrc": "/images/common/750x312.jpg"
      }
    })], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "footer"
  })], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-115f1c70", module.exports)
  }
}

/***/ }),
/* 157 */,
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-bind-mobile"
  }, [_c('div', {
    staticClass: "title vh-center"
  }, [_c('span', {
    staticClass: "name"
  }, [_vm._v("绑定手机号码")]), _vm._v(" "), _c('i', {
    staticClass: "icon-dialog-close",
    on: {
      "click": _vm.close
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "form-items"
  }, [_c('li', {
    staticClass: "item vh-center"
  }, [_vm._m(0), _c('input', {
    ref: "mobile",
    attrs: {
      "type": "number",
      "placeholder": "请输入手机号"
    }
  })]), _vm._v(" "), _c('li', {
    staticClass: "item vh-center"
  }, [_vm._m(1), _c('input', {
    ref: "code",
    attrs: {
      "type": "number",
      "onkeyup": "this.value=this.value.replace(/\\D/g,'').substr(0, 6)",
      "placeholder": "请输入验证码"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "code",
    class: {
      gray: _vm.isSend
    },
    on: {
      "click": _vm.sendCode
    }
  }, [_vm._v(_vm._s(_vm.text))])])]), _vm._v(" "), _c('span', {
    staticClass: "btn vh-center",
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("确定")])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "vh-center"
  }, [_c('i', {
    staticClass: "icon-mobile"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "vh-center"
  }, [_c('i', {
    staticClass: "icon-pwd"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2627d21c", module.exports)
  }
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-29588a28", module.exports)
  }
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    staticClass: "footer"
  }, [(_vm.footerMsg) ? _c('div', {
    staticClass: "msg"
  }, [_c('div', {
    ref: "scrollText",
    staticClass: "inner",
    style: ({
      'animation-duration': (_vm.scrollTextDuration + "s"),
      'webkit-animation-duration': (_vm.scrollTextDuration + "s"),
    })
  }, [_vm._v(_vm._s(_vm.footerMsg))])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "console"
  }, [_c('div', {
    staticClass: "left"
  }, [(false) ? _c('div', {
    staticClass: "item",
    on: {
      "click": _vm.goReview
    }
  }, [_c('i', {
    staticClass: "icon icon-footer-good"
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("333")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "item",
    on: {
      "click": _vm.goReview
    }
  }, [_c('i', {
    staticClass: "icon icon-footer-review"
  })]), _vm._v(" "), (false) ? _c('div', {
    staticClass: "item"
  }, [_c('i', {
    staticClass: "icon icon-footer-share"
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("333")])]) : _vm._e()]), _vm._v(" "), (_vm.isShowBtn) ? _c('div', {
    directives: [{
      name: "href",
      rawName: "v-href",
      value: (_vm.options.href.urlShow),
      expression: "options.href.urlShow"
    }],
    staticClass: "right"
  }, [_c('div', {
    staticClass: "btn"
  }, [_vm._v("选座购票")])]) : _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "btn disabled"
  }, [_vm._v("即将上映")])])]), _vm._v(" "), _c('bind-mobile', {
    attrs: {
      "show": _vm.isBindMobileShow
    },
    on: {
      "update:show": function($event) {
        _vm.isBindMobileShow = $event
      },
      "onBindSuccess": _vm.bindMobileSuccess
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-306a62d6", module.exports)
  }
}

/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.comments) ? _c('div', {
    staticClass: "reviews"
  }, [_c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("用户评论" + _vm._s(_vm.size ? ("(" + _vm.size + ")") : ""))])]), _vm._v(" "), _vm._l((_vm.comments), function(item) {
    return _c('div', {
      key: item.user_id,
      staticClass: "media"
    }, [_c('div', {
      staticClass: "left"
    }, [_c('lazy-image', {
      attrs: {
        "src": item.user_faceurl,
        "initSrc": "/images/common/152x152.jpg"
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "right"
    }, [_c('div', {
      staticClass: "row-1"
    }, [_c('div', {
      staticClass: "row-1-1"
    }, [_vm._v(_vm._s(item.user_name))]), _vm._v(" "), _c('div', {
      staticClass: "row-1-2"
    }, [_c('star-display', {
      attrs: {
        "use": "display",
        "rating": item.score
      }
    })], 1)]), _vm._v(" "), _c('div', {
      staticClass: "row-2"
    }, [_vm._v("\n                    " + _vm._s(item.content) + "\n                ")]), _vm._v(" "), _c('div', {
      staticClass: "row-last"
    }, [_c('div', {
      staticClass: "row-last-left"
    }, [_vm._v(_vm._s(item.show_time))]), _vm._v(" "), (false) ? _c('div', {
      staticClass: "row-last-right"
    }, [_c('i', {
      staticClass: "icon-thumb"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.likes ? item.likes : "34"))]), _vm._v(" "), _c('i', {
      staticClass: "icon-msg"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.comments ? item.comments : "70"))])]) : _vm._e()])])])
  }), _vm._v(" "), (!_vm.comments.length) ? _c('div', {
    staticClass: "footer footer-1"
  }, [_c('span', {
    staticClass: "line"
  }), _vm._v(" 暂无评论 "), _c('span', {
    staticClass: "line"
  })]) : _vm._e(), _vm._v(" "), (!_vm.isMoreComments) ? _c('div', {
    staticClass: "footer footer-2"
  }, [_c('span', {
    staticClass: "line"
  }), _vm._v(" 哦哟~到底了 "), _c('span', {
    staticClass: "line"
  })]) : _vm._e()], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-556639ef", module.exports)
  }
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.active) ? _c('div', {
    staticClass: "container player",
    on: {
      "touchmove": _vm.prevent
    }
  }, [_c('div', {
    staticClass: "close-btn",
    on: {
      "click": _vm.hidePlayer
    }
  }, [_c('i', {
    staticClass: "icon-dialog-close"
  })]), _vm._v(" "), _c('video', {
    staticClass: "video",
    attrs: {
      "controls": "",
      "autoplay": _vm.video.autoplay,
      "preload": "auto",
      "x-webkit-airplay": "allow",
      "x5-video-player-type": "h5",
      "src": _vm.video.src,
      "poster": _vm.video.poster
    }
  })]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-58aa351c", module.exports)
  }
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-count"
  }, [_c('content-module', {
    ref: "contentModule",
    attrs: {
      "options": _vm.options
    },
    on: {
      "lightboxHide": _vm.showFooter,
      "lightboxShow": _vm.hideFooter
    }
  }), _vm._v(" "), _c('footer-nav', {
    ref: "footerNav",
    attrs: {
      "options": _vm.options
    },
    on: {
      "bindMobileSuccess": _vm.setBindMobile,
      "resetComments": _vm.resetComments
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5ccb36d6", module.exports)
  }
}

/***/ }),
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('swiper', {
    ref: "mySwiper",
    staticClass: "actors",
    attrs: {
      "options": _vm.swiperOption,
      "not-next-tick": _vm.notNextTick
    }
  }, _vm._l((_vm.list), function(item) {
    return _c('swiper-slide', {
      key: item.name
    }, [_c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "row-1"
    }, [_c('lazy-image', {
      attrs: {
        "src": item.pic,
        "initSrc": "/images/common/152x152.jpg"
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "row-2"
    }, [_vm._v("\n                " + _vm._s(item.name) + "\n            ")]), _vm._v(" "), _c('div', {
      staticClass: "row-3"
    }, [_vm._v(_vm._s(item.position))])])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-e62c6e4e", module.exports)
  }
}

/***/ }),
/* 175 */,
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.mode == 5) ? _c('ul', {
    staticClass: "star-rating"
  }, _vm._l((_vm.ratingArr), function(item, i) {
    return _c('li', {
      key: i,
      staticClass: "item",
      attrs: {
        "data-index": i
      }
    }, [_c('i', {
      class: ("icon-star-" + (item.text))
    })])
  })) : _vm._e(), _vm._v(" "), (_vm.mode == 10) ? _c('ul', {
    staticClass: "star-rating"
  }, _vm._l((_vm.ratingArray), function(item, i) {
    return _c('li', {
      key: i,
      staticClass: "item",
      attrs: {
        "data-index": i
      },
      on: {
        "click": _vm.onClick
      }
    }, [_c('i', {
      class: ("icon-star-" + (item.text))
    })])
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f241ee28", module.exports)
  }
}

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "scrolling"
  }, [_c('div', {
    staticClass: "banner"
  }, [_c('div', {
    staticClass: "btn-photo",
    on: {
      "click": _vm.toggleStagePhoto
    }
  }, [_c('i', {
    staticClass: "icon-stage-photo"
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("剧照")])]), _vm._v(" "), (_vm.trailers.vedio_url) ? _c('div', {
    staticClass: "btn-play",
    on: {
      "click": function($event) {
        _vm.togglePlayer(true)
      }
    }
  }, [_c('i', {
    staticClass: "icon icon-play"
  })]) : _vm._e(), _vm._v(" "), _c('lazy-image', {
    attrs: {
      "src": _vm.film.poster,
      "initSrc": "/images/common/750x552.jpg"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "card"
  }, [(false) ? _c('div', {
    staticClass: "outer-side"
  }, [_c('i', {
    staticClass: "icon-egg"
  }), _c('span', [_vm._v("片尾有2个彩蛋，不要走开哟")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_c('span', [_vm._v(_vm._s(_vm.film.name))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._toString(_vm.film.score).split('.')[0] + "."))]), _c('span', [_vm._v(_vm._s(_vm._toString(_vm.film.score).split('.')[1] || "0") + "分")])]), _vm._v(" "), _c('div', {
    staticClass: "tags"
  }, [_c('div', {
    staticClass: "length"
  }, [_vm._v(_vm._s(_vm.film.duration) + "分钟")]), _vm._v(" "), _c('div', {
    staticClass: "types"
  }, [_vm._v(_vm._s(_vm.film.type))]), _vm._v(" "), _vm._l((_vm.badges), function(item, i) {
    return (i < 2) ? _c('span', {
      key: item,
      staticClass: "badge"
    }, [_vm._v(_vm._s(item))]) : _vm._e()
  }), _vm._v(" "), (/max/i.test(_vm.film.show_type_names)) ? _c('span', {
    staticClass: "badge left "
  }, [_vm._v("3D")]) : _vm._e(), _vm._v(" "), (/max/i.test(_vm.film.show_type_names)) ? _c('span', {
    staticClass: "badge right "
  }, [_vm._v("IMAX")]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    class: {
      content: true, 'content-ellip': !_vm.contentExpanded
    },
    domProps: {
      "innerHTML": _vm._s(_vm.film.intro)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "row",
    on: {
      "click": _vm.expandContent
    }
  }, [_c('div', {
    class: {
      switch: true, 'arrow-down': !_vm.contentExpanded, 'arrow-up': _vm.contentExpanded
    }
  })])]), _vm._v(" "), _c('actors', {
    attrs: {
      "list": _vm.creators
    }
  }), _vm._v(" "), (false) ? _c('div', {
    staticClass: "stat"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2)]) : _vm._e(), _vm._v(" "), (false) ? _c('div', {
    staticClass: "info"
  }, [_vm._m(3), _vm._v(" "), _vm._l((Array(2)), function(item) {
    return _c('div', {
      key: item,
      staticClass: "media"
    }, [_c('div', {
      staticClass: "left"
    }, [_c('lazy-image', {
      attrs: {
        "src": "/images/common/192x144.jpg"
      }
    })], 1), _vm._v(" "), _vm._m(4, true)])
  })], 2) : _vm._e(), _vm._v(" "), _c('comments', {
    attrs: {
      "comments": _vm.comments,
      "isMoreComments": _vm.isMoreComments,
      "size": _vm.commentsCount
    }
  }), _vm._v(" "), _c('scroll-load', {
    attrs: {
      "node": _vm.scrollContainer,
      "loading": _vm.isMoreLoading
    },
    on: {
      "load": _vm.loadMore
    }
  }), _vm._v(" "), _c('lightbox', {
    attrs: {
      "active": _vm.stagePhotoActive,
      "imgs": _vm.stagePhotos
    },
    on: {
      "hide": _vm.toggleStagePhoto
    }
  }), _vm._v(" "), _c('player', {
    attrs: {
      "active": _vm.playerActive,
      "video": _vm.videoProps
    },
    on: {
      "hide": _vm.togglePlayer
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "row-1"
  }, [_c('span', [_vm._v("9.6")]), _c('span', [_vm._v("亿")])]), _vm._v(" "), _c('div', {
    staticClass: "row-2"
  }, [_vm._v("票房")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "row-1"
  }, [_vm._v("11")]), _vm._v(" "), _c('div', {
    staticClass: "row-2"
  }, [_vm._v("排名")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "row-1"
  }, [_c('span', [_vm._v("￥30")]), _c('span', [_vm._v("起")])]), _vm._v(" "), _c('div', {
    staticClass: "row-2"
  }, [_vm._v("网售价")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("相关影讯")]), _vm._v(" "), _c('div', {
    staticClass: "more"
  }, [_vm._v("更多\n                "), _c('i', {
    staticClass: "arrow-right"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "row-1"
  }, [_vm._v("久久久久久久久久久久久久久久久久久久久久久久久久")]), _vm._v(" "), _c('div', {
    staticClass: "row-last"
  }, [_c('div', {
    staticClass: "row-last-left"
  }, [_vm._v("33-33")]), _vm._v(" "), _c('div', {
    staticClass: "row-last-right"
  }, [_c('i', {
    staticClass: "icon-eye"
  }), _vm._v(" "), _c('span', [_vm._v("333")]), _vm._v(" "), _c('i', {
    staticClass: "icon-msg"
  }), _vm._v(" "), _c('span', [_vm._v("333")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f2547264", module.exports)
  }
}

/***/ }),
/* 178 */,
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e4fd614", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-115f1c70\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./lightbox.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-115f1c70\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./lightbox.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 180 */,
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8b8deca4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2627d21c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./content.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2627d21c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./content.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(126);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0d613d68", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-306a62d6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./footer.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-306a62d6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./footer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 183 */,
/* 184 */,
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(129);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("08ca1bc0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-556639ef\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./comments.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-556639ef\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./comments.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2a8adb43", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-58aa351c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./player.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-58aa351c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./player.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(137);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("10179631", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e62c6e4e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./actors.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-e62c6e4e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./actors.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 194 */,
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(139);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("44e40138", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f241ee28\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./starRating.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f241ee28\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./starRating.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(140);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0eb4a90a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f2547264\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./content.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js?minimize=false!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f2547264\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_postcss-loader@1.3.3@postcss-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./content.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
]),[115]);
define([], function() {
    var McScroll = function() {
        this.cfg = {
            pullDown: {
                enabled: false,
                height: 36,
                html: {
                    enabled: true,
                    before: 'Continue pull refresh',
                    active: 'Loosening and refreshing',
                    after: 'Refreshing...'
                },
                handler: null
            },
            pullUp: {
                enabled: false,
                height: 36,
                html: {
                    enabled: true,
                    before: 'Continue pull load',
                    active: 'Loosening and loading',
                    after: 'Loading...'
                },
                handler: null
            },
            onScroll: null,
            onScrollEnd: null
        }
        this.oWrap = null;
        this.oContainer = null;
        this.startPosY = 0;
        this.currentPosY = 0;
        this.maxTop = 0;
        this.pullStatus = 0;
        this.pullDown = null;
        this.pullUp = null;
        this.player = null;
        this.inertiaTarget = null;
        this.iframe = null;
        this.moveInfo = {
            hasDrag: false,
            hasMove: false,
            startY: 0,
            preLastTime: 0,
            preLastPosition: 0,
            lastTime: 0,
            lastPosition: 0,
            overflowHalf: null
        };
        this.scrollBar = {
            track: null,
            main: null,
            ratio: 0
        };
    }

    McScroll.prototype = {
        constructor: McScroll,

        __extend: function(target, source) {
            for (var i in source) {
                if (typeof source[i] === 'object' && Object.prototype.toString.call(source[i]).toLowerCase() == '[object object]') {
                    this.__extend(target[i], source[i]);
                } else {
                    target[i] = source[i];
                }
            }

            return target;
        },

        init: function(mainId, option) {
            var CFG = this.cfg;

            this.oContainer = document.getElementById(mainId);

            if (!this.oContainer) return;

            if (option) {
                this.__extend(this.cfg, option);
            }

            if (typeof CFG.onScroll !== 'function') {
                CFG.onScroll = null;
            }

            if (typeof CFG.onScrollEnd !== 'function') {
                CFG.onScrollEnd = null;
            }

            this.oWrap = this.oContainer.parentNode;
            this.__getMaxTop();
            this.__setScrollBarDOM();

            this.__bindEvent();

            if (CFG.pullDown.enabled && CFG.pullDown.height > 0) {
                this.__setPullDOM('pullDown');
            }

            if (CFG.pullUp.enabled && CFG.pullUp.height > 0) {
                this.__setPullDOM('pullUp');
            }

            return this;
        },

        pullSuccess: function() {
            var that = this,
                oldMaxTop;

            if (that.pullStatus > 0) {
                that.pullStatus = 0;
                if (that.currentPosY >= 0) {
                    that.scrollTo(0);
                    that.__pullHTML('pullDown', 'before');
                } else {
                    oldMaxTop = that.maxTop;
                    setTimeout(function() {
                        if (oldMaxTop <= that.maxTop) {
                            that.scrollTo(that.maxTop);
                        }
                        that.__pullHTML('pullUp', 'before');
                    }, 100)
                }
            }
        },

        pullOff: function(type, text) {
            var text = typeof text === 'string' ? text : '';

            if (this.__checkPullType(type) && this.cfg[type].enabled) {
                this.cfg[type].enabled = false;
                this[type].innerHTML = text;
            }

            return this;
        },

        pullOn: function(type) {
            if (this.__checkPullType(type) && !this.cfg[type].enabled) {
                this.cfg[type].enabled = true;
                if (!this[type]) {
                    this.__setPullDOM(type);
                } else {
                    this.__pullHTML(type, 'before');
                }
            }

            return this;
        },

        pullHTML: function(type, html) {
            if (this.__checkPullType(type) && this.cfg[type].enabled) {
                this[type].innerHTML = html;
            }
        },

        scrollTo: function(val, animate) {
            animate = typeof animate === 'undefined' ? true : animate;

            if (typeof val == 'number') {
                this.currentPosY = val;
            }

            if (animate) {
                this.oContainer.style.transition = '300ms';
                this.scrollBar.main.style.transition = '300ms';
            }
            this.oContainer.style.transform = 'translateZ(0px) translateY(' + this.currentPosY + 'px)';
            this.scrollBar.main.style.transform = 'translateZ(0px) translateY(' + (this.currentPosY / -this.scrollBar.ratio) + 'px)';

            this.cfg.onScroll && this.cfg.onScroll(this.currentPosY, this);

            if ((this.inertiaTarget === null || this.inertiaTarget === this.currentPosY) && !this.moveInfo.hasDrag) {
                this.__scrollDone();
            }

            return this;
        },

        executeHandler: function(type) {
            if (this.__checkPullType(type)) {
                if (type === 'pullDown' && this.currentPosY <= 0) {
                    this.scrollTo(this.cfg.pullDown.height, false);
                }
                this.pullStatus = 1;
                this.__pullHTML(type, 'after');
                this.cfg[type].handler && this.cfg[type].handler(this.pullSuccess.bind(this), this);
            }

            return this;
        },

        __pullHTML: function(type, status) {
            if (this.cfg[type].enabled && this.cfg[type].html.enabled) {
                this[type].innerHTML = this.cfg[type].html[status];
            }
        },

        __scrollDone: function() {
            this.scrollBar.main.className = 'McScroll-bar-main';
            this.cfg.onScrollEnd && this.cfg.onScrollEnd(this);
        },

        __changePullStatus: function(type, status) {
            if (this.__checkPullType(type)) {
                if (!isNaN(status) && this.pullStatus !== status) {
                    this.pullStatus = status;
                    this.__pullHTML(type, status ? 'active' : 'before');
                }
            }

            return this;
        },

        __getMaxTop: function() {
            var that = this;

            this.iframe = document.createElement('iframe');
            this.iframe.setAttribute('style', 'position:absolute; top:0; left:0; z-index:-99; width:100%; height:100%; pointer-events:none;');
            this.oContainer.appendChild(this.iframe);
            this.iframe.contentWindow.onresize = function() {
                that.maxTop = that.oWrap.offsetHeight - that.oContainer.offsetHeight;
                if (that.maxTop > 0) { that.maxTop = 0; }
                that.__setScrollBarStyle();
            }

            this.maxTop = this.oWrap.offsetHeight - this.oContainer.offsetHeight;
            if (that.maxTop > 0) { that.maxTop = 0; }
        },

        __setScrollBarDOM: function() {
            this.scrollBar.track = document.createElement('div');
            this.scrollBar.track.className = 'McScroll-bar-track';
            this.scrollBar.main = document.createElement('div');
            this.scrollBar.main.className = 'McScroll-bar-main';
            this.scrollBar.track.appendChild(this.scrollBar.main);
            this.oWrap.appendChild(this.scrollBar.track);

            this.__setScrollBarStyle();
        },

        __setScrollBarStyle: function() {
            var wrapHeight = this.oWrap.offsetHeight,
                trackHeight = this.scrollBar.track.offsetHeight,
                heightRatio = this.oContainer.offsetHeight / wrapHeight;

            this.scrollBar.ratio = wrapHeight / trackHeight * heightRatio;
            this.scrollBar.main.style.height = Math.round(trackHeight / heightRatio) + 'px';
            this.scrollBar.main.style.transform = 'translateZ(0px) translateY(' + (this.currentPosY / -this.scrollBar.ratio) + 'px)';
        },

        __setPullDOM: function(type) {
            this[type] = document.createElement('div');
            this[type].className = 'McScroll-pull McScroll-' + type;
            this.__pullHTML(type, 'before');
            this.oContainer.appendChild(this[type]);
        },

        __checkPullType: function(type) {
            return (type === 'pullDown' || type === 'pullUp')
        },

        // __inertia: function() {
        //     var step;

        //     if (this.inertiaTarget !== this.currentPosY) {
        //         step = (this.inertiaTarget - this.currentPosY) / 10;
        //         this.currentPosY = parseInt(this.currentPosY + (step > 0 ? Math.ceil(step) : Math.floor(step)));

        //         this.scrollTo(this.currentPosY, false);
        //         this.player = requestAnimationFrame(this.__inertia.bind(this));
        //     } else {
        //         if (this.currentPosY > 0 || this.currentPosY < this.maxTop) {
        //             this.inertiaTarget = this.currentPosY > 0 ? 0 : this.maxTop;
        //             this.player = requestAnimationFrame(this.__inertia.bind(this));
        //         } else {
        //             cancelAnimationFrame(this.player);
        //         }
        //     }
        // },

        __inertia: function() {
            var step;

            if (this.inertiaTarget !== this.currentPosY) {
                step = (this.inertiaTarget - this.currentPosY) / 10;
                this.currentPosY = parseInt(this.currentPosY + (step > 0 ? Math.ceil(step) : Math.floor(step)));

                if (this.moveInfo.overflowHalf !== null) {
                    if (this.moveInfo.overflowHalf > 0 && this.currentPosY > this.moveInfo.overflowHalf) {
                        this.moveInfo.overflowHalf = null;
                        this.inertiaTarget = 0;
                    } else if (this.moveInfo.overflowHalf < 0 && this.currentPosY < this.moveInfo.overflowHalf) {
                        this.moveInfo.overflowHalf = null;
                        this.inertiaTarget = this.maxTop;
                    }
                }

                this.scrollTo(null, false);
                this.player = requestAnimationFrame(this.__inertia.bind(this));
            } else {
                cancelAnimationFrame(this.player);
                this.inertiaTarget = null;
            }
        },

        __eventTouchStart: function(event) {
            if (event.touches.length === 1 && this.pullStatus === 0) {
                cancelAnimationFrame(this.player);
                this.startPosY = this.currentPosY;
                this.moveInfo.hasDrag = true;
                this.moveInfo.startY = event.touches[0].pageY;
                this.moveInfo.lastTime = 0;
                this.moveInfo.lastPosition = null;

                this.oContainer.style.transition = '0ms';
                this.scrollBar.main.style.transition = '0ms';
                this.scrollBar.main.className = 'McScroll-bar-main active';
            }
        },

        __eventTouchMove: function(event) {
            var now;

            if (!this.moveInfo.hasDrag) {
                return
            }

            event.preventDefault();
            this.moveInfo.hasMove = true;

            //更新最后拖动信息
            now = Date.now();
            if (this.moveInfo.lastPosition == null || now - this.moveInfo.lastTime > 50) {
                this.moveInfo.preLastTime = this.moveInfo.lastTime;
                this.moveInfo.preLastPosition = this.moveInfo.lastPosition;
                this.moveInfo.lastTime = now;
                this.moveInfo.lastPosition = event.changedTouches[0].pageY;
            }

            this.currentPosY = this.startPosY - (this.moveInfo.startY - event.changedTouches[0].pageY);

            // 上拉 || 下拉 拖动到边缘触发相关事件
            if (this.currentPosY > 0) {
                this.currentPosY /= 4;
                if (this.cfg.pullDown.enabled && this.cfg.pullDown.height > 0) {
                    this.__changePullStatus('pullDown', this.currentPosY >= this.cfg.pullDown.height ? 1 : 0)
                }
            } else if (this.currentPosY < this.maxTop) {
                this.currentPosY = this.maxTop + ((this.currentPosY - this.maxTop) / 4);
                if (this.cfg.pullUp.enabled && this.cfg.pullUp.height > 0) {
                    this.__changePullStatus('pullUp', Math.abs(this.currentPosY - this.maxTop) >= this.cfg.pullUp.height ? 1 : 0)
                }
            }                

            this.scrollTo(null, false);
        },

        __eventTouchEnd: function(event) {
            var lastTime, lastPosition, velocity;

            if (!this.moveInfo.hasDrag) {
                return
            }

            this.moveInfo.hasDrag = false;

            if (this.currentPosY > 0) { //下拉溢出

                if (this.pullStatus === 1) {
                    this.currentPosY = this.cfg.pullDown.height;
                    this.__pullHTML('pullDown', 'after');
                    this.executeHandler('pullDown');
                } else {
                    this.currentPosY = 0;
                }

                this.scrollTo()

            } else if (this.currentPosY < this.maxTop) { //上拉溢出

                if (this.pullStatus === 1) {
                    this.currentPosY = this.maxTop - this.cfg.pullUp.height;
                    this.__pullHTML('pullUp', 'after');
                    this.executeHandler('pullUp');
                } else {
                    this.currentPosY = this.maxTop;
                }

                this.scrollTo()

            } else { //惯性滑动
                if (this.moveInfo.hasMove) { //是否有拖动

                    //防止更新最后拖动信息时刚好touchend
                    if (event.changedTouches[0].pageY == this.moveInfo.lastPosition) {
                        lastTime = this.moveInfo.preLastTime;
                        lastPosition = this.moveInfo.preLastPosition;
                    } else {
                        lastTime = this.moveInfo.lastTime;
                        lastPosition = this.moveInfo.lastPosition;
                    }

                    //求拖动每秒平均速度
                    velocity = (event.changedTouches[0].pageY - lastPosition) / (Date.now() - lastTime) * 100;

                    if (Math.abs(velocity) > 30) {
                        //惯性滑动目标点
                        this.inertiaTarget = velocity * 4 + this.currentPosY;

                        //惯性滑动溢出情况
                        if (this.inertiaTarget > 0) {
                            this.inertiaTarget /= 4;
                            this.moveInfo.overflowHalf = (this.inertiaTarget / 2);
                        } else if (this.inertiaTarget < this.maxTop) {
                            this.inertiaTarget = this.maxTop + (this.inertiaTarget - this.maxTop) / 4;
                            this.moveInfo.overflowHalf = this.maxTop + (this.inertiaTarget - this.maxTop) / 2;
                        } else {
                            this.moveInfo.overflowHalf = null;
                        }

                        this.inertiaTarget = parseInt(this.inertiaTarget);

                        this.player = requestAnimationFrame(this.__inertia.bind(this));
                    } else {
                        this.__scrollDone();
                    }
                }
            }

            this.moveInfo.hasMove = false;
        },

        __bindEvent: function() {
            var that = this;

            that.oWrap.addEventListener('touchstart', this.__eventTouchStart.bind(this), {capture: false})

            document.addEventListener('touchmove', this.__eventTouchMove.bind(this), {passive: false})

            document.addEventListener('touchend', this.__eventTouchEnd.bind(this), {capture: false})
        }
    }



    return McScroll;
})

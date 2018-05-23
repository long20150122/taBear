<!-- https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88  -->
<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 3
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                // type: Array,
                // default: null
            },
            pullup:{},
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            swipeBounceTime: {
                type: Number,
                default: 800
            },
            momentumLimitTime: {
                type: Number,
                default: 200
            },
            bounceTime: {
                type: Number,
                default: 600
            },
            startY: {
                type: Number,
                default: 0
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    swipeBounceTime: this.swipeBounceTime,
                    bounceTime: this.bounceTime,
                    momentumLimitTime: this.momentumLimitTime,
                    scrollY: true,
                    scrollX: true,
                    startY: this.startY,
                    pullUpLoad: this.pullup
                })
	            this.$emit('setScroll',this.scroll);
                if (this.listenScroll) {
                    let me = this;
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }
                if (this.pullup) {
                    this.scroll.on('pullingUp', () => {
                        this.$emit('scrollToEnd',this.scroll)
                    })
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

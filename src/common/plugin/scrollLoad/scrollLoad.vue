<template>
    <div class="m-scroll-loading" v-show="loading">
        <div class="ani-loading vh-center"><span class="ani-1"></span><span class="ani-2"></span><span class="ani-3"></span></div>
        <div class="text">{{ text }}</div>
    </div>
</template>
<script>
    import viewport from 'vlib/comp/viewport'
    import animate from 'vlib/ani/animate'
    import debounce from 'vlib/util/debounce'
    import getScrollNode from 'common/utils/getScrollNode'

    export default {
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
        data () {
            return {
                bindNode: null,
                height: 0,
                style: {height: "0px"},
                lastScrollTop: 0,
                debounced: null
            }
        },
        mounted () {
            this.height = 70 * viewport.rem() / 75;
            this.debounced = debounce(this.scroll, 50);
        },
        watch: {
            node (node) {
                this.bindNode = getScrollNode(node);
                this.bind();
            },
            loading (bool) {
                if(bool) {
                    this.unbind();
                }else{
                    this.bind();
                }
            }
        },
        methods: {
            bind () {
                this.bindNode.addEventListener("scroll", this.debounced);
            },
            unbind () {
                this.bindNode.removeEventListener("scroll", this.debounced);
            },
            scroll () {
                const node = this.bindNode === window ? document.body : this.bindNode;
                const clientHeight = node === document.body ? document.documentElement.clientHeight : node.clientHeight;
                const scrollTop = node.scrollTop;
                if (scrollTop > this.lastScrollTop && (node.scrollHeight - (scrollTop + clientHeight)) <= this.delta) {
                    this.$emit("load", {top: scrollTop});
                }
                this.lastScrollTop = scrollTop;
            },
            destroy () {
                this.unbind();
                this.bindNode = null;
                this.$destroy();
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../common/style/mixin";
    .m-scroll-loading{
        @include display-flex;
        @include flex-wrap(wrap);
        @include align-content(space-between);
        @include justify-content(center);
        @include wh(200px, 70px);
        margin: 0 auto;
        .ani-loading{
            .ani-1,.ani-2,.ani-3{
                @include wh(26px);
                @include radius(100%);
                margin: rem(0 26px);
                @include animation-name(aniScaleLoading);
                @include animation-iteration-count(infinite);
                @include animation-duration(1s);
                @include animation-timing-function(linear);
            }
            .ani-2{
                @include animation-delay(0.2s);
            }
            .ani-3{
                @include animation-delay(0.4s);
            }
        }
        .text{
            text-align: center;
            @include font-size(24px);
        }
    }
    @include keyframes(aniScaleLoading){
        0%,50%,100%{
            @include scale(1);
        }
        25%{
            @include scale(1.5);
        }
    }
</style>
<template>
<img :src="defaultSrc"/>
</template>
<script>
    export default {
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
                default: "yes"//|no
            }
        },
        data () {
            return {
                defaultSrc: (this.initSrc !== "" ? this.initSrc : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi/v//PwNAgAEACQsDAUdpTjcAAAAASUVORK5CYII="),
                img: null,
                cdn: ""//http://php.sztest.mopon.cn/dyh5/web
            }
        },
        mounted () {
            this.loadImage();
        },
        watch: {
            src () {
                this.loadImage();
            }
        },
        methods: {
            cdnUrl (src) {
                if(!/^(\/images\/common)/.test(src)) return src;
                return this.cdn + src;
            },
            setSrc (src) {
                if(this.autoDestroy === "no"){
                    this.defaultSrc = this.cdnUrl(src);
                }else{
                    this.$el.src = this.cdnUrl(src);
                }
                this.$emit("load", src);
            },
            loadImage () {
                if(this.src === ""){
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
            suc () {
                this.setSrc(this.src);
                this.$emit("suc", {src: this.src, width: this.img.width, height: this.img.height});
                this.destroy();
            },
            err () {
                if(this.errorSrc !== ""){
                    this.setSrc(this.errorSrc);
                }
                this.$emit("err", {src: this.src});
                this.destroy();
            },
            destroy () {
                if(this.autoDestroy === "no") return;
                this.img = null;
                this.$destroy();
            }
        }
    }
</script>
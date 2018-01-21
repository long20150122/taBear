<template>
    <transition
    name="fade"
    enter-class="fade-in-enter"
    enter-active-class="fade-in-active"
    leave-class="fade-out-enter"
    leave-active-class="fade-out-active"
    >
    <div class="lightbox" v-if="active" @touchmove="prevent">
        <div class="header">
            <div class="indicator">
                {{indicatorNum}} / {{indicatorLength}}
            </div>
            <div class="btn-close"  @click="_hide">
                <!-- &#215; -->
                <i class="icon-dialog-close"></i>
            </div>
        </div>
        <swiper class="body" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="item in imgs" :key="item">
                <lazy-image class="slide-img" :src="item" initSrc="/images/common/750x312.jpg"></lazy-image>
            </swiper-slide>

        </swiper>
        <div class="footer">
            <!-- <div class="btn" :href="currentImgUrl" download
            v-if="downloadOperation && currentImgUrl"
            v-download="{href: currentImgUrl, name: '' + indicatorNum}"
            :data-index="indicatorNum - 1"
            >
                <i class="icon-download"></i>保存图片
            </div> -->
            <!-- <div class="btn"
            v-if="downloadOperation && currentImgUrl"
            @click="tip"
            >
                <i class="icon-download"></i>保存图片
            </div> -->
        </div>
    </div>
    </transition>
</template>

<script>
import { swiper, swiperSlide } from 'common/plugin/swiper';
import dialogManager from "common/plugin/dialog";

export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        imgs: {
            type: Array,
            default() {
                return []
            }
        },
        downloadOperation: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        active(newVal) {
            if (newVal && this.swiper) {
                this.swiper.update();
            }
        }
    },
    components: {
        swiper, swiperSlide
    },
    data() {
        const vm = this;
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
                onSlideChangeStart(swiper) {
                },
                onSlideChangeEnd(swiper) {
                    let num = swiper.params.loop
                        ? swiper.realIndex
                        : swiper.activeIndex;
                    vm.indicatorNum = num + 1;
                },
                onInit(swiper) {
                    let len = swiper.slides.length;
                    vm.indicatorLength = swiper.params.loop
                        ? len - 2
                        : len;
                    let num = swiper.params.loop
                        ? swiper.realIndex
                        : swiper.activeIndex;
                    vm.indicatorNum = num + 1;
                    vm.swiper = swiper;
                    swiper.update();
                }
            }
        }
    },
    computed: {
        currentImgUrl() {
            const vm = this;
            let index = vm.indicatorNum - 1;
            return vm.imgs[index];
        }
    },
    methods: {
        _hide() {
            this.$emit("hide");
        },
        prevent(ev) {
            ev.preventDefault();
        },
        tip() {
            dialogManager.toast("请长按图片，进行下载");
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin";

.fade-in-active, .fade-out-active {
    transition: all 0.5s ease;
}

.fade-in-enter, .fade-out-active {
    opacity: 0
}

.lightbox {
    @include display-flex();
    @include flex-direction(column);
    @include justify-content(space-between);

    .header {
        @include display-flex();
        @include align-items(center);
        position: absolute;
        z-index: 2;
        width: 100%;
        padding-top: rem(52px);

        .indicator {
            @include flex(1);
            text-align: center;
            font-size: rem(32px);
        }

        .btn-close {
            position: absolute;
            right: 0;
            @include display-flex();
            @include align-items(center);
            height: r(72);
            font-size: rem(64px);
            padding-right: rem(20px);

            // &:before {
            //     content: "\00d7";
            //     font-size: rem(64px);
            //     padding-right: rem(20px);
            // }
        }
    }

    .body {
        @include flex(1);
        overflow: hidden;
        width: 100%;
        background-color: transparent;
    }

    .footer {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        padding-bottom: rem(52px);
        width: 100%;
        text-align: center;

        .btn {
            display: inline-block;
            min-width: r(180);
            border-width: r(1);
            border-style: solid;
            @include radius(60px);
            padding: rem(10px 30px);

            >i {
                margin-right: r(12);
                vertical-align: bottom;
            }
        }
    }

    .swiper-container {
        height: 100%;
    }
    .swiper-wrapper {
        height: 100%;
    }
    .swiper-slide {
        @include display-flex();
        align-items: center;
        text-align: center;
        height: 100%;
    }
    .slide-img {
        max-width: 100%;
    }
}
</style>

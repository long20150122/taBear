<template>
    <swiper class="actors" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="item in list" :key="item.name">
            <div class="item">
                <div class="row-1">
                    <lazy-image :src="item.pic" initSrc="/images/common/152x152.jpg"></lazy-image>
                </div>
                <div class="row-2">
                    {{item.name}}
                </div>
                <div class="row-3">{{item.position}}</div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'common/plugin/swiper';

export default {
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        swiper, swiperSlide
    },
    data() {
        return {
            notNextTick: true,
            swiperOption: {
                initialSlide: 0,
                slidesPerView: 4,
                spaceBetween: window.innerWidth * 90 / 750,
                slidesOffsetAfter : window.innerWidth * 48 / 750,
                onTap(swiper) {

                },
                onSlideChangeStart(swiper) {
                },
                onInit(swiper) {
                }
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        goActor() {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/_mixin";

.actors {
    padding: r(34) r(24);

}

.item {
    width: r(154);
    .row-1 {
        @include wh(154px, 154px);
        border-radius:r(154);
        overflow: hidden;

        >img {
            width: 100%;
            height: 100%;
        }
    }

    .row-2, .row-3 {
        text-align: center;
        @include ellipsis();
    }

    .row-2 {
        padding-top: r(14);
        font-size: r(28);
        line-height: r(40);
    }

    .row-3 {
        font-size: r(22);
        line-height: r(34);
    }
}
</style>

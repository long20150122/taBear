<template>
    <swiper :options="swiperOption" ref="swiper" v-if="images.length > 0">
        <swiper-slide v-for="(item, index) in images" :key="index"><lazy-image v-href="item.url" :src="item.img" init-src="/images/common/750x312.jpg"/></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
    import { swiper, swiperSlide } from 'common/plugin/swiper'
    import {array} from 'common/utils/defaultProps'

    export default {
        props: {
            images: array
        },
        data () {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay: 3000
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/mixin";
    .swiper-container{
        @include wh(100%, 312px);
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
<template>
    <div class="m-media-object-news" @click="goArticle">
        <div class="mo-left">
            <lazy-image :src="data.coverimg" initSrc="/images/common/192x144.jpg"></lazy-image>
        </div>
        <div class="mo-right">
            <div class="row-1">{{data.title}}</div>
            <div class="row-last">
                <div class="row-last-left">{{time}}</div>
                <div class="row-last-right" v-if="comments">
                    <i class="icon-eye"></i>
                    <span>333</span>
                    <i class="icon-msg"></i>
                    <span>333</span>
                </div>
                <div class="row-last-right" v-else>
                    <div class="badge">{{data.tag_title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        time: {
            type: String,
            default: ""
        },
        data: {
            type: Object
        },
        url: {
            type: String,
            default: ""
        }
    },
    components: {

    },
    methods: {
        goArticle() {
            const vm = this;
            if (!vm.url) {
                return;
            }
            location.assign(vm.url);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../style/mixin";

.m-media-object-news {
    @include display-flex();
    @include justify-content(center);
    @include align-items(center);
    margin-left: r(24);
    padding: r(34) 0;
    padding-right: r(24);
    border-bottom-width: r(1);
    border-bottom-style: solid;

    .mo-left {
        overflow: hidden;
        position: relative;
        @include wh(190, 144);
        margin-right: r(24);
        text-align: center;
        border-radius: 0.13333rem;

        >img {
            width: 100%;
            transform: translate(0, -50%);
            position: absolute;
            top: 50%;
            left: 0;
            // height: 100%;
            // border-radius: r(10);
        }
    }

    .mo-right {
        @include flex(1);
        @include display-flex();
        @include flex-direction(column);
        @include justify-content(space-between);
        height: r(150);
        .row-1 {
            width: 100%;
            @include line-clamp(2);
            @include font-size(28px);
        }
        .row-last {
            @include display-flex();
            @include justify-content(space-between);
            @include align-items(center);
            @include font-size(24px);
            &-right {
                @include display-flex();
                @include justify-content(space-between);
                @include align-items(center);
                text-align: right;

                .badge {
                    padding: rem(0 16px);
                    @include radius(5px);
                    @include font-size(20px);
                    @include box-sizing(border-box);
                    line-height: r(34);
                }
            }
        }
    }
}
</style>

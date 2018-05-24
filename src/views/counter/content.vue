<template>
    <div class="scrolling">
        <div class="banner">
            <div class="btn-photo" @click="toggleStagePhoto">
                <i class="icon-stage-photo"></i>

                <span class="text">剧照</span>
            </div>
            <div class="btn-play" @click="togglePlayer(true)" v-if="trailers.vedio_url">
                <i class="icon icon-play"></i>
            </div>

            <lazy-image :src="film.poster" initSrc="/images/common/750x552.jpg"></lazy-image>
        </div>

        <div class="card">
            <div class="outer-side" v-if="false">
                <i class="icon-egg"></i><span>片尾有2个彩蛋，不要走开哟</span>
            </div>
            <div class="title">
                <span>{{film.name}}</span>
                <span>{{_toString(film.score).split('.')[0] + "."}}</span><span>{{_toString(film.score).split('.')[1] || "0"}}分</span>
            </div>
            <div class="tags">
                <div class="length">{{film.duration}}分钟</div>
                <div class="types">{{film.type}}</div>
                <span class="badge" v-for="(item, i) in badges" v-if="i < 2"
                 :key="item">{{item}}</span>
                 <span v-if="/max/i.test(film.show_type_names) " class="badge left " >3D</span>
                 <span v-if="/max/i.test(film.show_type_names) " class="badge right " >IMAX</span>

            </div>
            <div :class="{content: true, 'content-ellip': !contentExpanded}" v-html="film.intro"></div>
            <div class="row" @click="expandContent">
                <div :class="{switch: true,'arrow-down': !contentExpanded ,'arrow-up': contentExpanded}" ></div>
            </div>
        </div>

        <actors :list="creators"></actors>

        <div class="stat" v-if="false">
            <div class="item">
                <div class="row-1"><span>9.6</span><span>亿</span></div>
                <div class="row-2">票房</div>
            </div>
            <div class="item">
                <div class="row-1">11</div>
                <div class="row-2">排名</div>
            </div>
            <div class="item">
                <div class="row-1"><span>￥30</span><span>起</span></div>
                <div class="row-2">网售价</div>
            </div>
        </div>

        <div class="info" v-if="false">
            <div class="header">
                <div class="title">相关影讯</div>
                <div class="more">更多
                    <i class="arrow-right"></i>
                </div>
            </div>
            <div class="media" v-for="item in Array(2)" :key="item">
                <div class="left">
                    <lazy-image src="/images/common/192x144.jpg"></lazy-image>
                </div>
                <div class="right">
                    <div class="row-1">久久久久久久久久久久久久久久久久久久久久久久久久</div>
                    <div class="row-last">
                        <div class="row-last-left">33-33</div>
                        <div class="row-last-right">
                            <i class="icon-eye"></i>
                            <span>333</span>
                            <i class="icon-msg"></i>
                            <span>333</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <comments :comments="comments" :isMoreComments="isMoreComments" :size="commentsCount"></comments>

        <scroll-load :node="scrollContainer" :loading="isMoreLoading" @load="loadMore"></scroll-load>
        <lightbox :active="stagePhotoActive"
        :imgs="stagePhotos"
        @hide="toggleStagePhoto"
        ></lightbox>
        <player :active="playerActive" :video="videoProps" @hide="togglePlayer"></player>
    </div>
</template>

<script>
import actors from "./actors";
import lightbox from "./lightbox";
import player from "./player";
import comments from "./comments";
import dialogManager from "common/plugin/dialog";
import { isObject } from "vlib/util/dataType";

export default {
    props: ["options"],
    data() {
        const vm = this;
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
            scrollContainer: null,//this.$refs.scrollContainer,
            trailers: vm.options.data.film.trailers[0],
            commentsCount: 0,
            playerActive: false,

            scrollTextDuration: 0,

            apiCommentlist: vm.options.href.apiCommentlist,
        }
    },
    computed: {
        videoProps() {
            const vm = this;
            return {
                src: vm.trailers.vedio_url,
                poster: vm.film.poster,
                autoplay: true
            }
        }
    },
    watch: {

    },
    components: {
        actors,
        lightbox,
        player,
        comments
    },
    mounted() {
        const vm = this;
        vm.getComments(vm.commentsPage, vm.commentsSize);
        vm.scrollContainer = vm.$el;
    },
    methods: {
        expandContent(ev) {
            this.contentExpanded = !this.contentExpanded;
        },
        toggleStagePhoto() {
            const vm = this;
            vm.stagePhotoActive = !vm.stagePhotoActive;
            if (vm.stagePhotoActive) {
                vm.$emit("lightboxShow");
            } else {
                vm.$emit("lightboxHide");
            }
        },
        sliceDate(str) {
            return str.split(" ")[0];
        },
        loadMore() {
            const vm = this;
            vm.isMoreLoading = true;
            vm.isMoreComments = true;
            setTimeout(() => {
                vm.getComments(vm.commentsPage, vm.commentsSize);
            }, 800);
        },
        getComments(page=1, size=5) {
            const vm = this;
            if (!vm.isMoreComments){
                vm.isMoreLoading = false;
                return;
            }
            vm.$http.get(vm.apiCommentlist, {params: {film_code: vm.film.code, page_no: page, page_size: size}}).then(function (res) {
                let data = res.data;
                let comments = data.comments;
                if (!isObject(data)) {
                    vm.isMoreComments = false;
                    vm.isMoreLoading = false;
                    return;
                }
                if (!comments.length) {
                    vm.isMoreComments = false;
                }
                vm.comments = [...vm.comments, ...comments];

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
        resetComments() {
            const vm = this;
            vm.comments = [];
            vm.commentsPage = 1;
            vm.isMoreComments = true;
            vm.getComments(vm.commentsPage, vm.commentsSize);
        },
        _toString(num) {
            return "" + num;
        },
        togglePlayer(bool) {
            const vm = this;
            vm.playerActive = bool
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin";

%arrow {
    display: inline-block;
    border-style: solid;
    border-width: 0 r(3) r(3) 0;
    padding: r(10);
}

%right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

%left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

%up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}

%down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

.scrolling{
    padding-bottom: rem(150px);
}

.m-scroll-loading{
    padding-top: rem(20px);
}

.banner {
    position: relative;
    height: r(548);
    overflow: hidden;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

    }
    >img {
        width: 100%;
    }
    .btn-photo {
        @include display-flex();
        @include justify-content(flex-start);
        @include align-items(center);
        position: absolute;
        top: r(34);
        right: r(24);
        width: r(88);
        height: r(40);
        font-size: r(24);

        >i {
            vertical-align: middle;
        }

        .text {
            // position: absolute;
            // right: 0;
            // top: 50%;
            // @include transform(translate(0, -50%));
            display: inline-block;
            // height: r(30);
            // line-height: r(30);
            vertical-align: middle;
            padding-left: r(8);
            // padding-top: r(4);
            font-size: r(24);
            // @include transform(translate(0, r(2)))
        }
    }

    .btn-play {
        position: absolute;
        top: r(214);
        left: 50%;
        @include wh(80, 80);
        transform: translatex(-50%);
        @include radius(80px);
        border-width: r(2);
        border-style: solid;
        .icon {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            transform: translate(r(5), 0.02rem);
        }
    }
}

.card {
    position: relative;
    top: r(-84);
    margin-left: r(24);
    margin-right: r(24);
    margin-bottom: r(-84);
    padding-left: r(24);
    padding-right: r(24);
    padding-top: r(43);
    border-radius: r(10);
    transition-duration: 0.3s;

    .outer-side {
        position: absolute;
        left: 0;
        top: r(-40);
        font-size: r(24);
        >i {
            vertical-align: middle;
            margin-right: r(10);
        }
    }

    .title {
        font-size: r(36);
        line-height: r(46);
        text-align: center;

        >span:nth-of-type(2) {
            font-size: r(32);
        }
        >span:nth-of-type(3) {
            font-size: r(20);
        }
    }

    .tags {
        margin-top: r(10);
        margin-bottom: r(43);
        font-size: r(24);
        text-align: center;

        .badge {
            // box-sizing: border-box;
            // height: r(26);
            @include font-size(20px);
            line-height: 1;
            border-radius: r(26);
            // border: r(1) solid transparent;
            border-width: r(1);
            border-style: solid;
            padding: rem(4px 10px);
            margin-left: r(5);
            margin-right: r(5);

            &.left {
                margin-right: 0;
                @include radius(26px 0 0 26px);
            }

            &.right {
                margin-left: r(-16);
                @include radius(0 26px 26px 0);
            }

            .span:nth-child(1) {}
        }

        >* {
            display: inline-block;
            vertical-align: middle;
        }
    }

    .content {
        font-size: r(30);
        line-height: r(42);
        transition-duration: 0.3s;

        &-ellip {
            @include line-clamp(3);
        }
    }

    >.row {
        margin-top: r(17);
        padding-bottom: r(34);
        text-align: center;
        .switch {
            @extend %arrow;
            transition-duration: 0.3s;

            &.arrow-down {
                @extend %down;
            }
            &.arrow-up {
                @extend %up;
            }
        }
    }
}

.actors {
    margin-top: r(24);
    margin-bottom: r(24);
}

.stat {
    @include display-flex();
    margin-top: r(24);
    margin-bottom: r(24);
    padding-top: r(20);
    padding-bottom: r(20);

    .item {
        @include flex(1);
        @include display-flex();
        @include flex-direction(column);
        @include justify-content(center);
        min-height: r(90);
        text-align: center;

        &+.item {
            border-left-width: r(1);
            border-left-style: solid;
        }

        .row-1 {
            @include font-size(42);
            margin-bottom: r(22);

            >span:nth-of-type(2) {
                font-size: r(24);
            }
        }

        .row-2 {
            @include font-size(22);
        }
    }
}

%header {
    @include display-flex();
    @include justify-content(space-between);
    min-height: r(80);
    padding-left: r(24);
    padding-right: r(24);
    border-bottom: r(1) solid transparent;

    .title,
    .more {
        line-height: r(80);
        font-size: r(30);
        .arrow-right {
            @include arrow-right;
        }
    }

    .more {
        // @include flex(0);
        width: r(120);
        text-align: right;
    }
}

.info {
    margin-top: r(24);
    margin-bottom: r(24);

    .header {
        @extend %header;
    }

    .media {
        @include display-flex();
        @include justify-content(center);
        @include align-items(center);
        margin-left: r(24);
        padding: r(34) 0;
        padding-right: r(24);
        border-bottom: r(1) solid transparent;

        .left {
            @include wh(190, 144);
            margin-right: r(24);

            >img {
                @include wh(100%, 100%);
                border-radius: r(10);
            }
        }

        .right {
            @include flex(1);
            @include display-flex();
            @include flex-direction(column);
            @include justify-content(space-between);
            height: r(130);
            .row-1 {
                width: 100%;
                @include line-clamp(2);
            }
            .row-last {
                @include display-flex();
                @include justify-content(space-between);
                &-left {}
                &-right {
                    @include display-flex();
                    @include justify-content(space-between);
                    @include align-items(center);
                    text-align: right;
                }
            }
        }
    }
}

.lightbox {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
}
</style>

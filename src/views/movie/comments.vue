<template>
    <div>
        <div class="reviews" v-if="comments">
            <div class="header">
                <div class="title">用户评论{{size ? `(${size})` : ""}}</div>
            </div>
            <div class="media" v-for="item in comments" :key="item.user_id">
                <div class="left">
                    <lazy-image :src="item.user_faceurl" initSrc="/images/common/152x152.jpg"></lazy-image>
                </div>
                <div class="right">
                    <div class="row-1">
                        <div class="row-1-1">{{item.user_name}}</div>
                        <div class="row-1-2">
                            <star-display use="display" :rating="item.score"></star-display>
                        </div>
                    </div>
                    <div class="row-2">
                        {{item.content}}
                    </div>
                    <div class="row-last">
                        <div class="row-last-left">{{item.show_time}}</div>
                        <div class="row-last-right" v-if="false">
                            <i class="icon-thumb"></i>
                            <span>{{item.likes ? item.likes : "34"}}</span>
                            <i class="icon-msg"></i>
                            <span>{{item.comments ? item.comments : "70"}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer footer-1" v-if="!comments.length">
                <span class="line"></span> 暂无评论 <span class="line"></span>
            </div>
            <div class="footer footer-2" v-if="!isMoreComments"> <span class="line"></span> 哦哟~到底了 <span class="line"></span> </div>
        </div>
    </div>
</template>

<script>
import starDisplay from "common/plugin/starRating/starRating";

export default {
    props: {
        comments: {
            type: Array,
            default() {
                return []
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
        commentsLength() {
            return comments.length;
        }
    },
    components: {
        starDisplay
    },
    methods: {
        sliceDate(str) {
            return str.split(" ")[0];
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin";
%header {
    @include display-flex();
    @include justify-content(space-between);
    min-height: r(80);
    padding-left: r(24);
    padding-right: r(24);
    border-bottom-width: r(1);
    border-bottom-style: solid;


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

.reviews {
    .header {
        @extend %header;
    }

    .media {
        @include display-flex();
        @include justify-content(flex-start);
        @include align-items(flex-start);
        margin-left: r(24);
        padding: r(34) 0;
        padding-right: r(24);
        border-bottom-width: r(1);
        border-bottom-style: solid;

        .left {
            flex-shrink: 0;
            @include wh(80, 80);
            @include radius(80px);
            margin-right: r(24);

            >img {
                @include wh(100%, 100%);
                border-radius: 60%;
            }
        }

        .right {
            @include flex(1);
            @include display-flex();
            @include flex-direction(column);
            @include justify-content(space-between);
            .row-1 {
                width: 100%;
                min-height: r(80);
                @include ellipsis();

                .row-1-1 {
                    padding-bottom: r(16);
                    line-height: 1.5;
                }
                .row-1-2 {
                    @include transform(scale(0.6));
                    @include transform-origin(0 0);
                    margin-bottom: r(-20);
                }
            }
            .row-2 {
                padding-top: r(35);
                padding-bottom: r(35);
                font-size: r(28);
                line-height: r(38);
                width: r(600);
                overflow-x: auto;
                // 高度随评论内容，不隐藏
                // @include line-clamp(3);
            }
            .row-last {
                @include display-flex();
                @include justify-content(space-between);
                @include align-items(center);

                .row-last-left {
                    font-size: r(24);
                }

                .row-last-right {
                    @include display-flex();
                    @include justify-content(flex-end);
                    @include align-items(center);
                    >* {
                        display: inline-block;
                    }
                    >span {
                        font-size: r(24);
                        margin-left: r(10);
                        width: r(50);
                    }
                }
            }
        }
    }

    .footer {
        @include display-flex();
        @include justify-content(center);
        @include align-items(center);
        padding-top: r(24);
        padding-bottom: r(34);
        font-size: r(26);
        text-align: center;

        .line {
            display: inline-block;
            width: r(40);
            height: 1px;
            margin: rem(auto 24px);
        }

        &.footer-1 {
            padding-top: r(80);
            padding-bottom: r(80);
        }
    }
}
</style>

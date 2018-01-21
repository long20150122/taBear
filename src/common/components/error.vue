<template>
    <div class="m-error">
        <div class="row-1">
            <lazy-image :src="imgUrl"></lazy-image>
        </div>
        <div class="row-2">{{msg}}</div>
        <button @click="load" v-if="refresh" class="vh-center btn">重新加载</button>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: {
                type: String,
                default: "/images/common/error.png"
            },
            msg: {
                type: String,
                default: "暂无"
            },
            refresh: String
        },
        methods: {
            load () {
                window.location.reload();
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../style/mixin";
.m-error {
    display: inline-block;
    width: r(400);

    .row-1 {
        text-align: center;
        height: r(60);

        >img {
            height: 100%;
        }
    }

    .row-2 {
        padding-top: r(20);
        text-align: center;
        line-height: 1.5;
        font-size: r(26);
        word-wrap: break-word;
    }

    .btn{
        display: block;
        @include box-sizing;
        @include wh(200px, 62px);
        @include radius(62px);
        @include font-size(32px);
        margin: rem(20px auto 0);
    }
}
</style>

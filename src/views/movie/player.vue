<template>
    <div class="container player" v-if="active" @touchmove="prevent">
        <div class="close-btn" @click="hidePlayer">
            <i class="icon-dialog-close"></i>
        </div>
        <video class="video"
            controls
            :autoplay="video.autoplay"
            preload="auto"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            :src="video.src"
            :poster="video.poster"
        >
        </video>
    </div>
</template>

<script>
import {object, array} from "common/utils/defaultProps";

export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        video: object
    },
    data() {

    },
    methods: {
        hidePlayer() {
            this.$emit("hide", false);
        },
        prevent(ev) {
            ev.preventDefault();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/_mixin";
.container {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include display-flex();
    @include flex-direction(column);
    @include justify-content(center);
}
.close-btn {
    position: absolute;
    top: r(50);
    right: r(30);
}
.video {
    width: 100%;
}
</style>

<template>
    <div class="m-select-cinema">
        <div class="display">
            <div class="display-row-1">{{name}}</div>
            <div class="display-row-2">{{address}}</div>
        </div>
        <div class="select" v-if="canSelect">
            <div class="select-row-1">
                <i class="icon-location-1"></i>
            </div>
            <div class="select-row-2">更换</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: "nuknown"
        },
        address: {
            type: String,
            default: "nuknown"
        },
        canSelect: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.m-select-cinema {
    @include display-flex();
    @include align-items(center);
    min-height: r(148);
    padding-left: r(24);
    padding-top: r(24);
    padding-bottom: r(24);
    margin-bottom: r(24);
    @include box-sizing(border-box);

    .display {
        @include flex(1);
        line-height: 1.2;

        &-row-1 {
            font-size: r(32);
            margin-bottom: r(28);
        }
        &-row-2 {
            font-size: r(24);
        }
    }

    .select {
        width: r(136);
        text-align: center;
        border-left-width: r(1);
        border-left-style: solid;

        &-row-2 {
            margin-top: r(14);
        }
    }
}
</style>

<template>
    <div class="m-nav-items">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: []
    }
</script>
<style lang="scss" scoped>
    @import "../../../common/style/mixin";
    .m-nav-items{
        @include display-flex;
        @include justify-content(space-around);
        @include align-items(center);
        @include wh(100%, 98px);
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
    }
</style>
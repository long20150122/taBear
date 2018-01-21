<template>
    <div class="m-dialog-toast">
        {{msg}}
    </div>
</template>
<script>
    export default {
        props: ["msg"]
    }
</script>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .m-dialog-toast {
        padding: 15px 25px;
        @include font-size(28px);
        color: #fff;
        min-width: 120px;
        background-color: rgba(#000, 0.8);
        border-radius: 5px;
        text-align: center;
    }
</style>
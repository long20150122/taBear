<template>
    <div class="nav-item" v-href.lazy="href" @click="changeSelect">
        <i :class="'icon-'+icon+(isSelect ? '-selected' : '')"></i>
        <span :class="'name'+ (isSelect ? ' selected' : '')">{{ name }}</span>
    </div>
</template>
<script>
    const _appItems = [];
    export default {
        props: ["icon", "selected", "name", "href"],
        data () {
            return {
                isSelect: this.selected,
                isHover: false
            }
        },
        mounted () {
            _appItems.push(this);
            window.addEventListener('pageshow', e => {
                e.persisted && this.resetSelect();
            }, false);
        },
        methods: {
            resetSelect () {
                _appItems.forEach(item => {
                   item.isSelect = item.selected;
                   item.isHover = false;
                });
            },
            changeSelect () {
                this.isSelect = true;
                this.isHover = true;
                _appItems.forEach(item => {
                    if(item !== this) item.isSelect = false;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../common/style/mixin";
    .nav-item{
        text-align: center;
        @include wh(100%, 98px);
        @include display-flex;
        @include flex-wrap(wrap);
        @include align-content(flex-start);
        @include justify-content(center);
        i{
            margin-top: rem(12px);
        }
        .name{
            padding-top: rem(6px);
            display: block;
            width: 100%;
            @include font-size(22px);
        }
    }
</style>
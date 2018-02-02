<template>
    <div class="m-choose">
        <div class="back"></div>
        <div class="search">
            <input type="text" placeholder="深圳">
            <div class="clear">x</div>
        </div>
        <div class="map">地图</div>
    </div>
</template>
<script>
import address from './address';
export default {
  
}
</script>
<style lang="scss" scoped>
@import '../../common/style/mixin';
.m-choose {
    @include display-flex();
    @include align-items(center);
    padding: rem(10px 30px);
    font-size: rem(28px);
    line-height: rem(56px);
    background: #ffffff;
    .back {
        position: relative;
        padding-right: rem(30px);
        width: rem(40px);
        height: rem(40px);
        @include arrows-l();
        &:after,&:before {
            top: rem(8px);
        }
    }
    .search {
        @include display-flex();
        @include justify-content(space-around);
        @include align-items(center);
        padding: rem(0 20px);
        flex: 1; 
        border-radius: rem(28px);
        background: #e0dfdf;
        input {
            width: 100%;
            line-height: normal;
            border: none;
            color: #434343;
        }
    }
    ::-webkit-input-placeholder {
        font-size: rem(30px);
        color:#434343;
    }
    .clear {
        padding: rem(0 10px);
        font-size: rem(40px);
        font-weight: bold;
        color: #ffffff;
    }
    .map {
        padding-left: rem(20px);
    }
}
</style>


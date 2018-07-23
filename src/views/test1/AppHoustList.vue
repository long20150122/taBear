<template>
    <div class="houses-wrapper">
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>
        <div class="house-item">
            <img :src="src" alt="" class="icon">
            <p class="name">test</p>
            <p class="detail">11111111111111</p>
        </div>

    </div>
</template>

<script>
import viewport from 'vlib/comp/viewport'
export default {
    props: ["options", "proxy"],
    components: {
    },
    data () {
        return {
            src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3818875725,2338514230&fm=200&gp=0.jpg',
        }
    },
    mounted () {},
    methods: {}
}

</script>

<style lang="scss">
    @import '../../common/style/common';
    body {
        background: #fff;
    }
    .houses-wrapper {
        background: #fff;
        @include display-flex();
        @include flex-flow(wrap);
        padding: r(20);
        .house-item {
            width: r(320);
            height: r(200);
            margin: r(10);
            .icon {
                width: 100%;
                height: 70%;
            }
            .name {

            }
            .detail {

            }         

        }

    }
</style>

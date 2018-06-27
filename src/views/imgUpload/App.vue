<template>
    <div class="wrapper">

        <!-- <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items> -->
        <div class="header-wrapper">
            所有照片
            <div class="next">
                下一步
                <div class="num">1</div>
            </div>
        </div>
        <div class="img-wrapper">
<!--             <div class="item1"><img src="" alt=""></div>
            <div class="item2"><img src="" alt=""></div>
            <div class="item3"><img src="" alt=""></div>
            <div class="item4"><img src="" alt=""></div>
            <div class="item5"><img src="" alt=""></div>
            <div class="item6"><img src="" alt=""></div>
            <div class="item7"><img src="" alt=""></div>
            <div class="item8"><img src="" alt=""></div>
            <div class="item9"><img src="" alt=""></div> -->
            <div class="item" v-for="item in imgArr" >
                <img :src="item" alt="">
            </div>
        </div>

        <input type="file" id="photo_pick"  accept="image/*" multiple="multiple">

    </div>
</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'
import Vue from 'vue'

export default {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
    },
    data () {
        return {
            imgArr: [],
        }
    },
    created () {

    }, 
    mounted () {
        let vm = this;
        Vue.nextTick(function() {
            // $("#photo_pick").change(function(){
            document.querySelectorAll("#photo_pick")[0].addEventListener('change', function(){
                // $(".progress_dialog").show();
                if (!this.files.length) return;
                var files = Array.prototype.slice.call(this.files);
                if (files.length > 9) {
                    alert("最多同时只可上传9张图片");
                    return;
                }
                vm.imgArr = [];
                files.forEach(function (file, i) {
                    var reader = new FileReader();
                    reader.onload=function(){
console.log(reader.result);
                        vm.imgArr.push(reader.result);
                        /*var imgO = document.createElement("img");
                        imgO.src = reader.result;*/
                    }
                    reader.readAsDataURL(file);
                    // $(".progress_dialog").hide();
                });
            }, false);
        })

    },
    methods: {}
}

</script>

<style lang="scss">
    @import '../../common/style/common.scss';
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    .header-wrapper {
        position: relative;
        height: r(80);
        width: 100%;
        line-height: r(80);
        font-size: r(32);
        color: #132456;
        text-align: center;
        background-color: #fff;
        .next {
            position: absolute;
            top: r(10);
            right: r(20);
            font-size: r(24);
            text-align: center;
            height: r(60);
            padding: 0 r(20);
            text-align: center;
            line-height: r(60);
            color: #fff;
            background-color: #ff0000;
            border-radius: r(30);
            .num {
                position: absolute;
                top: r(-10);
                right: r(-10);
                width: r(36);
                height: r(36);
                border-radius: 50%;
                border: r(2) solid #fff;
                font-size: r(24);
                text-align: center;
                line-height: r(40);
                color: #fff;
                background-color: green;
            }
        }
    }
    .img-wrapper {
        @include display-flex();
        @include flex-wrap(wrap);
        @include justify-content(center);
        @include align-items(center);
        div {
            width: r(220);
            height: r(220);
            background-color: #123456;
            margin: r(10);
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>

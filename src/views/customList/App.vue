<template>
    <div class="wrapper">
        <!-- <app-nav-items v-if="options.bottomNavItems">
            <app-item icon="home" selected="true" name="推荐"></app-item>
            <app-item icon="find" :href="options.bottomNavItems[1]" name="发现"></app-item>
            <app-item icon="store" :href="options.bottomNavItems[2]" name="商城"></app-item>
            <app-item icon="me" :href="options.bottomNavItems[3]" name="我的"></app-item>
        </app-nav-items> -->
        <div class="add-btn" @click="goCustom">添加需求</div>
        <custom-item :rows="customListDate"></custom-item>

    </div>
</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'
import customItem from './item'

export default {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
        customItem
    },
    data () {
        return {
            customListDate: {}
        }
    },
    created() {
        this.customListDate = [{
            'customName': '淘宝计划',
            'name': '马云'
        },
        {
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },
        {
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },{
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },
        {
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },{
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },
        {
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },{
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        },{
            'customName': '淘宝计划',
            'name': '马云'
        },
        {
            'customName': '小米计划',
            'name': '雷军'
        },{
            'customName': '京东计划',
            'name': '雷杰'
        }];
    },
    mounted () {},
    methods: {
        goCustom() {
            location.href = '/counter.html';//'/calander.html';
        }
    }
}

</script>

<style lang="scss">
    // @import '../../common/style/reset';
    // @import '../../common/style/mixin';
    @import '../../common/style/common.scss';
    .wrapper {
        .add-btn {
            width: r(680);
            height: r(100);
            line-height: r(100);
            font-size: r(30);
            color: #ff9000;//$c-rule;
            border: r(1) solid #ccc;
            margin: 0 auto;
            text-align: center;
            background-color: #fff;
            border-radius: r(50);
            margin-top: r(10);
        }
    }
</style>

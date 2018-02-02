<template>
    <div class="m-status">
        <div class="status-one" v-if="status == 0">
            订单提交成功，等待房东确认
        </div>
        <div class="status-two" v-if="status == 1">
            订单：待支付
        </div>
        <div class="status-box">
            <div>
                <i class="circle action"></i>
                <i class="line action"></i>
                <i class="circle action"></i>
                <i class="line"></i>
                <i class="circle"></i>
                <i class="line"></i>
                <i class="circle"></i>
            </div>
            <div class="msg">
                <div class="action1">提交订单</div>
                <template v-if="status == 0">
                    <div class="action1">房东确认中</div>
                    <div>支付</div>
                </template>
                <template v-if="status == 1">
                    <div>支付</div>
                    <div>房东确认中</div>
                </template>
                <div>预定成功</div>
            </div>
        </div> 
    </div>
</template>
<script>
export default {
    props: ["options"],
    data() {
        return {
            status: this.options.status || 0,
        }
    },
    computed: {
        
    },
    methods: {
        
    }

}
</script>
<style lang="scss" scoped>
@import '../../common/style/mixin';
.m-status {
    .action {
        background: #13b313 !important;
    }
    .action1 {
        color: #13b313;
    }
    .status-one, .status-two {
        font-size: rem(36px);
        line-height: rem(150px);
        text-align: center;
        color: #13b313;
    }
    .circle {
        width: rem(30px);
        height: rem(30px);
        border-radius: 50%;
        background: #cccccc;
    }
    .status-box {
        &>div:nth-child(1) {
            @include display-flex();
            @include justify-content(center);
            @include align-items(center);
        }
        .msg {
            @include display-flex();
            font-size: rem(26px);
            line-height: rem(100px);
            text-align: center;
            color: #cccccc;
            div {
                flex:1;
            }
        }
    }
    .line {
        width: rem(150px);
        height: rem(5px);
        background: #cccccc;
    }
}
</style>

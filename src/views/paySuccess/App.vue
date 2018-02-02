<template>
    <div class="m-paySuccess">
        <div class="status">
            <div><img src="https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1004473536,3706274239&fm=85&s=7AA2356243C766E14EE430C60000A0B3" alt=""></div>
            <div>支付成功，等待房东确认</div> 
        </div>
        <div class="status-box">
            <div>
                <i class="circle action"></i>
                <i class="line action"></i>
                <i class="circle action"></i>
                <i class="line action"></i>
                <i class="circle action"></i>
                <i class="line"></i>
                <i class="circle"></i>
            </div>
            <div class="msg">
                <div class="action1">提交订单</div>
                <template v-if="status == 0">
                    <div class="action1">房东确认中</div>
                    <div class="action1">支付</div>
                </template>
                <template v-if="status == 1">
                    <div class="action1">支付</div>
                    <div class="action1">房东确认中</div>
                </template>
                <div>预定成功</div>
            </div>
        </div> 
        <div class="text">
            <p>重要提示：</p>
            <p>房东将会在30分钟内确认该订单，请关注订单状态。</p>
        </div>
        <div class="buttons">
            <div>查看订单</div>
            <div>关闭</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["options"],
    data() {
        return {
            status: this.options.status || 1
        }
    }
}
</script>
<style lang="scss">
@import '../../common/style/mixin';
    .action {
        background: #13b313 !important;
    }
    .action1 {
        color: #13b313;
    }
    .status {
        @include display-flex();
        @include justify-content(center);
        flex-direction: column;
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
    .text {
        padding: rem(30px 20px 20px 30px);
        p:nth-child(1) {
            font-size: rem(36px);
            color: #ff9600;
        }
        p:nth-child(2) {
            padding-top: rem(20px);
            font-size: rem(28px);
            color: #cccccc;
        }
    }
    .buttons {
        margin-top: rem(100px);
        padding: rem(30px 30px);
        @include display-flex();
        @include justify-content(space-between);
        div {
            width: rem(300px);
            font-size: rem(28px);
            line-height: rem(80px);
            text-align: center;
            border: 1px solid #333333;
            border-radius: rem(10px);
        }
    }
</style>

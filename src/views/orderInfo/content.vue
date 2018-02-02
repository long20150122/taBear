<template>
    <div class="m-content">
        <div class="order">
            <div class="order-num">订单号：{{orderNum}}</div>
            <div class="details">
                <div>
                    <div>入离日期</div>
                    <div>2017-12-26至2017-12-27</div>
                </div>
                <div>
                    <div>古韵榻榻米房</div>
                    <div>￥150x1</div>
                </div>
                <div>
                    <div>平台抵用券</div>
                    <div>-¥10x1</div>
                </div>
                <div class="phone">
                    <div>手机号：11111111</div>
                    <div class="total">总金额 ¥140</div>
                </div>
            </div>
        </div>
        <div class="text">
            <p>重要提示：</p>
            <template v-if="status == 0">
                <p>房东将会在30分钟内确认该订单，请关注订单状态。</p>
            </template>
            <template v-if="status == 1">
                <p>我们已经为您保留房间，请在30分钟内完成支付。如果订单在30分钟没有完成支付，系统将自动取消该订单。</p>
            </template>
        </div>
        <template v-if="status == 0">
            <div class="goOrder">
                <div>查看订单</div> 
            </div>
        </template>
        <template v-if="status == 1">
            <div class="footer">
                <div>线上支付<span class="money">¥{{payment}}</span></div>
                <div @click="submit">支付</div>
            </div>
        </template> 
    </div>
</template>
<script>
export default {
    props: ["options"],
    data() {
        return {
            status: this.options.status || 0,
            orderNum: 1234343432,
            payment: 111
        }
    },
    methods: {
        submit() {
            console.log("submit");
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/style/mixin';
.m-content {
    .order {
        padding: rem(20px 20px 20px 30px);
    }
    .order-num {
        font-size: rem(30px);
        line-height: rem(100px);
        color: #333333;
        border-top: 1px solid #cccccc;
    }
    .details {
        &>div {
            @include display-flex();
            @include justify-content(space-between);
            @include align-items(center);
            font-size: rem(28px);
            line-height: rem(50px);
            color: #cccccc;
        }
        .phone {
            padding: rem(20px 0);
            border-bottom: 1px solid #cccccc;
        }
        .total {
            font-size: rem(40px);
            color: #ff9600;
        }
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
    .goOrder {
        @include display-flex();
        @include justify-content(center);
        margin-top: rem(100px);
        >div {
            width: rem(300px);
            font-size: rem(28px);
            line-height: rem(80px);
            text-align: center;
            border: 1px solid #333333;
            border-radius: rem(10px);
        }
        
    }
    .footer {
        @include display-flex();
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #ffffff;
        >div{
            flex:1;
            font-size: rem(30px);
            line-height: rem(100px);
            text-align: center;
            &:nth-child(2) {
                color: #ffffff;
                background: #ff9600;
            }
        }
        .money {
            margin-left: rem(10px);
            color: #ff9600;
        }
    }
}
</style>

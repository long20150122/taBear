<template>
    <div class="m-onlineOrder">
        <div class="header">
            <div class="title">订单填写</div>
            <div class="info">
                <div class="pic"><img src="" alt=""></div>
                <div class="desc">
                    <div>深圳青春时光公寓</div>
                    <div>整套出租</div>
                    <div>宜居1人/1床</div>
                </div>
            </div>
            <div class="date">
                <div>
                    <yd-cell-group>
                        <yd-cell-item>
                            <yd-datetime type="day" v-model="startTime" slot="right"></yd-datetime>
                        </yd-cell-item>
                        ({{weekday[weekdayOne]}}) 至 ({{weekday[weekdayTwo]}})
                        <yd-cell-item>
                            <yd-datetime type="day" v-model="endTime" slot="right"></yd-datetime>
                        </yd-cell-item>
                    </yd-cell-group>    
                </div>
                <div>共{{totalDay}}天</div>
            </div>
        </div>
        <div class="main">
            <div class="numHouse">
                <div>房屋套数</div>
                <div class="house" @click="number">
                    <span class="reduce">-</span>
                    <span>{{numHouse}}套</span>
                    <span class="add">+</span>
                </div>
            </div>
            <div class="numHuman">
                <div>入住人数</div>
                <div class="human" @click="number">
                    <span class="reduce">-</span>
                    <span>{{numHuman}}人</span>
                    <span class="add">+</span>
                </div>
            </div>
            <div class="name">
                <div>入住人</div>
                <div><input type="text" placeholder="请输入入住人姓名"></div>
            </div>
            <div class="phone">
                <div>手机号</div>
                <div>{{phone}}</div>
            </div>
        </div>
        <div class="discount">
            <p>优惠使用</p>
            <div class="coupon">
                <div>平台优惠抵用券-¥{{discount}}</div>
                <div>-¥{{discount}}</div>
            </div>
        </div>
        <div class="footer">
            <div>总金额<span class="money">¥{{payment}}</span></div>
            <div @click="submit">提交订单</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["options"],
    data() {
        console.log(this);
        return{
            numHouse: 0,
            numHuman: 0,
            phone: 1111111111,
            discount: 20,
            payment: 100,
            startTime: `${parseInt((new Date().getMonth()))+1}-${(new Date()).getDate()}`,
            endTime: `${parseInt((new Date().getMonth()))+1}-${(new Date()).getDate()}`,
            weekdayOne: '',
            weekdayTwo: '',
            weekday: ['周日', '周一','周二','周三','周四','周五','周六'],
            totalDay: 1,
        }
    },
    methods: {
        submit() {
            console.log("submit11");
        },
        number(ev) {
            const vm = this;
            let isHouse = ev.target.parentNode.className == 'house' || false;
            if(ev.target.className == 'reduce') {
                isHouse ? (vm.numHouse > 0 ? vm.numHouse-- : 0) :  (vm.numHuman > 0 ? vm.numHuman-- : 0);
            } 
            if(ev.target.className == 'add') {
                isHouse ? vm.numHouse++ : vm.numHuman++;
            }
        },
        getWeek() {
            const vm = this;
            let dateOne = new Date();
            let dateTwo = new Date();
            let startTimeArr = vm.startTime.split("-");
            let endTimeArr = vm.endTime.split("-");
            let countdown = startTimeArr[0] > endTimeArr[0] ? false : true;
            let year = dateOne.getFullYear();
            dateOne.setFullYear(year, parseInt(startTimeArr[0])-1, parseInt(startTimeArr[1]));
            dateTwo.setFullYear(countdown ? year : year+1, parseInt(endTimeArr[0])-1, parseInt(endTimeArr[1]));
            vm.weekdayOne = dateOne.getDay();
            vm.weekdayTwo = dateTwo.getDay();
            let totalDay = (dateTwo.getTime() - dateOne.getTime())/(24*60*60*1000);
            vm.totalDay = totalDay+1; 
        }
    },
    watch: {
        startTime() {
            this.getWeek();
        },
        endTime() {
            this.getWeek();
        }
    }
}
</script>
<style lang="scss">
@import '../../common/style/reset.scss';
@import '../../common/style/mixin';
body {
    background: #f2f2f2;
}
.m-onlineOrder {
    .header,.main,.discount {
        background: #ffffff;
    }
    .title {
        font-size: rem(36px);
        line-height: rem(100px);
        text-align: center;
    }
    .info {
        @include display-flex();
        padding: rem(30px 20px);
        border-top: 1px solid #000000;
        .pic {
            width: rem(150px);
            height: rem(150px);
            background: red;
        }
        .desc {
            padding-left: rem(20px);
            div:nth-child(1) {
                font-size: rem(36px);
                color: #333333;
            }
            div:nth-child(2) {
                padding-top: rem(20px);
                font-size: rem(28px);
                color: #cccccc;
            }
            div:nth-child(3) {
                padding-top: rem(20px);
                font-size: rem(24px);
                color: #cccccc;
            }
        }
    }
    .date{
        @include display-flex();
        @include justify-content(space-between);
        @include align-items(center);
        margin: rem(0 20px);
        padding: rem(15px 0);
        font-size: rem(28px);
        border-top: 1px solid #cccccc;
        .yd-cell {
            @include display-flex();
            @include align-items(center);
        }
        .yd-cell:after,.yd-cell-item:not(:last-child):after{
            content: none;
        }
        .yd-cell-box {
            margin-bottom: 0;
        }
        .yd-datetime-input {
            font-size: rem(28px);
        }
    }
    .main {
        margin-top: rem(20px);
        padding: rem(0 20px);
        >div {
            @include display-flex();
            @include justify-content(space-between);
            @include align-items(center);
            font-size: rem(28px);
            line-height: rem(80px);
            border-bottom: 1px solid #f2f2f2;
        }
        .name>div:nth-child(2) {
            font-size: rem(28px);
            text-align: right;
        }
        .add,.reduce {
            display: inline-block;
            width: rem(40px);
            height: rem(40px);
            border: 1px solid #333333;
            line-height: rem(40px);
            text-align: center;
        }
        .reduce+span {
            padding: rem(0 10px);
        }
        input {
            width: rem(250px);
            font-size: rem(30px);
            border: none;
            line-height: normal;
            text-align: right;
        }
    }
    
    ::-webkit-input-placeholder {
        font-size: rem(30px);
        color: #cccccc;
    }
    .discount {
        padding: rem(20px);
        margin-top: rem(20px);
        p{
            font-size: rem(24px);
            font-weight: bold;
        }
        .coupon {
            @include display-flex();
            @include justify-content(space-between);
            margin-top: rem(20px);
            font-size: rem(24px);
            color: #cccccc;
            >div:nth-child(2) {
                color: #ff9600;
            }
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


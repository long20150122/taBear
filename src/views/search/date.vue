<template>
    <div class="m-date">
        <div class="tabs">
            <div @click="close">&nbsp;&nbsp;X&nbsp;&nbsp;</div>
            <div>日期选择</div>
            <div>清除</div>
        </div>
        <div class="date">
            <div class="time">
                <div>入住日期</div><div>12月27日</div>
            </div>
            <div><span>共一晚</span></div>
            <div class="time">
                <div>退房日期</div><div>12月28日</div>
            </div>
        </div>
        <div class="calendar">
            <div class="began-time">{{beganTime}}</div>
            <div class="week">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span></div>
            <div class="table-time">
                <template v-for="item in this.dateData">
                    <span>
                        <i>{{item["day"]}}</i>
                    </span>
                </template>
            </div>
        </div>
        <div class="save">保存</div>
    </div>
</template>
<script>
export default {
    props: ["options"],
    data() {
        return {
            beganTime: `${(new Date().getFullYear())}年${(new Date()).getMonth()+1}月`,
            isLeapYear: ((new Date()).getFullYear()%4 == 0) && ((new Date()).getFullYear()%100 != 0),
            dateData: [],
            baseMonth: (new Date()).getMonth()+1,
            baseYear: (new Date()).getFullYear(),
            baseDay: 1
        }
    },
    beforeMount() {
        const vm = this;
        let dayCount = 30;
        if(vm.baseMonth == 1 || vm.baseMonth == 3 || vm.baseMonth == 5 || vm.baseMonth == 7 || vm.baseMonth == 8 || vm.baseMonth == 10 || vm.baseMonth == 12) {
            dayCount = 31;
        } else if (vm.baseMonth == 2 && vm.isLeapYear) {
            dayCount = 29;
        } else if (vm.baseMonth == 2 && !vm.isLeapYear) {
            dayCount = 28;
        }
    
        let beganWeek = new Date((new Date()).setFullYear(vm.baseYear, vm.baseMonth-1, vm.baseDay)).getDay();

        for(var i = 0, len = 42; i < len; i++) {
            if(i == beganWeek || (i > beganWeek && vm.baseDay <= dayCount)) {
                vm.dateData[i] = {
                    day: vm.baseDay,
                    index: i+1
                }
                vm.baseDay++; 
            } else {
                vm.dateData[i] = {
                    day: '',
                    index: i+1
                } 
            }
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
}
</script>
<style lang="scss">
@import '../../common/style/mixin';
.m-popup {
    height: 100%;
    >div {
        height: 100%;
    }
    >div>div {
        height: 100%;
    }
}
.m-date {
    width: rem(750px);
    color: #434343;
    background: #ffffff;
    @mixin common {
        @include display-flex();
        @include align-items(center);
        >div:nth-child(2) {
            flex: 1;
            text-align: center;
        }
    }
    .tabs {
        @include common();
        padding: rem(0 20px);
        font-size: rem(28px);
        line-height: rem(70px);
        background: #ecebeb;
    }
    .date {
        @include common();
        padding: rem(40px 80px);
        span {
            padding: rem(10px);
            font-size: rem(24px);
            border: 1px solid #ecebeb;
            border-radius: rem(23px);
        }
    }
    .time {
        text-align: center;
        >div:nth-child(1) {
            font-size: rem(28px);
            color: #d6caca;
        }
        >div:nth-child(2) {
            padding-top: rem(20px);
            font-size: rem(36px);
        }
    }
    .save {
        clear: both;
        font-size: rem(28px);
        line-height: rem(80px);
        text-align: center;
        background: #e6c50a;
    }
    .calendar {
        margin-top: rem(30px);
        padding: rem(20px);
    }
    .began-time {
        font-size: rem(26px);
        font-weight: 600;
        color: #000000;
    }
    .week {
        @include display-flex();
        margin-top: rem(20px);
        font-size: rem(26px);
        line-height: rem(70px);
        color: #434343;
        background: rgba(213, 225, 236, 0.5);
        >span {
            flex: 1;
            text-align: center;
        }
    }
    .table-time {
        padding: rem(20px 0);
        span {
            float: left;
            display: inline-block;
            height: rem(80px);
        }
        i {
            display: inline-block;
            width: rem(101px);
            height: rem(80px);
            font-size: rem(24px);
            line-height: rem(80px);
            text-align: center;
            color: #434343;
        }
    }
}
</style>


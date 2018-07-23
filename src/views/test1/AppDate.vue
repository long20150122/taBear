<template>
    <div class="calendar-wrapper">
        <!-- 日历组件 -->
        <div class="title-wrapper">
            <div class="title">选择日期</div>
            <i class="icon-dialog-close"></i>
        </div>
        <div class="week-wrapper">
            <div class="week-item color-item">周日</div>
            <div class="week-item">周一</div>
            <div class="week-item">周二</div>
            <div class="week-item">周三</div>
            <div class="week-item">周四</div>
            <div class="week-item">周五</div>
            <div class="week-item color-item">周六</div>
        </div>
        <div class="date-wrapper">
            <i class="icon-left" @click="prevMonth"><</i>
            <p class="year-month">{{year}}年{{month+1}}月</p>
            <i class="icon-right" @click="nextMonth">></i>
        </div>
        <div class="day-wrapper" :year='year' :month='month'><!-- @click="selectDate" -->
            <!-- <div class="day-item">1</div>
            <div class="day-item">2</div>
            <div class="day-item">35</div> -->

            <div class="day-item" v-for="item in dateArr" @click="getDate(item)" :class=" month == monthArr[0] && ((item >= classArr[0] && item <= classArr[1]) || (classArr.length == 1 && item == classArr[0])) ?'select-bg':''"  ref="date" :key="item" :data-item="item">
                <div class="date-content" v-if="item > 0">
                    <!-- <div v-if="type === 'A'">A</div>
                    <div v-else-if="type === 'B'">B</div>
                    <div v-else-if="type === 'C'">C</div>
                    <div v-else>Not A/B/C</div> -->
                    <p>{{item}}</p>
                    <p>¥200</p>
                </div>
            </div>
        </div>
        <div class="btn">保存</div>

    </div>

</template>

<script>
// import appHeader from './Header.vue'
// import appContent from './Content.vue'
import viewport from 'vlib/comp/viewport'
import closest from 'lib/dom/closest'


import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
console.log(Slider);
Slider.props.showPagination = false;
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);


export default {
    props: ["options", "proxy"],
    components: {
        // appHeader,
        // appContent
    },
    data () {
        return {
            src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4202999563,2452815770&fm=27&gp=0.jpg',
            dateArr: [],
            curYear: 0,
            curMonth: 0,
            curDay: 0,
            year: 0,
            month: 0,
            active: 100,
            classArr: [],
            monthArr: [],
            yearArr: []
        };
    },
    beforeMount () {
        var nowdays = new Date();
        this.curYear = nowdays.getFullYear();
        this.curMonth = nowdays.getMonth();
        this.curDay = nowdays.getDate();
        this.year = nowdays.getFullYear();
        this.month = nowdays.getMonth();
        var tDate = new Date(this.year, this.month+1, 0);
        var curDateWeek = new Date(this.year, this.month, 1);
        var lastDay = tDate.getDate();
        var week = curDateWeek.getDay();
        var flag = true;
        var j = 0;
        for (var i = 1; i <= 42; i++) {
            if (flag && i-1 < week) {
                this.dateArr.push(0)
            } else {
                flag = false;
                var d = i-week;
                if (d > lastDay) {
                    this.dateArr.push(0);
                } else {
                    this.dateArr.push(d);
                }
            }  
        }

    },
    mounted () {
        // this.$post('/data.json',{}, true).then(res => {
        //     alert(1);
        // })
    },
    methods: {
        prevMonth: function (e) {
            if (this.month == 0) {
                this.month = 11;
                this.year = this.year - 1;
            } else {
                this.month = this.month - 1;
            }
            this.dateChange();
        },
        nextMonth: function (e) {
            if (this.month == 11) {
                this.month = 0;
                this.year = this.year + 1;
            } else {
                this.month = this.month + 1;
            }
            this.dateChange();
        },
        dateChange: function () {
            var tDate = new Date(this.year, this.month+1, 0);
            var curDateWeek = new Date(this.year, this.month, 1);
            var lastDay = tDate.getDate();
            var week = curDateWeek.getDay();
            var flag = true;
            var j = 0;
            this.dateArr = [];
            for (var i = 1; i <= 42; i++) {
                if (flag && i-1 < week) {
                    this.dateArr.push(0)
                } else {
                    flag = false;
                    var d = i-week;
                    if (d > lastDay) {
                        this.dateArr.push(0);
                    } else {
                        this.dateArr.push(d);
                    }
                }  
            }
        },
        // selectDate: function (e) {
        //     // console.log(e.target);
        //     var curNode = closest(e.target,"[class='day-item']");
        //     // console.log(curNode.classList);
        //     curNode.classList.add('select-bg');
        //     console.log(curNode.)
        //     // console.log(this.refs.date);
        // },
        getDate: function (day) {
            console.log(day);

            if (day == 0) return;
            if (this.classArr.length == 2) {
                this.classArr = [];
                this.monthArr = [];
                this.yeraArr= [];
            }
            if (this.classArr.length === 0) {
                this.classArr.push(day);
                this.monthArr.push(this.month);
                this.yearArr.push(this.year);
            } else {
                if (this.classArr[0] == day) {
                    this.classArr = [];//清空
                    this.monthArr = [];
                    this.yearArr = [];
                    console.log("清空");
                } else {
                    var fv = this.classArr[0];//升序
                    if (fv > day) {
                        var tmp = fv;
                        fv = day;
                        day = tmp;
                        this.classArr=[];
                        this.classArr.push(fv);
                        this.classArr.push(day);
                        this.monthArr.push(this.month);
                        this.yearArr.push(this.year);
                    } else {
                        this.classArr.push(day);
                        this.monthArr.push(this.month);
                        this.yearArr.push(this.year);
                    }
                    // for (var i=fv; i<=day; i++) {
                    //     this.classArr.push(i);
                    // }
                }
            }

// //不跨月
// (item >= classArr[0] && item <= classArr[1]) || (classArr.length == 1 && item == classArr[0]);
// // (year >= yearArr[0] && year <= yearArr[1]) || (yearArr.length == 1 && year == yearArr[0])
// (month >= monthArr[0] && month <= monthArr[1]) || (monthArr.length == 1 && month == monthArr[0])

// //跨月
// (item >= classArr[0] && item <= classArr[1]) || (classArr.length == 1 && item == classArr[0]);
// // (year >= yearArr[0] && year <= yearArr[1]) || (yearArr.length == 1 && year == yearArr[0])
// (month >= monthArr[0] && month <= monthArr[1]) || (monthArr.length == 1 && month == monthArr[0])


// //同一个月
// monthArr[0] == monthArr[1] && month == monthArr[0] && ((item >= classArr[0] && item <= classArr[1]) || (classArr.length == 1 && item == classArr[0]))
// //跨两个月
// monthArr[0] != monthArr[1] && ((month == monthArr[0] && (item >= classArr[0])) || (month == monthArr[1] && (item <= classArr[1])))
// //跨三个月

            console.log('classArr',this.classArr);
        }
    },
    watch: {
        // selectDate(e) {
        //     console.log(e);
        //     console.log(e.target);
        // }
    }
}

</script>

<style lang="scss">
    // @import '../../common/style/reset.scss';
    // @import '../../common/style/mixin';
    @import '../../common/style/common';
   .calendar-wrapper {
        width: r(750);
        height: r(1050);
        background-color: #fff;
        .title-wrapper {
            width: r(750);
            height: r(90);
            line-height: r(90);
            text-align: center;
            position: relative;
            .title {
                font-size: r(36);
            }
            .icon-dialog-close {
                position: absolute;
                top: r(22);
                left: r(20);
            }
        }
        .week-wrapper {
            @include display-flex();
            @include justify-content(center);
            @include align-items(center);
            @include flex-wrap(wrap);
            height: r(80);
            width: r(750);
            // padding: r(20);
            // border: r(1) solid #abcdef ;
            background-color: #FAFAF9;
            .week-item {
                @include flex(1);
                box-sizing: border-box;
                // width: r(100);
                height: r(80);
                font-size: r(28);
                line-height: r(100);
                text-align: center;
                // border: r(1) solid #abcedf;
            }
        }
        .date-wrapper {
            @include display-flex();
            @include justify-content(space-between);
            width: r(750);
            height: r(90);
            line-height: r(90);
            text-align: center;
            font-size: r(30);
            .icon-left {
                width: r(50);
                text-align: center;
                margin-left: r(50);
            }
            .year-month {
                font-size: r(30);
            }
            .icon-right {
                width: r(50);
                text-align: center;
                margin-right: r(50);
            }

        }
        .day-wrapper {
            @include display-flex();
            @include justify-content(center);
            @include align-items(center);
            @include flex-wrap(wrap);
            // border: r(1) solid #123456;
            .day-item {
                box-sizing: border-box;
                // @include flex(1);
                width: r(106);
                height: r(106);
                // line-height: r(106);
                text-align: center;
                font-size: r(30);
                color: #B4B4B4;
                // border: r(1) solid #123456;
                .date-content {
                    width: r(106);
                    height: r(106);
                    p:nth-child(1) {
                        margin-top: r(25);
                    }
                    p:nth-child(2) {
                        font-size: r(22);
                    }
                }
            }
            .day-item:nth-child(7n+0) {
                color: #ff9000;
            }
            .day-item:nth-child(7n+1) {
                color: #ff9000;
            }
            .select-bg {
                background-color: rgba(255,195,0,0.4);
            }
        }

        .btn {
            @include gradient-horizontal-repeating(#ffc300, #ff9000);
            width: r(610);
            height: r(80);
            margin: 0 auto;
            border-radius: r(40);
            line-height: r(80);
            font-size: r(34);
            color: #fff;
            text-align: center;
        }


   }
   .color-item {
       color: #ff9000;
   }


</style>

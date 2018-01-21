/**
 * 星星评分，适用于10分制
 * @author lzk
 *
 * props:
 * rating  评分
 * mode  10分制或5分制
 * use  用来显示或者用来打分
 *
 * events:
 * ratingChange  点击星星打分时触发
 */
import starRating from './starRating.vue';

starRating.install = (Vue) => Vue.component('star-rating',starRating);

export default starRating;
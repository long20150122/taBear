<template>
    <section class="m-content" :class="{m_top: !image}">
        <!--<div class="hot-title vh-between">-->
            <!--<div v-href="options.href.urlNew">-->
                <!--<span class="name">即将上映</span><i class="icon-double-sided-arrow"></i>-->
            <!--</div>-->
            <!--<div class="hide">-->
                <!--<span class="text">全国影片票房榜</span><i class="arrow-right"></i>-->
            <!--</div>-->
        <!--</div>-->
        <ul class="m-index-tab" v-if="image">
            <li class="item selected">正在热映</li>
            <li class="item" v-href="options.href.urlNew">即将上映</li>
            <li class="item vh-center hide"><span>票房榜</span><i class="arrow-right"></i></li>
        </ul>
        <div class="top-grossing-movie" v-if="films.length > 0">
            <!--<div class="movie-title vh-center hide">-->
                <!--<span class="line"></span><span class="name">票房冠军</span><span class="line"></span>-->
            <!--</div>-->
            <!--<div class="movie-info hide">-->
                <!--<div class="filter-blur">-->
                    <!--<lazy-image src="/images/common/img2.png"/>-->
                    <!--<div class="overlay"></div>-->
                <!--</div>-->
                <!--<div class="notice-image">-->
                    <!--<lazy-image src="/images/common/img2.png"/>-->
                <!--</div>-->
                <!--<div class="info">-->
                    <!--<div class="name"><span class="text">悟空传</span><span class="score">7.8</span></div>-->
                    <!--<div class="type">120分、奇幻/动作/剧情、3D IMAX</div>-->
                    <!--<div class="desc">难道命运真的早已注定?悟空不服,啦啦啦.</div>-->
                    <!--<div class="give-like vh-center" @click="toggle($event, 'top')">-->
                        <!--<i data-type="dislike" :class="likes.dislike_top ? 'icon-dislike-selected' : 'icon-dislike'"></i>-->
                        <!--<span class="line"></span>-->
                        <!--<i data-type="like" :class="likes.like_top ? 'icon-like-selected' : 'icon-like'"></i>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<ul class="photos vh-left">-->
                    <!--<li class="photo"><lazy-image src="/images/common/img2.png" init-src="/images/common/152x152.jpg"/></li>-->
                    <!--<li class="photo"><lazy-image src="/images/common/img2.png" init-src="/images/common/152x152.jpg"/></li>-->
                    <!--<li class="photo"><lazy-image src="/images/common/img2.png" init-src="/images/common/152x152.jpg"/></li>-->
                    <!--<li class="photo"><lazy-image src="/images/common/img2.png" init-src="/images/common/152x152.jpg"/></li>-->
                    <!--<li class="photo"><lazy-image src="/images/common/img2.png" init-src="/images/common/152x152.jpg"/></li>-->
                    <!--<li class="more"><i class="icon-more"></i></li>-->
                <!--</ul>-->
                <!--<div class="activity">-->
                    <!--<span class="icon vh-center">活动</span>-->
                    <!--<span class="text">9.9元看悟空传</span>-->
                <!--</div>-->
                <!--<div class="video-signal">-->
                    <!--<span class="icon vh-center">影讯</span>-->
                    <!--<span class="text">“悟空传"悲情正片片段曝光</span>-->
                <!--</div>-->
                <!--<div class="btn-group vh-center">-->
                    <!--<span class="btn vh-center" @click="openDialog">-->
                        <!--<span class="name">购票</span>-->
                        <!--<span class="sub">9.9元起</span>-->
                    <!--</span>-->
                <!--</div>-->
                <!--<div class="movie-good vh-left">-->
                    <!--<div class="image">-->
                        <!--<img src="/images/common/img2.png"/>-->
                    <!--</div>-->
                    <!--<div class="msg">-->
                        <!--<div class="name">双人套餐B9</div>-->
                        <!--<div class="desc">160z 现调饮料2杯+460z 爆米花…</div>-->
                        <!--<div class="price"><span class="sub">¥</span><span>24</span></div>-->
                    <!--</div>-->
                    <!--<span class="btn vh-center">去选购</span>-->
                <!--</div>-->
            <!--</div>-->
            <div class="movie-title vh-center"><span class="line"></span><span class="name">今日推荐影片</span><span class="line"></span></div>
            <div class="movie-info movie-item" v-for="(item, index) in films">
                <div class="filter-blur" v-href="options.href.urlFilm" :data-query="'film_code='+item.code">
                    <lazy-image :src="item.poster" init-src="/images/common/292x410.jpg"/>
                    <div class="overlay"></div>
                </div>
                <div class="notice-image" v-href="options.href.urlFilm" :data-query="'film_code='+item.code">
                    <lazy-image :src="item.poster" init-src="/images/common/292x410.jpg"/>
                </div>
                <div class="info" v-href="options.href.urlFilm" :data-query="'film_code='+item.code">
                    <div class="name"><span class="text">{{ item.name }}</span><span class="score">{{ item.score }}</span></div>
                    <div class="type">{{ item.duration }}分钟、{{ item.type }}、{{ item.show_type_names }}</div>
                    <div class="desc">{{ item.intro }}</div>
                    <div class="give-like vh-center hide" @click.stop="toggle($event, index)">
                        <i data-type="dislike" :class="likes['dislike_'+index] ? 'icon-dislike-selected' : 'icon-dislike'"></i>
                        <span class="line"></span>
                        <i data-type="like" :class="likes['like_'+index] ? 'icon-like-selected' : 'icon-like'"></i>
                    </div>
                </div>
                <ul class="photos vh-left">
                    <li class="photo" v-for="actor in item.creator.slice(0, 5)"><lazy-image :src="actor.pic" init-src="/images/common/152x152.jpg"/></li>
                    <li class="more hide"><i class="icon-more"></i></li>
                </ul>
                <div class="activity vh-left hide" v-if="item.activity.length > 0">
                    <span class="icon" :class="device">活动</span>
                    <span class="text">{{item.activity}}</span>
                </div>
                <div class="video-signal vh-left" v-if="discoverys[item.code]" v-href="options.href.urlFind" :data-query="'id='+discoverys[item.code].id">
                    <span class="icon" :class="device">影讯</span>
                    <span class="text">{{discoverys[item.code].title}}</span>
                </div>
                <div class="btn-group vh-center">
                    <span class="btn vh-center" v-href="options.href.urlShow" :data-query="'film_code='+item.code">
                        <span class="name">购票</span>
                        <span class="sub">{{item.min_show_price}}元起</span>
                    </span>
                </div>
                <div class="movie-good vh-left" v-if="item.snack">
                    <div class="image">
                        <lazy-image :src="item.snack.image" init-src="/images/common/152x152.jpg"/>
                    </div>
                    <div class="msg">
                        <div class="name">{{ item.snack.name }}</div>
                        <div class="desc">{{ item.snack.type }}</div>
                        <div class="price"><span class="sub">¥</span><span>{{ item.snack.net_price }}</span></div>
                    </div>
                    <span class="btn" :class="device" v-href="options.href.urlSnack">去选购</span>
                </div>
            </div>
        </div >
        <div class="vh-center error-info" v-else>
            <error msg="获取影片失败" refresh="true"></error>
        </div>
        <!--<scroll-load :loading="loading" :node="node" @load="loadData"></scroll-load>-->
    </section>
</template>
<script>
    import dialogManager from 'common/plugin/dialog'
    import viewport from 'vlib/comp/viewport'
    import error from 'common/components/error.vue'

    export default {
        props: {
            options: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                image: this.options.bannerImage && this.options.bannerImage.length > 0,
                films: this.options.data.films,
                discoverys: this.options.data.discoverys || {},
                loading: false,
                node: null,
                device: viewport.getDeviceType() === 'iphone' ? 'iphone vh-center': 'android line-center',
                likes: this.getLikes(this.options.data.films, 0)
            }
        },
        mounted () {
            this.node = this.$el;
        },
        components: {
            error
        },
        methods: {
            openDialog () {
                dialogManager.confirm("返回后您当前选择的座位 将不再保留")
                    .then(function(){
                        dialogManager.wait();
                        setTimeout(() => {
                            dialogManager.closeWait();
                        }, 3000);
                    }).catch(function(){
                    dialogManager.toast("你取消了");
                });
            },
            loadData () {
                this.loading = true;
                setTimeout(() => {
                    this.likes = Object.assign({}, this.likes, this.getLikes(this.options.data.films, this.films.length));
                    this.films = this.films.concat(this.options.data.films);
                    this.loading = false;
                }, 2000);
            },
            getLikes (data, start) {
                let obj = {};
                if(start === 0){
                    obj = {like_top: false, dislike_top: false};
                }
                data.forEach((item, index) => {
                    obj["like_" + (index + start)] = false;
                    obj["dislike_" + (index + start)] = false;
                });
                return obj;
            },
            toggle (ev, index){
                const type = ev.target.dataset.type;
                if(type === "like"){
                    this.likes["like_" + index] = !this.likes["like_" + index];
                    this.likes["dislike_" + index] = false;
                }else if(type === "dislike"){
                    this.likes["dislike_" + index] = !this.likes["dislike_" + index];
                    this.likes["like_" + index] = false;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/mixin";

    //iphone和android
    @mixin iphone($w, $h) {
        &.line-center {
            @include width($w);
            @include lt($h - 2px);
            text-align: center;
        }
        &.vh-center {
            @include wh($w, $h);
            @include box-sizing;
        }
    }

    %title{
        @include font-size(26px);
        padding: rem(34px 0 24px);
        .line{
            @include wh(40px, 1px);
        }
    }
    %item{
        padding-left: rem(20px);
        @include height(70px);
        margin-left: rem(20px);
        .icon{
            @include font-size(18px);
            @include iphone(50px, 30px);
            @include radius(4px);
        }
        .text{
            @include flex(1);
            @extend %ellipsis-basic;
            @include font-size(28px);
            padding-left: rem(10px);
        }
    }
    .m-content{
        padding-bottom: rem(140px);
        &.m_top{
            margin-top: rem(80px);
        }
    }
    .hot-title{
        @include height(80px);
        padding: rem(0 24px);
        @include font-size(28px);
        .name{
            padding-right: rem(10px);
        }
        .text{
            padding-right: rem(10px);
        }
        .arrow-right{
            @include arrow-right;
            margin-right: rem(-10px);
        }
    }
    .error-info{
        @include height(600px);
    }
    .top-grossing-movie{
        padding: rem(0 24px);
       .movie-title{
           @extend %title;
           .name{
               padding: rem(0 24px);
           }
       }
        .movie-info{
            @include radius(10px);
            position: relative;
        }
        .movie-item{
            margin-bottom: rem(54px);
        }
        .filter-blur{
            @include wh(100%, 250px);
            @include radius(10px 10px 0 0);
            overflow: hidden;
            position: relative;
            img{
                width: 120%;
                margin: rem(-10% 0 0 -10%);
                @include filter-blur(10px);
            }
            .overlay{
                @include radius(10px 10px 0 0);
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
        }
        .notice-image{
            @include wh(186px, 254px);
            //@include radius(10px);
            border-radius: rem(10px);
            overflow: hidden;
            position: absolute;
            z-index: 1;
            top: rem(24px);
            left: rem(20px);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            position: absolute;
            z-index: 1;
            left: rem(224px);
            top: 0;
            @include wh(478px, 250px);
            .name{
                padding-top: rem(38px);
                @include font-size(36px);
                @include display-flex;
                .text{
                    padding-right: rem(10px);
                    max-width: rem(230px);
                    @extend %ellipsis-basic;
                }
                .score{
                    display: inline-block;
                }
            }
            .type{
                padding-top: rem(76px);
                width: 100%;
                @extend %ellipsis-basic;
                @include font-size(22px);
            }
            .desc{
                padding-top: rem(22px);
                width: 100%;
                @extend %ellipsis-basic;
                @include font-size(26px);
            }
            .give-like{
                position: absolute;
                top: rem(31px);
                right: rem(20px);
                .line{
                    @include wh(0, 36px);
                    margin: rem(0 26px);
                }
            }
        }
        .photos{
            padding: rem(30px 0 0 3px);
            @include wh(100%, 160px);
            .photo{
                @include wh(80px);
                @include radius(80px);
                overflow: hidden;
                margin: rem(0 17px);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .more{
                @include flex(1);
                text-align: right;
                padding-right: rem(40px);
            }
        }
        .activity,.video-signal{
            @extend %item;
        }
        .btn-group{
            padding: rem(32px 0);
            .btn{
                @include box-sizing;
                @include wh(238px, 72px);
                @include radius(238px);
                .name{
                    @include font-size(36px);
                }
                .sub{
                    padding: rem(14px 0 0 10px);
                    @include font-size(22px);
                }
            }
        }
        .movie-good{
            padding: rem(20px);
            @include radius(0 0 10px 10px);
            overflow: hidden;
            .image{
                @include wh(120px);
                @include radius(5px);
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .msg{
                padding-left: rem(10px);
                @include flex(1);
            }
            .name{
                @include font-size(30px);
                padding-top: rem(6px);
            }
            .desc{
                padding-top: rem(10px);
                @include font-size(22px);
                @extend %ellipsis-basic;
            }
            .price{
                padding-top: rem(20px);
                @include font-size(32px);
                @include display-flex;
                .sub{
                    @include font-size(24px);
                    margin-top: rem(8px);
                }
            }
            .btn{
                @include iphone(138px, 62px);
                @include radius(62px);
                @include font-size(28px);
            }
        }
    }
</style>
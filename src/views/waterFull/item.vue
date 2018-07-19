<template>
	<div>
		<div class="search-wrapper" :class="[showSearch ? 'show-search' : '']" v-show="showSearch">这是搜索框</div>
		<div class="toptap-wrapper" :class="[showTap ? 'show-tap' : '']" v-show="showTap">            
			<div class="title-wrapper">
                <p class="active-tap">推荐</p>
                <p>附近</p>
                <p>海上餐厅</p>
                <p>潜水</p>
                <p>赶海</p>
            </div>
        </div>
		<div class="wrapper" ref="wrapper">
			<div class="md-wrapper">
				<!-- <div class="body-wrapper">
					aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
				</div> -->
				<div class="middle-wrapper">
					<div class="body-wrapper">
						<div class="insearch-wrapper">这是搜索框</div>
						aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

						<div class="zt-wrapper" id="zt-wrapper">
							<div class="zt-item">
								<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1837408469,3117811683&fm=27&gp=0.jpg" alt="">
							</div>
							<div class="zt-item">
								<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1837408469,3117811683&fm=27&gp=0.jpg" alt="">
							</div>
							<div class="zt-item">
								<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1837408469,3117811683&fm=27&gp=0.jpg" alt="">
							</div>
							<div class="zt-item">
								<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1837408469,3117811683&fm=27&gp=0.jpg" alt="">
							</div>
							<div class="zt-item">
								<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1837408469,3117811683&fm=27&gp=0.jpg" alt="">
							</div>
						</div>

						<div class="intoptap-wrapper">            
							<div class="title-wrapper">
				                <p class="active-tap" @click="userSelect">推荐</p>
				                <p @click="userSelect">附近</p>
				                <p @click="userSelect">海上餐厅</p>
				                <p @click="userSelect">潜水</p>
				                <p @click="userSelect">赶海</p>
				            </div>
				        </div>
					</div>
					<div class="box" v-for="item in urlData">
						<div class="pic">
							<img :src="item.imgurl" alt="">
							<h5 class="title">我就是来看看怎么样，哈哈哈哈哈哈哈哈哈</h5>
							<p class="name">longcheng</p>
						</div>
					</div>
				</div>
				<div class="btn-box">{{loaderText}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	props: {
		"rows": [],
	},
	data() {
		return {
			// isMore: '加载更多',
			// scrollObj: null,
			// noImg: false,
			// totalPage: 10,
			// p_num: 1,
			rows: [],
			urlData: [
				{
					imgurl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1345084668,876185986&fm=27&gp=0.jpg',
					imgsize: 1.3333
				},
				{
					imgurl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3927516496,3793093536&fm=27&gp=0.jpg',
					imgsize: 1.1161
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4092422502,3904595983&fm=27&gp=0.jpg',
					imgsize: 0.6636
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1972266652,2177336411&fm=27&gp=0.jpg',
					imgsize: 0.9061
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=460642919,657115180&fm=27&gp=0.jpg',
					imgsize: 1.3333
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2298007433,3253212770&fm=27&gp=0.jpg',
					imgsize: 1.3333
				},
				{
					imgurl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=750006538,2831865258&fm=27&gp=0.jpg',
					imgsize: 1.4706
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=53741873,590739508&fm=27&gp=0.jpg',
					imgsize: 1.3333
				},
				{
					imgurl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=107606063,438385293&fm=27&gp=0.jpg',
					imgsize: 0.7082
				},
				{
					imgurl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4124314118,4132248400&fm=27&gp=0.jpg',
					imgsize: 1.1261
				},
				{
					imgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3398049590,3515909817&fm=27&gp=0.jpg',
					imgsize: 1.2500
				},
				{
					imgurl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1345084668,876185986&fm=27&gp=0.jpg',
					imgsize: 1.3333
				},
				{
					imgurl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3927516496,3793093536&fm=27&gp=0.jpg',
					imgsize: 1.1161
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4092422502,3904595983&fm=27&gp=0.jpg',
					imgsize: 0.6636
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1972266652,2177336411&fm=27&gp=0.jpg',
					imgsize: 0.9061
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=460642919,657115180&fm=27&gp=0.jpg',
					imgsize: 1.3333
				},
				{
					imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2298007433,3253212770&fm=27&gp=0.jpg',
					imgsize: 1.3333
				}
			],
			colArr: [],
			pullup: {},
			scroll: null,
			loaderText: '加载更多',
			longs: 0,
			deviceRid: 2.4,
			showSearch: 0,
			showTap: 0,
			searchTop: 10,//search框的高度
			tapTop: 1020-100-80,//（*）外出div高度减去分类框高度
		}
	},
	components: {
		BScroll
	},
	created(){
		this.rows = this.$props.rows;
	},
	mounted() {
		let vm = this;
		this._initWaterFull(1);
		this.scroll = new BScroll(this.$refs.wrapper, {
		    // pullUpLoad: this.pullup,
		    pullUpLoad: {
			  	threshold: 50
			},
			eventPassthrough: 'horizontal'
		})
		// 是否派发滚动到底部事件，用于上拉加载
        if (this.scroll) {
          	this.scroll.on('pullingUp', (e) => {
				vm.loaderText = '加载中...';
				setTimeout(() => {
					this.$http.get('/data.json', {
					    params: {
					        'link': encodeURI(location.href)
					    }
					}).then((res) => {
						vm.loaderText = '加载成功';
					    if (res.code == 0) {
					        let data = res.data;
					        this.insertDom(data.url);
					    }
						this.scroll.finishPullUp();
					}).catch((err) => {
						vm.loaderText = '加载失败';
						this.scroll.finishPullUp();
					})
				}, 800)
          	})
          	this.scroll.on('scroll', (e) => {
          		if (e.y < -this.searchTop) {
          			this.showSearch = 1;
          		} else {
          			this.showSearch = 0;
          		}
          		if (e.y < -this.tapTop) {
          			this.showTap = 1;
          		} else {
          			this.showTap = 0;
          		}
          	})
        }
		
        // this.$nextTick(function () {
        // 	new McScroll.init('zt-wrapper');
        // })

	},
	methods: {
		_initWaterFull (val) {
			let vm = this;
			let $wrapper = document.querySelectorAll(".wrapper");
			let boxArr = $wrapper[0].querySelectorAll(".box");
			this.calRio(boxArr[0], val);
			let oldLong = this.longs;
			this.longs = boxArr.length; 
			// this.colArr = [];
			boxArr.forEach(function (item, index) {
				if (index < oldLong) return;
				let imgObj = new Image();
				imgObj.src = item.querySelectorAll("img")[0].src;
				/*imgObj.onload = function () {
					vm.waterFull(item, index, vm.urlData[index]["imgsize"]);
				}*/
				vm.waterFull(item, index, vm.urlData[index]["imgsize"]);
				imgObj.onerror = function () {
					let imgo = new Image();
					imgo.src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2659606272,32100834&fm=27&gp=0.jpg'
					imgo.onload = function(){
						vm.setHeight();
					}
				}
			});
			this.scroll && this.scroll.refresh();
		},
		waterFull (item, index, scaleWH) {
			let cacheVal = 0;	//存放小的值
			let cacheIndex = 0;	//存放小值的下标
			if (this.colArr.length >= 2) {

				this.colArr.forEach(function (item1, index1) {
					if (index1 == 0) {
						cacheVal = item1;
					} else {
						if (cacheVal > item1) {
							cacheIndex = 1;
							cacheVal = item1;
						}
					}
				});
				if (cacheIndex) {
					item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;right: 0;';
				} else {
					item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;left: 0;';
				}
				let userCalH = this.calHW(scaleWH);
				this.colArr[cacheIndex] = this.colArr[cacheIndex] + userCalH;// this.colArr[cacheIndex] = this.colArr[cacheIndex] + item.offsetHeight;

			} else {

				if (this.colArr.length == 0) {
					item.style.cssText = 'position: absolute; left: 0;';
				}
				if (this.colArr.length == 1) {
					item.style.cssText = 'position: absolute; right: 0;';
				}
				let userCalH = this.calHW(scaleWH);// this.colArr.push(item.offsetHeight);
				this.colArr.push(userCalH);
			}
			this.setHeight();
		},
		calRio (ele, val) {
			if (val == 1) {//这里只是初始化一些变量，只需执行一次
				let elepic = ele.querySelectorAll(".pic")[0];
				this.deviceRid = 60/(ele.offsetHeight - elepic.offsetHeight);

				//初始化顶部搜索和底部搜索
				this.searchTop = this.searchTop/this.deviceRid;
				this.tapTop = this.tapTop/this.deviceRid;

				const $ele = document.querySelectorAll('.body-wrapper');
				let H = $ele[0].offsetHeight;
				this.colArr = [H,H]; //this.colArr = [300/this.deviceRid, 300/this.deviceRid];//少节点读取但是 每次需要注意300的修改
			}
		},
		calHW (val) {
			//.box padding 30, .pic padding 30, .title height 40, .name height 40
			let dpri = this.deviceRid;
			let H = (260/dpri)/val + (30*2)/dpri + (30*2)/dpri + 40/dpri + 40/dpri;
			return H;
		},
		setHeight () {
			let mWrapper = document.querySelectorAll('.middle-wrapper')[0];
			mWrapper.style.height = ((this.colArr[0] < this.colArr[1]) ? this.colArr[1] : this.colArr[0]) +'px';
			this.$nextTick(()=>{
				this.scroll && this.scroll.refresh()
			})
		},
		insertDom (arr) {
			this.urlData = this.urlData.concat(arr);
			this.$nextTick(()=>{
				this._initWaterFull()
			});
		},
		userSelect () {
			// console.log('tap');
			alert('tap');
		}
	},
	destroy() {

	}
}
</script>

<style lang="scss" scoped>
	@import '../../common/style/common.scss';
	* {
		padding: 0;
		margin: 0;
	}
	html,body {
		background-color: #fff;
	}
	.search-wrapper {
		position: absolute;
		top: 0;
		width: r(750);
		height: r(100);
		z-index: -99;
		line-height: r(100);
		text-align: center;
		font-size: r(30);
		background-color: pink;
	}
	.show-search {
		z-index: 99 !important;
	}
	.show-tap {
		z-index: 99 !important;
	}
	.toptap-wrapper {
		position: absolute;
		top: r(100);
		width: r(750);
		height: r(100);
		background-color: yellow;
		z-index: -99;
		.title-wrapper {
		    height: r(110);
		    width: 100%;
		    font-size: r(30);
		    color: #123456;
		    @include display-flex();
		    @include justify-content(center);
		    @include align-items(center);
		    p {
		        @include flex(1);
		        text-align: center;
		    }
		    .active-tap {
		        position: relative;
		        font-size: r(36) !important;
		        font-weight: bold;
		    }
		    .active-tap:after {
		        content: '';
		        width: r(80);
		        height: r(8);
		        position: absolute;
		        bottom: r(-10);
		        left: 50%;
		        margin-left: r(-40);
		        @include gradient-horizontal(#FFC300, #FF9000);
		        border-radius: r(4);
		    }
		}
	}
	.body-wrapper {
		height: r(1020);
		width: 100%;
		background-color: #123456;
		position: relative;
		.insearch-wrapper {
			// position: absolute;
			position: relative;;
			top: 0;
			width: r(750);
			height: r(100);
			z-index: 90;
			line-height: r(100);
			text-align: center;
			font-size: r(30);
			background-color: pink;
		}
		.zt-wrapper {
			// @include display-flex();
			width: r(750);
			overflow: scroll;
			white-space:nowrap;
			.zt-item {
				width: r(420);
				height: r(220);
				border-radius: r(10);
				display: inline-block;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.intoptap-wrapper {
			// position: absolute;
			// top: r(100);
			position: absolute;
			bottom: 0;
			width: r(750);
			height: r(100);
			background-color: yellow;
			z-index: 90;
			.title-wrapper {
			    height: r(110);
			    width: 100%;
			    font-size: r(30);
			    color: #123456;
			    @include display-flex();
			    @include justify-content(center);
			    @include align-items(center);
			    p {
			        @include flex(1);
			        text-align: center;
			    }
			    .active-tap {
			        position: relative;
			        font-size: r(36) !important;
			        font-weight: bold;
			    }
			    .active-tap:after {
			        content: '';
			        width: r(80);
			        height: r(8);
			        position: absolute;
			        bottom: r(-10);
			        left: 50%;
			        margin-left: r(-40);
			        @include gradient-horizontal(#FFC300, #FF9000);
			        border-radius: r(4);
			    }
			}
		}
	}
	.wrapper {
		position: fixed;
		width: r(750);
		margin: 0 auto;
		top: r(0);
		bottom: 0;
		overflow: hidden;
		background-color: #fff;
	}
	.md-wrapper {
		width: 100%;
		.btn-box {
			text-align: center;
			color: #ff9000;
		}
	}
	.middle-wrapper {
		width: 100%;
		background-color: #fff;
	}
	.box {
		padding: r(30);
	}
	.pic {
		padding: r(30);
		border-radius: r(5);
		border: r(1) solid #ccc;
		box-shadow: 0 0 r(5) #ccc;
		box-sizing: border-box;
		background-color: #fff;
		img {
			width: r(260);
		}
		.title {
			@include line-clamp(1);
			height: r(32);
			width: r(260);
			margin-top: r(8);
			font-size: r(28);
			color: #abcdef;
		}
		.name {
			height: r(40);
			line-height: r(40);
			font-size: r(24);
			color: #ff9000;
		}
	}

</style>
<template>
	<div>
		<div class="body-wrapper">
			aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
		</div>
		<div class="wrapper" ref="wrapper">
			<div class="md-wrapper">
				<div class="middle-wrapper">
					<div class="box" v-for="item in urlData">
						<div class="pic">
							<img :src="item" alt="">
							<h5 class="title">我就是来看看怎么样，哈哈哈哈哈哈哈哈哈</h5>
							<p class="name">longcheng</p>
						</div>
					</div>
				</div>
				<div class="btn-box">{{loaderText}}</div>
			</div>
			<!-- <div class="wrapper-full">			
				<div class="box" v-for="item in rows">
					<div class="pic">
						<img :src="item" alt="">
					</div>
				</div>
				<div class="loading-more"><img v-show="noImg" src="/images/loading.gif" alt="">{{isMore}}
				</div>
			</div> -->
		</div>

	</div>
</template>

<script>
// import Scroll from 'common/components/Scroll.vue'
import BScroll from 'better-scroll'
export default {
	props: {
		"rows": [],
	},
	data() {
		return {
			isMore: '加载更多',
			scrollObj: null,
			noImg: false,
			totalPage: 10,
			p_num: 1,
			rows: [],

			urlData: [
				'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1345084668,876185986&fm=27&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3927516496,3793093536&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4092422502,3904595983&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1972266652,2177336411&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=460642919,657115180&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2298007433,3253212770&fm=27&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=750006538,2831865258&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=53741873,590739508&fm=27&gp=0.jpg',
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=107606063,438385293&fm=27&gp=0.jpg',
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4124314118,4132248400&fm=27&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3398049590,3515909817&fm=27&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1345084668,876185986&fm=27&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3927516496,3793093536&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4092422502,3904595983&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1972266652,2177336411&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=460642919,657115180&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2298007433,3253212770&fm=27&gp=0.jpg',
			],
			colArr: [],
			pullup: {},
			scroll: null,
			loaderText: '加载更多',
			longs: 0,
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
		this._initWaterFull();
		this.scroll = new BScroll(this.$refs.wrapper, {
		    // pullUpLoad: this.pullup,
		    pullUpLoad: {
			  	threshold: 50
			}
		})
		// 是否派发滚动到底部事件，用于上拉加载
        if (this.scroll) {
          this.scroll.on('pullingUp', (e) => {
            // 滚动到底部
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
            	})/*.catch((err) => {
            		vm.loaderText = '加载失败';
            		this.scroll.finishPullUp();
            	})*/
            }, 800)
            /*if (this.p_num < this.totalPage) {
            	this.isMore = '加载中...';
            	setTimeout(() => {
            		// this.getBillListData(false, ++this.p_num, scroll);
            		// this.noImg = true;
            		this.noImg = false;
            		if (scroll) {
            			this.isMore = '没有更多数据了';
            			// this.isMore = '加载完成';
            			scroll.finishPullUp();
            		} else {
            			this.scrollObj.scrollTo(0, 0);
            			this.scrollObj.finishPullUp();
            		}

            	}, 800);
            } else {
            	this.noImg = false;
            	this.isMore = '没有更多数据了'
            }*/


          })
        }
		


	},
	methods: {
		_initWaterFull () {
			let vm = this;
			let $wrapper = document.querySelectorAll(".wrapper");
			let boxArr = $wrapper[0].querySelectorAll(".box");
console.log(boxArr.length);
			let oldLong = this.longs;
			this.longs = boxArr.length; 
console.log("oldLong,newLong==>", oldLong, this.longs);
			// this.colArr = [];
			boxArr.forEach(function (item, index) {
				if (index < oldLong) return;
				let imgObj = new Image();
				imgObj.src = item.querySelectorAll("img")[0].src;
				imgObj.onload = function () {
					vm.waterFull(item, index);
				}
				imgObj.onerror = function () {
					let imgo = new image();

					imgo.src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2659606272,32100834&fm=27&gp=0.jpg'
					imgo.onload = function(){
						vm.setHeight();
					}
				}
			});
			this.scroll && this.scroll.refresh();
		},
		waterFull (item, index) {
			let cacheVal = 0;	//存放小的值
			let cacheIndex = 0;	//存放小值的下标
			console.log("length",this.colArr.length);
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
					console.log("123456=>", cacheIndex);
					item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;right: 0;';
				} else {
					console.log("123456=>", cacheIndex);
					item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;left: 0;';
				}
				this.colArr[cacheIndex] = this.colArr[cacheIndex] + item.offsetHeight;

			} else {

				if (this.colArr.length == 0) {
					item.style.cssText = 'position: absolute; left: 0;';
				}
				if (this.colArr.length == 1) {
					item.style.cssText = 'position: absolute; right: 0;';
				}
				this.colArr.push(item.offsetHeight);
			}
			this.setHeight();
		},
		setHeight () {
			let mWrapper = document.querySelectorAll('.middle-wrapper')[0];
			mWrapper.style.height = ((this.colArr[0] < this.colArr[1]) ? this.colArr[1] : this.colArr[0]) +'px';
			this.$nextTick(()=>{
				console.log((this.colArr[0] < this.colArr[1]) ? this.colArr[1] : this.colArr[0]);
				this.scroll && this.scroll.refresh()
			})
		},
		insertDom (arr) {
			this.urlData = this.urlData.concat(arr);
			console.log('this.urlData==>',this.urlData);
			this.$nextTick(()=>{
				console.log(document.querySelectorAll(".box"));
				this._initWaterFull()
			});

			/*var $box = document.createElement("DIV");
			$box.className = "box";
			var $pic = document.createElement("DIV");
			$pic.className = "pic";
			$box.append($pic);
			var $img = document.createElement("IMG");
			$img.src = item;
			$pic.append($img);
			$ele.append($box);*/
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
	.body-wrapper {
		height: r(300);
		width: 100%;
	}
	.wrapper {
		position: fixed;
		width: r(750);
		margin: 0 auto;
		top: r(300);
		bottom: 0;
		overflow: hidden;
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
	img {
		width: r(260);
	}

</style>
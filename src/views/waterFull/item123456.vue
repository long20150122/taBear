<template>
	<div>
		<!-- <scroll ref="wrapper" class="wrapper"
			:listenScroll="true"
			:pullup="true"
			@scrollToEnd="scrollToEnd"
			@setScroll="setScroll"
			@scroll="scroll">
			<div class="wrapper-full">			
				<div class="box" v-for="item in rows">
					<div class="pic">
						<img :src="item" alt="">
					</div>
				</div>
				<div class="loading-more"><img v-show="noImg" src="/images/loading.gif" alt="">{{isMore}}
				</div>
			</div>
		</scroll> -->
		<div class="wrapper">
			<div class="wrapper-full">			
				<div class="box" v-for="item in rows">
					<div class="pic">
						<img :src="item" alt="">
					</div>
				</div>
				<div class="loading-more"><img v-show="noImg" src="/images/loading.gif" alt="">{{isMore}}
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Scroll from 'common/components/Scroll.vue'
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
		}
	},
	components: {
		Scroll
	},
	created(){
		this.rows = this.$props.rows;
	},
	mounted() {
		console.log('---====',this.$props.rows);
		// this.$refs.wrapper.scrollTo(0, 0);

		let $wrapper = document.querySelectorAll(".wrapper-full");
		var boxArr = $wrapper[0].querySelectorAll(".box");
		var colArr = [];
		boxArr.forEach(function (item, index) {

			console.log(item);
			console.log('item.offsetHeight==>', item.offsetHeight);

			var $img = item.querySelectorAll('img')[0];
			$img.onreadystatechange = function () {
				console.log(1111111);
				if($img.readyState=="complete"||$img.readyState=="loaded"){
					
					console.log(123456);
					if (index <= 1) {
						if (index == 0) {
							item.style.cssText = 'position: absolute; left: 0;';
						}
						if (index == 1) {
							item.style.cssText = 'position: absolute; right: 0;';
						}
						colArr.push(item.offsetHeight);
					} else {
						var cacheVal = 0;	//存放小的值
						var cacheIndex = 0;	//存放小值的下标
						colArr.forEach(function (item, index) {
							if (index == 0) {
								cacheVal = item;
							} else {
								if (cacheVal > item) {
									cacheIndex = 1;
									cacheVal = item;
								}
							}
						});
						if (cacheIndex) {
							item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;right: 0;';
						} else {
							item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;left: 0;';
						}
						colArr[cacheIndex] = colArr[cacheIndex] + item.offsetHeight;
					}

				}
			}
		})
		
		/*this.$nextTick(
			() => {
				let $wrapper = document.querySelectorAll(".wrapper-full");
				var boxArr = $wrapper[0].querySelectorAll(".box");
				var colArr = [];
				boxArr.forEach(function (item, index) {

					console.log(item);
					console.log('item.offsetHeight==>', item.offsetHeight);

					var $img = item.querySelectorAll('img')[0];
					$img.onreadystatechange = function () {
						console.log(1111111);
						if($img.readyState=="complete"||$img.readyState=="loaded"){
							
							console.log(123456);
							if (index <= 1) {
								if (index == 0) {
									item.style.cssText = 'position: absolute; left: 0;';
								}
								if (index == 1) {
									item.style.cssText = 'position: absolute; right: 0;';
								}
								colArr.push(item.offsetHeight);
							} else {
								var cacheVal = 0;	//存放小的值
								var cacheIndex = 0;	//存放小值的下标
								colArr.forEach(function (item, index) {
									if (index == 0) {
										cacheVal = item;
									} else {
										if (cacheVal > item) {
											cacheIndex = 1;
											cacheVal = item;
										}
									}
								});
								if (cacheIndex) {
									item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;right: 0;';
								} else {
									item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;left: 0;';
								}
								colArr[cacheIndex] = colArr[cacheIndex] + item.offsetHeight;
							}

						}
					}
				})
			}
		)*/
		
		/*let $wrapper = document.querySelectorAll(".wrapper-full");
		var boxArr = $wrapper[0].querySelectorAll(".box");
		var colArr = [];
		boxArr.forEach(function (item, index) {
			console.log(item);
			console.log('item.offsetHeight==>', item.offsetHeight);
			if (index <= 1) {
				if (index == 0) {
					item.style.cssText = 'position: absolute; left: 0;';
				}
				if (index == 1) {
					item.style.cssText = 'position: absolute; right: 0;';
				}
				colArr.push(item.offsetHeight);
			} else {
				var cacheVal = 0;	//存放小的值
				var cacheIndex = 0;	//存放小值的下标
				colArr.forEach(function (item, index) {
					if (index == 0) {
						cacheVal = item;
					} else {
						if (cacheVal > item) {
							cacheIndex = 1;
							cacheVal = item;
						}
					}
				});
				if (cacheIndex) {
					item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;right: 0;';
				} else {
					item.style.cssText = 'position: absolute; top: ' + cacheVal + 'px;left: 0;';
				}
				colArr[cacheIndex] = colArr[cacheIndex] + item.offsetHeight;
			}
		})*/

	},
	methods: {
		scroll(pos) {
		},
		setScroll(scroll) {
			this.scrollObj = scroll;
		},
		scrollToEnd(scroll) {
			console.log(123456);
			if (this.p_num < this.totalPage) {
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
			}
		},
	},
	destroy() {

	}
}
</script>

<style lang="scss" scoped>
	@import '../../common/style/common.scss';
	.wrapper {
		position: absolute;
		top: r(120);
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		background: #f7f7f7;
		.wrapper-full {
			position: relative;
			width: r(640);
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
			.box {
				padding: r(10);
			}
			.pic {
				padding: r(10);
				border-radius: r(5);
				border: r(1) solid #ccc;
				box-shadow: 0 0 r(5) #ccc;
				box-sizing: border-box;
				background-color: #fff;
			}
			img {
				width: r(260);
			}
		}
		.loading-more {
			@include display-flex();
			@include align-items(center);
			@include justify-content(center);
		    // display: flex;
		    // align-items: center;
		    // justify-content: center;
		    height: r(50);
		    color: #ff9000;
		    font-size: r(24);
		    img {
		        width: r(14);
		        margin-right: r(4);
		    }
		}
	}

</style>
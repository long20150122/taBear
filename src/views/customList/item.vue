<template>
	<div>
		<scroll ref="wrapper" class="wrapper"
			:listenScroll="true"
			:pullup="true"
			@scrollToEnd="scrollToEnd"
			@setScroll="setScroll"
			@scroll="scroll">
			<div>
				<div class="item" v-for="item in rows">
					<p>{{item.customName}}</p>
					<p>投资人：{{item.name}}</p>
				</div>
				<div class="loading-more"><img v-show="noImg" src="/images/loading.gif" alt="">{{isMore}}
				</div>
			</div>
		</scroll>
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
		}
	},
	components: {
		Scroll
	},
	mounted() {
		this.$refs.wrapper.scrollTo(0, 0);
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
		.item {
			box-sizing: border-box;
			height: r(80);
			line-height: r(80);
			text-align: center;
			margin: r(0 20);
			background-color: #fff;
			font-size: r(28);
			background: #f7f7f7;
	 		@include display-flex();
			p {
				@include flex(1);
			} 
		}
		.loading-more {
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    height: 50px;
		    color: #ff9000;
		    font-size: r(24);
		    img {
		        width: r(14);
		        margin-right: r(4);
		    }
		}
	}

</style>
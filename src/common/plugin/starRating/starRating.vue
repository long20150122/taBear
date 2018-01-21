<template>
<div>
<ul v-if="mode == 5" class="star-rating">
    <li class="item" v-for="(item ,i) in ratingArr" :key="i" :data-index="i"><i :class="`icon-star-${item.text}`"></i></li>
</ul>
<ul v-if="mode == 10" class="star-rating">
    <li class="item" v-for="(item ,i) in ratingArray" :key="i" :data-index="i" @click="onClick"><i :class="`icon-star-${item.text}`"></i></li>
</ul>
</div>

</template>

<script>
    import closest from "lib/dom/closest";

    export default {
        props: {
            rating: {
                type: Number,
                default: 0
            },
            mode: {
                type: Number,
                default: 10
            },
            use: {
                type: String,
                default: "rating"
            }
        },
        data() {
            return {
                total: 5,
                _rating: this.rating
            }
        },
        computed: {
            ratingArr() {
                const arr = [];
                const map = {
                    empty: 0,
                    full: 1
                };
                let total = this.total;
                for (let i = 0; i < total; i++) {
                    if (i < this.$props.rating) {
                        arr[i] = {
                            num: 1,
                            text: "full"
                        }
                    } else {
                        arr[i] = {
                            num: 0,
                            text: "empty"
                        };
                    }
                }

                return arr;
            },
            ratingArray() {
                const vm = this;
                const arr = [];
                let total = vm.total;
                let fullSize = parseInt(vm.rating / 2);
                let isHalf = parseInt(vm.rating % 2);

                for (let i = 0; i < total; i++) {
                    if (i < fullSize) {
                        arr[i] = {
                            text: "full",
                            num: vm.mapMark("full")
                        }
                    } else if (i === fullSize && isHalf) {
                        arr[i] = {
                            text: "half",
                            num: vm.mapMark("half")
                        }
                    } else {
                        arr[i] = {
                            text: "empty",
                            num: vm.mapMark("empty")
                        }
                    }
                }
                return arr;
            }
        },
        components: {

        },
        methods: {
            onClick(ev) {
                const vm = this;
                if (vm.use !== "rating") {
                    return;
                }
                const el = closest(ev.target, ".item");
                vm.setRatingBy(+el.dataset.index);
            },
            setRatingBy(index) {
                index = +index;
                const vm = this;
                let keyItem = vm.ratingArray[index];
                let counter = 0;
                let markNum = keyItem.num;
                for (let i = 0; i < vm.total; i++) {
                    if (i < index) {
                        counter += 2;
                    } if (i === index) {
                        counter += (markNum + 1) % 3;
                        if (vm.rating > counter + 2) {
                            counter += 1;
                        }
                    }
                }
                if (index === 0 && counter === 0) {
                    counter = 1;
                }
                vm.rating = counter;
                vm.$emit("ratingChange", {
                    rating: vm.rating
                });
            },

            mapMark(key) {
                let mapArr = ["empty", "half", "full"];
                const map = {
                    empty: 0,
                    half: 1,
                    full: 2
                };
                if (typeof key === "string") {
                    return map[key];
                }
                if (typeof key === "number") {
                    return mapArr[key];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../style/_mixin.scss";

.star-rating {
    .item {
        display: inline-block;
        min-width: r(40);
        min-height: r(40);

        &+.item {
            margin-left: r(16);
        }
    }
}

</style>

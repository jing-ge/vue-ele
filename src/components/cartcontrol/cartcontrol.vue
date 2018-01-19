<template>
	<div class="cartcontrol">
		<transition name="des">
			<transition name="inner">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
			</transition>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>
<script type="text/javascript">
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    created () {
      // console.log(this.food)
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart () {
        if (!event._constructed) {
          return
        }
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>
<style type="text/css">
	.cartcontrol{
		font-size: 0
	}
	.cart-decrease{
		display: inline-block;
		padding: 6px;
		line-height: 24px;
		font-size: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
	}
	.cart-count{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		text-align:center;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.cart-add{
		display: inline-block;
		padding: 6px;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
	}
	.des-enter-active, .des-leave-avtive{
		opacity: 1;
		transition: all .5s linear;
		transform: translate3d(-12px,0,0);
	}
	.des-enter, .des-leave-to{
		opacity: 0;
		transition: all .5s linear;
		transform: translate3d(24px,0,0);
	}
	.inner-enter-active, .inner-leave-avtive{
		opacity: 1;
		transition: all .5s linear;
		transform: rotate(180deg);
	}
	.inner-enter, .inner-leave-to{
		opacity: 0;
		transition: all .5s linear;
		transform: rotate(0);
	}
</style>
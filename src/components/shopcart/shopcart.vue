<template>
	<div class="shopcart">
		<div class="shopcart-content">
			<div class="content-left">
				<div class="shopcart-logo-wrapper">
					<div class="shopcart-logo" :class="{'shopcarthighlight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'backgroundhighlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="shopcart-price" :class="{'backgroundhighlight':totalPrice>0}">¥{{totalPrice}}元</div>
				<div class="shopcart-desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="shopcart-content-right">
				<div class="shopcart-pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 100,
            count: 1
          }
        ]
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'notenough'
      } else {
        return 'enough'
      }
    }
  }
}
</script>
<style type="text/css">
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	}
	.shopcart-content{
		display: flex;
		background: #141d27;
		font-size: 0;
	}
	.shopcart-content-left{
		flex: 1;
	}
	.shopcart-logo-wrapper{
		display: inline-block;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		height: 56px;
		width: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
	}
	.shopcart-logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.shopcarthighlight{
		background: rgb(0,160,220);
	}
	.backgroundhighlight{
		color: #fff !important;
	}
	.icon-shopping_cart{
		line-height: 44px;
		font-size: 24px;
		color: #80858a;
	}
	.shopcart-price{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin-top: 12px;
		box-sizing: border-box;
		padding-right: 12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
	}
	.shopcart-desc{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin: 12px 0 0 12px;
		font-size: 10px;
		color: rgba(255,255,255,0.4);
	}
	.shopcart-content-right{
		position: absolute;
		right: 0;
		width: 105px;
	}
	.shopcart-pay{
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		color: rgba(255,255,255,0.4);
		font-weight: 700;
		background: #2b333b;
	}
	.num {
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.notenough{
		background: #2b333b;
	}
	.enough{
		background: #00b43c;
		color: #fff;
	}
</style>
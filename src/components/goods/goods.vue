<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="menu-text">
						<span v-show="item.type>0" class="menu-icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list">
					<h1 class="food-title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="food-icon">
								<img :src="food.icon">
							</div>
							<div class="food-content">
								<h2 class="food-name">{{food.name}}</h2>
								<p class="food-desc">{{food.description}}</p>
								<div class="food-extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>	
	</div>
	
</template>
<script type="text/javascript">
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guraantee']
    this.$http.jsonp('http://localhost:8083/api/goods').then(json => {
      var res = json.body
      if (res.errno === ERR_OK) {
        this.goods = res.data
      }
    })
  }
}
</script>
<style type="text/css">
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;;
	}
	.menu-wrapper{
		flex :0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.foods-wrapper{
		flex: 1
	}
	.menu-item{
		display: table;
		height: 54px;
		width: 56px;
		line-height: 14px;
		padding: 0 12px;
	}
	.menu-text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		text-align: center;
		position: relative;
	}
	.menu-text:after{
		content: '';
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    display: block;
	    width: 100%;
	    border-top: 1px solid rgba(1,17,27,0.1);
	}
	.menu-icon{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 2px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.decrease{
		background-image: url("decrease_3@2x.png");
	}
	.discount{
		background-image: url("discount_3@2x.png");
	}
	.invoice{
		background-image: url("invoice_3@2x.png");
	}
	.special{
		background-image: url("special_3@2x.png");
	}
	.guraantee{
		background-image: url("guarantee_3@2x.png");
	}
</style>
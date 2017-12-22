<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menu-wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="menu-text">
						<span v-show="item.type>0" class="menu-icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="food-title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="food-icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="food-content">
								<h2 class="food-name">{{food.name}}</h2>
								<p class="food-desc">{{food.description}}</p>
								<div class="food-extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="price-now">￥{{food.price}}</span>
									<span class="price-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
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
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guraantee']
    this.$http.jsonp('http://localhost:8083/api/goods').then(json => {
      var res = json.body
      if (res.errno === ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 500)
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
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
	.food-title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background: #f3f5f7;
	}
	.food-item{
		display: flex;
		margin: 18px;
		padding-top: 18px;   
	}
	.food-icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food-content{
		flex:1;
	}
	.food-name{
		font-size: 14px;
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
	}
	.food-desc, .food-extra{
		font-size: 10px;
		line-height: 10px;
		color: rgb(147,153,159);
	}
	.food-desc{
		line-height: 12px;
		margin-bottom: 8px;
	}
	.food-extra{
		line-height: 10px;
		margin-right: 12px;
	}
	.price{
		font-weight: 700;
		line-height: 24px;
	}
	.price-now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20)
	}
	.price-old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.border-1px{
		border-top: 1px solid rgba(1,17,27,0.1);
	}
	.border-1px:first-child{
		border-top: 0px solid rgba(1,17,27,0.1);
		margin-top: 0px;
	}
	.current{
		position: relative;
		margin-top: -1px;
		z-index: 10;
		background: #fff;
		font-weight: 900;
	}
</style>
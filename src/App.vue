<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to='/goods'>商品</router-link></div>
      <div class="tab-item"><router-link to='/ratings'>评论</router-link></div>
      <div class="tab-item"><router-link to='/sellers'>商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  const ERR_OK = 0
  export default {
    components: {
      'v-header': header
    },
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.jsonp('http://localhost:8083/api/seller').then(json => {
        var res = json.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
        }
      })
    }
}
</script>

<style>
#app .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.tab-item{
  flex: 1;
  text-align: center;
}
a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.router-link-active{
  color: #f01414;
}
</style>

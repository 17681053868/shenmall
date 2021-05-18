<template>
  <div id="list">
      <div class="info">
        <img src="@/assets/img/profile/message.svg" class="item-img" alt="">
        <span>我的消息</span>
      </div>
      <div class="info">
        <img src="@/assets/img/profile/shopping.svg" class="item-img" alt="">
        <span>积分商城</span>
      </div>
      <div class="info">
        <img src="@/assets/img/profile/vip.svg" class="item-img" alt="">
        <span>会员卡</span>
      </div>
      <div class="info">
        <img src="@/assets/img/profile/cart.svg" class="item-img" alt="">
        <span>购物车</span>
      </div>
      <div class="info">
        <img src="@/assets/img/profile/app.svg" class="item-img" alt="">
        <span>下载App</span>
      </div>
  </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    }
 }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .info {
    height: 44px;
    line-height: 44px;
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }
  .info img {
    width: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .info span {
    vertical-align: middle;
  }
</style>

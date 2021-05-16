<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item">
      </cart-list-item>
    </scroll>
  </div>
</template>
<script>
import CartListItem from '@/pages/cart/childComps/CartListItem'
import Scroll from '@/components/common/scroll/Scroll'
export default {
  name: 'CartList',
  components: {
    CartListItem,
    Scroll
  },
  data () {
    return {
      cartList: []
    }
  },
  updated () {
    this.cartList = this.$store.state.cartList
    console.log(this.cartList)
  },
}
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
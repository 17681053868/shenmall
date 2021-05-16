<template>
  <div class="cart">
    <!-- 导航 -->
    <navigation-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </navigation-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 汇总 -->
  </div>
</template>

<script>
import CartList from '@/pages/cart/childComps/CartList'

import NavigationBar from '@/components/common/navigationbar/NavigationBar'

export default {
  name: 'Cart',
  components: {
    CartList,
    NavigationBar
  },
  data () {
    return {
    }
  },
  computed: {
    cartLength () {
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
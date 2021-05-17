<template>
  <div class="cart">
    <!-- 导航 -->
    <navigation-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </navigation-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from '@/pages/cart/childComps/CartList'
import CartBottomBar from '@/pages/cart/childComps/CartBottomBar'

import NavigationBar from '@/components/common/navigationbar/NavigationBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartList,
    CartBottomBar,
    NavigationBar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters ([
      'cartLength'
    ])
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
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calc" @click="calacClick">结算({{checkLength}})</div>
  </div>
</template>
<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  data () {
    return {
      checkedList: []
    }
  },
  methods: {
    checkClick () {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calacClick () {
      // if (!this.isSelectAll) {
      //   this.$toast.show('请选择购物商品',2000)
      // }
      this.checkedList = []
      this.$store.state.cartList.forEach(item => {
        this.checkedList.push(item.checked)
        if (this.checkedList.indexOf(true) === -1) {
          this.$toast.show('请选择购物商品',2000)
        } else {
          this.$toast.show('下单模块开发中',2000)
        }
      })
    }
  },
  computed: {
    totalPrice () {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength () {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll () {
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  
  background-color: #eee;
  
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 21px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
}
.calc {
  position: absolute;
  right: 0;
  background-color: var(--color-tint);
  padding: 0 10px;
  color: #fff;
}
</style>
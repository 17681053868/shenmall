<template>
  <div class="tab-card">
    <div v-for="(item, index) in titles" :key="index" class="tab-card-item" :class="{active: index === currentIndex}" @click="tabItem(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabCard',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // 每个item点击事件
    tabItem (index) {
      // console.log(index)
      this.currentIndex = index
      // switch (index) {
      //   case 0:
      //     this.goodsType = 'pop'
      //     break
      //   case 1: 
      //     this.goodsType = 'new'
      //     break
      //   case 2:
      //     this.goodsType = 'sell'
      //     break
      // }
      this.$emit('itemClick', index)
    }
  }
}
</script>
<style scoped>
.tab-card {
  display: flex;
  text-align: center;
  background-color: #fff;
}
.tab-card-item {
  flex: 1;
  height: 39px;
  line-height: 39px;
}
.active {
  color: var(--color-tint);
}
.active span {
  padding-bottom: 5px;
  border-bottom: 2px solid var(--color-tint);
}
</style>
<template>
  <div>
    <navigation-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div :class="{active: currentIndex === i}" :key="i" v-for="(item, i) in titles" class="title-item" @click="detailItemClick(i)">{{item}}</div>
      </div>
    </navigation-bar>
  </div>
</template>
<script>
import NavigationBar from '@/components/common/navigationbar/NavigationBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavigationBar
  },
  data () {
    return {
      titles: ['商品', '详情', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    detailItemClick (i) {
      this.currentIndex = i
      this.$emit('titleClick', i)
    },
    backClick () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.back img{
  margin-top: 11px;
}
.active {
  color: var(--color-tint);
}

</style>
<template>
  <!-- home中热卖推荐组件 -->
  <div class="home-recommend">
    <div v-for="item in recommend" :key="item.title" class="home-recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommend: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style scoped>
.home-recommend {
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding: 8px 0 10px;
  border-bottom: 8px solid #eee;
}
.home-recommend-item {
  flex: 1;
  /* margin-top: 10px;
  margin-left: 10px; */
}
.home-recommend-item img {
  width: 80px;
  margin: 6px 5px;
  border-radius: 8px;
  background-color: pink;
}
</style>
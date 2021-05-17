<template>
  <div class="cate">
    <navigation-bar>
      <div slot="center">分类</div>
    </navigation-bar>
  </div>
</template>
<script>
import NavigationBar from '@/components/common/navigationbar/NavigationBar'
export default {
  name: 'Category',
  components: {
    NavigationBar
  }
}
</script>
<style scoped>
.cate {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
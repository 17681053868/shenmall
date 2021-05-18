<template>
  <div class="cate-menu">
    <scroll class="content">
      <div :key="index" v-for="(item, index) in cateMenu" @click="itemClick(index, item.maitKey)"
      class="cate-menu-item" :class="{active: currentIndex === index}" >
        {{item.title}}
      </div>
    </scroll>
  </div>
</template>
<script>

import Scroll from '@/components/common/scroll/Scroll'

export default {
  name: 'CateMenu',
  components: {
    Scroll
  },
  props: {
    cateMenu: {
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
    itemClick (index) {
      this.currentIndex = index
      this.$emit('activeClick', index)
    }
  },
}
</script>
<style scoped>
.cate-menu {
  width: 100px;
  height: calc(100% - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
.cate-menu-item {
  width: 100px;
  height: 45px;
  line-height: 45px;
  color: #666;
  text-align: center;
  background-color: rgb(247, 242, 242);
}
.active {
  background-color: #fff;
  color: var(--color-tint);
  border-left: 2px solid var(--color-tint) ;
}
</style>
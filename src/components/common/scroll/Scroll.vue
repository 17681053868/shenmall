<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  props: {
    // 优化性能,需从父组件传递值以确定是否开启滚动监听事件
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // 创建BetterScroll实例
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      observeDOM: true,
      // 为scroll非button标签开启点击事件
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        // 向父组件发送position位置
        this.$emit('scroll', position)
      })
    }
    // 监听scroll是否滚动到底部了
    if (this.pullUpLoad) {
      // console.log(this.scroll)
      this.scroll.on('pullingUp', () => {
        // console.log('到底了')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo (x, y, time = 30) {
      // 目的是为了判实例是否存在
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
      // 打印次数可以判断刷新是否频繁
    },
    getCurrentY () {
      // console.log(this.scroll.y)
      return this.scroll.y ? this.scroll.y : 0
    }
  }
}
</script>
<style scoped>

</style>
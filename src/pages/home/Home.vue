<template>
  <div id="home">
    <navigation-bar class="home-nav"><div slot="center">凌云阁</div></navigation-bar>
    <tab-card :titles="['流行', '时尚', '精选']" class="tab-card" @itemClick="currentClick" ref="tabCard1" v-show="isTabFixed" :class="{fixed: isTabFixed}"></tab-card>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="goodsListItemLoadMore">
      <home-swiper :banner="banner"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature></feature>
      <tab-card :titles="['流行', '时尚', '精选']" @itemClick="currentClick" ref="tabCard2" :class="{fixed: isTabFixed}"></tab-card>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavigationBar from '@/components/common/navigationbar/NavigationBar'
import TabCard from '@/components/content/tabcard/TabCard'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import HomeSwiper from '@/pages/home/homeswiper/HomeSwiper'
import HomeRecommend from '@/pages/home/homeview/HomeRecommend'
import Feature from '@/pages/home/homeview/Feature'
import GoodsList from '@/components/content/goods/GoodsList'

import { getHomeData, getHomeGoods } from '@/network/home.js'
import { debounce } from '@/common/utils.js'
// import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: 'Home',
  components: {
    NavigationBar,
    HomeSwiper,
    HomeRecommend,
    Feature,
    TabCard,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      // 轮播图数据
      banner: [],
      dKeyword: [],
      keywords: [],
      // 推荐数据
      recommend: [],
      // 商品列表数据
      goods: {
        // 流行
        'pop': {
          page: 0,
          list: []
        },
        // 时尚
        'new': {
          page: 0,
          list: []
        },
        // 精选
        'sell': {
          page: 0,
          list: []
        }
      },
      // 商品列表展示类型
      goodsType: 'pop',
      // 控制返回顶部按钮是否显示
      isShowBackTop: false,
      // 
      tabOffsetTop: 0,
      // 控制tab-card是否吸顶
      isTabFixed: false,
      // 保存首页滚动位置
      saveY: 0,
      itemImgListener: null
    }
  },
  destroyed () {
    // console.log('destorryed')
  },
  activated () {
    // 保存首页滚动的位置，为切换到其他页面保存状态
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 防止切换会home页面不能滚动
    this.$refs.scroll.refresh()
    // console.log('acrtive')
  },
  deactivated () {
    // 保存Y值
    this.saveY = this.$refs.scroll.getCurrentY()
    // 取消全局事件监听
      this.$EventBus.$off('itemImageLoad', this.itemImgListener)
    // console.log(this.saveY)
  },
  created () {
    // 请求多个数据
    this.getHomeData()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
     // 通过原型上的事件总线监听goodsListItem组件中图片是否加载完成
    // this.$bus.$on('goodsListItemImgLoad', imgRefresh)
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    //  // 通过原型上的事件总线监听goodsListItem组件中图片是否加载完成
    this.itemImgListener = () => {
      refresh()
    }
    this.$EventBus.$on('itemImageLoad', this.itemImgListener)
    this.currentClick(0)
  },
  updated () {
    // 获取图片加载完成后tabCard的offsetTop
    this.tabOffsetTop = this.$refs.tabCard2.$el.offsetTop
    // console.log(this.$refs.tabCard2.$el.offsetTop)
  },
  methods: {
    // 请求home中多个数据的封装方法
    getHomeData () {
      getHomeData().then(res => {
      this.banner = res.data.banner.list
      // this.dKeyword = res.data.dKeyword
      // this.keywords = res.data.keywords
      this.recommend = res.data.recommend.list
      // console.log(res.data.recommend.list)
      })
    },
    // 请求商品数据封装方法
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    // 以下事件监听相关方法
    // 判断当前点击的商品类型
    currentClick (index) {
      switch (index) {
        case 0:
          this.goodsType = 'pop'
          break
        case 1: 
          this.goodsType = 'new'
          break
        case 2:
          this.goodsType = 'sell'
          break
      }
      this.$refs.tabCard1.currentIndex = index
      this.$refs.tabCard2.currentIndex = index
    },
    // 回到顶部事件监听函数
    backClick () {
      // console.log(this.$refs.scroll.scroll.scrollTo())
      this.$refs.scroll.scrollTo(1, 1, 500)
    },
    // 监听返回顶部按钮是否显示
    contentScroll (position) {
      // 当position.y大于1000时显示返回顶部组件
      this.isShowBackTop = Math.abs(position.y) > 1000
      // 决定tab-card是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    goodsListItemLoadMore () {
      // console.log(this.goodsType)
      this.getHomeGoods(this.goodsType)
      // console.log('jiazai')
    }
  },
  computed: {
    // 处理展示商品列表类型
    showGoodsList () {
      return this.goods[this.goodsType].list
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* 设定为视口高度 */
  height: 100vh;
  position: relative;
  /* top: 44px; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}
/* .tab-card {
  粘性定位，到达一定位置固定在此
  position: sticky;
  top: 44px;
  z-index: 9999999;
} */
.content {
  /* margin-top: 44px;
  height: calc(100% - 94px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-card {
  position: relative;
  z-index: 99;
}

</style>
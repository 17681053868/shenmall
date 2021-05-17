<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info ref="goods" :detail-info="detailInfo" @detailImgLoad="detailImgLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast></toast>
  </div>
</template>
<script>

import DetailNavBar from '@/pages/detail/childComs/DetailNavBar'
import DetailSwiper from './childComs/DetailSwiper.vue'
import DetailBaseInfo from '@/pages/detail/childComs/DetailBaseInfo'
import DetailShopInfo from '@/pages/detail/childComs/DetailShopInfo'
import DetailGoodsInfo from '@/pages/detail/childComs/DetailGoodsInfo'
import DetailParamInfo from '@/pages/detail/childComs/DetailParamInfo'
import DetailCommentInfo from '@/pages/detail/childComs/DetailCommentInfo'
import DetailBottomBar from '@/pages/detail/childComs/DetailBottomBar'
// import DetailRecommendInfo from '@/pages/detail/childComs/DetailRecommendInfo'
import { getDetailData, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail.js'

import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'
import Toast from '@/components/common/toast/Toast'

import { debounce } from '@/common/utils.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop,
    Toast
  },
  data () {
    return {
      // 商品id
      iid: null,
      // 顶部轮播图
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowBackTop: false,
      message: '',
      show: false
    }
  },
  created () {
    this._getDetailData()
    this._getRecommend()
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.goods.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
    })
  },
  methods: {
    _getDetailData () {
      // 保存当前活跃的路由参数
      this.iid = this.$route.params.id
      // // 根据id请求详情页数据
      getDetailData(this.iid).then(res => {
        const data = res.result;
        // console.log(res)
        this.topImages = res.result.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        // 2.5.获取商品信息
        this.detailInfo = data.detailInfo
        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 2.7.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    // 请求推荐数据
   _getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    // 监听详情的图片加载
    detailImgLoad () {
      this.$refs.scroll.refresh()
      this.getThemeTopYs()
      // console.log('-----')
    },
    titleClick (i) {
      console.log(i)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[i], 500)
    },
    contentScroll (position) {
      // console.log(position.y)
      let positionY = -position.y
      // console.log(this.themeTopYs)
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // console.log(i)
        if ( this.currentIndex !== i && ( positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
        // if (this.currentIndex !== i && (i < length - 1 &&  positionY > this.themeTopYs[parseInt(i)] && 
        // positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY > this.themeTopYs[i])) {
        //   this.currentIndex = i
        //   // console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }
      this.isShowBackTop = Math.abs(position.y) > 1500
    },
    backClick () {
      // console.log(this.$refs.scroll.scroll.scrollTo())
      this.$refs.scroll.scrollTo(1, 1, 500)
    },
    // 添加购物车
    addToCart () {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid
      // 将商品添加到购物车
      // this.$store.state.cartList.push(product)
      // console.log(this.$store.state.cartList)
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        // console.log(res)
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1000)
        this.$toast.show(res, 1000)
      })
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$EventBus.$on('itemImageLoad', this.itemImgListener)
  },
  destroyed () {
    this.$EventBus.$off('itemImageLoad', this.itemImgListener)
  },
  // computed: {
  //   // 处理展示商品列表类型
  //   showGoodsList () {
  //     return this.goods[this.goodsType].list
  //   }
  // }
}
</script>
<style scoped>
#detail {
  position: relative;
  background: #fff;
  z-index: 999999;
  height: 100vh;
}
.detail-nav {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999999;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}

</style>
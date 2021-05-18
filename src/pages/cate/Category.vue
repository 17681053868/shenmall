<template>
  <div id="cate">
    <!-- 顶部 -->
    <navigation-bar class="nav-bar">
      <div slot="center">分类</div>
    </navigation-bar>
    <!-- 分类主体区域 -->
    <div class="cate-main">
      <!-- 左侧菜单区域 -->
      <cate-menu :cate-menu="cateMenu" @activeClick="activeClick"></cate-menu>
      <!-- 右侧主体区域 -->
        <scroll id="content" :data="[categoryData]">
          <div>
            <tab-content-cate :subcategories="showSubcategory"></tab-content-cate>
            <tab-card :titles="['综合', '新品', '销量']" @itemClick="tabClick"></tab-card>
            <goods-list :goods="showCategoryDetail"></goods-list>
          </div>
        </scroll>
    </div>
  </div>
</template>
<script>
import CateMenu from '@/pages/cate/childComps/CateMenu'
import TabContentCate from '@/pages/cate/childComps/TabContentCate'

import { getCategory, getSubcategory, getCategoryDetail } from '@/network/category.js'
import {POP, SELL, NEW} from "@/common/const"
import {tabControlMixin} from "@/common/mixin";

import Scroll from '@/components/common/scroll/Scroll'
import NavigationBar from '@/components/common/navigationbar/NavigationBar'
import TabCard from '@/components/content/tabcard/TabCard'
import GoodsList from '@/components/content/goods/GoodsList'
export default {
  name: 'Category',
  components: {
    CateMenu,
    TabContentCate,
    NavigationBar,
    TabCard,
    Scroll,
    GoodsList
  },
  mixins: [tabControlMixin],
  data () {
    return {
      // 后台获取的菜单数据
      cateMenu: [],
      // 记录菜单当前点击项
      currentIndex: -1,
      categoryData: [],
      goodsType: 'pop'
    }
  },
  created () {
    this._getCategory()
  },
  computed: {
    showSubcategory() {
		  if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
		  if (this.currentIndex === -1) return []
		  return this.categoryData[this.currentIndex].categoryDetail[this.goodsType]
    }
  },
  methods: {
    _getCategory () {
      getCategory().then(res => {
        // 分类数据
        this.cateMenu = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.cateMenu.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategory(0)
      })
    },
    _getSubcategory (index) {
      this.currentIndex = index
      const mailKey = this.cateMenu[index].maitKey; 
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
		  // 1.获取请求的miniWallkey
      const miniWallkey = this.cateMenu[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
		  getCategoryDetail(miniWallkey, type).then(res => {
		    // 3.将获取的数据保存下来
		    this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData)
      })
    },
    activeClick (index) {
      // console.log(index)
      this._getSubcategory(index)
    },
    tabClick (index) {
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
    }
  }
}
</script>
<style scoped>
#cate {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  letter-spacing: 10px;
  z-index: 9999999;
}
.cate-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0;
  display: flex;
  overflow: hidden;
}
#content {
  height: 100%;
  flex: 1;
}
</style>
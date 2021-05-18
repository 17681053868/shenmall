<template>
  <div class="goods-item" @click="goodsListItem">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageLoad () {
      // 通过事件总线发射一个事件，home组件接受这个事件并作出反应
        this.$EventBus.$emit('itemImageLoad')
    },
    // 商品点击事件
    goodsListItem () {
      // 跳转到商品详情页
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImage () {
      // return this.goodsItem.image
      return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
    }
  }
}
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 47%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  top: -1px;
  left: -15px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>
import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter (state, payload) {
      payload.count++
    },
    addToCart (state, payload) {
      state.cartList.push(payload)
    }
    // mutations为了修改state状态
    // addCart (state, payload) {
    //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    //   if (oldProduct) {
    //     oldProduct.count += 1
    //   } else {
    // }
  },
  actions: {
    addCart (context, payload) {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
      }
    }
  }
})

export default store
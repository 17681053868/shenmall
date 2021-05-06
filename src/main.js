import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import {request} from './network/request'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 发送网络请求
request({
  url: '/home/multidata'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})


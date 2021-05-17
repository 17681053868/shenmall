import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// import {request} from './network/request'
import toast from './components/common/toast'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$EventBus = new Vue()
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 发送网络请求
// request({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })


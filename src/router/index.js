import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('../pages/home/Home.vue')
const Category = () => import('../pages/cate/Category.vue')
const Cart = () => import('../pages/cart/Cart.vue')
const Profile = () => import('../pages/profile/Profile.vue')
const Detail = () => import('../pages/detail/Detail.vue')

// 安装vue-router
Vue.use(VueRouter)

//连续点击报错解决方案
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }
const routes = [{
  path: '',
  // 路由重定向
  redirect: '/home'
},{
  path: '/home',
  component: Home,
},{
  path: '/category',
  component: Category
},{
  path: '/cart',
  component: Cart
},{
  path: '/profile',
  component: Profile
},{
  path: '/detail/:id',
  component: Detail
}]


// 创建路由实例
const router = new VueRouter({
  routes,
  // history模式路由
  mode: 'history'
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('../pages/home/Home.vue')
const Category = () => import('../pages/cate/Category.vue')
const Cart = () => import('../pages/cart/Cart.vue')
const Profile = () => import('../pages/profile/Profile.vue')

// 安装vue-router
Vue.use(VueRouter)

const routes = [{
  path: '',
  // 路由重定向
  redirect: '/home'
},{
  path: '/home',
  component: Home
},{
  path: '/category',
  component: Category
},{
  path: '/cart',
  component: Cart
},{
  path: '/profile',
  component: Profile
}]

// 创建路由实例
const router = new VueRouter({
  routes,
  // history模式路由
  mode: 'history'
})

export default router
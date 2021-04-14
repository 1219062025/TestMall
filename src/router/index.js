import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// component: () => import(/* webpackChunkName: "about" */ 'views/About.vue')
// 路由懒加载
const Home = () => import(/* webpackChunkName: "group-app" */'views/home/Home')
const CateGory = () => import(/* webpackChunkName: "group-app" */'views/category/CateGory')
const Cart = () => import(/* webpackChunkName: "group-app" */'views/cart/Cart')
const Profile = () => import(/* webpackChunkName: "group-app" */'views/profile/Profile')
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: 'home',
    component: Home
  },
  {
    path: "/category",
    name: 'category',
    component: CateGory
  },
  {
    path: "/cart",
    name: 'cart',
    component: Cart
  },
  {
    path: "/profile",
    name: 'profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router

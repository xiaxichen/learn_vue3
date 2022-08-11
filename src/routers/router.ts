import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import store from '@/data/store'

const routers = [{
  path: '/',
  name: 'home',
  component: HomePage
}, {
  path: '/login',
  name: 'login',
  component: LoginPage
}, {
  path: '/column/:id',
  name: 'column',
  component: ColumnDetail
}, {
  path: '/create',
  name: 'create',
  component: CreatePost,
  meta: {
    title: '',
    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
  }
}]
const routerHistory = createWebHistory()
export const router = createRouter({
  routes: routers,
  history: routerHistory
})

router.beforeEach(async (to, from) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user.isLogin) { // 判断当前的token是否存在和路由是否登录
      return {
        name: 'login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      }
    }
  }
})

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
//     if (store.state.user.isLogin) { // 判断当前的token是否存在
//       next()
//     } else {
//       next({
//         name: 'login',
//         query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// })

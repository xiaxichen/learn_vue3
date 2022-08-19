import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import store from '@/data/store'
import RegisterPage from '@/views/RegisterPage.vue'
import axios from 'axios'

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
}, {
  path: '/register',
  name: 'register',
  component: RegisterPage
}
]
// const routerHistory = createWebHistory()
const routerHistory = createWebHashHistory()
export const router = createRouter({
  routes: routers,
  history: routerHistory
})

router.beforeEach(async (to) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token !== '') {
      axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`
      store.dispatch('fetchCurrentUser', store.state.token).then(() => {
        if (!store.state.user.isLogin) {
          return {
            name: 'login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          }
        }
      })
    } else {
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

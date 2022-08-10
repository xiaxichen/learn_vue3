import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
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
}]
const routerHistory = createWebHistory()
export const router = createRouter({
  routes: routers,
  history: routerHistory
})

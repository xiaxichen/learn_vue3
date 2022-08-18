import { createApp } from 'vue'

import App from './App.vue'

import { router } from '@/routers/router'
import store from '@/data/store'
import axios from 'axios'
// import axios from 'axios'
//
// // axios.defaults.baseURL = 'http://api.vikingship.xyz/'
// const loginUser = async () => {
//   // const response = await axios.post('/user/login', {
//   //   email: 'xiaxichenmail@gmail.com',
//   //   password: '123456'
//   // }, {
//   //   headers: {
//   //     accept: 'application/json',
//   //     'Content-Type': 'application/json'
//   //   }
//   // })
//   // console.log(response.data)
//   const response = await axios.get('/columns', {
//     params: {
//       currentPage: 1,
//       pageSize: 5
//     }
//   })
//   return response
//   // console.log(response.data)
// }
// loginUser()
// // loginUser().then().catch((e) => { console.log(e) })
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setErrorStatus')
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  console.log(e)
  const { error } = e.response.data
  store.commit('setError', {
    status: true,
    message: error
  })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
createApp(App).use(router).use(store).mount('#app')

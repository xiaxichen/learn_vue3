import { createStore } from 'vuex'
import { currentUser, testData, testPosts } from '@/data/test'
import { GlobalDataProps } from '@/interfaceList/global'

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: currentUser
  },
  mutations: {
    login (state, name:string) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: name
      }
    }
  }
})
export default store

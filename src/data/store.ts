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
    login (state, name: string) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: name
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter((c) => {
        return c.id
      }).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})
export default store

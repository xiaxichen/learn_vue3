import { Commit, createStore } from 'vuex'
import axios from 'axios'
import { currentUser } from '@/data/test'
import { GlobalDataProps } from '@/interfaceList/global'

const getAndCommit = async (url: string, params: any, commit: Commit, mutationsName: string) => {
  // commit('setLoading', true)
  const response = await axios.get(url, {
    params
  })
  // await new Promise(resolve => setTimeout(resolve,3000)) // 3秒后返回
  commit(mutationsName, response.data)
  // commit('setLoading', false)
}
const postAndCommit = async (url: string, params: any, data: any, commit: Commit, mutationsName: string) => {
  // commit('setLoading', true)
  const response = await axios.post(url, {
    params,
    data
  })
  // await new Promise(resolve => setTimeout(resolve,3000)) // 3秒后返回
  commit(mutationsName, response.data)
  // commit('setLoading', false)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: true,
    columns: [],
    posts: [],
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
    createPost (state, rawData) {
      state.posts.push(rawData)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  getters: {
    // biggerColumnsLen (state) {
    //   return state.columns.filter((c) => {
    //     return c._id
    //   }).length
    // },
    getColumnById: (state) => (id: number) => {
      const find = state.columns.find(c => c._id === id)
      if (find !== undefined) {
        if (!find.avatar) {
          find.avatar = {
            url: require('@/assets/column.png')
          }
        }
      }
      return find
    },
    getPostByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  actions: {
    async fetchColumns (context, currentPage = 1, pageSize = 5) {
      await getAndCommit('/columns', {
        currentPage,
        pageSize
      }, context.commit, 'fetchColumns')
    },
    async fetchColumn ({ commit }, cid) {
      console.log('fetch fetchColumn', `/columns/${cid}`)
      await getAndCommit(`/columns/${cid}`, {}, commit, 'fetchColumn')
    },
    async fetchPosts ({ commit }, cid, currentPage = 1, pageSize = 5) {
      await getAndCommit(`/columns/${cid}/posts`, {
        currentPage,
        pageSize
      }, commit, 'fetchPosts')
    },
    async login ({ commit }, {
      params,
      data
    }) {
      const respData = await postAndCommit('/user/login', params, data, commit, 'login')
      console.log(respData)
    }
  }
})
export default store

import { Commit, createStore } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { currentUser } from '@/data/test'
import { GlobalDataProps, GlobalErrorProps } from '@/interfaceAndTypeList/global'
import { PostProps } from '@/interfaceAndTypeList/column'
import { arrToObj, objToArr } from '@/utils/util'

const getAndCommit = async (url: string, params: any, commit: Commit, mutationsName: string) => {
  // commit('setLoading', true)
  const response = await axios.get(url, {
    params
  })
  // await new Promise(resolve => setTimeout(resolve,3000)) // 3秒后返回
  commit(mutationsName, response.data)
  // commit('setLoading', false)
}
const postAndCommit = async (url: string, params: any, data: any, commit: Commit, mutationsName = '') => {
  // commit('setLoading', true)
  const response = await axios.post(url, data, { params })
  // await new Promise(resolve => setTimeout(resolve,3000)) // 3秒后返回
  if (mutationsName) {
    commit(mutationsName, response.data)
  }
  // commit('setLoading', false)
  return response.data
}
const asyncAndCommit = async (url: string, mutationName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, {
      data,
      extraData
    })
  } else {
    commit(mutationName, data)
  }
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    loading: true,
    columns: {
      data: {},
      currentPage: 0,
      total: 0
    },
    posts: {
      data: {},
      loadedColumns: []
    },
    user: currentUser
  },
  mutations: {
    // login (state, name: string) {
    //   state.user = {
    //     ...state.user,
    //     isLogin: true,
    //     name: name
    //   }
    // },
    createPost (state, rawData) {
      state.posts.data[rawData._id] = rawData
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts (state, {
      data: rawData,
      extraData: columnId
    }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost (state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    setErrorStatus (state, status = false) {
      state.error.status = status
    },
    login (state, rawData) {
      state.token = rawData.data.token
      localStorage.setItem('token', rawData.data.token)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.data.token}`
    },
    logOut (state) {
      state.token = ''
      localStorage.setItem('token', '')
      state.user = {
        column: '',
        _id: '',
        email: '',
        isLogin: false,
        nickName: ''
      }
      delete axios.defaults.headers.common.Authorization
    }
  },
  getters: {
    // biggerColumnsLen (state) {
    //   return state.columns.filter((c) => {
    //     return c._id
    //   }).length
    // },
    getColumnById: (state) => (id: number) => {
      return state.columns.data[id]
    },
    getPostByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
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
    async register ({ commit }, {
      params,
      data
    }) {
      return await postAndCommit('users', params, data, commit)
    },
    async login ({ commit }, {
      params,
      data
    }) {
      return await postAndCommit('/user/login', params, data, commit, 'login')
    },
    async loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    async fetchCurrentUser ({ commit }) {
      await getAndCommit('/user/current', {}, commit, 'fetchCurrentUser')
    },
    async createPost ({ commit }, newPost: PostProps) {
      return postAndCommit('posts', {}, newPost, commit, '')
    },
    async fetchPost ({
      state,
      commit
    }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    }
  }
})
export default store

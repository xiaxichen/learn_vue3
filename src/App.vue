<template>

  <div class="container">
    <template v-if="isLoading">
      <LoaderCompose text="加载中！！！"></LoaderCompose>
    </template>
    <!--    <template>-->
    <!--      <MessageCompose v-if="error.status" type="error" :message="error.message"></MessageCompose>-->
    <!--    </template>-->
    <!--    <GlobalHeader :user="currentUser"></GlobalHeader>-->
    <NavHeaderSelf :user="currentUser"></NavHeaderSelf>
    <!--    <h1 v-if="error.status">{{ error.message || 'message is null' }}</h1>-->
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也论坛</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'

import NavHeaderSelf from './components/NavHeaderSelf.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/interfaceAndTypeList/global'
import LoaderCompose from '@/components/LoaderCompose.vue'
import createMessage from '@/utils/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    NavHeaderSelf,
    LoaderCompose
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    // const token = computed(() => store.state.token)
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const {
        status,
        message
      } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    // onMounted(() => {
    //   if (!currentUser.value.isLogin && token.value) {
    //     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
    //     store.dispatch('fetchCurrentUser')
    //   }
    // })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>
<style scoped>

</style>

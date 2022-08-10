<template>
  <div class="container">
    <!--    <GlobalHeader :user="currentUser"></GlobalHeader>-->
    <NavHeaderSelf :user="currentUser"></NavHeaderSelf>
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
import { computed, defineComponent } from 'vue'

import NavHeaderSelf from './components/NavHeaderSelf.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProps } from '@/interfaceList/column'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/interfaceList/global'

export default defineComponent({
  name: 'App',
  components: {
    NavHeaderSelf
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>
<style scoped>

</style>

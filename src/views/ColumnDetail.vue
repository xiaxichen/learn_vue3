<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'

import { useStore } from 'vuex'
import { GlobalDataProps } from '@/interfaceAndTypeList/global'
import { ColumnProps, PostProps } from '@/interfaceAndTypeList/column'
import { addColumnAvatar } from '@/utils/util'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    // const column = computed(() => store.state.columns)
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed<ColumnProps | undefined>(() => {
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed<PostProps[]>(() => store.getters.getPostByCid(currentId))
    // const currentId = +route.params.id //转换为number
    // const column = store.getters.getColumnById(currentId)
    return {
      column,
      list
    }
  }
})
</script>

<style scoped>

</style>

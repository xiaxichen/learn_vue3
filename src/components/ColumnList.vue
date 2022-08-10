<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :alt="column.title" :src="column.avatar" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title"> {{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <!--          <routers-link class="btn btn-outline-primary" :to="{name:'column',params:{id:column.id}}">进入专栏</routers-link>-->
          <router-link class="btn btn-outline-primary" :to="`/column/${column.id}`">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/interfaceList/column'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // 把构造函数断言成一个类型需要使用 PropType
      type: Array as PropType<ColumnProps[]>,
      require: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list?.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.png')
        }
        return column
      })
    })
    return { columnList }
  }
})
</script>

<style scoped>

</style>

<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <!--      <li class="list-inline-item" ><a href="#" class="btn btn-outline-light my-2">你好 {{ user.name }}</a></li>-->
      <li class="list-inline-item">
        <DropDown :title="`你好 ${user.name}`">
          <DropDownItems><a class="dropdown-item" href="#">新建文章</a></DropDownItems>
          <DropDownItems disabled><a class="dropdown-item" href="#">编辑资料</a></DropDownItems>
          <DropDownItems><a class="dropdown-item" href="#">退出登陆</a></DropDownItems>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from '../components/DropDown.vue'
import DropDownItems from '../components/DropDownItems.vue'
import { UserProps } from '@/interfaceList/column'

export default defineComponent({
  name: 'GlolbalHeader',
  components: {
    DropDown,
    DropDownItems
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>

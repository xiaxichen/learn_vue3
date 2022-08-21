<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">

      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/register">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <!--      <li class="list-inline-item" ><a href="#" class="btn btn-outline-light my-2">你好 {{ user.name }}</a></li>-->
      <li class="list-inline-item">
        <DropDown :title="`你好 ${user.nickName}`">
          <DropDownItems>
            <router-link class="dropdown-item" to="create">新建文章</router-link>
          </DropDownItems>
          <DropDownItems disabled><a class="dropdown-item" href="#">编辑资料</a></DropDownItems>
          <DropDownItems><a class="dropdown-item" href="#" @click="LoginOut">退出登陆</a></DropDownItems>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from '../components/DropDown.vue'
import DropDownItems from '../components/DropDownItems.vue'
import { UserProps } from '@/interfaceAndTypeList/column'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/interfaceAndTypeList/global'

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
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const LoginOut = () => {
      store.commit('logOut')
    }
    return {
      LoginOut
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <!--    <div class="mb-3">-->
      <!--      <label for="exampleInputEmail1" class="form-label">Email address</label>-->
      <!--      <input type="email" class="form-control" id="exampleInputEmail1" v-model="emailRef.val" @blur="validateEmail">-->
      <!--      <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>-->
      <!--    </div>-->
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <ValidateInput ref="inputRef" v-model="emailVal.val" :rules="emailRules" placeholder="请输入邮箱地址" type="email"></ValidateInput>
        <!--      {{emailVal.val}}-->
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <ValidateInput v-model="passwdVal.val" :rules="passwdRules" class="form-control" placeholder="请输入密码" type="password" autocomplete></ValidateInput>
      </div>
      <!-- v-slot = #-->
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/interfaceList/global'

export default defineComponent({
  name: 'LoginPage',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    const emailVal = reactive({
      val: '',
      error: false,
      message: ''
    })
    const passwdVal = reactive({
      val: '',
      error: false,
      message: ''
    })
    // const routers = useRouter()
    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '电子邮箱地址不能为空'
      },
      {
        type: 'email',
        message: '请输入正确的电子邮箱格式'
      }
    ]
    const passwdRules: RulesProp = [{
      type: 'passwd',
      message: '密码不能为空!'
    }]
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // console.log('result', result)
        // router.push({
        //   name: 'column',
        //   params: { id: 1 }
        // })
        store.commit('login', 'zheye')
        router.push('/')
      }
    }
    return {
      emailRules,
      emailVal,
      passwdVal,
      passwdRules,
      onFormSubmit
    }
  }
})
</script>

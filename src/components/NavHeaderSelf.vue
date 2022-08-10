<template>
  <GlobalHeader :user="user"></GlobalHeader>
  <ValidateForm @form-submit="onFormSubmit">
    <!--    <div class="mb-3">-->
    <!--      <label for="exampleInputEmail1" class="form-label">Email address</label>-->
    <!--      <input type="email" class="form-control" id="exampleInputEmail1" v-model="emailRef.val" @blur="validateEmail">-->
    <!--      <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>-->
    <!--    </div>-->
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <ValidateInput ref="inputRef" v-model="emailVal.val" :rules="emailRules" placeholder="请输入邮箱地址"></ValidateInput>
      <!--      {{emailVal.val}}-->
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <ValidateInput v-model="passwdVal.val" :rules="passwdRules" class="form-control" placeholder="请输入邮箱地址"
                     type="password"></ValidateInput>
    </div>
    <!-- v-slot = #-->
    <template #submit>
      <span class="btn btn-danger">Submit</span>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import GlobalHeader, { UserProps } from '../components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from './ValidateForm.vue'

// const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  name: 'NavHeaderSelf',
  components: {
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const inputRef = ref<any>(null)
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
    // const emailRef = reactive({
    //   val: '',
    //   error: false,
    //   message: ''
    // })
    const emailRules: RulesProp = [{
      type: 'required',
      message: '电子邮箱地址不能为空!'
    }, {
      type: 'email',
      message: '请输入正确的电子邮箱格式!'
    }]
    const passwdRules: RulesProp = [{
      type: 'passwd',
      message: '密码不能为空!'
    }]
    // const validateEmail = () => {
    //   if (emailRef.val.trim() === '') {
    //     emailRef.error = true
    //     emailRef.message = 'email is not null must input it!'
    //   } else if (!emailReg.test(emailRef.val)) {
    //     emailRef.error = true
    //     emailRef.message = 'email is not allow!'
    //   }
    // }
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }
    return {
      // emailRef,
      emailVal,
      // validateEmail,
      emailRules,
      passwdRules,
      passwdVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style scoped>

</style>

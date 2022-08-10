<template>
  <GlobalHeader :user="user"></GlobalHeader>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import GlobalHeader from '../components/GlobalHeader.vue'
import { RulesProp } from '../components/ValidateInput.vue'
import { UserProps } from '@/interfaceList/column'

// const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  name: 'NavHeaderSelf',
  components: {
    GlobalHeader
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
    //   } else if (!emailReg.data(emailRef.val)) {
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

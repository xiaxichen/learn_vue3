<template>
  <div class="validate-input-container pb-3">
    <!--双向绑定v-model实现方法-->
    <input v-if="tag !== 'textarea'"
           :class="{'is-invalid':inputRef.error}"
           class="form-control"
           v-bind="$attrs"
           @blur="validateInput"
           :value="inputRef.val"
           @input="updateValue"
    >
    <textarea v-else
              :class="{'is-invalid':inputRef.error}"
              class="form-control"
              v-bind="$attrs"
              @blur="validateInput"
              :value="inputRef.val"
              @input="updateValue"
    >
    </textarea>
    <!--    <input type="text" class="form-control" :class="{'is-invalid':inputRef.error}" v-model="inputRef.val"-->
    <!--           @blur="validateInput">-->
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email' | 'passwd' | 'confirmPasswd'
  message: string
  validator?: () => boolean
}

export type RulesProp = Array<RuleProp>
export type TgaType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TgaType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    // console.log(context.attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'passwd':
              passed = (inputRef.val.trim() !== '')
              break
            case 'confirmPasswd':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('formItemCreated', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>

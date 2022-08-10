<template>
  <form class="validate-from-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button class="btn btn-primary" type="submit">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type validateFunc = () => boolean
type Events = {
  formItemCreated: validateFunc;
  isValid: boolean
};

export const emitter = mitt<Events>()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    const funcArr: validateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func())
      context.emit('form-submit', result)
    }
    const callback = (call: validateFunc) => {
      funcArr.push(call)
    }
    emitter.on('formItemCreated', callback)
    onUnmounted(() => {
      emitter.off('formItemCreated', callback)
    })
    return {
      submitForm
    }
  }
})
</script>

<style scoped>

</style>

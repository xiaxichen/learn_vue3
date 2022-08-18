<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-25 mx-auto d-flex justify-content-between mt-2" role="alert"
         :class="classObject" v-if="isVisible">
      <span class="text-center w-100">{{ message }}</span>
      <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide">
        <!--        <span aria-hidden="true">&times;</span>-->
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { createTeleportNode } from '@/utils/util'
import { MessageType } from '@/interfaceAndTypeList/message'

export default defineComponent({
  name: 'MessageCompose',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    createTeleportNode('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObject,
      isVisible,
      hide
    }
  }
})
</script>
createTeleportNode()
<style scoped>

</style>

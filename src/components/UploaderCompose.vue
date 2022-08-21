<template>
  <div v-if="fileStatus==='success'">
    <button @click.prevent="reduction">清除图片</button>
  </div>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus==='loading'" name="loading">
        <button class="btn btn primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus==='success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus==='error'" name="error">
        <button class="btn btn primary">上传失败</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary btn-large" disabled>点击上传</button>
      </slot>
    </div>
    <input type="file" name="file" class="file-input d-none" ref="fileInput" @change.prevent="uploadFile">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, SetupContext, watch } from 'vue'
import { checkFunction, UploadStatus } from '@/interfaceAndTypeList/upload'
import { handleFileChange } from '@/utils/util'

export default defineComponent({
  name: 'UploaderCompose',
  props: {
    action: {
      type: String,
      require: true
    },
    beforeUpload: {
      type: Function as PropType<checkFunction>
    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)
    watch(() => props.uploaded, (newValue) => {
      console.log(newValue)
      if (newValue) {
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })
    const reduction = () => {
      fileStatus.value = 'ready'
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const uploadFile = (e: Event) => {
      handleFileChange(e, props.action as string, props.beforeUpload as checkFunction, context as SetupContext<('file-uploaded' | 'file-uploaded-error')[]>, fileStatus, fileInput as Ref<HTMLInputElement>, uploadedData)
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      uploadFile,
      uploadedData,
      reduction
    }
  }
})
</script>

<style scoped>

</style>

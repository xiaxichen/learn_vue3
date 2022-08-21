<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <UploaderCompose action="/upload" :before-upload="beforeUpload" @file-uploaded="onFileUploaded"
                     @file-uploaded-error="onFileUploadedError"
                     class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading ...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="" width="500"/>
      </template>
    </UploaderCompose>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules" v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          type="text"
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, ResponseType } from '@/interfaceAndTypeList/global'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { ImageProps, PostProps } from '@/interfaceAndTypeList/column'
import { beforeUploadCheck, handleFileChange } from '@/utils/util'
import UploaderCompose from '@/components/UploaderCompose.vue'
import createMessage from '@/utils/createMessage'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm,
    UploaderCompose
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const route = useRoute()
    let imageId = ''
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [
      {
        type: 'required',
        message: '文章标题不能为空'
      }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      {
        type: 'required',
        message: '文章详情不能为空'
      }
    ]
    // onMounted(() => {
    // })
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const {
          column,
          _id
        } = store.state.user
        if (column) {
          const newPost: PostProps = {
            // _id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            column: column,
            author: _id as string
            // createdAt: new Date().toLocaleString()
          }
          if (imageId) {
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then((rewDta) => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({
                name: 'column',
                params: { id: column }
              })
            })
          })
        }
      }
    }
    const beforeUpload = (file: File) => {
      const fileUpdateErr = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      if (!fileUpdateErr.passed) {
        createMessage(`${fileUpdateErr.error} error`, 'error', 2000)
        return false
      }
      return true
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      console.log(`上传图片ID ${rawData.data._id}`)
      imageId = rawData.data._id as string
      createMessage(`上传图片ID ${imageId}`, 'success')
    }
    const onFileUploadedError = (error: Error) => {
      createMessage(`上传失败 ${error}`, 'success')
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      isEditMode,
      handleFileChange,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  }
})
</script>
<style lang="scss">
.create-post-page {
  &.file-upload-container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.uploaded-area {
  position: relative;

  &:hover {
    h3 {
      display: block;
    }
  }

  h3 {
    display: none;
    position: absolute;
    color: #999;
    text-align: center;
    width: 100%;
    top: 50%;
  }
}
</style>

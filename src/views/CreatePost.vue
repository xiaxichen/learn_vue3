<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <UploaderCompose action="/upload" :before-upload="beforeUpload" @file-uploaded="onFileUploaded"
                     @file-uploaded-error="onFileUploadedError">
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
import { handleFileChange } from '@/utils/util'
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
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            column: column,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({
            name: 'column',
            params: { id: column }
          })
        }
      }
    }
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
      if (!isJPG) {
        createMessage('不是jpg格式文件', 'error', 2000)
        return false
      }
      return true
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      console.log(`上传图片ID ${rawData.data._id}`)
      createMessage(`上传图片ID ${rawData.data._id}`, 'success')
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

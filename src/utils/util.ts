import { onUnmounted, Ref, SetupContext } from 'vue'
import axios from 'axios'
import { checkFunction, UploadStatus } from '@/interfaceAndTypeList/upload'
import createMessage from '@/utils/createMessage'

export const createTeleportNode = (divId: string, divName = 'div'
) => {
  const node = document.createElement(divName)
  node.id = divId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}
export const handleFileChange = async (e: Event, action: string, beforeUpload: checkFunction, context: SetupContext<('file-uploaded' | 'file-uploaded-error')[]>, status: Ref<UploadStatus>, fileInput: Ref<HTMLInputElement>, uploadedData: Ref<null>) => {
// export const handleFileChange = async (e: Event, action: string, beforeUpload: checkFunction, emit: (event: ('file-uploaded' | 'file-uploaded-error'), ...args: any[]) => void, status: Ref<UploadStatus>, fileInput: Ref<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    if (beforeUpload) {
      const result = beforeUpload(target.files[0])
      if (!result) {
        return
      }
    }
    status.value = 'loading'
    const files = Array.from(target.files)
    const formData = new FormData()
    formData.append('file', files[0])
    return await axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((resp) => {
      context.emit('file-uploaded', resp.data)
      uploadedData.value = resp.data
      status.value = 'success'
      createMessage('上传成功', 'success', 2000)
      // setTimeout(() => {
      //   status.value = 'ready'
      // }, 2000)
    }).catch((e) => {
      context.emit('file-uploaded-error', { error: e })
      status.value = 'error'
      createMessage('上传失败', 'error', 2000)
      setTimeout(() => {
        status.value = 'ready'
      })
    }).finally(() => {
      if (target.files) {
        fileInput.value.value = ''
      }
    })
  }
}

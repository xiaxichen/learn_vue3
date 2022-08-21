import { onUnmounted, Ref, SetupContext } from 'vue'
import axios from 'axios'
import { checkFunction, UploadStatus } from '@/interfaceAndTypeList/upload'
import createMessage from '@/utils/createMessage'
import { ColumnProps, ImageProps, UserProps } from '@/interfaceAndTypeList/column'

export const createTeleportNode = (divId: string, divName = 'div'
) => {
  const node = document.createElement(divName)
  node.id = divId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}
export const handleFileChange = async (e: Event, action: string, beforeUpload: checkFunction, context: SetupContext<('file-uploaded' | 'file-uploaded-error')[]>, status: Ref<UploadStatus>, fileInput: Ref<HTMLInputElement>, uploadedData: Ref<Record<string, any> | undefined>) => {
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

interface CheckCondition {
  format?: Array<string>
  size?: number
}

type ErrorType = 'size' | 'format' | null
export const beforeUploadCheck = (file: File, condition: CheckCondition) => {
  const {
    format,
    size
  } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? size >= (file.size / 1024 / 1024) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export function generateFitUrl (data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function addColumnAvatar (data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.png' : '@/assets/avatar.jpg')
    }
  }
}

export const arrToObj = <T extends { _id?: string }> (arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
export const objToArr = <T> (obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

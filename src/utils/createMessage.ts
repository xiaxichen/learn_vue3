import { createApp } from 'vue'

import { MessageType } from '@/interfaceAndTypeList/message'
import MessageCompose from '@/components/MessageCompose.vue'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(MessageCompose, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage

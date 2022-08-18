import { onUnmounted } from 'vue'

export const createTeleportNode = (divId: string, divName = 'div'
) => {
  const node = document.createElement(divName)
  node.id = divId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

<template>
  <teleport :to="`#${teleportId}`">
    <div class="d-flex justify-content-center align-items-center h-100 loading-container"
         :style="{backgroundColor:background || ''}">
      <div class="loading-content">
        <div class="spinner-border text-primary@" role="status">
          <!--        <span class="sr-only">{{ text || 'loading' }}</span>-->
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createTeleportNode } from '@/utils/util'

export default defineComponent({
  name: 'LoaderCompose',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    },
    teleportId: {
      type: String,
      default: 'back'
    }
  },
  setup (props) {
    createTeleportNode(props.teleportId as string, 'div')
  }
})
</script>

<style lang="scss" scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
</style>

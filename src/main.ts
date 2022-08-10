import { createApp } from 'vue'

import App from './App.vue'

import { router } from '@/routers/router'
import store from '@/data/store'

createApp(App).use(router).use(store).mount('#app')

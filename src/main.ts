import { createApp } from 'vue'
import router from './routers'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(router).use(pinia)
app.mount('#app')

import '@/styles/common.scss'
// import '@/assets/main.css'
// import { getCategory } from './apis/testAPI'

// // 测试API
// getCategory().then(res => {
//     console.log(res)
// })
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives/index'
import { componentPlugin } from './components/index'


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')




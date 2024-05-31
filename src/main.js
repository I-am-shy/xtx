import '@/styles/common.scss'
// import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives/index'

import { getCategory } from './apis/testAPI'

// // 测试API
// getCategory().then(res => {
//     console.log(res)
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')




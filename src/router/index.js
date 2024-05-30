import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '', //置空无空格，在访问‘/’主页时会默认渲染
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: "Categroy",
          name: "Category",
          component: () => import("@/views/Category/index.vue")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    
  ]
})

export default router

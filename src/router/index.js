import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
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
          path: "Category/:id",//动态路由数据
          name: "Category",
          component: () => import("@/views/Category/index.vue")
        },
        {
          path: "Category/sub/:id",
          name: "sub",
          component: () => import("@/views/subCategory/index.vue")
        },
        {
          path: "detail/:id",
          name: "detail",
          component: () => import("@/views/detail/index.vue")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    
  ],
  scrollBehavior(){
    //每次路由返回顶部位置
    return{
      top:0,
    }
  }
})

export default router

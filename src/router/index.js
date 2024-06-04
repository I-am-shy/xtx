import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import member from '@/views/member/index.vue'
import home from '@/views/home/index.vue'
import userInfo from "@/views/member/components/userInfo.vue"

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
          component: home
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
        },
        {
          path: "cartList",
          name: "cartList",
          component: () => import("@/views/cartList/index.vue")
        },
        {
          path: "Checkout",
          name: "Checkout",
          component: () => import("@/views/Checkout/index.vue")
        },
        {
          path: "pay",
          name: "pay",
          component: () => import("@/views/pay/index.vue")
        },
        {
          path: "paycallback",
          name: "paycallback",
          component: () => import("@/views/pay/payBack.vue")
        },
        {
          path: "member",
          name: "member",
          component: member,
          children: [
            {
              path: '',
              name: 'userInfo',
              component: userInfo
            },
            {
              path: 'order',
              name: 'order',
              component: () => import("@/views/member/components/userOrder.vue")
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    
  ],
  scrollBehavior(){//路由时的滚动行为
    //每次路由返回顶部位置
    return{
      top:0,
    }
  }
})

export default router

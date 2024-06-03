// pinia管理用户数据，组件共享登录状态

import {defineStore} from 'pinia'
import {ref} from 'vue'
import {login} from '@/apis/user.js'
import { mergeCart } from '@/apis/cart.js'
import { useCartStore } from './cart'



export const useUserStore = defineStore('user', ()=>{
    const cartStore = useCartStore();
    const userInfo = ref({});
    const getUserInfo = async({account,password})=>{
        const res = await login({account,password});
        // console.log(res);
        userInfo.value = res.result;

        //登录时合并购物车
        await mergeCart(cartStore.cartList.map(item=>{
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }));
        cartStore.updateCart();
    }
    const clearUserInfo = ()=>{//清除用户数据
        userInfo.value = {};
        // 退出时清空购物车
        cartStore.clearCart();
    }
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true,//开启路由缓存
})
// pinia管理用户数据，组件共享登录状态

import {defineStore} from 'pinia'
import {ref} from 'vue'
import {login} from '@/apis/user.js'


export const useUserStore = defineStore('user', ()=>{
    const userInfo = ref({});
    const getUserInfo = async({account,password})=>{
        const res = await login({account,password});
        // console.log(res);
        userInfo.value = res.result;
    }
    return{
        userInfo,
        getUserInfo
    }
},{
    persist:true,//开启路由缓存
})
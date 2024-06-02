// axios基础封装
import axios from 'axios'
import { ElMessage } from "element-plus";
import { useUserStore } from '@/stores/user';
import router from '@/router';



const httpInstance = axios.create({
    baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout: 5000
})

// 请求拦截器(发送请求时触发)
httpInstance.interceptors.request.use(config => {
    // 1. 从pinia获取token数据
    const { userInfo } = useUserStore()
    // 2. 按照后端的要求拼接token数据
    const token = userInfo.token
    if (token) {// 有token则拼接数据
        config.headers.Authorization = `Bearer ${token}`
    }
    // else{
    //     // 没有token则退回登录页
    //     // 1. 清除本地存储中的userInfo
    //     clearUserInfo();
    //     // 2. 跳转到登录页面
    //     router.push('/login');
    // }
    return config;
}, e => {
    return Promise.reject(e);
})

// 响应拦截器（响应请求时触发）
httpInstance.interceptors.response.use(response => {
    return response.data;
}, e => {
    const {clearUserInfo} = useUserStore();
    // 统一处理错误提示
    ElMessage({
        type: "error",
        message: e.response.data.message,
    })
    // 401---token失效处理
    if(e.response.status === 401){
        // console.log("token失效");
        // 1. 清除本地存储中的userInfo
        clearUserInfo();
        // 2. 跳转到登录页面
        router.push('/login');
    }
    return Promise.reject(e);
})

export default httpInstance;
// axios基础封装
import axios from 'axios'
import { ElMessage } from "element-plus";


const httpInstance = axios.create({
    baseURL:"https://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout:5000
})

// 请求拦截器
httpInstance.interceptors.request.use(config => {
    return config;
},e => {
    return Promise.reject(e);
})

// 响应拦截器
httpInstance.interceptors.response.use(response => {
    return response.data;
},e => {
    // 统一处理请求错误
    ElMessage({
        type:"error",
        message: e.response.data.message,
    })
    return Promise.reject(e);
})

export default httpInstance;
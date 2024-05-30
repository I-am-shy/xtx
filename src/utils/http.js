// axios基础封装
import axios from 'axios'

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
    return Promise.reject(e);
})

export default httpInstance;
// 用户相关
import request from '@/utils/http'

//get用params参数，post用data数据

export const login = ({ account, password }) => {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

export const getLikeList = () => {
    return request({
        url: "/goods/relevant",
        method: "GET",
        params: {//数据量
            limit: 24
        }
    })
}
/** 
@params: {
    @orderState:0,
    @page:1,
    @pageSize:2
}
*/


export const getUserOrder = (params) => {
    return request({
        url: '/member/order',
        method: 'GET',
        params
    })
}
import request from '@/utils/http'

//添加购物车
export const insertCart = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'post',
        data: {
            skuId,
            count
        }
    })
}

//获取购物车列表
export const findNewCart = () => {
    return request({
        url: '/member/cart',
        method: 'get'
    })
}

export const delCartData = (ids)=>{
    return request({
        url:`/member/cart`,
        method:'delete',
        data:{
            ids
        }
    })
}

export const mergeCart = (data)=>{
    return request({
        url:'/member/cart/merge',
        method:'post',
        data
    })
}
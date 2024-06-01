import httpInstance from "@/utils/http";

export const getDetail = (id) => {
    return httpInstance({
        url: "/goods",
        method: "get",
        params: {
            id:id
        }
    })
}
/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getDetailHot = ({id,type,limit})=>{
    return httpInstance({
        url:"/goods/hot",
        method:"get",
        params:{
            id:id,
            type:type,
            limit:limit
        }
    })
}
import httpInstance from "@/utils/http";

// 获取首页轮播图
export const getBannerList = (params={}) => {
    const { distributionsite = 1 } = params;//解构参数，默认1
    return httpInstance({
        url:"/home/banner",
        methods:"get",
        params:{
            distributionsite
        }
    })
}
export const getNewList = () =>{
    return httpInstance({
        url:"/home/new",
        methods:"get"
    })
}
export const getHotList = () =>{
    return httpInstance({
        url:"/home/hot",
        methods:"get"
    })
}
export const getGoodList = () =>{
    return httpInstance({
        url:"/home/goods",
        methods:"get"
    })
}
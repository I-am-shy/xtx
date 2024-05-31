import httpInstance from "@/utils/http";

// 获取首页轮播图
export const getBannerList = () => {
    return httpInstance({
        url:"/home/banner",
        methods:"get"
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
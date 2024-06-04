//定义插件格式
// export const myPlugin = {
//     install(app) {

//     }
// }

// 定义懒加载插件
export const lazyPlugin = {
    install(app) {
        //注册全局懒加载指令
        app.directive('lazy', (el, binding) => {//类似的生命周期函数，在指令绑定到元素上时执行
            // console.log('指令绑定到元素上',el,binding.value)
            //监听图片是否在视口内，如果在，则加载图片
            const observer = new IntersectionObserver((entries) => {// 原生的观察视口api
                if (entries[0].isIntersecting > observer.thresholds[0]) {//如果图片出现在视口内
                    el.src = binding.value;
                    observer.unobserve(el)//停止监听，节省资源
                    // console.log('图片出现在视口内')
                }
            }, {
                root: null,//视口
                threshold: 0.1,//触发条件,出现10%在视口就被捕获
            })
            observer.observe(el)//开始监听
        })
    }
}
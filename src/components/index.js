//把components中的所有组件进行全局注册
import imgView from './imgView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app) {
        // app.component("组件名",组件对象);
        app.component('imgView', imgView);
        app.component('XtxSku', XtxSku);
    }
}


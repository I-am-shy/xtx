### 项目文档 https://www.yuque.com/fechaichai/td99ck
### Lint with [ESLint](https://eslint.org/)

### 目录结构
```
src/
├── assets 静态资源
├── composables 组合函数
├── components 组件
├── router 路由
├── stores 状态管理
├── views 视图
├── App.vue 根组件
├── main.ts 入口文件
├── apis 接口
├── styles 样式
├── utils 工具
|——directives 指令
├── vue.config.js vue配置
```
### git初始化仓库并提交
```sh
git init
# 以下是后续提交
git add .
git commit -m "first commit(任意字符串，提交的名称)"
```


### vue核心---响应式（交互时，页面上的数据变化实时的改变页面结构，更新页面，使页面看起来是动态的会响应回复的），组件化（.vue），模块化(.js)，路由(组件页面切换)，状态管理（组件之间数据共享），




### 解决的问题
1.解决分页,分块问题---分级路由
2.解决了吸顶导航的问题---通过css的fixed定位，透明的和transform移动，隐藏导航，然后使用模板语法动态添加类实现吸顶导航
3.解决了重复网络请求的问题---通过pinia传递数据减少了重复网络请求
4.解决多次循环渲染时，先使用静态数据渲染，再替换成动态数据，先保证层次顺序，再修改数据
5.使用插槽提升了代码的复用，简化了代码结构
6.pinia持久化保存登录状态
7.动态模板渲染顺序，先渲染一般的静态模板，在替换成动态模板（响应式数据）
8.通过路由守卫onBeforeRouteUpdate实现了（不同参数）原页面跳转，更新网页数据
9.路由缓存保存用户登录状态和购物车信息

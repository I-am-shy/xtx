<script setup>//组合式API
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutFixed from '@/views/layout/components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/category';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// 监听路由变化，如果路由变化，则重新获取分类数据

const category = useCategoryStore()

onMounted(() => {
    category.getCategory()// 发送一次请求，获取分类数据，并将其绑定在category store中（categroyList）,
    // 这样在layout组件中就可以直接使用category store（categroyList）中的数据了
    
})

function key() {// 无效果
    return route.name !== undefined ? route.name + +new Date() : route + +new Date()
}
computed(()=>{
    key()// 获取当前路由的name，并将其与当前时间戳拼接，生成一个新的key值，用于取消路由缓存
})
</script>

<template>
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <!-- 设置key 取消路由缓存，销毁组件重置数据 -->
    <!-- <router-view :key="$route.path"></router-view> -->
    <router-view :key="key"></router-view>
    <LayoutFooter></LayoutFooter>
</template>

<style scoped>
/* 当 <style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素 */
</style>
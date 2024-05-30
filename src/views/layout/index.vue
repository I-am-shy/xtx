<script setup>//组合式API
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutFixed from '@/views/layout/components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const category = useCategoryStore()

onMounted(() => {
    category.getCategory()// 发送一次请求，获取分类数据，并将其绑定在category store中（categroyList）,
    // 这样在layout组件中就可以直接使用category store（categroyList）中的数据了
})

</script>

<template>
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <router-view></router-view>
    <LayoutFooter></LayoutFooter>
</template>

<style scoped>
/* 当 <style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素 */

</style>
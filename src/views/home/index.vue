<script setup>//组合式API
import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'

</script>

<template>
  <div class="container">

    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>

<style scoped>
/* 当 <style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素 */
</style>
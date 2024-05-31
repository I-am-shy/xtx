<script setup>//组合式API
import { onMounted, ref } from 'vue';
import { getBannerList } from '../../../apis/home.js'

const bannerList = ref([]);

onMounted(async () => {
    const res = await getBannerList();
    bannerList.value = res.result;
    console.log(bannerList.value);
})


</script>

<template>
    <div class="banner">
        <el-carousel :interval="3000" type="card" height="400px" arrow="never" mation-blur="true">
            <el-carousel-item v-for="item in bannerList" :key="item">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
/* 当 <style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素 */
.banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px;
    background-color: #f5f5f5ac;
    transition: 0.3s ease-in-out;
    &:hover{
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2),
        inset 0 4px rgba(0, 0, 0, 0.3),
        inset 0 -4px rgba(0,0,0,0.3);
        transform: translateY(-4px);
        height: 508px;
        border-radius: 5px ;
    }
    
    img {
        margin-top: 50px;
        height: 400px;
        object-fit: cover;
    }


}
</style>
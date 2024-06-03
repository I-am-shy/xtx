<script setup>
import { ref } from 'vue';

// 导入图片列表
const props = defineProps({
    imgList: {
        type: Array,
        default: () => []
    }
})
// 图片列表
const imageList = ref(props.imgList);

// 当前选中的图片索引
const activeIndex = ref(0);
// 是否显示蒙层
const isShow = ref(false);
//设置蒙层小滑块的位置
const layerX = ref(0);
const layerY = ref(0);
// 设置放大后的图片位置
const largeX = ref(0);
const largeY = ref(0);

// 鼠标经过图片列表
const layerMove = (e) => {
    // console.log(e.x,e.y);
    // 大图盒子的位置
    let midlle = document.querySelector('.middle')
    let midlleX = midlle.getBoundingClientRect().left;
    let midlleY = midlle.getBoundingClientRect().top;
    // console.log(midlleX,midlleY);
    // 蒙层元素
    let layer = document.querySelector('.layer')
    // console.log(layer.offsetWidth,layer.offsetHeight);
    // console.dir(layer);
    // 获取鼠标在盒子中的位置
    layerX.value = e.x - midlleX - layer.offsetWidth/2;
    layerY.value = e.y - midlleY - layer.offsetHeight/2;
    // 限制范围不超出大盒子
    if (layerX.value < 0) {
        layerX.value = 0;
    }
    if (layerX.value > layer.offsetWidth) {
        layerX.value = layer.offsetWidth;
    }
    if (layerY.value < 0) {
        layerY.value = 0;
    }
    if(layerY.value > layer.offsetHeight){
        layerY.value = layer.offsetHeight;
    }
    // 修改放大后的图片位置
    largeX.value = -layerX.value * 2;
    largeY.value = -layerY.value * 2;

}
</script>


<template>
    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target" @mousemove="layerMove" @mouseenter="isShow = true"
            @mouseleave="isShow = false">
            <img :src="imageList[activeIndex]" alt="" />
            <!-- 蒙层小滑块 -->
            <div v-if="isShow" class="layer" :style="{ left: `${layerX}px`, top: `${layerY}px`}"></div>
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <li v-for="(img, i) in imageList" :key="i" @mouseenter="activeIndex = i"
                :class="activeIndex === i ? 'active' : ''">
                <img :src="img" alt="" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div class="large" :style="[
            {
                backgroundImage: `url(${imageList[activeIndex]})`,
                backgroundPositionX: `${largeX}px`,
                backgroundPositionY: `${largeY}px`,
            },
        ]" v-show="isShow"></div>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>
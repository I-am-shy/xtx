<script setup>//组合式API
import card from '../home/components/card.vue';
import useBanner from "./composables/useBanner.js"
import useCategory from "./composables/useCategory.js"

const { bannerList } = useBanner();
const { categoryData} = useCategory();


</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑导航 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >{{ categoryData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 轮播图 -->
            <div class="banner">
                <el-carousel :interval="3000" type="card" height="380px" arrow="hover" mation-blur="true">
                    <el-carousel-item v-for="item in bannerList" :key="item">
                        <img v-lazy="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 分类数据 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in categoryData.children" :key="i.id">
                        <RouterLink :to="`/category/sub/${i.id}`">
                            <img v-lazy="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3>
                </div>
                <div class="body">
                    <card v-for="good in item.goods" :good="good" :key="good.id" />
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
/* 当 <style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素 */
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }
}

.banner {
    position: relative;
    top: 10px;
    left: 0;
    width: 100%;
    height: 400px;
    background-color: #f5f5f5ac;
    transition: 0.3s ease-in-out;
    margin: 0 auto;

    &:hover {
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        transform: translateY(-4px);
        height: 408px;
        border-radius: 5px;
    }

    img {
        margin-top: 50px;
        height: 400px;
        object-fit: cover;
    }


}
</style>
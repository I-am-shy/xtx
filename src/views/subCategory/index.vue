<script setup>
import { useSubCategory } from './composables/useSubCategory';
import { useDataList } from './composables/useDataList';
import card from '@/views/home/components/card.vue'
import { getSubCategoryDataList } from '@/apis/category'
import { ref } from 'vue';

const { dataList, option } = useDataList();
const { subCategoryList } = useSubCategory();

const end = ref(false);// 数据没有到底

const getDataList = async () => {
    const res = await getSubCategoryDataList(option.value);
    dataList.value = res.result.items;
    // console.log(res);
}
//选项卡更新数据
const TabChange = () => {
    // console.log(option.value);
    // 触发选项卡事件，重新拉起请求更新排序列表
    option.value.page = 1;//重置页数
    end.value = false;//重置数据到底
    getDataList();
    // console.log(dataList.value);
};

async function load() {
    // console.log("滚动到底部了");
    option.value.page++; //修改页数
    const res = await getSubCategoryDataList(option.value);
    dataList.value = [...dataList.value, ...res.result.items];//拼接数组

    if(res.result.items.length === 0){
        // console.log("没有更多数据了");
        end.value = true;//数据到底了
    }
}
</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/Category/${subCategoryList.parentId}` }">{{
                    subCategoryList.parentName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ subCategoryList.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="option.sortField" @tab-change="TabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body"  v-infinite-scroll="load" :infinite-scroll-distance="80" :infinite-scroll-disabled="end">
                <!-- 商品列表-->
                <card v-for="item in dataList" :key="item.id" :good="item"></card>
                <p v-if="end" class="end">没有更多数据了...</p>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
        .end{
            text-align: center;
            margin: 20px auto;
            font-size: 1.5em;
            color: #999;
        }
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>
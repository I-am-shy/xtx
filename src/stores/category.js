import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getCategoryAPI} from '@/apis/layout'

export const useCategoryStore = defineStore('category', ()=>{
    // state状态数据
    const categoryList = ref([]);
    // action方法
    const getCategory = async function() {
        const res = await getCategoryAPI();
        // console.log(res);
        categoryList.value = res.result;
    }
    return {
        categoryList,
        getCategory
    }
})
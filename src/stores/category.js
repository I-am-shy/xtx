import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getCategoryAPI} from '@/apis/layout'

export const useCategoryStore = defineStore('category', ()=>{
    const categoryList = ref([]);
    const getCategory = async function() {
        const res = await getCategoryAPI();
        console.log(res);
        categoryList.value = res.result;

    }
    return {
        categoryList,
        getCategory
    }
})
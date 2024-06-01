
import { ref,onMounted } from 'vue'
import { getCategoryFilter } from '@/apis/category'
import { useRoute } from 'vue-router'

export const useSubCategory = (category1Id) => {
    // 1. 定义响应式数据
    const subCategoryList = ref([]);
    const route = useRoute();
    // 2. 获取数据
    const getSubCategoryData = async () => {
        const res = await getCategoryFilter(route.params.id)
        subCategoryList.value = res.result;
        // console.log(res);
    }
    onMounted(()=> getSubCategoryData())
    // 3. 返回数据
    return { subCategoryList }
}
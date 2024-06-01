
import { ref, onMounted } from 'vue'
import { getSubCategoryDataList } from '@/apis/category'
import { useRoute } from 'vue-router'

export const useDataList = () => {
    const dataList = ref([]);
    const route = useRoute();
    const option = ref({
        categoryId: route.params.id,
        page: 1,
        pageSize: 20,
        sortField: 'publishTime' // 排序字段
    });

    const getDataList = async (dataList,option) => {
        const res = await getSubCategoryDataList(option.value);
        dataList.value = res.result.items;
        // console.log(res);
    }

    onMounted(() => {
        getDataList(dataList,option);
    })
    return { 
        dataList,
        getDataList,
        option
    }
}


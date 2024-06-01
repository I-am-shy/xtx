
import { ref, onMounted } from 'vue';
import {onBeforeRouteUpdate} from 'vue-router';
import { useRoute } from 'vue-router';
import { getCategory } from '@/apis/category';

export default function useCategory() {

    const route = useRoute();
    const categoryData = ref({});
    
    async function getCategoryData(id = route.params.id) {
        const res = await getCategory(id);
        categoryData.value = res.result;
        // console.log(res.result)
    }

    onMounted(() => getCategoryData())
    onBeforeRouteUpdate((to) => { // 在当前路由改变，但是该组件被复用时调用
        // console.log(to,"跳转了");
        getCategoryData(to.params.id);
    })

    return { categoryData }
}
// 业务分装
import { ref,onMounted } from 'vue'
import { getBannerList } from '@/apis/home';

export default function useBanner(){
    const bannerList = ref([]);
    
    onMounted(async () => {
        const res = await getBannerList({ distributionsite: 2 });
        bannerList.value = res.result;
        // console.log(res);
    })
    
    //以对象的形式返回方法和数据
    return { bannerList };
}

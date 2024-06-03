
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([]);//state 购物车列表
    const addCart = (cart) => {// action 添加商品到购物车
        //添加到购物车
        // 匹配skuId，匹配成功商品数量加一count++,否则添加到购物车
        const item = cartList.value.find(item => item.skuId === cart.skuId);
        if (item) {//有这个商品
            item.count++;
        } else {//没有这个商品
            cartList.value.push(cart);
        }
    }
    const delCart = (skuId) => {
        //删除购物车商品
        const index = cartList.value.findIndex(item => item.skuId === skuId);//获取选中的下标值
        cartList.value.splice(index, 1);//从列表删除
    }

    // 计算属性，返回指定数据，getter
    const getSum = computed(() => {// 只有当
        const sum = ref(0);// 计算总数
        cartList.value.forEach(item => {
            sum.value += item.count;
        });
        return sum;
    })
    const getTotal = computed(() => {
        // 计算总价
        return cartList.value.reduce((total, item) => total + item.count * item.price, 0);//累加器
    })

    return {
        cartList, // 购物车列表
        addCart, // 添加商品到购物车
        delCart, // 删除购物车商品
        getSum, // 计算总数
        getTotal, // 计算总价
    }
}, {
    persist: true // 开启本地存储
})
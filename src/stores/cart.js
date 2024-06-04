
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCart, findNewCart, delCartData } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore();//获取用户信息,注意回调位置
    const isLogin = computed(() => userStore.userInfo.token);//是否登录
    const cartList = ref([]);//state 购物车列表

    const selectChange = (skuId, selected) => {// 修改商品选中状态
        const item = cartList.value.find(item => item.skuId === skuId);
        item.selected = selected;
    }
    const updateCart = async()=>{
        // 接口购物车数据覆盖本地数据
        const res = await findNewCart();
        cartList.value = res.result;
    }
    const addCart = async (cart) => {// action 添加商品到购物车
        // 判断是否登录
        if (!isLogin.value) {
            //添加到购物车
            // 匹配skuId，匹配成功商品数量加一count++,否则添加到购物车
            const item = cartList.value.find(item => item.skuId === cart.skuId);
            if (item) {//有这个商品
                item.count++;
            } else {//没有这个商品
                cartList.value.push(cart);
            }
        } else {
            await insertCart({ skuId: cart.skuId, count: cart.count });
            updateCart();
        }
    }
    const delCart = async (skuId) => {
        if (!isLogin.value) {
            //删除购物车商品
            const index = cartList.value.findIndex(item => item.skuId === skuId);//获取选中的下标值
            cartList.value.splice(index, 1);//从列表删除
        } else {
            await delCartData([skuId]);
            updateCart();
        }
    }
    const clearCart = async () => {
        cartList.value = [];//清空购物车
    }
    const AllSelected = (selected) => {
        if (selected === true) {
            //全选
            cartList.value.forEach(item => item.selected = true);
        } else {
            //取消全选
            cartList.value.forEach(item => item.selected = false);
        }
    }
    // 计算属性，返回指定数据，getter
    const getSum = computed(() => {
        // //产生一个依赖错误，
        // const sum = ref(0);// 计算总数
        // cartList.value.forEach(item => {
        //     sum.value += item.count;
        // });
        // return sum;
        return cartList.value.reduce((sum, item) => sum + item.count, 0);//累加器
    })
    const getTotal = computed(() => {
        // 计算总价
        return cartList.value.reduce((total, item) => total + item.count * item.price, 0);//累加器
    })
    const selectedSum = computed(() => cartList.value.filter(item => item.selected).reduce((sum, item) => sum + item.count, 0))// 计算选中的商品数量
    const selectedTatol = computed(() => cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count * item.price, 0))// 计算选中的商品数量
    //判断全选
    const isAllSelected = computed(() => cartList.value.length>0?cartList.value.every(item => item.selected):false);//为每个数组元素返回真值，则为 true。否则为 false,列表为空也是false。

    return {
        cartList, // 购物车列表
        selectChange, // 修改商品选中状态
        updateCart, // 更新购物车
        addCart, // 添加商品到购物车
        delCart, // 删除购物车商品
        AllSelected, // 全选
        clearCart, // 清空购物车
        getSum, // 计算总数
        getTotal, // 计算总价
        selectedSum, // 计算选中的商品数量
        selectedTatol, // 计算选中的商品总价
        isAllSelected, // 判断是否全选
    }
}, {
    persist: true // 开启本地存储
})
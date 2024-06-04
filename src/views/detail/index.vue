<script setup>
import { useRoute,onBeforeRouteUpdate } from 'vue-router';
import { getDetail } from "@/apis/detail.js"
import { ref, onMounted } from "vue";
import detailHot from "@/views/detail/components/detailHot.vue"
import { ElMessage } from 'element-plus';
import { useCartStore} from "@/stores/cart.js";


const cartStore = useCartStore();
const route = useRoute();
const detailData = ref({});
const getDetailData = async (id) => {//设置参数，同页面跳转时，使用新页面的参数（to），使用默认参数，由于是异步函数会带上原页面的参数读取数据
    const res = await getDetail(id);
    detailData.value = res.result;
    // console.log(res.result,route.params.id);
}
onMounted(() => {
    getDetailData(route.params.id);
});

//传递数据
let data = {};
//记录数量
const count = ref(0)
// XtxSku组件返回的数据
const SkuSelect = (sku) => {
    // console.log(sku);
    //选中规格时，默认选择1个
    if(sku.skuId){
        count.value = 1;
    }
    data=sku;
}

const countChange = ()=>{
    // console.log(count.value);
}

const addCart = ()=>{
    // 判断是否选完规格
    if(data.skuId && count.value>0){
        //选完规格，添加到购物车
        cartStore.addCart({
            id: detailData.value.id,
            name: detailData.value.name,
            picture: detailData.value.mainPictures[0],
            price: detailData.value.price,
            count: count.value,
            skuId: data.skuId,
            skuName: data.skuID,
            specsText: data.specsText,
            selected: true
        });
        console.log(count.value,data)
        ElMessage({type:'success',message:'添加成功'});
    }else{
        // 没有选完规格
        ElMessage({type:'warning',message:'请选择完整规格和正确的数量' })
    }
}

onBeforeRouteUpdate((to,from,next)=>{//原页面跳转
  // 在这里执行一些操作，例如保存数据
  // ...
    console.log(to,from,next);
    // 刷新页面
    detailData.value={};//清空原数据
    getDetailData(to.params.id);//获取新数据,
  // 调用 next() 函数，继续导航
    next();
})

</script>


<template>
    <div class="xtx-goods-page">
        <!-- 有数据才渲染，等待异步数据 -->
        <div class="container" v-if="detailData.details">
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <!-- 可选链读取异步数据(多层访问数据) -->
                    <el-breadcrumb-item :to="{ path: `/Category/${detailData.categories?.[1].id }`}">{{detailData.categories?.[1].name}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/Category/sub/${detailData.categories?.[0].id }`}">{{ detailData.categories?.[0].name }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ detailData.desc }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="goods-info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <imgView :imgList="detailData.mainPictures"/>
                            <!-- 统计数量 -->
                            <ul class="goods-sales">
                                <li>
                                    <p>销量人气</p>
                                    <p>{{ detailData.salesCount }}+</p>
                                    <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                                </li>
                                <li>
                                    <p>商品评价</p>
                                    <p>{{ detailData.commentCount }}+</p>
                                    <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                                </li>
                                <li>
                                    <p>收藏人气</p>
                                    <p>{{ detailData.collectCount }}+</p>
                                    <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                                </li>
                                <li>
                                    <p>品牌信息</p>
                                    <p>{{ detailData.brand.name }}</p>
                                    <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                                </li>
                            </ul>
                        </div>
                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name"> {{ detailData.name }} </p>
                            <p class="g-desc"> {{ detailData.desc }} </p>
                            <p class="g-price">
                                <span>{{ detailData.oldPrice }}</span>
                                <span>{{ detailData.price }}</span>
                            </p>
                            <div class="g-service">
                                <dl>
                                    <dt>促销</dt>
                                    <dd>12月好物放送，App领券购买直降120元</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>无忧退货</span>
                                        <span>快速退款</span>
                                        <span>免费包邮</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div>
                            <!-- sku组件 -->
                            <XtxSku :goods="detailData" @change="SkuSelect"/>
                            <!-- 数据组件 -->
                            <el-input-number v-model="count" @change="countChange"></el-input-number>
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                            </div>

                        </div>
                    </div>
                    <div class="goods-footer">
                        <div class="goods-article">
                            <!-- 商品详情 -->
                            <div class="goods-tabs">
                                <nav>
                                    <a>商品详情</a>
                                </nav>
                                <div class="goods-detail">
                                    <!-- 属性 -->
                                    <ul class="attrs">
                                        <li v-for="item in detailData.details.properties" :key="item.value">
                                            <span class="dt">{{ item.name }}</span>
                                            <span class="dd">{{ item.value }}</span>
                                        </li>
                                    </ul>
                                    <!-- 图片 -->
                                    <img v-for="item in detailData.details.pictures" :key="item" v-lazy="item" alt="null">
                                </div>
                            </div>
                        </div>
                        <!-- 24热榜+专题推荐 -->
                        <div class="goods-aside">
                            <!-- 24小时 -->
                            <detailHot :type="1"/>
                            <!-- 周 -->
                            <detailHot :type="2"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="width: 100%;height: 100vh;background-color: white;transition: 0.5s;opacity: 0.5;font-size: 4em;text-align: center;">loading</div>
    </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
    .goods-info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .goods-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .goods-aside {
            width: 280px;
            min-height: 1000px;
        }
    }

    .goods-tabs {
        min-height: 600px;
        background: #fff;
    }

    .goods-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 22px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
    }

    .g-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: $priceColor;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: $xtxColor;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .goods-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: $priceColor;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: $xtxColor;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: $xtxColor;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: $priceColor;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;

}

.bread-container {
    padding: 25px 0;
}
</style>
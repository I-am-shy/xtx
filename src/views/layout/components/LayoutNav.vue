<script setup>//组合式API

</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 多模板渲染，区分登录与非登录状态 -->
                <template v-if="false">
                    <!-- 不使用a标签的href跳转（丢失响应性） -->
                    <li><a href="javascpript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
                    <li>
                        <el-popconfirm title="您确定要退出吗？" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;" >退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>

                    <li><a href="javascpript:;">我的订单</a></li>
                    <li><a href="javascpript:;">会员中心</a></li>
                </template>
                <template v-else>
                    <li><a href="javascpript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascpript:;">帮助中心</a></li>
                    <li><a href="javascpript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<style scoped lang="scss">
/* 当 <style> 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素 */
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>
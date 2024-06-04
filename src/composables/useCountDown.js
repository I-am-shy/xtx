import {ref,computed,onUnmounted} from 'vue';

// 时间逻辑函数，秒数改成，时分秒的格式

export const useCountDown = () => {
  let timer = null;
  const time = ref(0);//倒计时时间
  //显示在页面上的响应式数据
  const formatTime = computed(() => {
    return common(time.value);
  })
  const start = (seconds)=>{
    time.value = seconds;
    timer = setInterval(()=>{
      time.value--;
    },1000);
    //组件销毁时清除定时器
    onUnmounted(()=>{
      clearInterval(timer);
    })
  }
  const common = (seconds) => {
    // 默认每一位都是0
    let f,s = 0;
    // 秒数
    s = seconds % 60;
    // 分钟数
    f = Math.floor(seconds / 60);//向下取整
    // 格式化
    f = f < 10 ? `0${f}` : f;//小于10前面补0
    s = s < 10 ? `0${s}` : s;//小于10前面补0
    return `${f}分${s}秒`;
  }

  return {
    formatTime,
    start
  }
}
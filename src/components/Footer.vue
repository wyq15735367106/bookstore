<template>
  <!-- 底部-->
  <div class="bottom-tab">
    <div class="tab-item" @click="switchTo('/Index')">
      <img :src="'/Index' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal">
      <span class="txt" :class="{on: '/Index' === $route.path}">首页</span>
    </div>
    <div class="tab-item" @click="switchTo('/Find')">
      <img :src="'/Find' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal">
      <span class="txt" :class="{on: '/Find' === $route.path}">发现</span>
    </div>
    <div class="tab-item" @click="switchTo('/Order')">
      <img :src="'/Order' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal">
      <span class="txt" :class="{on: '/Order' === $route.path}">订单</span>
    </div>
    <div class="tab-item" @click="switchTo('/My')">
      <img :src="'/My' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal">
      <span class="txt" :class="{on: '/My' === $route.path}">我的</span>
    </div>
  </div>
</template>
<script>
import storage from 'good-storage'
import { Toast } from 'vant';
export default {
  data() {
    return {
      tabBarImgArr: [   //图片切换
        { normal: require('../../static/image/1.png'), selected: require('../../static/image/5.png') },
        { normal: require('../../static/image/2.png'), selected: require('../../static/image/6.png') },
        { normal: require('../../static/image/3.png'), selected: require('../../static/image/7.png') },
        { normal: require('../../static/image/4.png'), selected: require('../../static/image/8.png') }
      ]
    }
  },
  methods: {
    switchTo(path) {
      this.$router.push(path)
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 100
      });
    }
  }
}
</script>

<style  scoped>
.bottom-tab {
  width: 100%;
  height: 0.49rem;
  background-color: #fff;
  position: fixed;
  left: 0px;
  bottom: 0px;
  display: flex;
  z-index: 999;
  box-shadow: 0px 0px 10px #d1e9fb;
}
.tab-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.11rem;
  color: #999999;
}
img {
  height: 0.2rem;
  width: auto;
}
.on {
  color: #03b585;
}
.txt {
  margin-top: 0.05rem;
}
</style>
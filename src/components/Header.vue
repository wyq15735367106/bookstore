<template>
  <!--头部-->
  <div class="head">
    <p>{{name}}</p>
    <div class="head_box">
      <div style="padding:0;margin:0;width:0.25rem;" @click="goback()">
        <img :src="image" alt="" class="img_f">
      </div>
      <img :src="img" alt="" class="imgs" @click="fa">
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props: ['name', 'image', 'img'],
  methods: {
    goback() {
      this.$router.back()
    },
    fa: function () {
      // Toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 0
      // });
      this.$router.push('./shangchuan')
    }
  }
}
</script>

<style scoped>
.head {
  width: 100%;
  font-size: 0.18rem;
  line-height: 0.49rem;
  text-align: center;
  background: #03b585;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index:1000;
}

.head .head_box {
  width: 100%;
  line-height: 0.49rem;
  box-sizing: border-box;
  padding: 0 5%;
  position: absolute;
  top: 0;
  left: 0;
}
.imgs {
  position: absolute;
  top: 0;
  right: 0.15rem;
}
.head .head_box img {
  height: 0.18rem;
  width: auto;
  margin: 0.15rem 0;
}
.img_f {
  height: 0.14rem;
}
</style>
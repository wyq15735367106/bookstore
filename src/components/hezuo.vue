<template>
    <div class="hezuo">
        <!-- 评论部分 -->
        <app-header :name='name' :image='image'></app-header>
        <div class="body">
            <p class="text">
                易优书店
            </p>
            <p class="text1">
                选择易优书店、靠谱 期待您的加入！
            </p>
            <p class="tes">
                百万学生和书店共同选择
            </p>
            <p class="tes">
                让学生专注读书
            </p>
            <p class="tes">
                让书店不再局限
            </p>
            <div class="tes">
                <!-- <img src="../../static/image/demo5.png" alt=""> -->
                联系人：刘先生
            </div>
            <div class="tes">
                <!-- <img src="../../static/image/demo5.png" alt=""> -->
                联系电话：13152796215
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import { Toast } from 'vant';
import { Dialog } from 'vant';
// 設置緩存
import storage from 'good-storage'
export default {
    components: {
        'app-header': Header,
        [Dialog.Component.name]: Dialog.Component
    },
    name: 'Find',
    data() {
        return {
            name: '商业合作',
            image: require("../../static/image/back.png"),
        }
    },
    methods: {

    },
    created() {

    }
}

</script>

<style scoped>
.hezuo {
  padding-top: 0.49rem;
}
.body {
  height: 100vh;
  width: 100vw;
  background-image: url('../../static/image/bac.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.text {
  padding-top: 36vh;
  font-size: 0.32rem;
  font-weight: 500;
  color: #fff;
  width: 80%;
  margin: 0 auto;
}
.text1 {
  font-size: 0.32rem;
  font-weight: 500;
  color: #fff;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 0.1rem;
}
.tes {
  margin-top: 0.2rem;
  width: 80%;
  margin: 0 auto;
  color: #fff;
  font-size: 0.2rem;
  font-weight: 400;
  line-height: 0.3rem;
}
.img {
  width: 1.65rem;
  height: 1.65rem;
  margin: 0.2rem auto;
}
.img img {
  height: 100%;
  width: 100%;
}
</style>
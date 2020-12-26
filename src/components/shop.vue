<template>
  <div class="Shop">
    <!-- 评论部分 -->
    <app-header :name='name' :image="image"></app-header>
    <div class="sou">
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" @input='change' />
      </form>
    </div>
    <div class="shudain cl" v-for="(item,index) in shops" :key="index">
      <div class="img fl">
        <img :src="item.head_pic" alt="" @click="Bookstore(item.id)">
      </div>
      <div class="nav fl">
        <p @click="Bookstore(item.id)">{{item.name}}</p>
        <p style="margin-top:0.05rem" class='van-multi-ellipsis--l2'>{{item.intro}}</p>
        <div class="address cl">
          <p class="fl" v-if="item.gaps"> {{item.gaps}}公里</p>
          <p class="fl" v-else> {{item.gap}}米</p>
          <p class="fr">已售{{item.num}}</p>
        </div>
        <div class="youhui">
          <p v-for="val in item.discount">{{val}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { Search } from 'vant';
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
      name: '书店',
      image: require("../../static/image/back.png"),
      shops: [],
      value: ''
    }
  },
  methods: {
    change: function () {
      this.$api.get('search_shop', {}, {
        token: storage.get('token'),
        lat: storage.get('latitude'),
        lng: storage.get('longitude'),
        text: this.value
      },
        ret => {
          console.log(ret)
          for (var i = 0; i < ret.data.shops.data.length; i++) {
            if (ret.data.shops.data[i].gap < 1000) {
              ret.data.shops.data[i].gap = ret.data.shops.data[i].gap
            } else {
              ret.data.shops.data[i].gaps = ret.data.shops.data[i].gap / 1000
              ret.data.shops.data[i].gaps = ret.data.shops.data[i].gaps.toFixed(2)
            }
          }
          this.shops = ret.data.shops.data
        })
    },
    // 书店详情
    Bookstore: function (id) {
      this.$router.push({
        path: './Bookstore',
        query: { id: id }
      })
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
    }
  },
}

</script>

<style scoped>
.sou {
  position: fixed;
  top: 0.49rem;
  left: 0;
  width: 100%;
}
.Shop {
  padding-top: 1.03rem;
  padding-bottom: 0.5rem;
}

.shudain {
  background: #fff;
  padding: 0.1rem 0.1rem;
  margin-top: 1px;
}
.shudain .img {
  height: 1.1rem;
  width: 30%;
}
.shudain img {
  height: 100%;
  width: 100%;
}
.shudain .nav {
  width: 64%;
  margin-left: 0.15rem;
}
.nav p:nth-child(1) {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.2rem;
}
.nav p:nth-child(2) {
  font-size: 0.13rem;
  color: #999999;
  line-height: 0.15rem;
}
.address {
  margin-top: 0.2rem;
}
.address p:nth-child(1) {
  font-size: 0.13rem;
  color: #999999;
  line-height: 0.2rem;
}
.address p:nth-child(2) {
  font-size: 0.13rem;
  color: #999999;
  line-height: 0.2rem;
}
.youhui p:nth-child(1) {
  color: #03b585;
  font-size: 0.13rem;
  border: 1px solid #03b585;
  border-radius: 0.05rem;
  height: 0.2rem;
  line-height: 0.2rem;
  text-align: center;
  padding: 0 0.05rem;
}
.youhui p:nth-child(2) {
  color: #b53e03;
  font-size: 0.13rem;
  border: 1px solid #b53e03;
  line-height: 0.2rem;
  height: 0.2rem;
  border-radius: 0.05rem;
  text-align: center;
  padding: 0 0.05rem;
}
.youhui p:nth-child(3) {
  color: #03b585;
  font-size: 0.13rem;
  border: 1px solid #03b585;
  line-height: 0.2rem;
  height: 0.2rem;
  border-radius: 0.05rem;
  text-align: center;
  padding: 0 0.05rem;
}
.youhui {
  display: flex;
  justify-content: space-between;
  margin-top: 0.1rem;
}

.bottom {
  height: 0.48rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px -3px 5px #d1e9fb;
  z-index: 100;
}
.bottom .amg {
  height: 0.16rem;
}
.bottom img {
  height: 100%;
  width: auto;
  margin-top: 0.07rem;
}
.bottom .box {
  width: 25%;
  text-align: center;
  color: #999999;
  font-size: 0.12rem;
}
.bottom .active {
  color: #03b585;
}
.bottom p {
  margin-top: 0.1rem;
}

.bookimg {
  height: 1.33rem;
  width: 1.7rem;
  overflow: hidden;
}
.bookimg img {
  width: 100%;
  height: 100%;
  border-radius: 0.08rem;
}
.boks {
  width: 100%;
  padding: 0.1rem 0.1rem;
  box-sizing: border-box;
}
.books {
  width: 1.7rem;
  background: #fff;
  margin-bottom: 0.1rem;
  border-radius: 0.08rem;
}

.boks .books:nth-child(even) {
  float: right;
}
.title {
  padding: 0.1rem;
  font-size: 0.15rem;
  color: #333;
}
.monthnum {
  padding: 0 0.1rem;
  font-size: 0.12rem;
  color: #999;
}
.price {
  padding: 0.1rem;
  font-size: 0.13rem;
  color: #03b585;
}

.line {
  height: 1px;
  width: 92%;
  margin: 0 auto;
  background: #f2f2f2;
}
</style>
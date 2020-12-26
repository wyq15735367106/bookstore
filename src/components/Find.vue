<template>
  <div class="Hello">
    <!-- 评论部分 -->
    <app-header :name='name' :img='img'></app-header>
    <!-- <p @click="jiekou">呵呵呵</p> -->
    <div class="comments" v-for="(val,index) in pinglun" :key="index">
      <div class="infor cl">
        <div class="logo fl">
          <img :src="val.user_head_pic" alt="">
        </div>
        <p class="username fl">{{val.user_name}}</p>
      </div>
      <div class="userinfor">
        <p @click="xiangqing(val.id)">{{val.content}}</p>
      </div>
      <div class="userpic cl">
        <img :src="vall" alt="" class="fl" v-for="vall in val.pic" @click="dianji(index)">
        <van-image-preview v-model="show" :images="images" :start-position='0' :show-index='true'>
        </van-image-preview>
      </div>
      <div class="edit cl">
        <div class="bianji fl" @click="bianji(val.id)">
          <img src="../../static/image/edit.png" alt="" srcset="">
        </div>
        <p class="num fl">{{val.comment}}</p>
        <div class="bianji fl" @click="love(val.id)">
          <img src="../../static/image/love2.png" alt="" srcset="">
        </div>
        <p class="num fl">{{val.like}}</p>
      </div>
      <div class="pinglun">
        <div class="ping cl" v-for="(vals,index) in val.list" v-show="index<3">
          <p class="name fl">{{vals.name}}：</p>
          <p class="tall fl">{{vals.content}}</p>
        </div>
      </div>
    </div>
    <app-bottom></app-bottom>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import Header from './Header.vue'
import Footer from './Footer.vue'
import { Toast } from 'vant';
import { Dialog } from 'vant';
import axios from 'axios'

// 設置緩存
import storage from 'good-storage'
export default {
  components: {
    'app-header': Header,
    'app-bottom': Footer,
    [Dialog.Component.name]: Dialog.Component
  },
  name: 'Find',
  data() {
    return {
      show: false,
      name: "发现",
      pinglun: [],
      images: [],
      page: 1,
      img: require('../../static/image/zhaopian.png'),
    }
  },
  methods: {
    love: function (id) {
      this.$api.post('comment/like', {}, {
        token: storage.get('token'),
        id: id
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            Toast({
              message: ret.msg,
              forbidClick: true,
              position: 'bottom'
            });
            this.faxian()
          }

        }
      )
    },
    xiangqing: function (id) {
      this.$router.push({
        path: './shuoshuoxiangqing',
        query: { id: id }
      })
    },
    dianji: function (index) {
      console.log(index)
      this.images = this.pinglun[index].pic
      this.show = true
    },
    faxian: function () {
      this.$api.post('comment/index', {}, {
        token: storage.get('token')
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            this.pinglun = ret.data.says.data
          } else {
            Dialog.confirm({
              title: '提示',
              message: ret.msg
            })
          }
        })
    }
  },
  created() {
    this.faxian()
  }
}

</script>

<style scoped>
.Hello {
  padding-top: 0.49rem;
  padding-bottom: 0.5rem;
}
.pingluns {
  margin-top: 0.49rem;
  padding-bottom: 0.5rem;
}
.head {
  height: 0.49rem;
  width: 100%;
  background: #03b585;
  color: #fff;
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.49rem;
  position: fixed;
  top: 0;
  left: 0;
}
.head img {
  position: absolute;
  height: 0.15rem;
  width: 0.18rem;
  top: 0.17rem;
  right: 0.15rem;
}

.details {
  background: #fff;
  padding: 0 0.1rem;
  margin-top: 0.1rem;
  padding-bottom: 0.1rem;
}

.shops {
  height: 0.4rem;
  font-size: 0.16rem;
  font-weight: bold;
  line-height: 0.4rem;
}
.author {
  width: 100%;
}
.authorname {
  width: 15%;
  font-size: 0.13rem;
  color: #999999;
  line-height: 0.3rem;
}
.authors {
  width: 84%;
  font-size: 0.13rem;
  color: #000000;
  line-height: 0.3rem;
}
.com_box {
  margin-top: 0.5rem;
  /* height: calc(100% - 89px); */
  overflow-y: auto;
  box-sizing: border-box;
  margin-bottom: 0.6rem;
}
.com_box::-webkit-scrollbar {
  width: 0px;
}
.comments {
  padding: 0.1rem 0.1rem 0.1rem;
  background: #fff;
}
.user {
  height: 0.4rem;
  font-size: 0.16rem;
  font-weight: bold;
  line-height: 0.4rem;
}
.infor {
  height: 0.22rem;
  width: 100%;
  margin-bottom: 0.1rem;
}
.infor .logo {
  height: 0.22rem;
  width: 0.22rem;
  border-radius: 50%;
  overflow: hidden;
}
.infor .logo img {
  height: 100%;
  width: auto;
  margin: 0 auto;
}
.username {
  font-size: 0.15rem;
  line-height: 0.22rem;
  color: #6666;
  margin-left: 0.1rem;
}
.time {
  font-size: 0.13rem;
  line-height: 0.22rem;
  color: #6666;
}
.userinfor p {
  margin-left: 0.32rem;
  font-size: 0.13rem;
  color: #000;
  line-height: 0.17rem;
}
.userpic {
  margin-top: 0.1rem;
  margin-left: 0.32rem;
}
.userpic .amg {
  height: 1rem;
  width: 30%;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
}
.userpic .amg img {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
.edit {
  margin-left: 0.32rem;
  height: 0.2rem;
}
.bianji {
  height: 0.14rem;
  width: 0.15rem;
}
.bianji img {
  height: 100%;
  width: auto;
  margin-top: 0.03rem;
}
.num {
  font-size: 0.13rem;
  color: #999;
  margin-left: 0.05rem;
  margin-right: 0.3rem;
  line-height: 0.2rem;
}

.pinglun {
  margin-top: 0.1rem;
  margin-left: 0.32rem;
  border-left: 1px solid #cccccc;
}
.ping .name {
  margin-left: 0.1rem;
  font-size: 0.13rem;
  color: #333;
  line-height: 0.2rem;
  width: 25%;
}
.ping .tall {
  font-size: 0.13rem;
  color: #666666;
  line-height: 0.2rem;
  width: 70%;
}
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

.head .head_box img {
  height: 0.18rem;
  width: auto;
  margin: 0.15rem 0;
}
.img_f {
  height: 0.14rem;
}
.shuoshuo {
  margin-top: 0.49rem;
}
.details {
  background: #fff;
  padding: 0 0.1rem;
  margin-top: 0.1rem;
  padding-bottom: 0.1rem;
}

.shops {
  height: 0.4rem;
  font-size: 0.16rem;
  font-weight: bold;
  line-height: 0.4rem;
}
.author {
  width: 100%;
}
.authorname {
  width: 15%;
  font-size: 0.13rem;
  color: #999999;
  line-height: 0.3rem;
}
.authors {
  width: 84%;
  font-size: 0.13rem;
  color: #000000;
  line-height: 0.3rem;
}
.comments {
  padding: 0.1rem 0.1rem 0.1rem;
  background: #fff;
  margin-bottom: 0.1rem;
}
.user {
  height: 0.4rem;
  font-size: 0.16rem;
  font-weight: bold;
  line-height: 0.4rem;
}
.infor {
  height: 0.22rem;
  width: 100%;
  margin-bottom: 0.1rem;
}
.infor .logo {
  height: 0.22rem;
  width: 0.22rem;
  border-radius: 50%;
  overflow: hidden;
}
.infor .logo img {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
.username {
  font-size: 0.15rem;
  line-height: 0.22rem;
  color: #6666;
  margin-left: 0.1rem;
}
.time {
  font-size: 0.13rem;
  line-height: 0.22rem;
  color: #6666;
}
.userinfor p {
  margin-left: 0.32rem;
  font-size: 0.13rem;
  color: #000;
  line-height: 0.17rem;
}
.userpic {
  margin-top: 0.1rem;
  margin-left: 0.32rem;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
}

.userpic img {
  height: 1rem;
  width: 30%;
  margin-bottom: 0.1rem;
  margin-right: 3%;
}
.edit {
  margin-left: 0.32rem;
  height: 0.2rem;
}
.bianji {
  height: 0.14rem;
  width: 0.15rem;
}
.bianji img {
  height: 100%;
  width: auto;
  margin-top: 0.03rem;
}
.num {
  font-size: 0.13rem;
  color: #999;
  margin-left: 0.05rem;
  margin-right: 0.3rem;
  line-height: 0.2rem;
}

.pinglun {
  margin-top: 0.1rem;
  margin-left: 0.32rem;
  border-left: 1px solid #cccccc;
}
.ping .name {
  margin-left: 0.1rem;
  font-size: 0.13rem;
  color: #333;
  line-height: 0.2rem;
  width: 25%;
}
.ping .tall {
  font-size: 0.13rem;
  color: #666666;
  line-height: 0.2rem;
  width: 70%;
}

/* 底部 */
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
  height: auto;
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
</style>
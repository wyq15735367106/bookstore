<template>
  <div class="shuoshuo">
    <app-header :name="name" :image="image"></app-header>
    <div class="comment">
      <div class="uesrname cl">
        <div class="logo fl">
          <img :src="pic" alt="">
        </div>
        <div class="names fl">
          <p class="name">{{nicknames}}</p>
          <p class="time">{{created_at}}</p>
        </div>
      </div>
      <p class="conter">{{content}}</p>
      <!-- <div class="imgs" v-for="vall in pinglun.pic">
        <div class="image">
          <img :src="vall" alt="">
        </div>
      </div> -->
      <div class="userpic cl" style="margin-left:0">
        <div class="amg fl" v-for="vall in pics">
          <img :src="vall" alt="">
        </div>
      </div>
      <div class="scores">
        <div class="scoress cl">
          <div class="good fl">
            <img src="../../static/image/xiaoxi.png" alt="">
          </div>
          <p class="fl" style="color: #999999">{{comment}}</p>
        </div>
        <div class="scoress cl">
          <div class="good fl">
            <img src="../../static/image/dianzan.png" alt="">
          </div>
          <p class="fl" style="color: #999999">{{like}}</p>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comments" v-for="(val,index) in list" :key="index" style="border-bottom:1px solid #f2f2f2">
      <div class="infor cl">
        <div class="logo fl">
          <img :src="val.head_pic" alt="">
        </div>
        <p class="username fl">{{val.name}}</p>
        <p class="time fr">{{val.created_at}}</p>
      </div>
      <div class="userinfor">
        <p>{{val.content}}</p>
      </div>
      <!-- <div class="pinglun">
        <div class="ping cl">
          <p class="name fl">新华书店：</p>
          <p class="tall fl">蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错蛮不错</p>
        </div>
        <div class="ping cl">
          <p class="name fl">新华书店：</p>
          <p class="tall fl">蛮不错</p>
        </div>
        <div class="ping cl">
          <p class="name fl">查看更多评论</p>
          <p class="tall fl"></p>
        </div>
      </div> -->
    </div>
    <div class="footer cl">
      <div class="inp fl cl">
        <div class="images fl">
          <img src="../../static/image/xie.png" alt="">
        </div>
        <input type="text" name="" id="" class="fl" v-model="text">
      </div>
      <p class="fr son" @click="fasong">发送</p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Field } from 'vant';
import storage from 'good-storage'
export default {
  name: 'Tongzhi',
  components: {
    'app-header': Header,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      name: '详情',
      image: require("../../static/image/back.png"),
      comment: '',
      like: '',
      nickname: '',
      pic: '',
      pics: '',
      list: [],
      text: '',
      components_id: '',
      created_at: '',
      content: '',
      nicknames: ''
    }
  },
  methods: {
    xiangqing: function () {
      this.$api.post('comment/say_detail', {}, {
        id: this.$route.query.id,
        token: storage.get('token')
      },
        ret => {
          console.log(ret)
          this.created_at = ret.data.says.created_at
          this.nicknames = ret.data.says.nickname
          this.content = ret.data.says.content
          this.pics = ret.data.says.pic
          this.comment = ret.data.says.comment
          this.like = ret.data.says.like
          this.nickname = ret.data.user.nickname
          this.pic = ret.data.user.pic
          this.list = ret.data.says.list.data
          this.components_id = this.pinglun = ret.data.says.id
        }
      )
    },
    fasong: function () {
      this.$api.post('comment/comment', {}, {
        id: this.components_id,
        token: storage.get('token'),
        text: this.text
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            this.text = ''
            Toast({
              message: ret.msg,
              forbidClick: true,
              position: 'bottom'
            });
            this.xiangqing()
          } else {
            Dialog({
              title: '提示',
              message: ret.msg
            })
          }
        }
      )
    }
  },
  mounted() {
    this.xiangqing()
    console.log(this.$route.query.id)
  }
}

</script>

<style scoped>
.shuoshuo {
  padding-top: 0.49rem;
  padding-bottom: 1rem;
}
.comment {
  background: #ffffff;
  padding: 0.15rem 0.15rem;
  margin-bottom: 0.1rem;
}
.imgs {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 0.2rem;
  margin-top: 0.1rem;
  width: 100%;
}
.image {
  width: 30%;
  height: 1.15rem;
  overflow: hidden;
  border-radius: 0.05rem;
}
.image img {
  height: 100%;
  width: auto;
  border-radius: 0.05rem;
}
.uesrname {
  height: 0.33rem;
}
.logo {
  height: 0.33rem;
  width: 0.33rem;
  border-radius: 50%;
  overflow: hidden;
}
.logo img {
  height: 0.33rem;
  width: auto;
}
.name {
  font-size: 0.13rem;
  color: #666666;
}
.names {
  margin-left: 0.1rem;
}
.time {
  font-size: 0.1rem;
  color: #666666;
}
.conter {
  font-size: 0.15rem;
  color: #000000;
  line-height: 0.18rem;
  margin-top: 0.14rem;
}

.score {
  height: 0.22rem;
  overflow: hidden;
}
.score p {
  font-size: 0.15rem;
  color: #333;
  margin-left: 0.15rem;
  line-height: 0.2rem;
  font-weight: 600;
}
.scoress p {
  margin-left: 0.1rem;
  font-size: 0.14rem;
}
.scores {
  margin-top: 0.15rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.good {
  height: 0.17rem;
  width: 0.2rem;
}
.good img {
  height: 100%;
  width: auto;
}

/* 评论 */
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
  padding: 0.1rem 0.1rem 0.2rem;
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
  background: #f2f2f2;
  padding: 0.1rem 0;
}
.ping .name {
  margin-left: 0.1rem;
  font-size: 0.13rem;
  color: #03b585;
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
.footer {
  background: #fff;
  height: 0.49rem;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ededee;
}
.inp {
  background: #e6e6e6;
  height: 0.3rem;
  width: 75%;
  border-radius: 0.3rem;
  margin-left: 0.15rem;
  margin-top: 0.1rem;
}
.inp input {
  height: 0.2rem;
  width: 80%;
  background: none;
  margin-top: 0.05rem;
  padding: 0 0.1rem;
  font-size: 0.14rem;
  color: #333;
}
.images img {
  height: 0.16rem;
  width: auto;
  margin-top: 0.07rem;
  margin-left: 0.12rem;
}
.son {
  background: #ededed;
  height: 0.3rem;
  padding: 0 0.1rem;
  margin-top: 0.1rem;
  margin-right: 0.15rem;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 0.3rem;
  color: #03b585;
  font-size: 0.15rem;
}
</style>
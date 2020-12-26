<template>
  <div class="Shop">
    <div class="head">
      <p>商品详情</p>
      <div class="head_box">
        <div style="padding:0;margin:0;width:0.25rem;" @click="back">
          <img src="../../static/image/back.png" alt="" class="img_f">
        </div>
        <img src="../../static/image/shou.png" alt="" class="imgs" @click="shouc" v-if="collect=='0'">
        <img src="../../static/image/shou1.png" alt="" class="imgs" @click="shouc" v-else>
      </div>
    </div>
    <div class="nav">
      <div class="swiper-container" id="hua1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="val in pic">
            <img :src="val" alt="">
          </div>
        </div>

        <div class="swiper-pagination po1"></div>
      </div>
    </div>
    <div class="title">
      <p class="name">{{name}}</p>
      <p class="num">月售{{month_num}}</p>
      <div class="cl san">
        <p class="left fl">¥{{price}}
          <!-- <span style="color: #999;text-decoration:line-through;font-size: 0.13rem">$450</span> -->
        </p>
        <!-- <div class="fr cl">
          <div class="jian fl disabled" @click="count-=1" v-if="count==1" style="">
            <img src="../../static/image/jian.png" alt="" srcset="" class="disabled">
          </div>
          <div class="jian fl" @click="count-=1" v-else>
            <img src="../../static/image/jian.png" alt="" srcset="">
          </div>
          <p class="count fl">{{count}}</p>
          <div class="jia fl" @click="count+=1">
            <img src="../../static/image/jia.png" alt="">
          </div>
        </div> -->
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="details">
      <p class="shops">商品详情</p>
      <div class="author cl">
        <p class="fl authorname">作者：</p>
        <p class="authors fl">{{author}}</p>
      </div>
      <div class="author cl">
        <p class="fl authorname">出版社：</p>
        <p class="authors fl">{{press}}</p>
      </div>
      <div class="author cl">
        <p class="fl authorname">简介：</p>
        <div class="authors fl" v-html="intro"></div>
      </div>
    </div>
    <!-- 用戶評論 -->
    <div class="comments" v-if="comments">
      <div v-if="comments==''" style="color: #969799;font-size: 14px;line-height: 50px;text-align: center;"></div>
      <div v-for="(val,index) in comments" :key="index" style="padding-bottom:0.1rem">
        <p class="user">用户评论</p>
        <div class="infor cl">
          <div class="logo fl">
            <img :src="val.upic" alt="">
          </div>
          <p class="username fl">{{val.uname}}</p>
          <p class="time fr">{{val.created_at}}</p>
        </div>
        <div class="userinfor">
          <p>{{val.content}}</p>
        </div>
        <div class="userpic cl">
          <div class="amg fl" v-for="item in val.pic">
            <img :src="item" alt="">
          </div>
        </div>
      </div>

    </div>
    <!-- 底部悬浮 -->
    <div class="foot cl">
      <div class="smg fl" @click="lainxi">
        <img src="../../static/image/kefu.png" alt="">
        <p>联系商家</p>
      </div>
      <div class="center fl cl">
        <div class="img fl">
          <img src="../../static/image/perpeo.png" alt="">
        </div>
        <div class="prices fl">
          <p style="font-size: 0.18rem;color: #fff;margin-top: 0.05rem;line-height: 0.5rem">￥{{prices}}</p>
          <!-- <p style="font-size: 0.11rem;color: #999999">免费配送</p> -->
        </div>
        <!-- <p class="qian fl" style="text-decoration:line-through;font-size: 0.13rem;color: #999999;margin-top: 0.15rem;
                    margin-left: 0.05rem">￥305</p> -->
      </div>
      <div class="jiesuan fl">
        <p @click="jiesuan(order_id)">去结算</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import storage from 'good-storage'
import { Toast } from 'vant';
export default {
  data() {
    return {
      count: 1,
      price: 100,
      author: '',
      intro: '',
      month_num: '',
      name: '',
      price: '',
      pic: [],
      comments: [],
      press: '',
      collect: '',
      order_id: '',
      sid: ''
    }
  },
  methods: {
    jiesuan: function (id) {
      this.$router.push({
        path: './tijiaodingdan',
        query: {
          id: id,
          sid: this.sid,
          price: this.price
        }
      })
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
    },
    shouc: function () {
      this.$api.post('collect', {}, {
        token: storage.get('token'),
        id: this.$route.query.id,
        type: 2
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            this.books()
          }
          Toast({
            message: ret.msg,
            forbidClick: true,
            position: 'bottom'
          });
        })
    },
    back: function () {
      this.$router.back()
    },
    getbanner: function () {
      this.$nextTick(() => {
        this.banner()
      })
    },
    banner: function () {
      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
        observer: true,
        loop: true
      });
    },
    books: function () {
      this.$api.post('book/detail', {}, {
        book_id: this.$route.query.id,
        token: storage.get('token')
      },
        ret => {
          console.log(ret)
          this.name = ret.data.book.name
          this.intro = ret.data.book.intro
          this.author = ret.data.book.author
          this.month_num = ret.data.book.month_num
          this.pic = ret.data.book.pic
          this.sid = ret.data.book.sid
          this.order_id = ret.data.book.id
          this.press = ret.data.book.press
          this.price = ret.data.book.price
          this.collect = ret.data.book.collect
          this.comments = ret.data.comments
        })
    },
    // 联系商家
    lainxi: function () {
      window.location.href = 'tel://' + this.$route.query.tel
    }
  },
  computed: {
    prices: function () {
      return Number(this.count) * Number(this.price)
    }
  },
  created() {
    this.getbanner()
    this.books()
  }
}

</script>

<style scoped>
.Shop {
  padding-top: 0.48rem;
  padding-bottom: 1rem;
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
  z-index: 1000;
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
.nav {
  width: 100%;
  height: 3rem;
}
#hua1 img {
  width: 100%;
  height: 3rem;
}
.nav .img {
  position: absolute;
  height: 0.18rem;
  width: 0.1rem;
  top: 0.35rem;
  left: 0.1rem;
  z-index: 1111111;
}
.nav .img img {
  height: 100%;
  width: 100%;
}
.title {
  padding: 0.15rem 0.1rem;
  background: #fff;
}
.name {
  font-size: 0.18rem;
  color: #333333;
  font-weight: bold;
  line-height: 0.2rem;
}
.title .num {
  margin-top: 0.14rem;
  font-size: 0.13rem;
  color: #999999;
}
.left {
  font-size: 0.18rem;
  color: #03b585;
  line-height: 0.2rem;
  height: 0.2rem;
}
.jia,
.jian {
  height: 0.2rem;
  width: 0.2rem;
  margin-left: 0.1rem;
}
.jia img,
.jian img {
  height: 100%;
  width: 100%;
}
.san {
  margin-top: 0.15rem;
}
.count {
  margin-left: 0.1rem;
  font-size: 0.13rem;
  color: #03b585;
  line-height: 0.2rem;
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
.authors img {
  width: 100% !important;
}
.comments {
  padding: 0 0.1rem;
  background: #fff;
  margin-top: 0.1rem;
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
.amg {
  height: 1rem;
  width: 30%;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
}
.amg img {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

/* 底部 */
.foot {
  width: 96%;
  background: #fff;
  height: 0.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0.25rem;
  left: 0.1rem;
}
.foot .smg {
  height: 100%;
  width: 0.74rem;
  background: #010101;
  border-radius: 0.5rem 0 0 0.5rem;
  text-align: center;
}
.foot .smg img {
  height: 0.18rem;
  width: 0.18rem;
  margin: 0 auto;
  margin-top: 0.08rem;
  display: inline-block;
}
.foot .smg p {
  font-size: 0.11rem;
  color: #03b585;
  text-align: center;
}
.center {
  margin-left: 0.05rem;
  background: #010101;
  height: 0.5rem;
  width: 2.05rem;
}
.center .img img {
  display: block;
  height: 0.82rem;
  width: 0.36rem;
  margin-top: -0.35rem;
  margin-left: 0.14rem;
}
.prices {
  margin-left: 0.15rem;
  color: #fff;
  height: 0.5rem;
}
.jiesuan {
  background: url(../../static/image/bgk.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 0.5rem;
  width: 0.74rem;
  border-radius: 0 0.5rem 0.5rem 0;
}
.jiesuan p {
  font-size: 0.16rem;
  color: #fff;
  line-height: 0.5rem;
  text-align: center;
}
</style>

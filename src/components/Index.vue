<template>
  <div class="hello">
    <!-- 头部 -->
    <div class="head cl">
      <div class="dizhi fl cl">
        <!-- <p class="fl" @click="showPopup">{{msg}}</p> -->
        <van-cell @click="showPopup">{{ msg }}</van-cell>
        <!-- <div class="img fl">
          <img :src="imgUrl[0]">
        </div> -->
      </div>
      <div class="sousuo fl">
        <div class="fl">
          <img :src="imgUrl[1]" />
        </div>
        <input
          type="text"
          name=""
          id=""
          class="fl"
          readonly="readonly"
          placeholder="输入商家"
          @click="sousuo"
        />
      </div>
    </div>
    <van-popup v-model="area" position="bottom" :close-on-click-overlay="false">
      <van-area
        :area-list="areaList"
        :columns-num="3"
        title="选择城市"
        @confirm="confirm"
        v-show="area"
        @cancel="cancel"
      />
    </van-popup>

    <!-- 轮播 -->
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in banners"
            :key="index"
          >
            <img :src="item.cover" alt="" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 切换 -->

    <div class="teb cl">
      <div class="te fl" v-for="(item, index) in all" :key="index">
        <span
          class="tebs"
          :class="active == index ? 'activeClass' : ''"
          @click="change(index)"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <!-- 书店 -->
    <div v-show="active == '0'">
      <van-list
        :offset="20"
        @load="onLoad0"
        :finished="finished"
        finished-text=""
        v-model="loading"
      >
        <div class="shudain cl" v-for="(item, index) in shops" :key="index">
          <div class="img fl">
            <img :src="item.head_pic" alt="" @click="Bookstore(item.id)" />
          </div>
          <div class="nav fl">
            <p @click="Bookstore(item.id)">{{ item.name }}</p>
            <p class="van-multi-ellipsis--l2">{{ item.intro }}</p>
            <div class="address cl">
              <p class="fl" v-if="item.gaps">{{ item.gaps }}公里</p>
              <p class="fl" v-else>{{ item.gap }}米</p>
              <p class="fr" style="color:#999">已售{{ item.num }}</p>
            </div>
            <div class="youhui">
              <p v-for="val in item.discount" :key="val">{{ val }}</p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="boks cl" v-show="active == '1'">
      <div class="books fl" v-for="(item, index) in books" :key="index">
        <div class="bookimg">
          <!-- <img src="../../static/image/l1.png" alt=""> -->
          <img :src="item.head_pic" alt="" @click="haoshu(item.id)" />
        </div>
        <!-- <p class="title">所有失去的都会以两一种方式归来</p> -->
        <p class="title van-ellipsis">{{ item.name }}</p>
        <p class="monthnum">月售{{ item.month_num }}</p>
        <p class="price">￥{{ item.price }}</p>
      </div>
    </div>
    <app-bottom></app-bottom>
  </div>
</template>

<script>
import axios from "axios";
// 設置緩存
import { List } from "vant";
import { Area } from "vant";
import { Toast } from "vant";
import { Popup } from "vant";
import Swiper from "swiper";
import storage from "good-storage";
import Footer from "../components/Footer";
import areaList from "../../static/script/area.js";
import wx from "weixin-js-sdk";
export default {
  components: {
    "app-bottom": Footer
  },
  name: "Index",
  data() {
    return {
      msg: "",
      latitude: "",
      longitude: "",
      imgUrl: [
        require("../../static/image/down.png"),
        require("../../static/image/sousuo.png")
      ],
      banners: [],
      shops: [],
      all: [
        {
          type: "1",
          title: "附件书店"
        },
        {
          type: "1",
          title: "好书推荐"
        }
      ],
      books: [],
      active: 0,
      area: false,
      areaList: areaList,
      loading: false,
      finished: false,
      page: 1
    };
  },
  methods: {
    onLoad0() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.get(
          "index_shop",
          {},
          {
            token: storage.get("token"),
            lat: storage.get("latitude"),
            lng: storage.get("longitude"),
            page: this.page
          },
          ret => {
            console.log(ret);
            if (ret.code == 1) {
              console.log(this.page);
              if (ret.data.shops.data == "") {
                this.finished = true;
              }
              for (var i = 0; i < ret.data.shops.data.length; i++) {
                if (ret.data.shops.data[i].gap < 1000) {
                  ret.data.shops.data[i].gap = ret.data.shops.data[i].gap;
                } else {
                  ret.data.shops.data[i].gaps =
                    ret.data.shops.data[i].gap / 1000;
                  ret.data.shops.data[i].gaps = ret.data.shops.data[
                    i
                  ].gaps.toFixed(2);
                }
              }
              for (var i = 0; i < ret.data.shops.data.length; i++) {
                this.shops.push(ret.data.shops.data[i]);
              }
              this.loading = false;
              console.log(ret.data.shops.total);
              if (ret.data.shops.total == this.shops.length) {
                this.finished = true;
              }
            }
          }
        );
      }, 500);
    },
    onLoad1() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.post(
          "index_book",
          {},
          {
            token: storage.get("token"),
            page: this.page
          },
          ret => {
            console.log(ret);
            if (ret.code == 1) {
              console.log(this.page);
              if (ret.data.books.data == "") {
                this.finished = true;
              }
              for (var i = 0; i < ret.data.books.data.length; i++) {
                this.books.push(ret.data.books.data[i]);
              }
              this.loading = false;
              if (ret.data.books.total == this.books.length) {
                this.finished = true;
              }
            }
          }
        );
      }, 500);
    },
    confirm: function(e) {
      console.log(e);
      // this.msg = e[2].name
      // this.area = false
    },
    cancel: function() {
      // this.area = false
    },
    showPopup: function() {
      // this.area = true
    },
    sousuo: function() {
      this.$router.push("./shop");
    },
    getbanner: function() {
      this.$nextTick(() => {
        this.banner();
      });
    },
    banner: function() {
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        loop: true
      });
      this.$api.get(
        "index_slide",
        {},
        {
          token: storage.get("token")
        },
        ret => {
          console.log(ret);
          this.banners = ret.data.sdlies;
        }
      );
    },
    change: function(index) {
      console.log(index);
      this.active = index;
    },
    haoshu: function(id) {
      this.$router.push({
        path: "./shopxiangqing",
        query: { id: id }
      });
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 300
      });
    },
    book: function() {
      console.log(storage.get("token"));
      this.$api.get(
        "index_book",
        {},
        {
          token: storage.get("token")
        },
        ret => {
          this.books = ret.data.books.data;
        }
      );
    },
    shop: function() {
      this.weixin();
      this.$api.get(
        "index_shop",
        {},
        {
          token: storage.get("token"),
          lat: storage.get("latitude"),
          lng: storage.get("longitude")
        },
        ret => {
          console.log(ret);
          for (var i = 0; i < ret.data.shops.data.length; i++) {
            if (ret.data.shops.data[i].gap < 1000) {
              ret.data.shops.data[i].gap = ret.data.shops.data[i].gap;
            } else {
              ret.data.shops.data[i].gaps = ret.data.shops.data[i].gap / 1000;
              ret.data.shops.data[i].gaps = ret.data.shops.data[i].gaps.toFixed(
                2
              );
            }
          }
          this.shops = ret.data.shops.data;
        }
      );
    },
    // 书店详情
    Bookstore: function(id) {
      this.$router.push({
        path: "./Bookstore",
        query: { id: id }
      });
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 300
      });
    },
    dizhixinxi: function() {
      this.$api.get(
        "index_get_city",
        {},
        {
          token: storage.get("token"),
          lat: storage.get("latitude"),
          lng: storage.get("longitude")
        },
        ret => {
          console.log(ret);
          this.msg = ret.data.ad_info.district;
        }
      );
    },
    weixin: function() {
      this.$api.get(
        "js_auth_api",
        {},
        {
          token: storage.get("token"),
          url: location.href.split("#")[0]
        },
        ret => {
          console.log(ret);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: ret.data.appId, // 必填，公众号的唯一标识
            timestamp: ret.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: ret.data.noncestr, // 必填，生成签名的随机串
            signature: ret.data.signature, // 必填，签名
            jsApiList: ["getLocation", "checkJsApi"] // 必填，需要使用的JS接口列表
          });
          // console.log(ret)
          wx.error(function(res) {
            // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          });
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: ["getLocation"],
              success: function(res) {}
            });
          });
          wx.getLocation({
            type: "wgs84",
            success(res) {
              //  维度
              this.latitude = res.latitude;
              // 经度
              this.longitude = res.longitude;
              storage.set("latitude", res.latitude);
              storage.set("longitude", res.longitude);
            }
          });
        }
      );
    }
  },
  created() {
    this.weixin();
    this.dizhixinxi();
  },
  mounted() {
    this.getbanner();
    this.book();
    this.shop();
  }
};
</script>
<style scoped>
.hello {
  padding-top: 0.44rem;
  padding-bottom: 0.5rem;
}
.head {
  background: #03b585;
  height: 0.44rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  padding-top: 0.1rem;
}
.dizhi {
  width: 20%;
}
.dizhi p {
  line-height: 0.44rem;
  color: #fff;
  margin-left: 0.15rem;
  font-size: 0.13rem;
}
.dizhi img {
  height: 0.07rem;
  width: auto;
  margin-top: 0.18rem;
  margin-left: 0.05rem;
}
.sousuo {
  width: 76%;
  height: 0.3rem;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 0.07rem;
  margin-left: 2%;
  border-radius: 0.3rem;
}
.sousuo img {
  height: 0.14rem;
  width: auto;
  margin-top: 0.08rem;
  margin-left: 0.1rem;
}
.sousuo input {
  height: 0.3rem;
  width: 80%;
  margin-left: 0.05rem;
  color: #fff;
  font-size: 0.13rem;
  line-height: 0.3rem;
  border: none;
  outline: none;
  background: transparent;
}
input::-webkit-input-placeholder {
  color: #fff;
  font-size: 0.13rem;
}
/* 轮播 */
.swiper-slide {
  width: 100%;
}
.swiper-slide img {
  height: 100%;
  width: 100%;
}
.banner .swiper-pagination-bullet-active {
  background: #fff !important;
}
.banner .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%;
  background: none;
  opacity: 1;
  border: 1px solid #fff;
}
.banner img {
  height: 1.6rem;
  width: 100%;
}
/* 切换 */
.activeClass {
  color: #333333 !important;
}
.teb {
  background: #fff;
  height: 0.43rem;
  padding: 0 0.15rem;
}
.tebs {
  color: #999999;
  font-size: 0.13rem;
  line-height: 0.43rem;
  margin-right: 0.3rem;
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
  padding: 0 0.1rem;
  font-size: 0.15rem;
  color: #333;
  padding-bottom: 0 !important;
}
.monthnum {
  padding: 0 0.1rem;
  font-size: 0.12rem;
  color: #999;
  margin-top: 0.05rem;
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
.bookimgs {
  height: 0.3rem;
  width: 0.3rem;
}
.shuss {
  padding: 0.1rem;
}
.bookimgs img {
  height: 100%;
  width: 100%;
  margin-right: 0.1rem;
}
.beilu {
  width: 70%;
  margin-left: 0.1rem;
}
.beilu p:nth-child(1) {
  font-size: 0.12rem;
  color: #666666;
}
.beilu p:nth-child(2) {
  font-size: 0.1rem;
  color: #999999;
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
  line-height: 0.2rem;
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

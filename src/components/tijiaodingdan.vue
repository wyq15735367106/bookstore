<template>
  <div class="Liuyan">
    <app-header :name="name" :image="image"></app-header>
    <!-- 留言 -->
    <div class="shop">
      <p class="shopinfor">下单方式</p>
    </div>
    <div class="radio" v-if="ps_sf==1">
      <div class="list cl" @click="dian(index)" v-for="(val,index) in lists">
        <img class="fl" :src="active==index ? val.normal : val.selected ">
        <p class="txt fl" :class="active==index ? 'activeClass' : '' ">{{val.title}}</p>
      </div>
    </div>
    <div class="radio" v-if="ps_sf==0">
      <div class="list cl" v-for="(val,index) in lists" @click="pei()">
        <img class="fl" :src="actives==index ? val.normal : val.selected ">
        <p class="txt fl" :class="active==index ? 'activeClass' : '' ">{{val.title}}</p>
      </div>
    </div>
    <div class="dai_box" v-if="address&&active==1">
      <div class="pos cl">
        <div class="pox_img fl">
          <img src="../../static/image/position.png" alt="">
        </div>
        <div class="ke fl">
          <div class="name">
            {{address.name}}{{address.phone}}
            <span class="mo">默认</span>
          </div>
          <div class="address">
            {{address.province}}{{address.address}}
          </div>
        </div>
        <div class="pox_img fr">
          <img src="../../static/image/duo.png" alt="" @click="edit(address.id)">
        </div>
      </div>
    </div>
    <div class="dai_box" v-if="!address&&active==1">
      <div class="pos cl">
        <div class="pox_img fl">
          <img src="../../static/image/position.png" alt="">
        </div>
        <div class="ke fl" style="line-height:0.35rem" @click="tinjia">
          请添加收货地址
        </div>
        <div class="pox_img fr">
          <img src="../../static/image/duo.png" alt="" @click="tinjia" tapmode="light">
        </div>
      </div>
    </div>
    <div class="shop">
      <p class="shopinfor">商品信息</p>
    </div>
    <div class="shangpin cl" v-for="(val,index) in books" :key="index">
      <div class="shuben  fl">
        <img :src="val.head_pic" alt="">
      </div>
      <div class="center fl">
        <div class="centers cl">
          <p class="names fl" style="overflow:hidden; text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2; ">{{val.name}}</p>
          <p class="num fr">x{{val.num}}</p>
        </div>
        <p class="author">{{val.author}}</p>
        <div class="pic cl">
          <p class="pics fl">￥{{val.price}}</p>
        </div>
      </div>
    </div>
    <div class="shop">
      <p class="shopinfor">给商家留言</p>
    </div>
    <div class="miao" style="padding-top:0.1rem">
      <van-cell-group>
        <van-field v-model="message" rows="3" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
      </van-cell-group>
    </div>
    <div class="bottom cl">
      <p class="jiesuan fr" @click="jiesuan" tapmode="light" v-if="active==1">结算</p>
      <p class="jiesuan fr" tapmode="light" v-else @click="xiadan">下单</p>
      <p class="zong fr" v-if="ps_sf==0">总计：
        <span v-if="totalPrice">¥{{totalPrice}}</span>
        <span v-else>¥{{price}}</span>
      </p>
      <p class="zong fr" v-if="ps_sf==1">总计：
        <span v-if="totalPrice&&active==1">¥{{totalPrice}}(配送费¥{{num}})</span>
        <span v-if="totalPrice&&active==0">¥{{totalPrice}}</span>
        <span v-if="!totalPrice&&active==1">¥{{price}}(配送费¥{{num}})</span>
        <span v-if="!totalPrice&&active==0">¥{{price}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Field } from 'vant';
import { Toast } from 'vant';
import storage from 'good-storage'
import wx from 'weixin-js-sdk'

export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '提交订单',
      image: require("../../static/image/back.png"),
      message: '',
      books: [],
      address: '',
      totalPrice: this.$route.query.totalPrice,
      price: this.$route.query.price,
      active: 0,
      lists: [{
        selected: require('../../static/image/yuan.png'),
        normal: require('../../static/image/wan1.png'),
        title: '预约下单(无需线上付款，需要到店取货付款)'
      },
      {
        selected: require('../../static/image/yuan.png'),
        normal: require('../../static/image/wan1.png'),
        title: '线上购买'
      },],
      num: '',
      ps_sf: '',
      actives: 0
    }
  },

  mounted: function () {

  },
  methods: {
    pei: function () {
      Dialog.alert({
        title: '提示',
        message: '超出商店配送距离'
      })
    },
    dian: function (index) {
      console.log(index)
      this.active = index
    },
    dizhi: function () {
      if (this.$route.query.sid) {
        var sid = this.$route.query.sid
      } else {
        var sid = JSON.parse(this.$route.query.list)[0].sid
      }
      this.$api.post('address/default', {}, {
        token: storage.get('token'),
        sid: sid,
      },
        ret => {
          console.log(ret)
          this.address = ret.data.address
        })
    },
    tinjia: function () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
      this.$router.push('./tianjiashouhuodizhi')
    },
    dingdan: function () {
      if (this.$route.query.id) {
        this.$api.post('order/order_goods', {}, {
          gids: [[this.$route.query.id, 1]],
          token: storage.get('token'),
          lat: storage.get('latitude'),
          lng: storage.get('longitude'),
        },
          ret => {
            console.log(ret)
            this.books = ret.data.books
            this.num = ret.data.num
            this.ps_sf = ret.data.ps_sf
          })
      } else if (this.$route.query.list) {

        var arrs = JSON.parse(this.$route.query.list)
        var gids = []
        var arr = []

        for (var i = 0; i < arrs.length; i++) {
          var a = []
          a.push(arrs[i].id, arrs[i].count)
          console.log(a)
          gids.push(a)
          console.log(gids)
        }
        // // typeof ()
        this.$api.post('order/order_goods', {}, {
          gids: gids,
          token: storage.get('token'),
          lat: storage.get('latitude'),
          lng: storage.get('longitude'),
        },
          ret => {
            console.log(ret)
            this.books = ret.data.books
            this.num = ret.data.num
            this.ps_sf = ret.data.ps_sf
          })
      }

    },
    edit: function (id) {
      this.$router.push({
        path: './dizhi',
        query: {
          id: id
        }
      })
    },
    xiadan: function () {
      if (this.$route.query.id) {
        this.$api.post('order/order_create', {}, {
          gids: [[this.$route.query.id, 1]],
          token: storage.get('token'),
          aid: this.address.id,
          sid: this.$route.query.sid,
          text: this.message,
          type: 2
        },
          ret => {
            if (ret.code == 1) {
              Dialog.alert({
                title: '提示',
                message: '下单成功'
              }).then(() => {
                this.$router.push("./Order")
              });
            }
          })
      } else {
        var arrs = JSON.parse(this.$route.query.list)
        var gids = []
        for (var i = 0; i < arrs.length; i++) {
          var a = []
          a.push(arrs[i].id, arrs[i].count)
          gids.push(a)
        }
        this.$api.post('order/order_create', {}, {
          gids: gids,
          token: storage.get('token'),
          aid: this.address.id,
          sid: JSON.parse(this.$route.query.list)[0].sid,
          text: this.message,
          type: 2
        },
          ret => {
            Dialog.alert({
              title: '提示',
              message: '下单成功'
            }).then(() => {
              this.$router.push("./Order")
            });
          })
      }
    },
    jiesuan() {
      this.weixin()
      if (this.$route.query.id) {
        this.$api.post('order/order_create', {}, {
          gids: [[this.$route.query.id, 1]],
          token: storage.get('token'),
          aid: this.address.id,
          sid: this.$route.query.sid,
          text: this.message,
          type: 1
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(ret.data)
              this.$api.post('pay', {}, {
                order_id: ret.data,
                token: storage.get('token')
              },
                ret => {
                  var _this = this
                  wx.chooseWXPay({
                    appId: ret.data.appId,
                    timestamp: ret.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: ret.data.nonceStr, // 支付签名随机串，不长于 32 位
                    package: ret.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: ret.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: ret.data.paySign, // 支付签名
                    success: function (r) {
                      // alert('1111111111111')
                      if (r.errMsg == "chooseWXPay:ok") {
                        Dialog.alert({
                          title: '提示',
                          message: '支付成功'
                        }).then(() => {
                          _this.$router.push("./Order")
                        });
                      } else {
                      }
                    },
                    cancel: function (r) {
                      Dialog.alert({
                        title: '提示',
                        message: '取消支付'
                      })
                    },
                    fail: function (r) {
                      Dialog.alert({
                        title: '提示',
                        message: '支付失败'
                      })
                    }
                  })
                })
            }
            // this.$router.push("./Order")
          })
      } else {
        var arrs = JSON.parse(this.$route.query.list)
        var gids = []
        for (var i = 0; i < arrs.length; i++) {
          var a = []
          a.push(arrs[i].id, arrs[i].count)
          gids.push(a)
        }
        this.$api.post('order/order_create', {}, {
          gids: gids,
          token: storage.get('token'),
          aid: this.address.id,
          sid: JSON.parse(this.$route.query.list)[0].sid,
          text: this.message,
          type: 1
        },
          ret => {
            if (ret.code == 1) {
              console.log(ret)
              this.$api.post('pay', {}, {
                order_id: ret.data,
                token: storage.get('token')
              },
                ret => {
                  var _this = this
                  wx.chooseWXPay({
                    appId: ret.data.appId,
                    timestamp: ret.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: ret.data.nonceStr, // 支付签名随机串，不长于 32 位
                    package: ret.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: ret.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: ret.data.paySign, // 支付签名
                    success: function (r) {
                      // alert('1111111111111')
                      if (r.errMsg == "chooseWXPay:ok") {
                        Dialog.alert({
                          title: '提示',
                          message: '支付成功'
                        }).then(() => {
                          _this.$router.push("./Order")
                        });
                      } else {
                      }
                    },
                    cancel: function (r) {
                      Dialog.alert({
                        title: '提示',
                        message: '取消支付'
                      })
                    },
                    fail: function (r) {
                      Dialog.alert({
                        title: '提示',
                        message: '支付失败'
                      })
                    }
                  })
                })

            }
          })
      }

    },
    weixin: function () {
      this.$api.get('js_auth_api', {}, {
        token: storage.get('token'),
        url: location.href.split('#')[0]
      },
        ret => {

          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: ret.data.appId, // 必填，公众号的唯一标识
            timestamp: ret.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: ret.data.noncestr, // 必填，生成签名的随机串
            signature: ret.data.signature,// 必填，签名
            jsApiList: ['chooseWXPay', 'checkJsApi'] // 必填，需要使用的JS接口列表
          });
          // console.log(ret)
          // wx.error(function (res) {

          //   alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          // })
          wx.ready(function () {

            wx.checkJsApi({
              jsApiList: ['chooseWXPay'],
              success: function (res) {
                // this.$router.push("./Order")
              }
            });
          })
        })
    },
  },
  created() {
    this.dizhi()
    this.dingdan()
  }
}

</script>

<style scoped>
.Liuyan {
  padding-top: 0.49rem;
  padding-bottom: 0.4rem;
}
.fenxiang {
  height: 0.5rem;
  background: #ffffff;
  padding: 0 0.2rem;
}
.fenxiang p {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.5rem;
}
.miao {
  background: #ffffff;
  padding-bottom: 0.1rem;
}
.sahng {
  background: #ffffff;
  padding: 0 0.15rem;
  padding-bottom: 0.1rem;
}
.tijiao p {
  height: 0.4rem;
  width: 92%;
  background: #03b585;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  color: #ffffff;
  font-size: 0.14rem;
  margin: 0 auto;
  margin-top: 0.3rem;
}
.dai_box {
  background-color: #fff;
}

.dai {
  width: 100%;
}

.dai_logo {
  margin: 0.12rem 0.1rem 0.17rem 0.17rem;
}

.dai_img {
  width: 0.35rem;
  height: 0.35rem;
}

.dai_fa {
  margin-top: 0.12rem;
  color: #333333;
  font-size: 0.215rem;
  line-height: 0.34rem;
}

.line {
  width: 100%;
  height: 1px;
  background: rgba(153, 153, 153, 1);
  opacity: 0.3;
}

.pos {
  padding: 0.155rem 0;
  border-bottom: 1px solid #ededed;
  /* border-image: url(../../static/image/line.png) 30 round; */
}

.pox_img {
  width: 0.115rem;
  height: 0.17rem;
  margin-left: 0.19rem;
  margin-right: 0.085rem;
  margin-top: 0.1rem;
}

.pox_img img {
  width: 100%;
  height: 100%;
}

.name {
  color: #333333;
  font-size: 0.15rem;
}
/*商品信息*/
.shop {
  height: 0.5rem;
  padding: 0 0.1rem;
  background: #ffffff;
  border-bottom: 1px solid #f2f2f2;
}
.shopinfor {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.5rem;
}
.shangpin {
  width: 94%;
  margin: 0 auto;
  padding: 0.15rem 0;
  border-bottom: 1px solid #f2f2f2;
}
.shuben {
  height: 0.7rem;
  width: 0.7rem;
}
.shuben img {
  height: 100%;
  width: 100%;
}
.center {
  width: 76%;
  margin-left: 0.1rem;
}
.centers {
  height: 0.2rem;
}
.names {
  font-size: 0.12rem;
  color: #333333;
  line-height: 0.2rem;
}
.num {
  font-size: 0.12rem;
  color: #333333;
  line-height: 0.2rem;
}
.author {
  font-size: 0.12rem;
  color: #999999;
  line-height: 0.2rem;
}
.pic {
  height: 0.24rem;
  margin-top: 0.1rem;
}
.pics {
  font-size: 0.18rem;
  color: #03b585;
  line-height: 0.24rem;
}
.jiajian {
  width: 30%;
}
.jia,
.jian {
  height: 0.24rem;
  width: 0.24rem;
}
.jia img,
.jian img {
  height: 100%;
  width: 100%;
}
.count {
  font-size: 0.13rem;
  color: #03b585;
  line-height: 0.24rem;
  margin: 0 0.05rem;
  text-align: center;
}
.amount {
  height: 0.5rem;
  background: #ffffff;
}
.mounts {
  font-size: 0.15rem;
  color: #333333;
  line-height: 0.5rem;
}
.amounts {
  font-size: 0.14rem;
  color: #03b585;
  line-height: 0.5rem;
}

.textarea {
  margin-top: 0.1rem;
  height: 1.2rem;
  width: 100%;
  background: #fff;
  padding: 0.15rem 0;
  position: relative;
  padding-bottom: 0.25rem;
}
.textarea p {
  position: absolute;
  bottom: 0.15rem;
  right: 0.15rem;
  font-size: 0.16rem;
  color: #ababad;
}
textarea {
  width: 92%;
  height: 100%;
  display: block;
  margin: 0 auto;
  font-size: 0.16rem;
  line-height: 0.2rem;
  color: #666666;
  border: 1px solid #f2f2f2;
  padding: 0.05rem 0.05rem;
}
textarea::-webkit-input-placeholder {
  color: #666666;
}
/*<!-- 底部 -->*/

.bottom {
  height: 0.49rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
}
.zong {
  font-size: 0.14rem;
  line-height: 0.49rem;
  color: #333333;
}
.zong span {
  font-size: 0.14rem;
  line-height: 0.49rem;
  color: #03b585;
}
.jiesuan {
  height: 0.33rem;
  width: 1.1rem;
  text-align: center;
  line-height: 0.33rem;
  margin: 0.08rem 0;
  margin-left: 0.25rem;
  margin-right: 0.15rem;
  background: #03b585;
  border-radius: 0.3rem;
  color: #fff;
}
.radio {
  background: #ffffff;
  margin: 1px 0;
  padding: 0.1rem;
}
.list {
  height: 0.3rem;
  line-height: 0.3rem;
}
.list img {
  height: 0.2rem;
  width: auto;
  margin-top: 0.05rem;
  margin-right: 0.05rem;
}
.activeClass {
  color: #03b585 !important;
}
.txt {
  font-size: 0.14rem;
  color: #999;
}
.ke {
  width: 78%;
}
</style>
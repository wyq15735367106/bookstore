<template>
  <div class="didanxianqing">
    <app-header :name="name" :image="image"></app-header>
    <!-- 留言 -->
    <div class="title">
      <p v-if="state==1&&type==1">待发货</p>
      <p v-if="state==1&&type==2">待取货</p>
      <p v-if="state==2&&type==1">待收货</p>
      <p v-if="state==3">已完成</p>
      <p v-if="state==4">已完成</p>
      <p v-if="state==5">已取消</p>
      <p v-if="state==6">退款中</p>
      <p v-if="state==7">退款成功</p>
    </div>
    <div class="song">
      <div class="dizhi cl">
        <div class="imgs fl">
          <img src="../../static/image/map.png" alt="">
        </div>
        <div class="weizhi fl" v-if="address">
          <p class="wei" tapmode="light">{{user}} ({{phone}})
            <span>（默认）</span>
          </p>
          <p class="zhi" tapmode="light">{{address}}</p>
        </div>
        <div class="weizhi fl" v-else>
          <p class="wei" tapmode="light" style="margin-top:0.13rem">请添加收货地址</p>
        </div>
      </div>
    </div>
    <div class="booshop">
      <div class="dian cl">
        <p class="shop fl">{{shop_name}}</p>
      </div>
      <div class="kooks cl" v-for="(val,index) in order_details" :key="index">
        <div class="bookimg fl">
          <img :src="val.pic_name" alt="" srcset="">
        </div>
        <p class="fl namess van-ellipsis">{{val.name}}</p>
        <p class="fr">¥{{val.price}}</p>
        <p class="fr">*{{val.num}}</p>
      </div>
      <div class="zhifu cl" style=" border-bottom: 1px solid #f2f2f2;">
        <p class=" fl" style="width:20%">
          <span class="man">配送费</span>
        </p>
        <p class="manjian fl">在线支付立减</p>
        <p class="fr">¥{{shop_ps}}</p>
      </div>
      <div class="lianxi cl">
        <div class="phone fl">
          <img src="../../static/image/phone.png" alt="">
        </div>
        <p class="fl" style="color:#03B585;font-size0.14rem;margin-left:0.1rem" @click="dianhua(phone)">联系商家</p>
        <p class="fr">实付 ：¥{{num}}</p>
      </div>
    </div>
    <div class="fangshi">
      <p class="tit">配送信息</p>
      <div class="time cl">
        <p class="times fl">订单单号</p>
        <p class="tim fr">{{order_id}}</p>
      </div>
      <div class="time cl" v-if="state!=1&&type!=2">
        <p class="times fl">物流信息</p>
        <p class="tim fr">商家配送</p>
      </div>
    </div>
    <div class="fangshi" style="margin-top:0.1rem" v-if="state==5">
      <p class="tit">取消原因</p>
      <p style="padding:0 0.1rem">{{remark}}</p>
    </div>
  </div>
</template>

<script>
import storage from 'good-storage'
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Toast } from 'vant';
import areaList from '../../static/script/area.js'
export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '订单详情',
      image: require("../../static/image/back.png"),
      state: '',
      address: '',
      user: '',
      phone: '',
      order_details: [],
      discount_dis: '',
      shop_name: '',
      shop_ps: '',
      num: '',
      order_id: '',
      remark: '',
      type: ''
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.dingdan()
  },
  methods: {
    tianjia: function () {
      this.$router.push("./bianjishouhuodizhi")
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
    },
    dianhua: function (phone) {
      console.log(phone)
      window.location.href = 'tel://' + phone
    },
    dingdan: function () {
      this.$api.post('order/order_detail', {}, {
        token: storage.get('token'),
        order_id: this.$route.query.id
      },
        ret => {
          console.log(ret)
          this.order_id = ret.data.order.order_id
          this.num = ret.data.order.num
          this.state = ret.data.order.state
          this.type = ret.data.order.type
          this.address = ret.data.order.address
          this.user = ret.data.order.user
          this.shop_name = ret.data.order.shop_name
          this.discount_dis = ret.data.order.discount_dis
          this.shop_ps = ret.data.order.shop_ps
          this.phone = ret.data.order.phone
          this.order_details = ret.data.order_details
          this.remark = ret.data.order.remark
        }
      )
    }

  }
}

</script>

<style scoped>
.didanxianqing {
  padding-top: 0.48rem;
  padding-bottom: 0.3rem;
}

.title {
  width: 100%;
  height: 0.5rem;
  background: linear-gradient(#03b585, 70%, #00ffba);
  box-shadow: 0px 10px 10px #00ffba;
}
.title p {
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.5rem;
  padding-left: 0.3rem;
}
.song {
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
  /* padding-bottom: 0.26rem; */
  border-radius: 0.08rem;
  box-shadow: 10px -10px 140px 40px #03b585;
}
.da {
  margin-top: 0.15rem;
  font-size: 0.16rem;
  color: #333333;
  margin-left: 0.15rem;
}
.sahng {
  margin-top: 0.1rem;
  font-size: 0.14rem;
  color: #999;
  margin-left: 0.15rem;
}
.mg {
  height: 0.46rem;
  width: 0.46rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.14rem;
  margin-top: 0.25rem;
}
.mg img {
  height: 100%;
  width: 100%;
}
.zailai p {
  margin-top: 0.2rem;
  margin-left: 0.15rem;
  height: 0.28rem;
  width: 0.72rem;
  line-height: 0.28rem;
  color: #fff;
  background: #02d39a;
  border-radius: 0.05rem;
  text-align: center;
}
.booshop {
  width: 94%;
  margin: 0 auto;
  background: #fff;
  margin-top: 0.13rem;
  border-radius: 0.08rem;
  box-shadow: 0px 0px 6px 0px rgb(143, 250, 222);
}
.dian {
  height: 0.42rem;
  width: 100%;
  margin-left: 5%;
  font-size: 0.16rem;
  font-weight: 600;
  color: #333;
  line-height: 0.42rem;
  width: 90%;
  border-bottom: 1px solid #f2f2f2;
}
.namess {
  width: 50%;
}
.smg {
  height: 0.16rem;
  width: 0.08rem;
}
.smg img {
  height: 100%;
  width: 100%;
  margin: 0.13rem 0.1rem 0;
}
.kooks {
  padding: 0.1rem 0;
  margin-left: 5%;
  width: 90%;
  border-bottom: 1px solid #f2f2f2;
}
.bookimg {
  height: 0.33rem;
  width: 0.33rem;
  overflow: hidden;
}
.bookimg img {
  height: 0.33rem;
  width: auto;
}
.kooks p {
  line-height: 0.33rem;
  margin-left: 0.1rem;
  font-size: 0.14rem;
  color: #333333;
}
.zhifu {
  height: 0.4rem;
  width: 90%;
  margin-left: 5%;
  overflow: hidden;
}
.zhifu p {
  line-height: 0.4rem;
  color: #333333;
}
.zhifu span {
  line-height: 0.4rem;
  background: #02d39a;
  color: #fff;
  padding: 0.02rem 0.04rem;
  border-radius: 0.05rem;
  font-size: 0.1rem;
  margin-right: 0.1rem;
  display: inline;
}
.lianxi {
  height: 0.5rem;
  width: 90%;
  margin: 0 auto;
}
.lianxi p {
  line-height: 0.5rem;
  font-size: 0.15rem;
  color: #333;
}
.phone {
  height: 0.16rem;
  width: 0.16rem;
}
.phone img {
  height: 100%;
  width: 100%;
  margin-top: 0.17rem;
}

.fangshi {
  width: 94%;
  margin: 0 auto;
  background: #fff;
  margin-top: 0.15rem;
  border-radius: 0.08rem;
  padding-bottom: 0.1rem;
  box-shadow: 0px 0px 6px 0px rgb(143, 250, 222);
}
.tit {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.16rem;
  margin-left: 0.1rem;
  color: #333;
  font-weight: 600;
}
.time {
  height: 0.3rem;
}
.time p {
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #333;
  margin-left: 0.1rem;
}
.tim {
  line-height: 0.3rem;
  font-size: 0.13rem;
  color: #999999 !important;
  margin-right: 0.1rem;
}
.dizhi {
  background: #fff;
  width: 90%;
  margin: 0 auto;
  padding: 0.15rem 0;
}
.dizhi .imgs {
  height: 0.17rem;
  width: 0.12rem;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
}
.dizhi .imgs img {
  height: 100%;
  width: 100%;
}
.weizhi {
  margin-left: 0.08rem;
  width: 90%;
}
.wei {
  font-size: 0.15rem;
  color: #333;
}
.wei span {
  color: #ff4d4f;
}
.zhi {
  font-size: 0.12rem;
  color: #666666;
}
</style>

<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <div class="head_order cl">
        <p class="fl" :class="actives==index ? 'active' : '' " @click="changes(index)" v-for="(val,index) in order_type">{{val.title}}</p>
      </div>
    </div>
    <div class="tab_box">
      <!-- 导航 -->
      <div class="tabbar cl" v-show="actives==0">
        <p class="te fl" v-for="(item,index) in all" :key="index.allId" style="width:20%">
          <span class="tebs" :class="active==index ? 'activeClass' : '' " @click="change(index)">{{item.allName}}</span>
        </p>

      </div>
      <div class="tabbar cl" v-show="actives==1">
        <p class="te fl" v-for="(item,index) in alls" :key="index.allId">
          <span class="tebs" :class="active==index ? 'activeClass' : '' " @click="changess(index)">{{item.allName}}</span>
        </p>

      </div>
      <!-- 订单 -->
      <div v-show="actives==0">
        <van-list :offset='20' @load="onLoad0" :finished="finished" finished-text="" v-model="loading">
          <div class="order" v-for="(item,index) in goodsList" :key="index">
            <div class="bookshop cl">
              <div class="order_id">
                <p>订单号：{{item.order_id}}</p>
              </div>
              <div class="img fl">
                <img :src="item.shop_head_pic">
              </div>
              <div class="center fr">
                <div class="cl">
                  <p class="title fl" @click="chakan(item.id)">{{item.shop_name}}</p>
                  <p class="pingjia fr" v-if="item.state==1">待发货</p>
                  <p class="pingjia fr" v-if="item.state==2">待收货</p>
                  <p class="pingjia fr" v-if="item.state==3">已完成</p>
                  <p class="pingjia fr" v-if="item.state==4">已完成</p>
                  <p class="pingjia fr" v-if="item.state==6">退货</p>
                  <p class="pingjia fr" v-if="item.state==7">退货</p>
                </div>
                <div class="Discount cl">
                  <p class="fl">{{item.dis}}</p>
                </div>
              </div>
            </div>
            <div class="books cl">
              <p class="nav fl">{{item.str}}</p>
              <p class="pic fr">￥{{item.num}}</p>
            </div>
            <div class="assess cl">
              <p class="fr" v-if="item.state==1" @click="chakan(item.id)">查看详情</p>
              <p class="fr" v-else-if="item.state==2" @click="queren(item.order_id,item.id)">确认收货</p>
              <p class="fr" v-if="item.state==1" @click="tui(item.order_id,item.id)">退款</p>
              <p class="fr" v-if="item.state==2" @click="tui(item.order_id,item.id)">退款</p>
            </div>

          </div>
          <div v-if="goodsList==''" style="color: #969799;font-size: 14px;line-height: 50px;text-align: center;">暂时没有订单</div>
        </van-list>
      </div>
      <div v-show="actives==1">
        <van-list :offset='20' @load="onLoad1" :finished="finished" finished-text="" v-model="loading">
          <div class="order" v-for="(item,index) in goodsList" :key="index">
            <div class="bookshop cl">
              <div class="order_id">
                <p>订单号：{{item.order_id}}</p>
              </div>
              <div class="img fl">
                <img :src="item.shop_head_pic">
              </div>
              <div class="center fr">
                <div class="cl">
                  <p class="title fl" @click="chakan(item.id)">{{item.shop_name}}</p>
                  <p class="pingjia fr" v-if="item.state==1">待取货</p>
                  <p class="pingjia fr" v-if="item.state==3">已完成</p>
                  <p class="pingjia fr" v-if="item.state==5">已取消</p>
                </div>
                <div class="Discount cl">
                  <p class="fl">{{item.dis}}</p>
                </div>
              </div>
            </div>
            <div class="books cl">
              <p class="nav fl">{{item.str}}</p>
              <p class="pic fr">￥{{item.num}}</p>
            </div>
            <div class="assess cl">
              <p class="fr" v-if="item.state==1" @click="chakan(item.id)">查看详情</p>
              <p class="fr" v-else-if="item.state==2" @click="queren(item.order_id,item.id)">确认收货</p>
            </div>

          </div>
          <div v-if="goodsList==''" style="color: #969799;font-size: 14px;line-height: 50px;text-align: center;">暂时没有订单</div>
        </van-list>
      </div>
    </div>
    <app-bottom></app-bottom>
  </div>
</template>

<script>
import Footer from './Footer.vue'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { List } from 'vant'
import storage from 'good-storage'
export default {
  components: {
    'app-bottom': Footer,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      name: "我的订单",
      goodsList: [],
      active: 0,
      all: [
        {
          "allId": "1001",
          "allName": "全部"
        },
        {
          "allId": "1002",
          "allName": "待发货"
        },
        {
          "allId": "1003",
          "allName": "待收货"
        },
        {
          "allId": "1004",
          "allName": "已完成"
        },
        {
          "allId": "1005",
          "allName": "退货"
        }
      ],
      alls: [
        {
          "allId": "1001",
          "allName": "全部"
        },
        {
          "allId": "1003",
          "allName": "待取货"
        },
        {
          "allId": "1003",
          "allName": "已完成"
        },
        {
          "allId": "1004",
          "allName": "已取消"
        }
      ],
      order_type: [{
        title: '线上订单'
      },
      {
        title: '线下订单'
      }],
      loading: false,
      finished: false,
      page: 1,
      type: 0,
      actives: 0
    }
  },

  mounted: function () {

  },
  methods: {
    onLoad0() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          page: this.page,
          order_type: 1,
          type: this.type
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              for (var i = 0; i < ret.data.orders.data.length; i++) {

                this.goodsList.push(ret.data.orders.data[i])
              }
              this.loading = false;
              // alert(ret.data.orders.total)
              if (ret.data.orders.total == this.goodsList.length) {
                this.finished = true;
              }
            }
          })
      }, 500)
    },
    onLoad1() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          page: this.page,
          order_type: 2,
          type: this.type
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              for (var i = 0; i < ret.data.orders.data.length; i++) {

                this.goodsList.push(ret.data.orders.data[i])
              }
              this.loading = false;
              // alert(ret.data.orders.total)
              if (ret.data.orders.total == this.goodsList.length) {
                this.finished = true;
              }
            }
          })
      }, 500)
    },
    chakan(id) {
      console.log(id)
      this.$router.push({
        path: './dingdanxiangqing',
        query: { id: id }
      })
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
    },
    changes(index) {
      this.actives = index
      if (index == 1) {
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          order_type: 2
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      }
    },
    changess(index) {
      //把index值赋给active，点击改变样式
      this.active = index;
      if (index == 0) {
        this.goodss()
      } else if (index == 1) {
        this.type = 1
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 2
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      }
      else if (index == 2) {
        this.type = 3
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 2
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      } else if (index == 3 || index == 4) {
        this.type = 5
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 2
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      }

    },
    change(index) {
      //把index值赋给active，点击改变样式
      this.active = index;
      if (index == 0) {
        this.goods()
      } else if (index == 1) {
        this.type = '1'
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 1
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      }
      else if (index == 2) {
        this.type = '2'
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 1
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      } else if (index == 3) {
        this.type = '3,4'
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 1
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      } else if (index == 4) {
        this.type = '6,7'
        this.$api.post('order/order_index', {}, {
          token: storage.get('token'),
          type: this.type,
          order_type: 1
        },
          ret => {
            console.log(ret)
            this.goodsList = ret.data.orders.data
          })
      }

    },
    goods: function () {
      console.log(storage.get('token'))
      this.$api.post('order/order_index', {}, {
        token: storage.get('token'),
        order_type: 1
      },
        ret => {
          console.log(ret)
          this.goodsList = ret.data.orders.data
        })
    },
    goodss: function () {
      this.$api.post('order/order_index', {}, {
        token: storage.get('token'),
        order_type: 2
      },
        ret => {
          console.log(ret)
          this.goodsList = ret.data.orders.data
        })
    },
    // 评价
    pingjia: function (id) {
      this.$router.push({
        path: './fabupingjia',
        query: { id: id }
      })
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
    },
    // 退货
    tui: function (order_id, id) {
      this.$api.post('order/order_tuihuo', {}, {
        token: storage.get('token'),
        order_id: order_id
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            Dialog.alert({
              title: '标题',
              message: ret.msg
            }).then(() => {
              this.goods()
            })
          }
        })
    },
    // 确认收货

    queren: function (order_id, id) {
      console.log(id)
      this.$api.post('order/order_address', {}, {
        token: storage.get('token'),
        order_id: order_id
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            Dialog.alert({
              title: '标题',
              message: ret.msg
            }).then(() => {
              this.$router.push({
                path: './fabupingjia',
                query: { id: id }
              })
            })
          }
        })
    }
  },
  created() {
    this.goods()
  }
}

</script>

<style scoped>
.head {
  height: 0.49rem;
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
}
.head_order {
  width: 56%;
  height: 0.3rem;
  margin: 0 auto;
  margin-top: 0.09rem;
  border-radius: 0.3rem;
  border: 1px solid #03b585;
  box-sizing: border-box;
}
.head_order p {
  width: 50%;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 0.13rem;
  color: #03b585;
  border-radius: 0.3rem;
  height: 100%;
  line-height: 0.3rem;
}
.head_order .active {
  color: #fff;
  background: #03b585;
}
.tab_box {
  /* height: calc(100% - 98px); */
  /* overflow-y: auto; */
  box-sizing: border-box;
  margin-top: 0.5rem;
  margin-bottom: 0.6rem;
  padding-top: 0.4rem;
}
.tabbar {
  height: 0.44rem;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
  margin-top: 0.49rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
.tabbar p {
  width: 25%;
}
.tabbar p span {
  line-height: 0.44rem;
  font-size: 0.13rem;
  color: #999;
  padding: 0.125rem 0;
}
.tabbar p .active {
  color: #03b585;
  border-bottom: 0.01rem solid #03b585;
}
.teb span {
  margin-right: 0.2rem;
}
.activeClass {
  color: #03b585;
  border-bottom: 0.01rem solid #03b585;
}

.order {
  background: #fff;
  width: 90%;
  margin: 0.15rem auto 0;
  padding: 0.1rem;
  border-radius: 0.08rem;
}

.order .img {
  height: 0.44rem;
  width: 0.44rem;
}

.order .img img {
  height: 100%;
  width: 100%;
}

.center {
  margin-left: 0.1rem;
  width: 84%;
}

.title {
  font-size: 0.16rem;
  color: #333;
  line-height: 0.2rem;
}

.pingjia {
  font-size: 0.14rem;
  color: #999;
  line-height: 0.2rem;
}

.Discount p {
  height: 0.18rem;
  padding: 0 0.05rem;
  border: 1px solid #03b585;
  color: #03b585;
  line-height: 0.18rem;
  font-size: 0.11rem;
  border-radius: 0.05rem;
  text-align: center;
  margin-right: 0.1rem;
  margin-top: 0.08rem;
}

.bookshop {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 0.1rem;
}

.books {
  height: 0.4rem;
  padding-left: 0.54rem;
}

.nav {
  line-height: 0.4rem;
  font-size: 0.13rem;
  color: #999999;
  width: 75%;
  overflow: hidden;
  height: 0.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pic {
  line-height: 0.4rem;
  font-size: 0.14rem;
  color: #333333;
}

.assess p {
  border: 1px solid #999999;
  color: #999999;
  text-align: center;
  padding: 0.03rem;
  border-radius: 0.08rem;
  font-size: 0.12rem;
  width: 0.5rem;
}

.assess p:nth-child(even) {
  margin-right: 0.1rem;
}
.order {
  padding-top: 0;
}
.order_id {
  height: 0.4rem;
  line-height: 0.4rem;
  color: #333333;
  border-bottom: 1px solid #dedded;
  margin-bottom: 0.1rem;
}
</style>
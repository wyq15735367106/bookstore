<template>
  <div class="Bookstore">
    <div class="head">
      <p>书店详情</p>
      <div class="head_box">
        <div style="padding:0;margin:0;width:0.25rem;" @click="back">
          <img src="../../static/image/back.png" alt="" class="img_f">
        </div>
        <img src="../../static/image/shou.png" alt="" class="imgs" @click="shouc" v-if="shop.collect=='0'">
        <img src="../../static/image/shou1.png" alt="" class="imgs" @click="shouc" v-else>
      </div>
    </div>
    <!-- 切换 -->
    <div class="teb">
      <div class="boos fl" v-for="(val,index) in type" :key="index">
        <p>
          <span class="xuanshu" :class="active==index ? 'activeClass' : '' " @click="teb(index)">{{val.title}}</span>
        </p>
      </div>
    </div>
    <!-- 选书 -->
    <div v-show="active=='0'">
      <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="activesss==index ? 'current' : '' " @click="selectMenu(index,$event)">
              <span class="text border-bottom-1px">
                {{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li @click="selectFood(food,$event)" v-for="food in item.list" class="food-item border-bottom-1px">
                  <div class="icon">
                    <img :src="food.head_pic" width="57" height="57" @click="dianji(food.id)" />
                  </div>
                  <div class="content">
                    <p class="name" @click="dianji(food.id)" style=" overflow: hidden;text-overflow: ellipsis;">{{food.name}}</p>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.month_num}}份</span>
                    </div>
                    <div class="price">
                      <span class="now">¥{{food.price}}</span>
                      <!-- <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span> -->
                    </div>
                    <div class="cartControl-wrapper">
                      <cartcontrol :food="food" @add="drop"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :deliveryPrice='deliveryPrice'></shopcart>
      </div>
    </div>
    <!-- 评论 -->
    <div v-show="active=='1'" class="pingluns">
      <div class="pinglun cl" v-for="(val,index) in pinglun" :key='index'>
        <div class="imgname fl">
          <img :src="val.upic" alt="">
        </div>
        <div class="rights fl">
          <p class="name">{{val.uname}}</p>
          <div class="ping cl">
            <div class="lun fl">
              <img src="../../static/image/hao.png" alt="" v-if="val.mold=='好评'">
              <img src="../../static/image/zhong.png" alt="" v-else-if="val.mold=='中评'">
              <img src="../../static/image/cha.png" alt="" v-else-if="val.mold=='差评'">
            </div>
            <p class="fl">{{val.mold}}</p>
          </div>
          <p class="title">{{val.content}}</p>
          <div class="imgs cl" v-if="val.pic">
            <div class="amg fl" v-for="item in val.pic">
              <img :src="item" alt="">
            </div>
          </div>
          <div class="imgs cl" style="margin-top:0" v-else>
          </div>
        </div>
      </div>
      <div v-if="pinglun.length==''" style="text-align: center;color:#ccc; line-height:0.5rem">
        暂时没有评价
      </div>
    </div>
    <!-- 店家 -->
    <div v-show="active=='2'">
      <div class="dianjia cl">
        <div class="image fl">
          <img src="../../static/image/dizhi.png" alt="">
        </div>
        <p class="fl">{{shop.address}}</p>
        <div class="images fr">
          <img src="../../static/image/dianhua.png" alt="" @click="callPhone(shop.phone)">
        </div>
      </div>
      <div class="dianjia cl">
        <div class="image fl">
          <img src="../../static/image/time.png" alt="">
        </div>
        <p class="fl">配送时间：{{shop.pc_time}}</p>
      </div>
      <div class="dianjia cl" style="height:100%">
        <div class="image fl">
          <img src="../../static/image/gao.png" alt="">
        </div>
        <p class="fl" style='width:92%;line-height:0.2rem;padding-top:0.11rem;padding-bottom:0.12rem;height:100%'>{{shop.intro}}</p>
      </div>
      <!-- <van-notice-bar :text="shop.intro" left-icon="volume-o" :speed='40' /> -->
      <div class="youhui">
        <p v-for="valll in shop.discount">{{valll}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import storage from 'good-storage'
import { Popup } from 'vant'
import Swiper from 'swiper'
import { NoticeBar } from 'vant'
import BScroll from 'better-scroll'
import shopcart from './shopcart/shopcart'
import cartcontrol from './cartcontrol/cartcontrol'
import { Toast } from 'vant'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  data() {
    return {
      list: [],
      show: false,
      type: [
        {
          'title': '选书'
        },
        {
          'title': '评价'
        },
        {
          'title': '店家'
        }
      ],
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      active: 0,
      pinglun: [],
      lists: [],
      actives: 0,
      activesss: 0,
      shop: '',
      deliveryPrice: 0
    }
  },
  methods: {
    // 收藏
    shouc: function () {
      this.$api.post('collect', {}, {
        token: storage.get('token'),
        id: this.$route.query.id,
        type: 1
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            this.index_shop_detail()
            Toast({
              message: ret.msg,
              forbidClick: true,
              position: 'bottom'
            });
          }

        })
    },
    // 打电话
    callPhone: function (tel) {
      window.location.href = 'tel://' + tel
    },
    back: function () {
      this.$router.back()
    },
    showPopup() {
      this.show = true;
    },
    teb(index) {
      this.active = index
    },
    totalPrice: function () {
      var totalP = 0;
      for (var i = 0, len = this.Ip_Json.length; i < len; i++) {
        totalP += this.Ip_Json[i].price * this.Ip_Json[i].count;
      }
      return totalP;
    },
    back: function () {
      this.$router.back()
    },
    xuan: function (index, id) {
      this.actives = index
    },
    banner: function () {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        loopedSlides: 5,
        slidesPerGroup: 5
      })
    },
    dianji: function (id) {
      console.log(id)
      this.$router.push({
        path: './shopxiangqing',
        query: {
          id: id,
          tel: this.shop.phone
        }
      })
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
    },
    getbanner: function () {
      this.$nextTick(() => {
        this.banner()
      })
    },
    shop_book: function () {
      this.$api.post('shop/index_shop_book', {}, {
        token: storage.get('token'),
        id: this.$route.query.id,
        lat: storage.get('latitude'),
        lng: storage.get('longitude'),
      },
        ret => {
          console.log(ret)
          this.goods = ret.data.arr
          this.deliveryPrice = Number(ret.data.shop.num)
        })
    },
    shop_comment: function () {
      this.$api.post('shop/index_shop_comment', {}, {
        id: this.$route.query.id,
        token: storage.get('token')
      },
        ret => {
          console.log(ret)
          this.pinglun = ret.data.comments
        })
    },
    index_shop_detail: function () {
      this.$api.post('shop/index_shop_detail', {}, {
        id: this.$route.query.id,
        token: storage.get('token')
      },
        ret => {
          console.log(ret)
          this.shop = ret.data.shop
        })
    },
    drop(target) {
      //体验优化，异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    selectMenu(index, event) {
      console.log(index)
      this.activesss = index
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0, l = foodList.length; i < l; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  created() {
    this.index_shop_detail()
    this.shop_comment()
    this.getbanner()
    this.shop_book()
    this.$nextTick(() => {
      this._initScroll();
      this._calculateHeight();
    })
  },
  computed: {
    currentIndex() {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let list = [];
      this.goods.forEach((good) => {
        good.list.forEach((food) => {
          if (food.count) {
            list.push(food);
          }
        });
      });
      return list
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixin';

.goods {
  display: flex;
  position: absolute;
  top: 0.9rem;
  bottom: 46px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      .icon {
        vertical-align: top;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 0.14rem;
        border-bottom-1px(#f3f5f7);
      }

      &.current {
        position: relative;
        z-index: 10;
        // margin-top: -1px;
        background: #fff;

        .text {
          color: #03b585;
          border: none;
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    background: #fff;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none;
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          width: 90%;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }

        .extra {
          line-height: 10px;

          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartControl-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}

/* 头部 */
.Bookstore {
  padding-top: 0.9rem;
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

.head .imgs {
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

.right {
  max-height: 40vh;
  overflow-y: auto;
}

.teb {
  background: #fff;
  padding: 0 0.1rem;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
  position: fixed;
  width: 100%;
  top: 0.45rem;
  left: 0;
  z-index: 99999;
}

.boos {
  width: 28%;
  position: relative;
}

.boos p {
  height: 0.45rem;
  font-size: 0.16rem;
  color: #999999;
  line-height: 0.45rem;
  padding-left: 0.1rem;
}

.active {
  color: #333333 !important;
}

.activeClass {
  color: #333333;
  border-bottom: 2px solid #03b585;
  padding-bottom: 0.1rem;
}

.pinglun {
  padding: 0.1rem;
  background: #ffffff;
  margin-bottom: 0.1rem;
}

.imgname {
  height: 0.43rem;
  width: 0.43rem;
  border-radius: 50%;
  overflow: hidden;
}

.imgname img {
  width: 100%;
  height: 100%;
}

.rights {
  width: 80%;
  margin-left: 0.1rem;
}

.name {
  font-size: 0.15rem;
  line-height: 0.15rem;
  color: #666666;
}

.ping {
  height: 0.14rem;
  margin-top: 0.07rem;
}

.lun {
  height: 0.14rem;
  width: 0.12rem;
}

.lun img {
  height: 100%;
  width: 100%;
}

.ping p {
  font-size: 0.1rem;
  color: #03b585;
  margin-left: 0.1rem;
  line-height: 0.14rem;
}

.title {
  margin-top: 0.13rem;
  font-size: 0.13rem;
  color: #333333;
  line-height: 0.18rem;
}

.imgs {
  margin-top: 0.15rem;
}

.imgs .amg {
  height: 0.89rem;
  width: 0.89rem;
  overflow: hidden;
  margin-right: 0.05rem;
}

.imgs .amg img {
  width: 100%;
  height: 100%;
}

.address {
  margin-left: 0.1rem;
}

.names {
  font-size: 0.15rem;
  color: #333333;
}

.addres {
  font-size: 0.12rem;
  color: #999999;
}

.duo {
  height: 0.15rem;
  width: 0.08rem;
}

.duo img {
  height: 100%;
  width: 100%;
  margin-right: 0.15rem;
  margin-top: 0.3rem;
}

.dianjia {
  height: 0.44rem;
  background: #fff;
  padding: 0 0.15rem;
  border: 1px solid #F2F2F2;
}

.image {
  height: 0.15rem;
}

.images {
  height: 0.14rem;
}

.images img {
  height: 100%;
  width: auto;
  margin-top: 0.15rem;
}

.dianjia p {
  line-height: 0.44rem;
  color: #333333;
  font-size: 0.13rem;
  width: 90%;
  overflow: hidden;
  height: 0.44rem;
}

.image img {
  height: 100%;
  width: auto;
  margin-top: 0.15rem;
  margin-right: 0.05rem;
}

.youhui {
  background: #fff;
  padding: 0 0.15rem;
  margin-top: 0.1rem;
}

.youhui p {
  height: 0.44rem;
  font-size: 0.13rem;
  line-height: 0.44rem;
}
</style>

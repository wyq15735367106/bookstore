<template>
  <div class="shoucang">
    <app-header :name="name" :image="image"></app-header>
    <!-- 切换 -->
    <div class="teb cl">
      <div class="te fl" v-for="(item,index) in all" :key="index">
        <span class="tebs" :class="active==index ? 'activeClass' : '' " @click="change(index)">{{item.title}}</span>
      </div>
    </div>
    <div v-show="active=='1'">
      <van-list :offset='20' @load="onLoad1" :finished="finished" finished-text="" v-model="loading">
        <div class="shudain cl" v-for="(item,index) in books" :key="index">
          <div class="img fl">
            <img :src="item.shop_head_pic" alt="" @click="Bookstore(item.id)">
          </div>
          <div class="nav fl">
            <p @click="Bookstore(item.typeid)">{{item.shop_name}}</p>
            <p style="margin-top:0.05rem" class="van-multi-ellipsis--l2">{{item.shop_intro}}</p>
            <div class="address cl">
              <p class="fl" v-if="item.gaps"> {{item.gaps}}公里</p>
              <p class="fl" v-else> {{item.gap}}米</p>
              <p class="fr">已售{{item.total_num}}</p>
            </div>
            <div class="youhui">
              <p v-for="vall in item.discount">{{vall}}</p>

            </div>
          </div>
        </div>
      </van-list>
    </div>

    <div class="boks cl" v-show="active=='0'">
      <van-list :offset='20' @load="onLoad0" :finished="finished" finished-text="" v-model="loading">
        <div class="books fl" v-for="(item,index) in books" :key="index">
          <div class="bookimg">
            <!-- <img src="../../static/image/l1.png" alt=""> -->
            <img :src="item.book_head_pic" alt="" @click="haoshu(item.typeid)">
          </div>
          <!-- <p class="title">所有失去的都会以两一种方式归来</p> -->
          <p class="title van-ellipsis">{{item.book_name}}</p>
          <p class="monthnum">月售{{item.total_num}}</p>
          <p class="price">￥{{item.price}}
            <!-- <span style="text-decoration:line-through;color:#999999;font-size:0.1rem">￥{{item.prices}}</span> -->
          </p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import { Field } from 'vant';
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { List } from 'vant'
import storage from 'good-storage'
export default {
  name: 'shoucang',
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '我的收藏',
      image: require("../../static/image/back.png"),
      all: [{
        type: '1',
        title: '书籍收藏'
      },
      {
        type: '1',
        title: '店铺收藏'
      }],
      active: 0,
      books: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    change: function (index) {
      this.active = index
      if (index == 0) {
        var type = 2
      } else if (index == 1) {
        var type = 1
      }
      console.log(type)
      this.$api.post('persion/collect', {}, {
        token: storage.get('token'),
        type: type,
        lat: storage.get('latitude'),
        lng: storage.get('longitude'),
        page: 1
      },
        ret => {
          console.log(ret)
          if (type == 1) {
            for (var i = 0; i < ret.data.collects.data.length; i++) {
              if (ret.data.collects.data[i].gap < 1000) {
                ret.data.collects.data[i].gap = ret.data.collects.data[i].gap
              } else {
                ret.data.collects.data[i].gaps = ret.data.collects.data[i].gap / 1000
                ret.data.collects.data[i].gaps = ret.data.collects.data[i].gaps.toFixed(2)
              }
            }
          }
          this.books = ret.data.collects.data
        }
      )
    },
    onLoad0() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.post('persion/collect', {}, {
          token: storage.get('token'),
          type: 2,
          lat: storage.get('latitude'),
          lng: storage.get('longitude'),
          page: this.page
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              if (ret.data.collects.data == '') {
                this.finished = true;
              }
              for (var i = 0; i < ret.data.collects.data.length; i++) {
                this.books.push(ret.data.collects.data[i])
              }
              this.loading = false;
              if (ret.data.total == this.books.length) {
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
        this.$api.post('persion/collect', {}, {
          token: storage.get('token'),
          type: 1,
          page: this.page,
          lat: storage.get('latitude'),
          lng: storage.get('longitude'),
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              if (ret.data.collects.data == '') {
                this.finished = true;
              }

              for (var i = 0; i < ret.data.collects.data.length; i++) {
                this.books.push(ret.data.collects.data[i])
              }
              for (var i = 0; i < ret.data.collects.data.length; i++) {
                if (ret.data.collects.data[i].gap < 1000) {
                  ret.data.collects.data[i].gap = ret.data.collects.data[i].gap
                } else {
                  ret.data.collects.data[i].gaps = ret.data.collects.data[i].gap / 1000
                  ret.data.collects.data[i].gaps = ret.data.collects.data[i].gaps.toFixed(2)
                }
              }
              this.loading = false;
              if (ret.data.total == this.books.length) {
                this.finished = true;
              }
            }
          })
      }, 500)
    },
    shoucang: function () {
      this.$api.post('persion/collect', {}, {
        token: storage.get('token'),
        type: 2,
        page: 1,
        lat: storage.get('latitude'),
        lng: storage.get('longitude')
      },
        ret => {
          console.log(ret)
          this.books = ret.data.collects.data
        }
      )
    },
    haoshu: function (id) {
      // this.$router.push("./shopxiangqing")
      this.$router.push({
        path: './shopxiangqing',
        query: { id: id }
      })
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
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
  created() {
    this.shoucang()
  }
}

</script>

<style scoped>
.shoucang {
  padding-top: 1rem;
}
.teb {
  background: #fff;
  height: 0.44rem;
  line-height: 0.44rem;
  position: fixed;
  left: 0;
  top: 0.48rem;
  width: 100%;
}
.te {
  width: 50%;
  text-align: center;
}
.tebs {
  font-size: 0.14rem;
  color: #666666;
}
.activeClass {
  color: #03b585;
  border-bottom: 1px solid #03b585;
  padding-bottom: 0.12rem;
}
.book {
  margin-top: 0.1rem;
  height: 0.44rem;
  background: #fff;
  padding: 0 0.15rem;
  border-bottom: 1px solid #f2f2f2;
}
.book p {
  line-height: 0.44rem;
  font-size: 0.13rem;
  color: #999999;
}
.book p:nth-child(1) {
  margin-right: 0.2rem;
}
.book .active {
  color: #333333 !important;
}

.shudain {
  background: #fff;
  padding: 0.1rem 0.1rem;
  margin-bottom: 0.1rem;
}
.shudain .img {
  height: 1.2rem;
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
  padding: 0 0.05rem;
  text-align: center;
}
.youhui p:nth-child(2) {
  color: #b53e03;
  font-size: 0.13rem;
  border: 1px solid #b53e03;
  line-height: 0.2rem;
  height: 0.2rem;
  border-radius: 0.05rem;
  padding: 0 0.05rem;
  text-align: center;
}
.youhui p:nth-child(3) {
  color: #03b585;
  font-size: 0.13rem;
  border: 1px solid #03b585;
  line-height: 0.2rem;
  height: 0.2rem;
  border-radius: 0.05rem;
  width: 0.7rem;
  text-align: center;
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
  padding-top: 0;
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
</style>
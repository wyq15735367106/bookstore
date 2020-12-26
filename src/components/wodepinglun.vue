<template>
  <div class="tonggao">
    <app-header :name="name" :image="image"></app-header>
    <van-list :offset='20' @load="onLoad" :finished="finished" finished-text="" v-model="loading">
      <div class="pinglun cl" v-for="(val,index) in comments" :key="index">
        <div class="imgname fl">
          <img :src="pic" alt="">
        </div>
        <div class="right fl">
          <p class="name">{{nickname}}</p>
          <div class="ping cl">
            <div class="lun fl">
              <img src="../../static/image/good1.png" alt="" v-if="val.mold=='好评'">
              <img src="../../static/image/good2.png" alt="" v-else-if="val.mold=='中评'">
              <img src="../../static/image/good3.png" alt="" v-else-if="val.mold=='差评'">
            </div>
            <p class="fl">{{val.mold}}</p>
          </div>
          <p class="title">{{val.content}}</p>
          <div class="imgs cl">
            <div class="amg fl" v-for="vall in val.pic">
              <img :src="vall" alt="" @click="dianji(index)">
            </div>
            <van-image-preview v-model="show" :images="images" :start-position='0' :show-index='true'>
            </van-image-preview>
          </div>
          <div class="box cl">
            <div class="image fl">
              <img :src="val.shop_pic" alt="">
            </div>
            <div class="address fl">
              <p class="names">{{val.shop_name}}</p>
              <p class="addres">{{val.shop_address}}</p>
            </div>
            <div class="duo fr">
              <img src="../../static/image/duo.png" alt="" @click="Bookstore(val.sid)">
            </div>
          </div>
        </div>
      </div>
      <div v-if="comments==''" style="color: #969799;font-size: 14px;line-height: 50px;text-align: center;">暂时没有评论</div>
    </van-list>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import Header from './Header.vue'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { List } from 'vant'
import storage from 'good-storage'
export default {
  name: 'Tongzhi',
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '我的评论',
      image: require("../../static/image/back.png"),
      comments: [],
      nickname: '',
      pic: '',
      images: [],
      show: false,
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    onLoad() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.post('persion/comment', {}, {
          token: storage.get('token'),
          page: this.page
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              if (ret.data.comments.data == '') {
                this.finished = true;
              }
              for (var i = 0; i < ret.data.comments.data.length; i++) {
                this.loading = false;
                this.comments.push(ret.data.comments.data[i])
              }
              if (ret.data.total == this.comments.length) {
                this.finished = true;
              }
            }
          })
      }, 500)
    },
    dianji: function (index) {
      console.log(index)
      this.images = this.comments[index].pic
      this.show = true
    },
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
    },
  },
  created() {
    this.$api.post('persion/comment', {}, {
      token: storage.get('token'),
      page: 1
    },
      ret => {
        console.log(ret)
        this.comments = ret.data.comments.data
        this.nickname = ret.data.user.nickname
        this.pic = ret.data.user.pic
      }
    )
  }
}

</script>

<style scoped>
.tonggao {
  padding-top: 0.49rem;
}
.pinglun {
  padding: 0.1rem;
  background: #ffffff;
  margin-bottom: 0.1rem;
}
.imgname {
  height: 0.43rem;
  width: 0.43rem;
  background: #03b585;
  border-radius: 50%;
  overflow: hidden;
}
.imgname img {
  width: 100%;
  height: 100%;
}
.right {
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
.box {
  margin-top: 0.1rem;
  background: #f2f2f2;
  border-radius: 0.05rem;
  padding: 0.1rem 0.15rem;
}
.box .image {
  height: 0.68rem;
  width: 0.68rem;
}
.box .image img {
  height: 100%;
  width: 100%;
}
.address {
  margin-left: 0.1rem;
  width: 60%;
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
</style>
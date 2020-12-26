<template>
  <div class="tonggao">
    <app-header :name="name" :image="image" :img='img'></app-header>
    <van-list :offset='20' @load="onLoad" :finished="finished" finished-text="" v-model="loading">
      <div class="pinglun cl" v-for="(val,index) in comments" :key="index">
        <div class="imgname fl">
          <img :src="pic" alt="">
        </div>
        <div class="right fl">
          <p class="name">{{nickname}}</p>
          <p class="title" @click="xiangqing(val.id)">{{val.content}}</p>
          <div class="imgs cl">
            <div class="amg fl" v-for="vall in val.pic">
              <img :src="vall" alt="" @click="dianji(index)">
            </div>
            <van-image-preview v-model="show" :images="images" :start-position='0' :show-index='true'>
            </van-image-preview>
          </div>
          <div class="edit cl">
            <div class="bianji fl" @click="xiangqing(val.id)">
              <img src="../../static/image/edit.png" alt="" srcset="">
            </div>
            <p class="num fl">{{val.comment}}</p>
            <div class="bianji fl">
              <img src="../../static/image/love2.png" alt="" srcset="" @click="love(val.id)">
            </div>
            <p class="num fl">{{val.like}}</p>
          </div>
          <div class="pingluns">
            <div class="ping cl" v-for="(vals,index) in val.list" v-show="index<3">
              <p class="name fl">{{vals.name}}：</p>
              <p class="tall fl">{{vals.content}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="comments==''" style="color: #969799;font-size: 14px;line-height: 50px;text-align: center;">暂时没有评论</div>
    </van-list>
    <!-- 底部 -->

  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import Header from './Header.vue'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { List } from 'vant'
import storage from 'good-storage'
export default {
  name: 'Tongzhi',
  inject: ['reload'],
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '我的说说',
      image: require("../../static/image/back.png"),
      comments: [],
      nickname: '',
      pic: '',
      img: require('../../static/image/zhaopian.png'),
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
        this.$api.post('persion/says', {}, {
          token: storage.get('token'),
          page: this.page
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              if (ret.data.says.data == '') {
                this.finished = true;
              }
              for (var i = 0; i < ret.data.says.data.length; i++) {
                this.loading = false;
                this.comments.push(ret.data.says.data.data[i])
              }
              if (ret.data.total = this.comments.length) {
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
            this.shuoshuo()
          }

        }
      )
    },
    shuoshuo: function () {
      this.$api.post('persion/says', {}, {
        token: storage.get('token'),
        page: 1
      },
        ret => {
          console.log(ret)
          this.comments = ret.data.says.data
          this.nickname = ret.data.user.nickname
          this.pic = ret.data.user.pic
        }
      )
    },
    xiangqing: function (id) {
      this.$router.push({
        path: './shuoshuoxiangqing',
        query: { id: id }
      })
    }
  },
  created() {
    this.shuoshuo()
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
  height: 0.22rem;
  width: 0.22rem;
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
  line-height: 0.22rem;
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
  margin-top: 0.1rem;
}
.imgs .amg {
  height: 0.89rem;
  width: 0.89rem;
  overflow: hidden;
  margin-right: 0.05rem;
  margin-bottom: 0.05rem;
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
.edit {
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
.pingluns {
  border-left: 1px solid #cccccc;
}
.pingluns .ping .name {
  font-size: 0.13rem;
  color: #333;
  line-height: 0.2rem;
  width: 20%;
}
.ping .tall {
  font-size: 0.13rem;
  color: #666666;
  line-height: 0.2rem;
  width: 70%;
}
</style>
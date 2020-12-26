<template>
  <div class="fabu">
    <app-header :name="name" :image="image"></app-header>
    <p class="title">商品信息</p>
    <div class="shop cl" v-for="(val,index) in order_details" :key="index">
      <div class="img fl">
        <img :src="val.pic_name" alt="">
      </div>
      <div class="fl right">
        <p class="name">{{val.name}}</p>
        <p class="num">{{val.num}}本</p>
        <p class="price">¥{{val.price}}</p>
      </div>
    </div>
    <div class="pingfen">
      <p class="title">商品评分</p>
      <div class="bos">
        <div class="list cl" @click="dian(index)" v-for="(val,index) in lists">
          <img class="fl" :src="active==index ? val.normal : val.selected ">
          <p class="txt fl" :class="active==index ? 'activeClass' : '' ">{{val.title}}</p>
        </div>
      </div>
    </div>
    <div class="miao" style="margin-top:0.1rem;padding-top:0.1rem">
      <van-cell-group>
        <van-field v-model="message" rows="3" autosize type="textarea" maxlength="100" placeholder="请输入100字以内的留言" show-word-limit />
      </van-cell-group>
    </div>
    <!-- 提交按钮 -->
    <div class="fenxiang">
      <p>添加图片</p>
    </div>
    <div class="sahng">
      <van-uploader v-model="fileList" multiple :max-count="9" :after-read="afterRead" :multiple='false' :deletable='false' />
    </div>
    <!-- 提交按钮 -->
    <div class="tijiao">
      <p @click="fabiao">确认提交</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Toast } from 'vant';
import { List } from 'vant'
import { Uploader } from 'vant';
import storage from 'good-storage'
export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '发布评价',
      image: require("../../static/image/back.png"),
      lists: [
        {
          normal: '../../static/image/hao.png',
          selected: require('../../static/image/hao1.png'),
          title: '好评'
        },
        {
          normal: require('../../static/image/zhong.png'),
          selected: require('../../static/image/zhong1.png'),
          title: '中评'
        },
        {
          normal: require('../../static/image/cha.png'),
          selected: require('../../static/image/cha1.png'),
          title: '差评'
        },
      ],
      active: 0,
      message: '',
      fileList: [],
      files: '',
      order_details: [],
      order_id: '',
      sid: '',
      listss: ''
    }
  },
  methods: {
    dian(index) {
      this.active = index
    },
    tianjia: function () {
      console.log(this.files);
      var formData = new FormData();
      formData.append('file', this.files);
      console.log(formData.has("file"));
      this.$api.post('/upload/uploadImg', {}, formData,
        ret => {
          console.log(ret)
          this.listss.push(ret.data.src)
        }
      )
    },
    afterRead: function (file) {
      this.files = file.file
      this.tianjia()
    },
    dingdan: function () {
      this.$api.post('order/order_detail', {}, {
       token: storage.get('token'),
        order_id: this.$route.query.id
      },
        ret => {
          console.log(ret)
          this.order_details = ret.data.order_details
          this.order_id = ret.data.order.order_id
          this.sid = ret.data.order.sid
        }
      )
    },
    fabiao: function () {
      if (this.active == 0) {
        var typeid = 1
      } else if (this.active == 1) {
        var typeid = 2
      } else {
        var typeid = 3
      }
      this.$api.post('order/order_comment', {}, {
        token: storage.get('token'),
        order_id: this.order_id,
        sid: this.sid,
        typeid: typeid,
        text: this.message,
        pics: this.listss
      },
        ret => {
          if (ret.code == 1) {
            Dialog.confirm({
              title: '提示',
              message: ret.msg,
              showCancelButton: false
            }).then(() => {
              this.$router.push('./')
            });
          }
        }
      )
    }
  },
  created() {
    this.dingdan()
  }
}

</script>

<style scoped>
.fabu {
  padding-top: 0.49rem;
  padding-bottom: 0.6rem;
}
.title {
  padding: 0 0.15rem;
  height: 0.44rem;
  color: #333;
  font-size: 0.15rem;
  line-height: 0.44rem;
  background: #fff;
}
.shop {
  padding: 0.1rem;
  background: #f2f2f2;
}
.img {
  width: 0.9rem;
  height: 0.9rem;
}
.img img {
  width: 100%;
  height: 100%;
}
.right {
  width: 70%;
  margin-left: 0.1rem;
}
.name {
  font-size: 0.14rem;
  color: #1a1a1a;
  line-height: 0.2rem;
}
.num {
  font-size: 0.12rem;
  color: #999999;
  margin-top: 0.05rem;
}
.price {
  font-size: 0.15rem;
  color: #03b585;
  margin-top: 0.05rem;
}
.pingfen {
  background: #fff;
  padding-bottom: 0.15rem;
}
.bos {
  background: #fff;
  display: flex;
  width: 92%;
  margin: 0 auto;
  justify-content: space-between;
}
.list img {
  height: 0.22rem;
  width: auto;
}
.txt {
  font-size: 0.15rem;
  line-height: 0.22rem;
  color: #999999;
  margin-left: 0.05rem;
}
.activeClass {
  color: #03b585;
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
</style>

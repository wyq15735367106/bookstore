<template>
  <div class="yijian">
    <app-header :name="name" :image="image"></app-header>
    <!-- 留言 -->
    <div class="miao">
      <van-cell-group>
        <van-field v-model="message" rows="3" autosize type="textarea" maxlength="100" placeholder="请输入100字以内的留言" show-word-limit />
      </van-cell-group>
    </div>
    <!-- 提交按钮 -->
    <div class="tijiao">
      <p @click="tianjia">确认提交</p>
    </div>
    <van-dialog v-model="show" title="提示" show-cancel-button :showCancelButton=false @confirm='confirm'>
      <img src="../../static/image/zheng.png">
      <p style="text-align:center;margin:0.1rem 0">发表成功</p>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Field } from 'vant';
import storage from 'good-storage'
export default {
  components: {
    'app-header': Header,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      name: '意见反馈',
      image: require("../../static/image/back.png"),
      message: '',
      show: false
    }
  },
  created() {

  },
  methods: {
    tianjia: function () {
      this.$api.post('persion/feedbook', {}, {
        text: this.message,
        token: storage.get('token')
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            this.show = true
          } else {
            Dialog({
              title: '提示',
              message: ret.msg
            })
          }
        })
    },
    confirm: function () {
      this.$router.back()
    }
  }
}

</script>

<style scoped="scoped">
.yijian {
  padding-top: 0.59rem;
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
</style>
<template>
  <div class="tonggao">
    <app-header :name="name" :image="image"></app-header>
    <van-list :offset='20' @load="onLoad" :finished="finished" finished-text="" v-model="loading">
      <div class="tongzhi cl" v-for="(val,index) in informations">
        <div class="logo fl">
          <img src="../../static/image/tongzhi1.png" alt="" v-if="val.is_read==0">
          <img src="../../static/image/tongzhi2.png" alt="" v-else>
        </div>
        <div class="fl xiangqing">
          <p @click="xiangqing(val.id)">{{val.title}}</p>
          <p class="time">{{val.created_at}}</p>
        </div>
        <div class="duo fr">
          <img src="../../static/image/duo.png" alt="" @click="xiangqing(val.id)" tapmode="light">
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant';
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
      name: '通告',
      image: require("../../static/image/back.png"),
      informations: [],
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
        this.$api.post('persion/notice', {}, {
          token: storage.get('token'),
          page: this.page
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              if (ret.data.informations.data == '') {
                this.finished = true;
              }
              for (var i = 0; i < ret.data.informations.data.length; i++) {
                this.loading = false;
                this.informations.push(ret.data.informations.data[i])
              }
              if (ret.data.informations.total == this.informations.length) {
                this.finished = true;
              }
            }
          })
      }, 500)
    },
    xiangqing: function (id) {
      console.log(id)
      this.$router.push({
        path: './tonggaoxiangqing',
        query: { id: id }
      })
    },
    tonggao: function () {
      this.$api.post('persion/notice', {}, {
        token: storage.get('token'),
        page: 1
      },
        ret => {
          console.log(ret)
          this.informations = ret.data.informations.data
        }
      )
    }
  },
  created() {
    this.tonggao()
  }
}

</script>

<style scoped>
.tonggao {
  padding-top: 0.49rem;
}
.tongzhi {
  height: 0.5rem;
  background: #ffffff;
  padding: 0.1rem 0.15rem;
  margin-bottom: 1px;
}

.tongzhi p {
  font-size: 0.14rem;
  color: #333333;
  line-height: 0.2rem;
}
.logo {
  height: 0.3rem;
  width: 0.3rem;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
}
.logo img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.duo img {
  height: 0.16rem;
  width: auto;
  margin-top: 0.17rem;
}
.tongzhixiangqing {
  background: #fff;
  padding: 0.1rem 0.1rem;
}
.tongzhixiangqing .title {
  font-size: 0.18rem;
  color: #333;
  font-weight: bold;
  line-height: 0.3rem;
  text-align: center;
}
.tongzhixiangqing .time {
  font-size: 0.12rem;
  color: #999999;
  text-align: center;
}
.tongzhixiangqing .content {
  font-size: 0.14rem;
  color: #333333;
  margin-top: 0.1rem;
  line-height: 0.2rem;
  text-indent: 2em;
}
.xiangqing {
  width: 80%;
}
.tongzhi .time {
  font-size: 0.11rem;
  color: #666666;
  margin-top: 0.05rem;
}
</style>
<template>
  <div class="tonggao">
    <app-header :name="name" :image="image"></app-header>
    <div class="tongzhixiangqing">
      <p class="title">{{title}}</p>
      <p class="time">{{created_at}}</p>
      <p class="content" v-html="content"></p>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import { Field } from 'vant';
import storage from 'good-storage'
export default {
  name: 'Tongzhi',
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '通告详情',
      image: require("../../static/image/back.png"),
      title: '',
      content: '',
      created_at: ''
    }
  },
  methods: {
  },
  created() {
    console.log(this.$route.query.id)
    this.$api.post('persion/notice_detail', {}, {
      token: storage.get('token'),
      id: this.$route.query.id
    },
      ret => {
        console.log(ret)
        this.title = ret.data.information.title
        this.created_at = ret.data.information.created_at
        this.content = ret.data.information.content
      }
    )
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
.content img {
  width: 80%;
  height: auto;
  margin: 0.1rem auto;
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
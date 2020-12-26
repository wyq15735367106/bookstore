<template>
  <div class="dizhi">
    <app-header :name="name" :image="image"></app-header>
    <div id="bod">
      <div class="dingdanimg" v-if="list==''" style="text-align:center">
        <img src="../../static/image/ic_address_big.png" alt="" style="height:0.7rem;width:auto;margin:2.5rem auto 0;">
        <p style="text-align:center;font-size:0.12rem;color:#999999">暂时没有收货地址请添加地址</p>
      </div>
      <van-list :offset='30' @load="onLoad" :finished="finished" finished-text="" v-model="loading">
        <div class="nav" v-for="(val,index) in list" v-if="list!=''">
          <div class="liuu">
            <div class="cl xinxi">
              <span class="fl">{{val.name}}</span>
              <span class="fr">{{val.phone}}</span>
            </div>
            <span class="di">{{val.province}} {{val.address}}</span>
          </div>
          <div class="bian cl">
            <div class="am fl">
              <img src="../../static/image/yuan.png" v-if="val.is_default==0" @click="moren(val.id,index)">
              <img src="../../static/image/wan.png" v-if="val.is_default==1" @click="moren(val.id,index)">
            </div>
            <span class="fl">默认地址</span>
            <span class="fr" @click="remove(val.id)">删除</span>
            <div class="im fr">
              <img src="../../static/image/remove.png" alt="" @click="remove(val.id)">
            </div>
            <span class="fr" @click="edit(val.id)" tapmode="light">编辑</span>
            <div class="im fr">
              <img src="../../static/image/edit.png" alt="">
            </div>

          </div>
        </div>
      </van-list>
    </div>
    <div class="btn_box">
      <p class="btn" @click="btn">添加收货地址</p>
    </div>
  </div>
</template>

<script>
import storage from 'good-storage'
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Toast } from 'vant';
import { List } from 'vant'
export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      name: '地址管理',
      image: require("../../static/image/back.png"),
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },

  mounted: function () {

  },
  methods: {
    onLoad() {
      this.page++;
      // 加载状态结束
      setTimeout(() => {
        this.$api.get('address', {}, {
          token: storage.get('token'),
          page: this.page,
          perPage: 5
        },
          ret => {
            console.log(ret)
            if (ret.code == 1) {
              console.log(this.page)
              for (var i = 0; i < ret.data.data.length; i++) {
                this.loading = false;
                this.list.push(ret.data.data[i])
              }
              if (ret.data.total == this.list.length) {
                this.finished = true;

              }
            }
          })
      }, 500)
    },
    moren: function (id, index) {
      this.$api.delete('address_default', {}, {
        token: storage.get('token'),
        aid: id
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            Toast({
              message: ret.msg,
              forbidClick: true,
              position: 'bottom'
            });
            if (this.list[index].is_default == 0) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].is_default = 0
              }
              this.list[index].is_default = 1
            } else if (this.list[index].is_default == 1) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].is_default = 0
              }
              this.list[index].is_default = 0
            }
          }
        })
    },
    edit: function (id) {
      this.$router.push({
        path: './bianjishouhuodizhi',
        query: { id: id }
      })
    },
    remove: function (id) {
      this.$api.delete('address', {}, {
        token: storage.get('token'),
        aid: id
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            Dialog({
              title: '提示',
              message: ret.msg
            }).then(() => {
              this.dizhi()
            });

          } else {

          }
        })
    },
    dizhi: function () {
      this.$api.get('address', {}, {
        token: storage.get('token'),
        page: 1,
        perPage: 5
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            console.log(this.list)
            this.list = ret.data.data
          } else {
            Dialog({
              title: '提示',
              message: ret.msg
            })
          }
        })
    },
    btn: function () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 300
      });
      this.$router.push('./tianjiashouhuodizhi')
    }
  },
  created() {
    this.dizhi()
  }
}

</script>

<style scoped>
.dizhi {
  padding-top: 0.49rem;
  padding-bottom: 0.6rem;
}
#bod {
  width: 100vw;
  box-sizing: border-box;
}
.btn_box {
  width: 100%;
  height: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  text-align: center;
}
.dizhi {
  margin-top: 0.1rem;
}
.btn {
  width: 92%;
  margin: 0 auto;
  margin-top: 0.1rem;
  font-size: 0.14rem;
  color: #fff;
  line-height: 0.3rem;
  background: #03b585;
  border-radius: 0.3rem;
}

.nav {
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;
  margin-bottom: 0.1rem;
}
.nav .xinxi {
  padding-top: 0.1rem;
}
.liuu {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 0.05rem;
}
.nav .liuu .xinxi span:nth-child(1) {
  font-size: 0.14rem;
  color: #333;
}
.nav .liuu .xinxi span:nth-child(2) {
  font-size: 0.14rem;
  color: #666;
}
.nav .liuu .di {
  display: block;
  padding-top: 0.05rem;
  font-size: 0.14rem;
  color: #666;
}
.nav .bian span {
  font-size: 0.12rem;
  color: #666;
  line-height: 0.17rem;
}
.nav .bian {
  padding: 0.1rem 0;
  font-size: 12px;
  color: #ccc;
}
.nav .bian .am img {
  height: 0.17rem;
  width: auto;
}
.nav .bian img {
  height: 0.15rem;
  width: auto;
  margin: 0 0.05rem;
}
</style>

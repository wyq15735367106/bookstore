<template>
  <div class="dizhi">
    <div class="head">
      <p>{{name}}</p>
      <div class="head_box">
        <div style="padding:0;margin:0;width:0.25rem;" @click="go">
          <img :src="image" alt="" class="img_f">
        </div>
        <img :src="img" alt="" class="imgs" @click="fa">
      </div>
    </div>
    <!-- 留言 -->
    <van-cell-group>
      <van-field v-model="names" type="text" label="姓名：" placeholder="请输入姓名" />
      <van-field v-model="phone" type="text" label="联系方式：" placeholder="请输入联系方式" />
      <van-field v-model="provinces" type="text" label="收货地址：" placeholder="请输入收货地址" />
      <van-field v-model="address" rows="1" autosize label="详细地址：" type="textarea" placeholder="请输入详细地址" />
      <van-switch-cell v-model="checked" title="设为默认" />
    </van-cell-group>
    <div class="baocun">
      <p @click="onSave">保存</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Field } from 'vant';
import { Toast } from 'vant';
import storage from 'good-storage'
export default {
  data() {
    return {
      name: '编辑收货地址',
      image: require("../../static/image/back.png"),
      img: require("../../static/image/dizhi3.png"),
      checked: true,
      names: '',
      phone: '',
      provinces: '',
      address: ''
    }
  },
  methods: {
    go: function () {
      this.$router.back()
    },
    fa: function () {
      this.$api.get('index_get_city', {}, {
        token: storage.get('token'),
        lat: storage.get('latitude'),
        lng: storage.get('longitude')
      },
        ret => {
          console.log(ret)
          this.provinces = ret.data.address
        })
    },
    onSave() {
      this.$api.put('address', {}, {
        aid: this.$route.query.id,
        token: storage.get('token'),
        name: this.names,
        phone: this.phone,
        province: this.provinces,
        address: this.address,
        is_default: this.checked
      },
        ret => {
          console.log(ret)
          if (ret.code == 1) {
            Dialog({
              title: '提示',
              message: ret.msg
            }).then(() => {
              this.$router.push('./dizhi')
            });
          } else {
            Dialog({
              title: '提示',
              message: ret.msg
            })
          }
        })
    }
  },
  created() {
    this.$api.get('address', {}, {
      aid: this.$route.query.id,
      token: storage.get('token')
    },
      ret => {
        console.log(ret)
        if (ret.code == 1) {
          this.names = ret.data.name
          this.phone = ret.data.phone
          this.provinces = ret.data.province
          this.address = ret.data.address
          if (ret.data.is_default == 1) {
            this.checked = true
          } else {
            this.checked = false
          }
        }
      })
  }
}

</script>

<style scoped>
.dizhi {
  padding-top: 0.49rem;
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
.imgs {
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
.baocun {
  background: #03b585;
  height: 0.4rem;
  width: 80%;
  border-radius: 0.4rem;
  margin: 0.8rem auto;
}
.baocun p {
  font-size: 0.15rem;
  text-align: center;
  line-height: 0.4rem;
  color: #fff;
}
</style>

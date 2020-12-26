<template>
    <div class="Liuyan">
        <app-header :name="name" :image="image"></app-header>
        <!-- 留言 -->
        <div class="fenxiang">
            <p>分享描述</p>
        </div>
        <div class="miao">
            <van-cell-group>
                <van-field v-model="message" rows="3" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
            </van-cell-group>
        </div>
        <div class="fenxiang">
            <p>添加图片</p>
        </div>
        <div class="sahng">
            <van-uploader v-model="fileList" multiple :max-count="9" :after-read="afterRead" :multiple='false' :deletable='false' />
        </div>
        <!-- 提交按钮 -->
        <div class="tijiao">
            <p @click="tijiao">确认提交</p>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import Header from './Header.vue'
import { Field } from 'vant';
import { Uploader } from 'vant';
import storage from 'good-storage'
export default {
    components: {
        'app-header': Header
    },
    data() {
        return {
            name: '发布说说',
            image: require("../../static/image/back.png"),
            message: '',
            fileList: [],
            files: '',
            lists: []
        }
    },

    mounted: function () {

    },
    methods: {
        tianjia: function () {
            console.log(this.files);
            var formData = new FormData();
            formData.append('file', this.files);
            console.log(formData.has("file"));
            this.$api.post('/upload/uploadImg', {}, formData,
                ret => {
                    console.log(ret)
                    this.lists.push(ret.data.src)
                }
            )
        },
        afterRead: function (file) {
            this.files = file.file
            this.tianjia()
        },
        tijiao: function () {
            console.log(this.lists)
            console.log(this.message)
            this.$api.post('comment/create_say', {}, {
                token: storage.get('token'),
                text: this.message,
                pic: this.lists
            },
                ret => {
                    console.log(ret)
                    if (ret.code == 1) {
                        Dialog.confirm({
                            title: '提示',
                            message: ret.msg,
                            showCancelButton: false
                        }).then(() => {
                            this.$router.back()
                        });
                    }
                }
            )
        }

    }
}

</script>

<style scoped>
.Liuyan {
  padding-top: 0.49rem;
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

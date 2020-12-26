<template>
    <div>
        <div class="header">
            <div class="logo">
                <img :src="icon" alt="">
            </div>
            <p class="name">{{name}}</p>
        </div>
        <div class="nav cl">
            <div class="box fl" @click="talkPage()">
                <img src="../../static/image/shuoshuo.png" alt="">
                <p>我的说说</p>
            </div>
            <div class="box fl" @click="commentPage">
                <img src="../../static/image/pinglun.png" alt="">
                <p>我的评论</p>
            </div>
            <div class="box fl" @click="addadressPage">
                <img src="../../static/image/dizhis.png" alt="">
                <p>我的地址</p>
            </div>
            <div class="box fl" @click="scPage()">
                <img src="../../static/image/shoucang.png" alt="">
                <p>我的收藏</p>
            </div>
        </div>
        <div class="xinxi">
            <div class="list cl" @click="onlinePage()">
                <div class="tubiao fl">
                    <img src="../../static/image/kefu.png" alt="">
                </div>
                <p class="fl"> 在线客服</p>
                <div class="duo fr">
                    <img src="../../static/image/duo.png" alt="">
                </div>
            </div>
            <div class="list cl" @click="advicePage()">
                <div class="tubiao fl">
                    <img src="../../static/image/bianji.png" alt="">
                </div>
                <p class="fl">意见反馈</p>
                <div class="duo fr">
                    <img src="../../static/image/duo.png" alt="">
                </div>
            </div>
            <div class="list cl" @click="hezuo()">
                <div class="tubiao fl">
                    <img src="../../static/image/hezuo.png" alt="">
                </div>
                <p class="fl"> 我要合作</p>
                <div class="duo fr">
                    <img src="../../static/image/duo.png" alt="">
                </div>
            </div>
            <div class="list cl" @click="tong">
                <div class="tubiao fl">
                    <img src="../../static/image/tong.png" alt="">
                </div>
                <p class="fl">通告</p>
                <div class="duo fr">
                    <img src="../../static/image/duo.png" alt="">
                </div>
            </div>
            <app-bottom></app-bottom>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
import storage from 'good-storage'
import Footer from "../components/Footer"
export default {
    data() {
        return {
            icon: '',
            name: '',
            id: ''
        }
    },
    components: {
        'app-bottom': Footer
    },
    methods: {
        talkPage() {
            this.$router.push("./wodeshuoshuo")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        hezuo() {
            this.$router.push("./hezuo")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        scPage() {
            this.$router.push("./wodeshoucang")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        gerenziliao() {
            this.$router.push("./gerenziliao")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        commentPage() {
            this.$router.push("./wodepinglun")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        addadressPage() {
            this.$router.push("./dizhi")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        advicePage() {
            // 意见反馈
            this.$router.push("./yijian")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        // 通告
        tong: function () {
            this.$router.push("./tonggao")
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 300
            });
        },
        Infor: function () {
            console.log(storage.get('token'))
            this.$api.post('persion/index', {}, {
                token: storage.get('token')
            },
                ret => {
                    console.log(ret)
                    this.name = ret.data.user.nickname
                    this.icon = ret.data.user.pic
                }
            )
        }
    },
    created() {
        this.Infor()
    }

}
</script>

<style scoped>
.header {
  height: 1.5rem;
  width: 100%;
  background: url('../../static/image/bgt.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 0.36rem;
}
.logo {
  height: 0.66rem;
  width: 0.66rem;
  background: #fff;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto;
}
.logo img {
  height: 100%;
  width: 100%;
}
.name {
  font-size: 0.14rem;
  margin-top: 0.07rem;
  color: #fff;
  text-align: center;
  padding: 0 0.15rem;
}
.nav {
  height: 0.9rem;
  width: 94%;
  background: #fff;
  margin: 0 auto;
  margin-top: -0.3rem;
  border-radius: 0.05rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}
.nav .box {
  width: 25%;
  text-align: center;
}
.nav .box img {
  height: 0.24rem;
  width: auto;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.nav .box p {
  font-size: 0.12rem;
  color: #333;
  margin-top: 0.12rem;
}

.xinxi {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0 0.1rem;
  min-height: 3.3rem;
}
.list {
  height: 0.5rem;
}
.list p {
  line-height: 0.5rem;
  font-size: 0.14rem;
  color: #999999;
  margin-left: 0.1rem;
}
.tubiao {
  height: 0.15rem;
  width: 0.15rem;
}
.tubiao img {
  height: 100%;
  width: auto;
  margin-top: 0.17rem;
}
.duo {
  height: 0.1rem;
  width: 0.1rem;
}
.duo img {
  height: 100%;
  width: auto;
  margin-top: 0.2rem;
}
</style>
import Vue from 'vue'
import Router from 'vue-router'
import tiao from '@/components/tiao'
import Index from '@/components/Index'
import Find from '@/components/Find'
import Order from '@/components/Order'
import My from '@/components/My'
import Bookstore from '@/components/Bookstore'
import shangchuan from '@/components/shangchuan'
import shopxiangqing from '@/components/shopxiangqing'
import tianjiashouhuodizhi from '@/components/tianjiashouhuodizhi'
import yijian from '@/components/yijian'
import dizhi from '@/components/dizhi'
import tonggao from '@/components/tonggao'
import wodeshoucang from '@/components/wodeshoucang'
import tonggaoxiangqing from '@/components/tonggaoxiangqing'
import wodepinglun from '@/components/wodepinglun'
import wodeshuoshuo from '@/components/wodeshuoshuo'
import shuoshuoxiangqing from '@/components/shuoshuoxiangqing'
import bianjishouhuodizhi from '@/components/bianjishouhuodizhi'
import dingdanxiangqing from '@/components/dingdanxiangqing'
import fabupingjia from '@/components/fabupingjia'
import tijiaodingdan from '@/components/tijiaodingdan'
import shop from '@/components/shop'
import hezuo from '@/components/hezuo'
import '../../static/script/fontsize.js'
import 'swiper/js/swiper.min.js'
import 'swiper/css/swiper.min.css'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '跳转',
            component: tiao
        },
        {
            path: '/Index',
            name: '首页',
            component: Index
        },
        {
            path: '/Find',
            name: '发现',
            component: Find
        },
        {
            path: '/Order',
            name: '发现',
            component: Order
        },
        {
            path: '/My',
            name: '我的',
            component: My
        },
        {
            path: '/Bookstore',
            name: '书店详情',
            component: Bookstore
        },
        {
            path: '/shangchuan',
            name: '上传',
            component: shangchuan
        },
        {
            path: '/shopxiangqing',
            name: '好书推荐',
            component: shopxiangqing
        },
        {
            path: '/tianjiashouhuodizhi',
            name: '添加地址',
            component: tianjiashouhuodizhi
        },
        {
            path: '/dizhi',
            name: '地址管理',
            component: dizhi
        },
        {
            path: '/yijian',
            name: '意见反馈',
            component: yijian
        },
        {
            path: '/tonggao',
            name: '通告',
            component: tonggao
        },
        {
            path: '/tonggaoxiangqing',
            name: '通告详情',
            component: tonggaoxiangqing
        },
        {
            path: '/wodepinglun',
            name: '我的评论',
            component: wodepinglun
        },
        {
            path: '/wodeshuoshuo',
            name: '我的说说',
            component: wodeshuoshuo
        },
        {
            path: '/wodeshoucang',
            name: '我的收藏',
            component: wodeshoucang
        },
        {
            path: '/shuoshuoxiangqing',
            name: '说说详情',
            component: shuoshuoxiangqing
        },
        {
            path: '/bianjishouhuodizhi',
            name: '编辑收货地址',
            component: bianjishouhuodizhi
        },
        {
            path: '/dingdanxiangqing',
            name: '订单详情',
            component: dingdanxiangqing
        },
        {
            path: '/fabupingjia',
            name: '发布评价',
            component: fabupingjia
        },
        {
            path: '/tijiaodingdan',
            name: '提交订单',
            component: tijiaodingdan
        },
        {
            path: '/shop',
            name: '店铺',
            component: shop
        },
        {
            path: '/hezuo',
            name: '店铺',
            component: hezuo
        }
    ]
})
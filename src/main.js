// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import api from './api/index.js'
import '../src/assets/resetui.css';
import './common/stylus/index.styl';
import wx from 'weixin-js-sdk'
Vue.prototype.$wx = wx
Vue.prototype.$api = api
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;'
Vue.prototype.$http = axios
import Vant from 'vant';
import 'vant/lib/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.use(Vant)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
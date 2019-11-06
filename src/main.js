// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'




// 引用axios 请求数据
import Axios from 'axios'
Axios.defaults.baseURL = 'http://xiaofeng.ckugua.com/'
Vue.prototype.$Ajax = Axios

// 引用vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import store from './vuex/store'

// 引用 mint-ui 实现页面效果
import  Mint from 'mint-ui'
Vue.use(Mint)
// 引入css效果
import "mint-ui/lib/style.css"


import qs from "qs"
Vue.prototype.$qs = qs


// 引用微信sdk
import wx from 'weixin-js-sdk';
Vue.prototype.wx = wx


//全局变量
import global from './components/common/Global.vue'
Vue.prototype.GLOBAL = global



//  设置全局 css
import "../static/css/base.css"

// 引用mui 框架
import "../static/mui/js/mui"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

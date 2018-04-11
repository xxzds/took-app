// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import $ from 'jquery'
//全局样式
import '@/assets/css/reset.css'
import '@/assets/css/transition.css'
import '@/assets/css/global.css'

// 第三方库
import MintUI, { MessageBox, Toast, Indicator } from 'mint-ui'     // 饿了么移动端UI组件
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$indicator = Indicator

import VueAwesomeSwiper from 'vue-awesome-swiper'       // swiper的vue轮子
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import 'font-awesome/css/font-awesome.css' //字体

// // mock数据
// import './mock/mock.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

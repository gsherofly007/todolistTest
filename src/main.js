// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

Vue.use(ElementUI)
// 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现
Vue.prototype.$axios = axios
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  components: { App }, //注册全局组件
  template: '<App/>' //注册组件
})


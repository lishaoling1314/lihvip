// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie';
import 'babel-polyfill';
import axios from './utils/http';
import point from './utils/point_class';// 其他方法
import GSX_DATE from './utils/date';// 倒计时函数
import ba from 'vue-ba';//百度统计
import VueLazyload from 'vue-lazyload'//图片懒加载
import './utils/validator' // 封装全局校验规则
import *  as filters from './utils/filter/index' // 注册全局过滤器
import 'swiper/dist/css/swiper.css';

Vue.use(ba, "175015a6227dca437e13abb9a6e845ac");
Vue.use(ba, { siteId: "88537f6e524a40e48253ec83702ed7d7" });

Vue.prototype.$Gtoken = Cookies.get('Gtoken')
Vue.prototype.$post = axios.post;
Vue.prototype.$get = axios.get;
Vue.prototype.$axios = axios;
Vue.prototype.$ElementUI = ElementUI;
store.state.user = Cookies.get('Gtoken')?true:false

const originalPush = Router.prototype.push;//防止请求重复路由
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})

Vue.prototype.$point = point;//其他方法
Vue.prototype.$GSX_DATE = GSX_DATE;//倒计时函数

Vue.use(VueLazyload, {
  preLoad: 1,
  error: '',
  loading: '../static/img/loading.gif',
})


Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
//全局挂载vm
window.vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})

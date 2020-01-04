import axios from 'axios';
import ElementUI from 'element-ui';
import Vue from 'vue'
import Cookies from 'js-cookie';
import Qs from 'qs';
import router from '@/router'
import isPlainObject from 'lodash/isPlainObject'
import store from '../store'
// import { AST_Return } from '_terser@4.1.2@terser';
let V = new Vue()

axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;//跨域允许携带token
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : process.env.API_HOST;


// console.log(isPlainObject)

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    var defaults = {
      '_t': new Date().getTime()
    }

    //兼容后台登录、注册、收货地址、银行卡、体现POST请求
    //登录、注册、忘记密码不需要token
    //forom Data
    if (config.url != 'login.do' && config.url != 'regUser.do' && config.url != 'findPasswd.do') {


      if(config.url != 'user/bankcard/save.do' && config.url != 'user/address/save.do'  && config.url != 'user/withdrawApply.do' && config.url != 'user/deleteOrder.do'){
        //提现、新增银行卡、新增收货地址需要token

        // forom Data
        config.headers = {          
          'token': Cookies.get('Gtoken') ? Cookies.get('Gtoken') : '',
          'Content-Type': 'application/json;charset=UTF-8'
        }

      }else{
        //request payload
        config.headers = {
          'token': Cookies.get('Gtoken') ? Cookies.get('Gtoken') : '',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        
      }


    }
    


    if (config.method === 'get') {
      // console.log(config.params)
      // console.log(isPlainObject(config.params))

        config.params = {
          ...defaults,
          ...config.params
        }

    } else if (config.method === 'post') {
      
      if (isPlainObject(config.params)) {
        config.data = {
          ...defaults,
          ...config.data
        }
      }
      
      if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
        config.data = Qs.stringify(config.data)
      }

    }

    return config;
  },
  (error) => {
    return error;
  }
)


axios.interceptors.response.use(
  response => {
    if (response.data.code == '9111' || response.data.code == '9112') {//用户登录信息过期
      Cookies.remove('Gtoken')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      localStorage.removeItem('headerTabs')
      store.state.user = false
      store.state.userToken = ''
      store.state.userinfo = {}

      router.replace({ name: "login" })
    } else if (response.data.code != '0000' && response.data.code.length == 4) {//返回信息错误
      V.$message({
        title: '错误',
        type: "error",
        message: response.data.msg,
        duration: 2000
      });
    } else if (response.data.code == '401' && router.history.current.name != 'login' && router.history.current.name != 'register' && router.history.current.name != 'forgetPassword') {
      router.replace({ name: "login" })
    }
    if (response.data.code == '1009') {//页面404
      router.replace({ name: "router404" })
    }

    if (response.data.code == '1004' && response.data.msg == '商品已经下架') {//页面404
      router.replace({ name: "goods404" })
    }
    return Promise.resolve(response);
  },
  error => {
    if (error.response.status == 408 && error.response) {
      V.$message({
        title: '错误',
        type: "error",
        message: '请求超时，请刷新页面后重试！',
        duration: 2000
      });
    }else{
      router.replace({ name: "loadFailed" })
    }
    return Promise.reject(error);
  }
)



export default axios
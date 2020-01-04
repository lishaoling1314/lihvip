import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
Vue.use(Vuex)



//每次执行mutations都会调用一次getters，查看是否有计算属性
const getters = {//computed
  //   gggg: (state, getters)=> state.testDemo * 10,
  userToken (state) {
    return state.userToken
  },
  isLogin (state) {
    // console.log(state.userToken)
    if (state.userToken) return true
    if (!state.userToken) return false
  }
}
  
const mutations = {//methods
  handleUserName: (state, userinfo) => {
    state.userinfo = userinfo
    localStorage.setItem('user', JSON.stringify(userinfo))
  },
  watchIsAgentSale:(state,AgentSale)=>{//监听属性
    state.isAgentSale = AgentSale
  },
  handOrderList:(state,OrderList)=>{//购物车、商品详情提交多维数组
    state.orderList = OrderList;
    localStorage.setItem('OrderList', JSON.stringify(OrderList))
  },
  handPayList:(state,PayList)=>{//提交订单提交多维数组
    state.PayList = PayList;
    localStorage.setItem('PayList', JSON.stringify(PayList))
  },
  successCart:(state,size)=>{//购物车数量
    state.cartNum  = size
  }
}

//修复切换选项卡sessionStorage会删除userInfo，但是Cookies不会清除
if(!localStorage.getItem('user')){
  Cookies.remove('Gtoken')
}

const state = {
  // testDemo:5,
  userToken: Cookies.get('Gtoken') || '', // 用户token
  user:localStorage.getItem('user') && Cookies.get('Gtoken')?true:false,//登录状态
  userinfo:JSON.parse(localStorage.getItem('user')),
  inputValue:'',
  dialogVisible:false,
  isAgentSale:localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).isAgentSale && Cookies.get('Gtoken') ? true : false ,//代售显示隐藏
  orderList:localStorage.getItem('OrderList') || '',
  PayList:localStorage.getItem('PayList') || '',
  cartNum:null,//购物车数量
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
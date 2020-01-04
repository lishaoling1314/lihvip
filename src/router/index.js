import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie';
import { activity } from './module';
import * as M from './method';//自定义方法
import store from '../store'

Vue.use(Router)

//各个模块子路由
const Module = [//模块路由
  {
    path: '/demo',
    name: 'demo',
    component: resolve => require(['@/components/Module/demo/demo'], resolve)//demo
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: resolve => require(['@/components/Module/goodsList'], resolve)//商品列表
  },
  {
    path: '/cash',
    name: 'cash',
    component:  resolve => require(['@/components/Module/cash'], resolve),//提现
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cashLog',
    name: 'cashLog',
    component: resolve => require(['@/components/Module/cash-log'], resolve),//提现明细
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goodsDetalis',
    name: 'goodsDetalis',
    component: resolve => require(['@/components/Module/goods-detalis'], resolve)//商品详情
  },
  {
    path: '/order',
    name: 'order',
    component: resolve => require(['@/components/Module/order'], resolve),//订单
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/AfterSale',
    name: 'AfterSale',
    component: resolve => require(['@/components/Module/AfterSale'], resolve),//退款详情
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transactionPassword',
    name: 'transactionPassword',
    component: resolve => require(['@/components/Module/transactionPassword'], resolve),//交易密码
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newsLog',
    name: 'newsLog',
    component: resolve => require(['@/components/Module/news-log'], resolve),//我的消息
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lihvipUser',
    name: 'lihvipUser',
    component: resolve => require(['@/components/Module/lihvip-user'], resolve),//我的消息
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lihvipUserCopy',
    name: 'lihvipUserCopy',
    component: resolve => require(['@/components/Module/lihvip-usercopy'], resolve),//我的消息
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: resolve => require(['@/components/Module/payment'], resolve),//选择支付方式
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/confirmOrderOrdinary',
    name: 'confirmOrderOrdinary',
    component: resolve => require(['@/components/Module/order/confirmOrder-ordinary'], resolve),//确认订单（普通）
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/confirmOrderPresell',
    name: 'confirmOrderPresell',
    component: resolve => require(['@/components/Module/order/confirmOrder-presell'], resolve),//确认订单（抢购）
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/confirmOrderAgentSale',
    name: 'confirmOrderAgentSale',
    component: resolve => require(['@/components/Module/order/confirmOrder-agentSale'], resolve),//确认订单（代售）
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cooperation',
    name: 'cooperation',
    component: resolve => require(['@/components/footer/cooperation'], resolve)//商务合作
  },
  {
    path: '/logistics',
    name: 'logistics',
    component: resolve => require(['@/components/footer/logistics'], resolve)//物流配送
  },
  {
    path: '/guarantee',
    name: 'guarantee',
    component: resolve => require(['@/components/footer/guarantee'], resolve)//正品保障
  },
  {
    path: '/footeraftersale',
    name: 'footeraftersale',
    component: resolve => require(['@/components/footer/footeraftersale'], resolve)//售后服务
  },
  {
    path: '/relateus',
    name: 'relateus',
    component: resolve => require(['@/components/footer/relateus'], resolve)//联系我们
  },
  {
    path: '/paypath',
    name: 'paypath',
    component: resolve => require(['@/components/footer/paypath'], resolve)//支付方式
  },
  {
    path: '/lihvipDuce',
    name: 'lihvipDuce',
    component: resolve => require(['@/components/home/lihvip-duce'], resolve)//平台介绍
  },
  {
    path: '/faq',
    name: 'faq',
    component: resolve => require(['@/components/footer/faq'], resolve)//常见问题
  },
  {
    path: '/notice',
    name: 'notice',
    component: resolve => require(['@/components/Module/notice'], resolve)//公告详情
  },
  {
    path: '/noticeList',
    name: 'noticeList',
    component: resolve => require(['@/components/Module/noticeList'], resolve)//公告列表
  },
  {
    path: '/cart',
    name: 'cart',
    component: resolve => require(['@/components/Module/cart'], resolve)//购物车
  },
  {
    path: '/newArrivals',
    name: 'newArrivals',
    component: resolve => require(['@/components/Module/new-arrivals'], resolve)//新品推荐
  },
  {
    path: '/router404',
    name: 'router404',
    component: resolve => require(['@/components/NoData/router-404'], resolve)//404
  },
  {
    path: '/goods404',
    name: 'goods404',
    component: resolve => require(['@/components/NoData/goods-404'], resolve)//404
  },
  {
    path: '/loadFailed',
    name: 'loadFailed',
    component: resolve => require(['@/components/Module/load-failed'], resolve)//加载失败
  },
  {
    path: '/active_day',
    name: 'active_day',
    component: resolve => require(['@/components/activity/active_day'], resolve)//加载失败
  }
]



//全局页面，登录注册，404，入口存放
const routes = [//一级路由
  { 
    path: '/',
    name: 'home',
    component: resolve => require(['@/components/home/home'], resolve)//首页
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/components/home/home'], resolve)//首页
  },
  {
    path: '/user',
    // name: 'user',
    component: resolve => require(['@/components/user/user'], resolve),//个人中心
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        component: resolve => require(['@/components/user/module/wallet'], resolve),//我的钱包
        redirect: '/wallet'
      },
      {
        path: '/wallet',
        name: 'wallet',
        component: resolve => require(['@/components/user/module/wallet'], resolve),//我的钱包
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: resolve => require(['@/components/user/module/orderList'], resolve),//我的钱包
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/bankCard',
        name: 'bankCard',
        component: resolve => require(['@/components/user/module/bankCard'], resolve),//我的银行卡
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/address',
        name: 'address',
        component: resolve => require(['@/components/user/module/address'], resolve),//收货地址
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/coupon',
        name: 'coupon',
        component: resolve => require(['@/components/user/module/coupon'], resolve),//优惠券
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:  resolve => require(['@/components/login/login'], resolve)//登录
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: resolve => require(['@/components/login/forgetPassword'], resolve)//找回密码
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => require(['@/components/login/register'], resolve)//注册
  },
  ...Module,//子模块
  ...activity//活动页面
]

const router = new Router({
  routes: routes,
  mode: 'history', //预渲染一定要模式改成history
  //将此设置为false实质上会使每个路由器链接导航在IE9中刷新整页。当浏览器不支持history.pushState但模式设置为history时，控制路由器是否应回退。
  fallback: true,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})




router.beforeEach((to, from, next) => {

  if (to.name == from.name) return false;//防止重复请求路由
  document.documentElement.scrollTop = 0;

  

  if(to.name == 'payment'){
    if(!localStorage.getItem('PayList')){
      next('/user')
    }
    if(localStorage.getItem('OrderList')){
      localStorage.removeItem('OrderList')
    }
  }else{
    localStorage.removeItem('PayList')
  }



  if(from.name == 'goodsList'){
    sessionStorage.removeItem('goodsListObj')
  }



  //支付界面禁止回退到提交订单界面
  if((to.name == 'confirmOrderAgentSale' && from.name == 'payment') || (to.name == 'confirmOrderPresell' && from.name == 'payment') || (to.name == 'confirmOrderOrdinary' && from.name == 'payment')){
    next('/user')
  }
    
  if (localStorage.getItem('initUserID') && to.fullPath.indexOf('initUserID') < 1) {//通过分享链接进入网站，则携带initUserID。
    if (from.name == null) {
      localStorage.removeItem('initUserID');
    }
    M.shaRePath(to, from, next)
  }






  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Cookies.get('Gtoken') || localStorage.getItem('user')){
      next()
    } else {

      localStorage.removeItem('user');
      store.state.user = false
      store.state.userinfo = {};
      store.state.userToken = '';

      if (from.name == 'goodsDetalis') {//未登录点击购买商品携带参数，登录之后直接跳转到订单
        next({ path: '/login', query: { goodsId: to.query.goodsId,periodId:to.query.periodId } })
      } else {
        next({ path: '/login' })
      }
    }
  } else {
    next()
  }
})




router.afterEach((to, from, next) => {//单个页面加入统计代码

  setTimeout(() => {
    // console.log()
    var _hmt = _hmt || [];
    (function () {
      //每次执行前，先移除上次插入的代码
      if (to.name == "520" || to.name == 'Interest') {
        localStorage.setItem('baidu_tj', true)
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
        var hm = document.createElement("script");
        hm.src = "https://s23.cnzz.com/z_stat.php?id=1277633103&web_id=1277633103";
        hm.id = "baidu_tj"
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);

      } else {
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
      }
    })();
  }, 0);

});




export default router

<template>
  <div class="head_box">
    <div class="head">
      <div style="background:#fff;height:120px;" v-if="isshow">
          <div :class="!isshow?'logo_box isshow':'logo_box'">
          <div class="logo">
              <img src="@/assets/img/new_logo.png" alt @click="$router.push('/')">
              <i class="icon"></i>
            </div>
            <div class="news" @click="$router.push({path:'/noticeList'})">
                <template-news></template-news>
            </div>
            <div class="search">
              <input v-model="inputValue" type="text" class="input" placeholder="请输入商品名称" placeholderStyle="color:red">
              <div class="search-img" @click="clickValue"><img src="@/assets/img/search.png" alt=""></div>
            </div>
            <div class="cart" @click="$router.push('/cart')" v-if="user">
              <i class="cart-logo"></i>
              购物车
              <i class="cart-icon-num" v-if="$store.state.cartNum > 0">{{$store.state.cartNum}}</i>
            </div>
            <div style="clear:both"></div>
        </div>
      </div>
      <div style="width:100%;height:20px;background:#fff" v-if="isshow"></div>
      <el-row class="sx_content-header" :style="nameHome ?'background: rgba(255, 255, 255, 1);color:#333333;': router == 'lihvipDuce' || router == 'Interest'?'background: rgba(145, 133, 111, .3);color:#fff':'background: rgba(145, 133, 111, 1);color:#fff'">
        <el-col :span="24" class="content">
          <div class="logo">
            <!-- <router-link class="path" :to="{path:'/',query:{t:new Date()}}">
              
            </router-link> -->
            <div class="path" :style="nameHome ?'bcolor:#333333;':'color:#fff;'" @click="$router.push({name:'home',query:{t:new Date().getTime()}})">首页</div>
            <router-link class="path" to="/goodsList" :style="nameHome ?'color:#333333;':'color:#fff;'">
              商品列表
            </router-link>
             <!-- <router-link class="path" to="/newArrivals" :style="nameHome ?'color:#333333;':'color:#fff;'">
              新品推荐
            </router-link> -->
            <div class="header-zone" @mouseover="Iszone = true" :style="nameHome ?'color:#333333;':'color:#fff;'">
              活动专区
              <div class="zone-layer" :style=" isshow ? 'top:190px' : 'top:50px'" v-if="Iszone">
                <template-head-swiper></template-head-swiper> <!-- 头部活动专区组件 Swiper -->
              </div>
            </div>
            <router-link class="path" to="/lihvipDuce" :style="nameHome ?'color:#333333;':'color:#fff;'">
              关于利汇
            </router-link>
            <router-link class="path" to="/lihvipUser" :style="nameHome ?'color:#333333;':'color:#fff;'">
              利汇会员
            </router-link>
          </div>
          <div class="user">
            <div class="user_news">
              <router-link to="/newsLog" v-if="user" :style="nameHome ?'color:#333333;':'color:#fff;'">我的消息</router-link>
            </div>
            <div class="header_login">
              <div v-if="!user" :style="nameHome ?'color:#333333;':'color:#fff;'">尊贵的会员，请先<router-link to="/login" :style="nameHome ?'color:#333333;':'color:#fff;'">登录/</router-link>
              </div>
              <div v-if="user" class="userinfo">
                
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <router-link to="/user" :style="nameHome ?'color:#333333;':'color:#fff;'">个人中心</router-link>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="dropdown">                                  
                      <div class="droptop clearfix">                        
                          <span class="userhead">
                              <img src="@/assets/img/user.png" />
                          </span>
                          <div class="txtright">
                            <h6>13549673580</h6>
                            <p class="dropbg">
                              <em>普通</em>
                            </p>
                          </div>
                      </div>
                      <p class="drop-tap">荣耀会员尊享更多折扣  <router-link to="/user" class="link">立即开通></router-link></p>
                      <div class="ultxt  clearfix">
                        <router-link to="/user">
                          
                            <span><img src="@/assets/img/vip-one.png" /></span>
                            <span>邀请有奖</span>
                         
                        </router-link>
                        <router-link to="/user">
                         
                            <span><img src="@/assets/img/vip-two.png" /></span>
                            <span>专享折扣</span>
                          
                        </router-link>
                        <router-link to="/user">
                        
                            <span><img src="@/assets/img/vip-three.png" /></span>
                            <span>购物返现</span>
                          
                        </router-link>
                      </div>
                      <p class="noultxt">权益中心施工中，尽情期待～</p>
                  </el-dropdown-menu>
                </el-dropdown>
                <span >
                    <span :style="nameHome ?'color:#333333;':'color:#fff;'">&nbsp;|</span>
                </span>
              </div>
            </div>
            <div class="header_register">
              <router-link to="/register" v-if="!user" :style="nameHome ?'color:#333333;':'color:#fff;'">注册</router-link>
              <div @click="sign()" v-else class="sign" :style="nameHome ?'color:#333333;':'color:#fff;'">退出</div>
            </div>
            <!-- <div class="phone" v-if="!user"><img src="@/assets/img/header-phone.png" alt>400-007-0755</div> -->
            <div style="clear:both"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <div class="occupied" style="width:100%;height:190px;"></div>
    <!-- end1 -->
  </div>
</template> 
<script>
let _this
window.onscroll = function() {
  var t = document.documentElement.scrollTop || document.body.scrollTop
  if (t >= 150) {
    _this.isshow = false
  } else {
    _this.isshow = true
  }
}
import Cookies from 'js-cookie'
import { setTimeout } from 'timers'
import templateNews from '../template/template-news'
import templateHeadSwiper from '../template/template-head-swiper'

export default {
  data() {
    return {
      headerTabs: 0, //默认初始化首页
      Iszone:false,
      router: 'home',
      isshow: true, //浏览器滚动是否显示logo
      nameHome:true,//是否是首页
      historyBackground: true, //是否透明
      user: false,
      userinfo: {},
      clientWidth: '',
      inputValue:'',//搜索关键字
    }
  },
  components:{templateNews,templateHeadSwiper},
  mounted() {
    _this = this
    this.user = this.$store.state.user
    this.userinfo = JSON.parse(localStorage.getItem('user'))



    if(this.user){
      this.GetCartNum();
    } 
    //页面初始化存储header-border
    let R = this.$router.history.current.name
    if (localStorage.getItem('headerTabs')) {
      //初始化重置为首页
      if (R != 'home' && R != 'goodsList' && R != 'lihvipDuce' && R != 'lihvipUser') {
        localStorage.setItem('headerTabs', 0)
        this.headerTabs = 0
        return false
      }
      this.headerTabs = localStorage.getItem('headerTabs')
    } else {
      localStorage.setItem('headerTabs', 0)
      this.headerTabs = 0
    }



    
  },
  watch: {
    '$store.state.userinfo'() {
      this.userinfo = JSON.parse(localStorage.getItem('user'))
      this.user = this.$store.state.user
      
    },
    '$store.state.user'(){
      if(this.$store.state.user){
        this.GetCartNum();
      } 
      
    },
    $route(to,from) {
      //跳转之后保存header-border
      this.router = this.$router.history.current.name;
      to.name=='home'?this.nameHome = true:this.nameHome = false;//为首页更换背景颜色以及字体颜色
      this.$store.state.dialogVisible = false;
    }
  },
  methods: {
    GetCartNum(){
      this.$get('/user/cart/size.do').then(({data})=>{
        if(data.code == '0000'){
        //  this.$store.state.cartNum = data.size
         this.$store.commit('successCart',data.size)
        }
      })
    },
    clickValue(){
      // console.log()
      // this.loading = this.$loading({ text: '正在努力搜索中...' });
      this.$store.state.inputValue = this.inputValue;
      if(this.$router.history.current.name != 'goodsList'){
        setTimeout(()=>{
          this.$router.push('/goodsList');
          
        },500)
      }
      this.inputValue = '';
    },
    pathHome() {
      this.$router.push('/')
    },
    sign() {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookies.remove('Gtoken')
        this.$store.state.user = false
        this.$store.state.userinfo = {}
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.user = false
        window.location.reload()
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(()=>{})
    }
  }
}
</script>
<style lang="less" scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.head_box{
  position: relative;
}
.head {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  // background: #fff;
}
  .zone-layer{
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    height: 238px;
    background: #fff;
    // padding-top: 35px;
    box-sizing: border-box;
    z-index: 99999;
    border-top: 1px solid #F5F5F5;
    border-bottom: 1px solid #F5F5F5;
    transition: all .5s;
    -webkit-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    transition-timing-function: ease;
    -webkit-transition-timing-function: ease; /* Safari and Chrome */
    -ms-transition-timing-function: ease;
    -o-transition-timing-function: ease;
    overflow: hidden;
    display: none;
  }
.logo_box {
  width: 1200px;
  margin: 0 auto;
  padding: 15px 0;
  box-sizing: border-box;
  // display: flex;
  max-height: 120px;
  height: 120px;
  background: #fff;
  .logo {
    max-width: 243px;
    float: left;
    position: relative;
    padding-right: 30px;
    img{
      vertical-align: middle;
      width: 243px;
      height: 89px;
    }
    .icon{
      width: 1px;
      height: 25px;
      /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,817161+0,817161+24,ffffff+100 */
      background: #ffffff; /* Old browsers */
      background: -moz-radial-gradient(center, ellipse cover,  #ffffff 0%, #817161 0%, #817161 24%, #ffffff 100%); /* FF3.6-15 */
      background: -webkit-radial-gradient(center, ellipse cover,  #ffffff 0%,#817161 0%,#817161 24%,#ffffff 100%); /* Chrome10-25,Safari5.1-6 */
      background: radial-gradient(ellipse at center,  #ffffff 0%,#817161 0%,#817161 24%,#ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
      display: block;
      position: absolute;
      right:0;
      top: calc(50% - 12px;);
    }
  }
  .news{
    float: left;
    margin-top: 35px;
  }
  .search{
    float: left;
    margin-top: 20px;
    .input{
      float: left;
      display: block;
      border:1px solid #DED4C1;
      height: 42px;
      line-height: 42px;
      color: #CCCCCC;
      border-radius: 4px 0 0 4px;
      padding: 0;
      outline: none;
      padding-left: 10px;
      width: calc(332px - 70px);
    }
    input::-webkit-input-placeholder{
        color:#CCCCCC;
    }
    input::-moz-placeholder{
        color:#CCCCCC;
    }
    input:-ms-input-placeholder{
        color:#CCCCCC;
    }
    .search-img{
      float: left;
      display: block;
      height: 44px;
      line-height: 44px;
      width: 62px;
      border-radius: 0 4px 4px 0;
      text-align: center;
      margin-left: -1px;
      background: #DED4C1;
      cursor: pointer;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      img{
        vertical-align: middle;
      }
    }
    .search-img:hover{
      background: #b5a077;
    }
  }
  .cart{
    padding: 0 35px;
    height: 42px;
    float: right;
    border:1px solid rgba(222,212,193,1);
    margin-top: 20px;
    line-height: 42px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    .cart-logo{
      width: 20px;
      height: 20px;
      background: url(../../assets/img/cart-logo.png) no-repeat;
      background-size:20px 20px; 
      display: inline-block;
      vertical-align: middle;
    }
    .cart-icon-num{
      color: #fff;
      font-size: 12px;
      background: #E51C34;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      right: 20px;
      top:5px;
    }
  }
  .cart:hover{
    border-color: #91856f;
    color: #91856f;
  }
}
.sx_content-header {
  // background: #46413e;
  background: rgb(145, 133, 111);
    color: rgb(255, 255, 255);
  width: 100%;
  float: left;
  height: 50px;
  align-items: center;
  display: flex;
  color:#333333;
  text-align: center;
  // margin-top: 20px;
  position: relative;

  .content {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 50px;
    float: none;
    line-height: 50px;
    justify-content: space-between;
    .logo {
      //后期替换成图片
      font-size: 24px;
      color: #333333;
      float: left;
      position: relative;
      .path,.header-zone {
        color: #333333;
        margin-right: 20px;
        font-size: 14px;
        padding: 0 20px;
        float: left;
        position: relative;
        cursor: pointer;
        font-size:16px;
        // font-weight: bold;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
      }

      .path:hover{
        color: #d1b98e !important;
      }
      .header-zone:hover{
        color: #d1b98e !important;
        .zone-layer{
          display: block;
        }
      }
      img {
        vertical-align: middle;
      }
    }
    .user {
      display: flex;
      align-items: center;
      color: #fff;
      float: right;
      .phone {
        margin-left: 10px;
        float: left;
        img {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .user_news {
        padding-right: 30px;
        float: left;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 3px;
        }
        a {
          color: #fff;
          align-items: center;
          display: flex;
          float: left;
          transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        }
        a:hover {
           color: #d1b98e !important;
        }
      }
      .header_login {
        // padding-right: 15px;
        float: left;
        .userinfo {
          display: flex;
          align-items: center;
          span {
            margin-right: 3px;
            float: left;
            a {
              float: left;
              
              align-items: center;
              display: flex;
            }
          }
        }
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 3px;
        }
        a {
         color: #333333;
         transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        }
        a:hover {
          color: #d1b98e !important;
        }
      }
      .order {
        float: left;
        padding-top: 17.5px;
        line-height: 50px;
        height: 50px;
        box-sizing: border-box;
        .icon_border {
          width: 1px;
          height: 15px;
          background: #fff;
          display: block;
        }
      }

      .header_register {
        float: left;
        // margin: 0 15px;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 3px;
          // margin-top:2px;
        }
        a {
          color: #333333;
          transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        }
        .sign{
          cursor: pointer;
        }
        a:hover,
        .sign:hover {
          color: #d1b98e !important;
        }
      }
    }
  }
}
.dropdown{
  width: 292px;
  margin-right: -150px;
  padding: 10px;
  .droptop{
    padding: 10px 20px 15px;
    border-bottom: 1px solid #F8F8F8;
    .userhead{
      float: left;
      width: 60px;
      height: 60px;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .txtright{
      float: right;
      width: 171px;
      h6{
        font-size: 18px;
        font-weight: bold;
        color:#666666;
        line-height: 34px;
        margin-bottom: 2px;
      }
      .dropbg{
        background: url(../../assets/img/vip-user.png) no-repeat;
        width: 60px;
        text-align: center;
        height: 20px;
        padding-left: 14px;
        color: #FFF;
        font-size: 14px;

      }
    }
    
  }
  .drop-tap{
        padding: 2px 20px 0;
        line-height: 40px;
        font-size: 12px;
        color: #666666;
      .link{
        color: #91856F;
        margin-left: 5px;
      }
  }
  .ultxt{
    a{
      width: 60px;
      float: left;
      text-align: center;
      color: #999999;
      margin-left: 15px;
      font-size: 12px;
      :hover{
        color: #91856F;
        
      }
      span{
        display: block;
        img{
          width: 34px;
          height: 34px;
        }
        line-height: 20px;
      }
    }
    a+a{
      margin-left: 43px;
    }
  }
  .noultxt{
    color: #999999;
      padding: 0 20px;
      font-size: 12px;
      display: none;
  }
  
}
</style>

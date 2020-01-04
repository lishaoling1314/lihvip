<template>
  <div class="w-1200">
    <div class="user-shadow" style="padding:0">
      <template-crumbs :crumbsdata="crumbs" style="padding:0;"></template-crumbs>
    </div>
    <div class="goods-detalis user-shadow" style="padding-top:30px;">
      <div class="goods-content">
        <div class="goods-detalis-swiper">
          <div class="off-img">
            <img :src="goods.coverImg">
          </div>
          <div class="on-img">
            <img :src="item.url" alt v-for="(item,index) in goods.showImg" :key="index" @mousemove="offImgTap(index)" :style="{border:item.active?'1px solid #91856F':'1px solid #d7d8db'}">
          </div>
        </div>
        <div class="goods-main">
          <div class="main-name" :title="goods.name">{{goods.name}}</div>
          <div class="main-activityType clearfix"><!-- 商品类型 -->
            <div class="type-col" v-if="goods.activityType=='AGENT_SALE'">平台代售</div>
            <div class="type-col" v-if="goods.activityType=='PRESELL'">限时抢购</div>
            <div class="goods-icon" style="color:#CCCCCC;" v-if="goods.goodsLabel && goods.goodsLabel.length"> 
                <span style="margin-right:20px;"  v-for="(item,index) in goods.goodsLabel" :key="index"><img src="@/assets/img/goods-zhengpin.png" alt="" style="margin-right:3px;">{{item.name}}</span>
            </div>
          </div>
          <div class="main-date clearfix" v-if="endgoods" :style="{marginTop:goods.activityType == 'ORDINARY'?'20px':''}">
            <div class="date-view">
              <p v-if="presell">
                {{isPay?'活动剩余时间：':'活动开始时间：'}}
                <span class="back" v-if="date.days!=0">{{date.days}}天</span><span class="back" v-if="date.hours!=0">{{date.hours}}小时</span><span class="back">{{date.minutes}}</span>分<span class="back">{{date.seconds}}</span>秒
              </p>
            </div>
          </div>
          <div class="main-price clearfix">
            <div class="p1">
              <span class="name">
                {{goods.activityType=='PRESELL'?'抢购价':'价格'}}
              </span>
              <b>
                <span>¥{{goods.activityType == 'AGENT_SALE'? goods.marketPrice : goods.salePrice}}</span>

                <div class="vip-goodstap">
                    VIP
                </div>
                <div class="zhekou" v-if="goods.activityType != 'AGENT_SALE'">


                  <span class="zhekou-border" v-if="goods.discountType != 'NoAgio' && goods.activityType == 'PRESELL'">
                    {{goods.discountType == 'ReduceAgio' ? '减¥'+goods.discount+'元' : (goods.discountType == 'PercentumAgio'?goods.discount+'折':'')}}
                  </span>
                  <span class="zhekou-Price" :style="{marginTop:goods.discountType == 'NoAgio'?'20px':'',fontSize:goods.discountType == 'NoAgio'?'16px':'12px'}">
                    ¥{{goods.marketPrice}}
                  </span>
               
               
                </div>
                

              </b>
            </div>
            <div class="choice-coupon">
              <div  v-for="(item,index) in couponList" :key="index" @click="handlerReceive(item.id,index)">
                <span v-if="item.type=='DISCOUNT'">满{{item.couponBuyAmount}}打{{item.couponDiscount}}折</span>
                <!-- <span v-else-if="item.type=='RATE'">年化率加息{{item.couponRate}}%</span> -->
                <span v-else-if="item.type=='AMOUNT'">满{{item.couponBuyAmount}}减{{item.couponAmount}}</span>
                <span v-else>无门槛减{{item.couponAmount}}</span>
              </div>
            </div>
            <div style="clear:both"></div><!-- 兼容IE9 -->
          </div>
          <!-- 2019.9.29 -->
          <div class="vip-goods">
            <div class="leftbox">
              开通利汇会员预计可返<em>15元</em><i class="user-icon i-m" @click="sharecopyright = true ;"></i>
            </div>
            <a href="" class="rightbox">开通会员></a>
          </div>
          <div class="goods-period">
            <div class="period-title">规格</div>
            <div class="period-main" v-if="activityType=='AGENT_SALE'">
              <div :class="periodId == item.id?'active period-col':'period-col'" v-for="(item,index) in goods.periodInfo" :key="index" @click="selectAgentSale(item.id)">{{item.periodDay}}天</div>
            </div>
            <div class="period-main" v-else>
              <div :class="goodsSpecs == item.specs?'period-col active':'period-col'" v-for="(item,index) in goods.specifications" :key="index" @click="selectAgentSale(item.specs)">{{item.specs}}{{item.id}}</div>
            </div>
          </div>
          <div style="clear:both"></div><!-- 兼容IE9 -->
          <div class="main-num">
            <div class="num-title">数量</div>
            <div class="num-view">
              <el-input v-model="num" class="input" oninput="value=value.replace(/[^\w]/g, '')" type="number" @keyup.native="minNumber"></el-input>
              <div class="arrow">
                <el-button class="arrow-col" @click="arrowTop()">
                  <i class="arrow-icon"></i>
                </el-button>
                <el-button class="arrow-col" @click="arrowBottom()">
                  <i class="arrow-icon"></i>
                </el-button>
              </div>
            </div>
          </div>
          <div class="main-rate" v-if="isPeriod">

            <!-- <div class="rate" v-if="$store.state.user">年化{{(goods.noFirstPayRate && goods.rate) && (goods.noFirstPayRate > goods.rate) ? goods.noFirstPayRate : goods.rate}}%
              <span v-if="goods.noFirstPayRate">{{goods.noFirstPayRate > goods.rate ? goods.rate : goods.noFirstPayRate}}%</span>
              
            </div>
            <div class="rate" v-else>年化{{goods.rate}}%
             
            </div> -->
            <div class="rate">利润¥{{profit}}</div>
          </div>
          <div style="clear:both"></div><!-- 兼容IE9 -->
          <div class="main-tap">
            <div class="tap t-goumai" @click="BuyTap" v-if="isPay">立即购买</div>
            <div class="tap t-cart" @click="pushCart">加入购物车</div>
            <el-button @click="sharemodalshow = true ;SearchgoodsshareInfo();" class="tap t-share">分享</el-button>
          </div>

          <div class="goods-icon" v-if="isPeriod">
              <img src="@/assets/img/goods-xuanze.png" alt>
              <p>
              选择"由平台代售"即可获得相应利润<span>￥{{profit}}</span>
              </p>
          </div>
          
          <div class="goods-icon" v-if="goods.activityType == 'PRESELL'">
              <!-- <img src="@/assets/img/goods-fahuo.png" alt> -->
              <p>
              发货时间：预计<span class="text">{{dataEndTime}}</span>开始发货
            </p>
          </div>
          <div style="clear:both"></div><!-- 兼容IE9 -->
        </div>
      </div>
      <div style="clear:both"></div><!-- 兼容IE9 -->
      <div class="detalis">
        <div class="details-type">
          <div class="p" v-for="(item,index) in goods.property" :key="index" :title="item.title+item.value">
            <span class="l">{{item.title}}&nbsp;:</span>
            <span class="r">{{item.value}}</span>
          </div>
        </div>
        <div style="clear:both"></div><!-- 兼容IE9 -->
      </div>
    </div>
    <div class="detalis-text" v-html="goods.describe"></div>
    <div style="clear:both"></div>
    <!-- 分享弹窗 -->
    <Sharemodal v-if="sharemodalshow" @closemodalbtn="sharemodalshow = false">
      <div slot="header">
        <p>分享地址</p>
      </div>
      <div slot="body">
        <div slot="firstgrade">
          <p class="Ratetip" v-if="userRateinfo">该商品的一级分销提成比例为{{userRateinfo.firstRoyaltyRate}}%,二级分销提成比例为{{userRateinfo.secondRoyaltyRate}}%</p>
        </div>
        <div slot="secondgrade">
          <p class="tofriend">可复制地址转发给您的好友</p>
        </div>
        <div slot="thirdgrade">
          <div class="share">
            <div class="path">
              <input class="href" type="text" :value="routerHref">
              <el-button class="tap" @click="copy()">复制链接</el-button>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
      </div>
    </Sharemodal>
    <!-- 会员优惠说明 -->
    <Sharemodal v-if="sharecopyright" @closemodalbtn="sharecopyright= false" class="tabvip">
      <div slot="header">
        <p>会员优惠说明</p>
      </div>
      <div slot="body">
        <div class="vipbox">
            <ul class="vipulist">
              <li>
                <span class="vip-icon">铂金
                </span>
                <span class="viptxt">
                  <strong>铂金会员</strong> | 自购商品9折省<em>15元</em>
                </span>
                <span class="vipactive">当前等级</span>
              </li>
              <li>
                <span class="vip-icon">黄金
                </span>
                <span class="viptxt">
                 <strong> 黄金会员</strong> | 自购商品9折省<em>15元</em>
                </span>
                <span class="vipactive">当前等级</span>
              </li>
              <li>
                <span class="vip-icon">VIP
                </span>
                <span class="viptxt">
                  <strong>VIP会员</strong> | 自购商品9折省<em>15元</em>
                </span>
                <span class="vipactive">当前等级</span>
              </li>
              <li>
                <span class="vip-icon">普通
                </span>
                <span class="viptxt">
                 <strong> 普通用户</strong> | 升级后可享有更多优惠
                </span>
                <span class="vipactive">当前等级</span>
              </li>
            </ul>
            <span class="vipdown">
              <em class="flex1">升级可享受更多等级福利</em>
              <router-link to="/user">去升级
              </router-link>
            </span>
            <p class="viptool">温馨提示：不同商品参与不同的折扣或返佣会导致优惠力度不一样， 具体以下单为准，返佣将在确认收货后返还到账户。 </p>
        </div>
      </div>
    </Sharemodal>
  </div>
</template>
<script>
 function toDecimal(x) { //四舍五入保留两位小数点
   var f = parseFloat(x); 
   if (isNaN(f)) { 
    return; 
   } 
   f = Math.round(x*100)/100; 
   return f; 
 } 
import Qs from 'qs';
import { setTimeout } from 'timers'
import Cookies from 'js-cookie'
import Sharemodal from '@/components/template/sharemodal'
import templateCrumbs from '@/components/component/template_crumbs'
export default {
  data() {
    return {
      sharecopyright:false,
      sharemodalshow:false, // 分享彈窗
      endgoods: false, //抢购是否显示
      goodsId: '', //商品ID
      periodT:'',//计算周期时间
      num: 1, //商品数量
      presell: false, //是否为抢购商品
      shareVisible: false, //分享
      routerHref: '', //分享路径
      __intervalId: '', //离开页面销毁倒计时
      isPeriod:false,//年化
      activityType:'',//商品类型
      goodsSpecs:'',//商品规格
      periodId:'',//周期ID
      goods: {
        name: '', //商品名称
        salePrice: '', //销售价
        describe: '', //详情
        coverImg: '', //商品主图
        showImgs: [], //商品缩略图
        showImg: [] //
      },
      crumbs: [],
      date: {
        //时间
        date: '123', //时间
        days: '', //天数
        hours: '', //小时
        minutes: '', //分钟
        seconds: '' //秒数
      },
      userRateinfo:'', // 用户提成比例信息
      couponList:[],//优惠券列表
      isPay:true,//是否能够购买
    }

  },
  components: {
    templateCrumbs,Sharemodal
  },
  mounted() {
    this.loading = this.$loading({ text: '数据加载中，请稍后...' })

    // Object.assign(this.$data, this.$options.data());
    let  T = this.$router.history.current.query.activityType;
    // 抢购activityType、goodsId（AGENT_SALE）
    // 预售periodId、goodsId（PRESELL）
    // 普通goodsId（ORDINARY）
    let O;
    
    T == 'AGENT_SALE' ? O = this.$router.history.current.query.periodId : O = '';
    this.periodId = O
    this.goodsId = this.$router.history.current.query.goodsId
    this.activityType = this.$router.history.current.query.activityType;//商品类型
    this.getGoods(this.$router.history.current.query.goodsId,O);
   
    this.isPeriod = false

    
    if (this.$store.state.user && localStorage.getItem('user')) {
      //分享携带initUserID（用户昵称）
      this.routerHref =
        window.location.href + '&initUserID=' + JSON.parse(localStorage.getItem('user')).id
      // //console.log(this.routerHref)
    } else {
      this.routerHref = window.location.href
    }






    if (this.$router.history.current.query.initUserID) {//携带分享ID
      localStorage.setItem('initUserID', this.$router.history.current.query.initUserID)
    }
    //动态渲染面包屑
    this.crumbs = []
    if (this.$router.history.current.query.ab && this.$router.history.current.query.ab == 'path') {
      this.crumbs = [
        { id: 0, name: '首页', path: '/' },
        { id: 1, name: '商品列表', path: '/goodsList' },
        { id: 2, name: '商品详情', path: '/goodsDetalis' }
      ]
    } else {
      // console.log(111111111)
      this.crumbs = [
        { id: 0, name: '首页', path: '/' },
        { id: 1, name: '商品详情', path: '/goodsDetalis' }
      ]
    }
  },
  computed: {
    profit() {
      let Q = (this.goods.noFirstPayRate && this.goods.rate) && (this.goods.noFirstPayRate > this.goods.rate) ? this.goods.noFirstPayRate : this.goods.rate// 年化
      let W = this.goods.marketPrice * Q * this.num * this.periodT / 36000;

      return toDecimal(W)
    },
    dataEndTime(){// 计算周期发货时间
      if(this.goods.presellEndTime == undefined){
        return;
      }
      var end_date = this.goods.presellEndTime
      end_date = end_date.replace(/-/g, '/')
      var end_time = new Date(end_date)
      let Y = end_time.getTime();//结束时间
      let T = (this.periodT + 1) * 24 * 60 * 60 * 1000;//T = 周期天数 + 1
      let U = Y + T;
      return this.$point.formatDateTime(U).slice(0,10)
    }
  },
  methods: {
    pushCart(){//加入购物车
      if(!this.$store.state.user){//购买登录判断
        this.$message({ title: '错误', message: '请先登录!', type: 'error' })
        this.$router.push({path:'/login',query:{goodsId:this.goodsId,periodId:this.periodId,activityType:this.activityType}});
        return;
      }



      let D = Qs.stringify({
        goodsId:this.goodsId,
        goodsNum:this.num,
        spec:this.goodsSpecs,
        periodId:this.periodId
      })




      this.$post(`/user/cart/add.do`,{
        goodsId:this.goodsId,
        goodsNum:this.num,
        spec:this.goodsSpecs,
        periodId:this.periodId
      }).then(({data})=>{
        if(data.code == '0000'){
          this.$message({ type: 'success', message: '加入购物车成功！' });

          // console.log('加入之前')
          this.$get('/user/cart/size.do').then(({data})=>{//加入购物车计数
          // console.log('执行加入')
            if(data.code == '0000'){
              // console.log('加入购物车成功'+data.size)
              this.$store.commit('successCart',data.size)
            }
          })


        }
      })

    },
    BuyTap(){//直接购买
      
      
      if(!this.$store.state.user){//购买登录判断
        this.$message({ title: '错误', message: '请先登录!', type: 'error' })
        this.$router.push({path:'/login',query:{goodsId:this.goodsId,periodId:this.periodId,activityType:this.activityType}});
        return;
      }



        let ArrAy = [];
        
        if(this.activityType == 'AGENT_SALE'){//代售
          if(this.$point.isNull(this.periodId)){
            this.$message({ title: '错误', message: '请选择商品周期!', type: 'error' })
            return false;
          }

          ArrAy.push({
            goodsId:this.goodsId,
            num:this.num,
            periodId:this.periodId
          })

        }else{
            if(this.$point.isNull(this.goodsSpecs)){
            this.$message({ title: '错误', message: '请选择商品规格!', type: 'error' })
            return false;
          }
          ArrAy.push({
            goodsId:this.goodsId,
            num:this.num,
            spec:this.goodsSpecs
          })
        }
        // this.$message({ message: '执行跳转!' })



        if(this.activityType == 'PRESELL'){//抢购

          this.$store.commit('handOrderList',ArrAy)

          setTimeout(()=>{
            this.$router.push('/confirmOrderPresell')
          },300)

        }
        else if(this.activityType == 'AGENT_SALE'){//代售
          this.$store.commit('handOrderList',ArrAy)
          this.$router.push('confirmOrderAgentSale')
        }
        else if(this.activityType == 'ORDINARY'){
          
          this.$store.commit('handOrderList',ArrAy)
          setTimeout(()=>{
            this.$router.push('/confirmOrderOrdinary')
          },300)
          
        }else{
          this.$message({ title: '错误', message: '参数有误！', type: 'error' })
          this.$router.push('/goodsList')
        }



    },
    minNumber(e) {
      //console.log(this.num)
      if (this.num == 0) {
        this.num = 1
        this.$message({ title: '错误', message: '商品数量最低不能低于一件！', type: 'error' })
      } else if (this.num > 99) {
        this.num = 99
        this.$message({ title: '错误', message: '商品数量最高不能高于99！', type: 'error' })
      }
    },
    selectAgentSale(pid){//计算利润
      if(this.periodId == pid){
        return false;
      }

      if(this.activityType != 'AGENT_SALE'){//
          this.goodsSpecs = pid;
          // console.log('非代售商品')
          return false;
      }else{
        this.loading = this.$loading({ text: '' });

        this.$post('selectAgentSale/'+this.goodsId+'/'+pid+'.do').then(({data})=>{
          // console.log(data)
          this.goods.profit = data.goods.profit ? data.goods.profit.toFixed(2) : '';//渲染周期
          this.periodId = pid//
          this.goods.rate = data.goods.rate;//利润
          this.goods.presellEndTime = data.goods.presellEndTime//周期时间,前端计算
          data.goods.periodInfo.map((item,index)=>{
            if(item.id == pid){
              this.periodT = item.periodDay
              // console.log(this.periodT)
              setTimeout(()=>{
                this.loading.close();
              },300)
            }
          })


        })
      }
    },
    getGoods(id,type) {//获取商品详情
      let obj = new Object();
      if(this.activityType == 'AGENT_SALE'){
          obj.goodsId = id;
          obj.periodId = type;
      }else{
        obj.goodsId = id;
      }
      //商品详情
      this.$get('getGoods.do', { params: obj }).then(({ data }) => {
        // //console.log(data)
        if (data.code == '0000') {
          

          if(this.activityType == 'AGENT_SALE'){//预售商品渲染周期
            data.goods.periodInfo.map((item,index)=>{
              if(item.id == this.$router.history.current.query.periodId){
                this.periodT = item.periodDay;
              }
            })
          }else{//抢购、普通商品渲染规格
            this.goodsSpecs = data.goods.specifications[0].specs
          }

          data.goods.showImg = [];//存放主图
          this.goods = data.goods;
          // console.log(data)

          //折扣类型
          this.goods.discountType == 'ReduceAgio' ? this.goods.discount : this.goods.discount / 10;

          //商品参数
          if(data.goods.property && data.goods.property != ''){
            data.goods.property = JSON.parse(data.goods.property)
          }
          //商品图片列表
          data.goods.showImgs.map((item, index) => {
            this.goods.showImg.push({ active: false, url: item })
            this.goods.showImg[0].active = true
          })
          


          if(data.goods.activityType == 'AGENT_SALE'){//只有代售商品才显示年化率和利润
            this.isPeriod = true
          }




          //存在活动ID、未开始/进行中、并且为代售或者抢购商品
          if(data.goods.activityId && (data.goods.activityStatusType == 'NOT_BEGIN' || data.goods.activityStatusType == 'PROCEEDING') && data.goods.activityType != 'ORDINARY'){

            this.endgoods = true;
            this.presell = true;

            if(data.goods.activityStatusType == 'NOT_BEGIN'){//未开始
              this.isPay = false
              this.$GSX_DATE.newDate(data.goods.presellBeginTime,(data)=>{
                this.date = data
              })
            }else{
              this.$GSX_DATE.newDate(data.goods.presellEndTime,(data)=>{//进行中
                this.date = data
              })
            }
          }







        }
        this.loading.close();

        if(data.code == '1000' && data.msg=='活动已结束'){
          this.$router.push('/goodsList');
        }

        //获取优惠券
        this.goodsCoupon();

      })
    },
    goodsCoupon(){
      this.$get("/goods/goodsCoupon.do", {
        params: {
          id: this.goodsId
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          if (data.coupons.length) {
            this.couponList = data.coupons;
          }
        }
      });
    },
    // 查询商品分享比例
    SearchgoodsshareInfo () {
      this.goodsId = this.$route.query.goodsId;
      if (Cookies.get('Gtoken') ) {
        this.$get("/goods/userShareGoods.do",{
          params:{
            goodsId:this.goodsId
          }
        }).then(res => {
          if (res.data.code == '0000') {
            this.userRateinfo = res.data.gooodsCommisionRate
          }
        })
      }
    },
    offImgTap(i) {
      //点击图片
      this.goods.coverImg = this.goods.showImg[i].url //通过获取缩略图索引设置商品主图
      this.goods.showImg.map((item, index) => {
        item.active = false
        if (i == index) {
          item.active = true
        }
      })
    },
    copy() {
      let _this = this
      //复制分享链接
      let Url2 = this.routerHref
      let ie = Url2.indexOf('#')
      if (ie >= 1) {
        Url2 = Url2.slice(0, ie) + Url2.slice(ie + 2)
      }
      let oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        message: '复制成功！',
        type: 'success',
        duration: 2000,
        onClose() {
          _this.shareVisible = false
        }
      })
    },
    arrowTop() {
      if (this.num < 99) this.num++
    }, //数量++
    arrowBottom() {
      if (this.num > 1) this.num--
    }, //数量--
    handlerReceive(couponId,index) {
      this.couponId = couponId

      this.$post(`/goods/receiveCoupon/${couponId}.do`).then(({ data }) => {
        if (data.code == "0000") {
          this.couponList[index].isReceived = "已领"
          this.$message({
            message: '领取成功！',
            type: 'success', 
          })
        }
        if(data.code == "1004" && data.msg == "该优惠券已领取") { 
          this.couponList[index].isReceived = "已领"
        }
      });
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
.Ratetip {
  font-size:16px;
  font-weight:400;
  text-align: center;
  margin-top: 39px;
  color:rgba(145,133,111,1);
}
.tofriend {
  font-size:12px;
  font-weight:400;
  margin-top: 43px;
  color:rgba(145,133,111,1);
}
.share {
  padding: 20px 0;
  padding-top: 0;
  box-sizing: border-box;
  padding-bottom: 124px;
  p {
    color: #666666;
    font-size: 16px;
  }
  .path {
    display: flex;
    margin-top: 20px;
    height: 36px;
    .href {
      width: calc(100% - 124px);
      line-height: 36px;
      background: #eee;
      box-sizing: border-box;
      height: 36px;
      overflow: hidden;
      border: 0;
      border: none;
      padding-left: 17px;
      padding-right: 13px;
      outline: none;
      float: left;
    }
    input::-ms-clear,
    input::-ms-reveal {
      display: none;
    }
    .tap {
      width: 112px;
      height: 36px;
      background: #91856f;
      color: #fff;
      border-radius: 0;
      margin-left: 10px;
      border: none;
      float: right;
      right: 0;
    }
  }
}
.goods-detalis {
  background: #fff;
  box-sizing: border-box;
  padding: 20px 130px 20px 115px;
  .el-dialog__wrapper {
    z-index: 99999 !important;
  }

  .goods-content {
    display: flex;
    float: left;
    justify-content: space-between;
    .goods-detalis-swiper {
      width: 450px;
      float: left;
      .off-img {
        border: 1px solid #d7d8db;
        box-sizing: border-box;
        width: 450px;
        height: 450px;
        img {
          width: 100%;
          height: 100%;
          
        }
      }
      .on-img {
        margin-top: 10px;
        margin-left: -10px;
        display: flex;
        img {
          margin-left: 10px;
          width: 82px;
          height: 82px;
          border: 1px solid #d7d8db;
          box-sizing: border-box;
        }
      }
    }
    .goods-main {
      flex: 1;
      float: left;
      margin-left: 33px;
      padding-top: 20px;
      width:470px;
      .main-name {
        font-size: 22px;
        width: 472px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        color: #666;
        line-height: 36px;
        font-weight: bold;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      .main-activityType{
        margin-top: 20px;
        float: left;
        .type-col{
          display: inline-block;
          width: 70px;
          text-align: center;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #333333;
          background: #ECDAB8;
        }
        .goods-icon{
          display: inline-block;
          // width: auto;
          float: none;
        }
      }
      .goods-period{
        margin-top: 20px;
        display: flex;
        width: 472px;
        padding-left: 20px;
        box-sizing: border-box;
        float: left;
        .period-title {
          color: #bdbdbd;
          float: left;
          height: 34px;
          line-height: 34px;
          min-width: 35px;
          margin-top: 5px;
        }
        .period-main{
          float: left;
          .period-col{
            height: 34px;
            padding: 0 15px;
            line-height: 34px;
            float: left;
            text-align: center;
            margin: 5px;
            border:1px solid #9EA0A9;
            border-radius: 4px;
            cursor: pointer;
          }
          .period-col.active{
            border:1px solid #C2AB82;
            color: #856020;
            font-weight: bold;
          }
        }
      }
      .main-label{
        margin-top: 25px;
        width: 472px;
        display: flex;
        margin-bottom: 20px;
        p{
          float: left;
          margin: 0 5px;
          padding: 4px 7px;
          background: #F0F0F0;
          color: #999999;
          border-radius: 15px;
          font-size:12px;
        }
      }
      .main-rate {
        float: left;
        margin-top: 20px;
        display: flex;
        margin-left: 40px;
        width: 472px;
        .rate {
          float: left;
          color: #856020;
          font-size: 12px;
          text-align: center;
          padding: 4px 13px;
          height: 18px;
          line-height: 18px;
          position: relative;
          background: rgba(192, 179, 133, 0.3);
          del {
            color: #999;
          }
          span {
            color: #999999;
            text-decoration:line-through;
            margin-left: 5px;
          }
        }

        .rate:nth-child(1) {
          border-radius: 15px;
          // margin-right: 2px;
        }
       
        .rate:nth-child(2) {
          border-radius: 0 15px 15px 0;
        }
      }
      .main-price {
        // margin-top: 25px;
        background: #f6f6f6;
        padding: 20px;
        width: 472px;
        box-sizing: border-box;
        float: left;
        // margin-top: 15px;
        .p1 {
          display: flex;
          justify-content: left;
          align-items: center;
          .zhekou {
            font-size: 12px;
            float: right;
            color: #999999;
            text-align: center;
            margin-left: 8px;
            margin-top: 5px;
            .zhekou-border{
              border: 1px solid #856020;
              padding: 0 3px;
              display: block;
              font-weight: 100;
              margin-top: 3px;
            }
            .zhekou-Price {
              // border:1px solid #856020;
              padding: 0 3px;
              display: block;
              text-align: left;
              font-weight: 100;
              margin-top: 3px;
              text-decoration: line-through;
            }
          }
          .vip-goodstap{
            float:right;
            background:url(../../assets/img/huiy.png) no-repeat;
            width: 50px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            color: #FFF;
            font-size:12px;
            font-family:Adobe Heiti Std;
            font-weight:normal;
            margin: 8px 0 0 5px;
            padding-left: 12px;
          }
      
          b {
            margin: 0 8px 0 20px;
            float: left;
            color: #91856f;
            font-size: 40px;
            span:nth-child(1) {
              color: #333333;
            }
          }
          .name {
            color: #bcbcbc;
            float: left;
            margin-top: 15px;
          }
          span:nth-child(3) {
            color: #999999;
            text-decoration: line-through;
          }
        }

        .p2 {
          display: flex;
          margin-top: 23px;
          justify-content: left;
          align-items: center;
          b {
            margin: 0 8px 0 20px;
            color: #ed4f61;
            font-size: 18px;
          }
          span {
            color: #bdbdbd;
          }
        }
      }
      .vip-goods{
        background:url(../../assets/img/beijingcopy.png) no-repeat;
        width: 473px;
        height: 36px;
        line-height: 36px;
        float: left;
     
        margin-top: 18px;
        .leftbox{
          width: 317px;
          padding-left: 16px;
          float: left;
          color: #FFF;
          font-size:14px;
          em{
            color: #D8B06A;
          }
          .i-m {
            background: url(../../../static/icon/icon-mark-x16.png) right no-repeat;
            background-size: 15px 15px;
            width: 15px;
            display: inline-block;
            vertical-align: middle;
            height: 15px;
            margin: 0 5px;
          }
        }
        .rightbox{
          width: 137px;
          float: right;
          text-align:center;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:600; 
          color: #875C2A;
        }
      }
    }
    .choice-coupon {
          display: flex;
          justify-content: flex-start;
          padding-left: 41px;
          margin-top: 10px;
          flex-wrap: wrap;
          width: 300px;
          div {
            padding: 4px 16px;
            color: #fff;
            font-weight: 400;
            display: inline-block;
            line-height: 18px;
            background: linear-gradient(-17deg,rgba(172,138,75,1),rgba(206,186,116,1));
            filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=rgba(172,138,75,1), endColorstr=rgba(206,186,116,1));
            border-radius: 4px;
            position: relative;
            display: inline-block;
            cursor: pointer;
            margin-right: 5px;
            margin-top: 5px;
            &.received {
              cursor: normal;
              background: #F6F6F6;
              color: #999;
              border:1px solid rgba(204,204,204,1);
              >span {
                // position: relative;
                &:before,
                &:after {
                  content:'';
                  width:4px;
                  height: 100%;
                  display: inline-block;
                  position: absolute;
                  background-color: #f6f6f6;
                }
                 &:before{
                   left: -5px;
                 }
                 &:after {
                   right: -5px;
                   z-index: 6;
                 }
              }
              &:before,
              &:after {
                border:1px solid rgba(204,204,204,1);
              }
            }
            &:not(:first-child){
            }
            &:before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #f6f6f6;
              border-radius: 50%;
              left: -4px;
              top: 50%;
              transform: translateY(-50%);
              position: absolute;
            }
            &:after {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #f6f6f6;
              border-radius: 50%;
              right: -4px;
              top: 50%;
              transform: translateY(-50%);
              position: absolute;
            }
          }
        }
    .main-num {
      margin-top: 20px;
      display: flex;
      width: 300px;
      box-sizing: border-box;
      align-items: center;
      padding-left: 20px;
      float: left;
      .num-title {
        color: #bdbdbd;
        float: left;
        height: 46px;
        line-height: 46px;
      }
      .num-view {
        margin-left: 10px;
        display: flex;
        float: left;
        .el-input__inner {
          border: none !important;
          padding: 0 8px;
        }
        .input {
          width: 68px;
          float: left;
          height: 46px;
          line-height: 46px;
          text-align: left;
          // border: 1px solid #9ea0a9;
          box-sizing: border-box;
          outline: none;
          border-radius: 4px;
        }
        .el-input__inner::-webkit-outer-spin-button,
        .el-input__inner::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
        }
        .el-input__inner[type='number'] {
          -moz-appearance: textfield;
          text-align: center;
        }
        .arrow {
          display: flex;
          flex-direction: column;
          margin-left: 5px;
          width: 24px;
          float: left;
          justify-content: space-between;
          .arrow-col {
            border: 1px solid #DCDFE6;
            height: 21px;
            box-sizing: border-box;
            padding: 0;
            width: 24px;
            text-align: center;
            border-radius: 4px;
            margin: 0;
            line-height: 15px;
          }
          .arrow-col:nth-child(1) {
            transform: rotate(180deg);
            -ms-transform: rotate(180deg); /* IE 9 */
            -moz-transform: rotate(180deg); /* Firefox */
            -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
            -o-transform: rotate(180deg); /* Opera */
          }
          // .arrow-col span:nth-child(2) {
          //   line-height: 15px;
          // }
          .arrow-icon {
            width: 0;
            height: 0;
            border-left: 6px solid transparent; /* 左边框的宽 */
            border-right: 6px solid transparent; /* 右边框的宽 */
            border-top: 6px solid #9ea0a9; /* 下边框的长度|高,以及背景色 */
            font-size: 0;
          }
        }
      }
    }
    .main-date {
      width: 472px;
      box-sizing: border-box;
      background: #E3E3E3;
      height: 42px;
      margin-top:15px;
      float: left;
      .date-view {
        display: flex;
        align-items: center;
        line-height: 42px;
        padding-left: 20px;
        box-sizing: border-box;
        p {
          color: #333;
        }
      }
    }
    .main-tap {
      width:472px;
      box-sizing: border-box;
      margin-top: 20px;
      display: flex;
      justify-content: left;
      padding-left: 20px;
      float:left;
      .tap {
        border-radius: 0;
        margin-right: 15px;
        display: inline-block;
        border-radius: 4px;
        padding: 0;
        text-align: center;
        
        font-size: 18px;
        font-family: '微软雅黑';
        cursor: pointer;
      }
      .tap.t-goumai{
        background: #C2AB82;
        border: 1px solid #C2AB82;
        color: #fff;
        padding: 10px 35px;
        font-weight: bold;
      }
      .tap.t-cart{
        background: #fff;
        border:1px solid #C2AB82;
        color: #C2AB82;
        padding: 10px 35px;
        font-weight: bold;
      }
      .tap.t-share{
        padding: 10px 20px;
        background: #fff;
        border:1px solid #C2AB82;
        color: #C2AB82;
        font-weight: 500;
      }
    }
  }


  .detalis {
    margin-top: 50px;
    margin-bottom: 50px;
    .title {
      font-size: 26px;
      font-weight: 600;
      letter-spacing: 3px;
    }
    .details-type {
      display: flex;
      margin-top: 25px;
      // padding: 0 23px;
      width: 100%;
      float: left;
      box-sizing: border-box;
      flex-wrap: wrap;
      border: 1px solid #f6f6f6;
      .p {
        flex-basis: 33.33%;
        text-align: left;
        // padding:0 20px;
        border-bottom: 1px solid #f6f6f6;
        box-sizing: border-box;
        width: 33.33%;
        float: left;
        font-size: 15px;
        color: #333333;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        height: 40px;
        // display: flex;
        line-height: 40px;
        .l {
          width: 120px;
          overflow: hidden;
          text-align: right;
          display: inline-block;
          float: left;
          color: #666666;
          font-weight:bold;
        }
        .r {
          float: left;
          width: calc(100% - 120px);
          text-align: left;
          color: #999999;
          height: 40px;
          overflow: hidden;
          padding-left: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
}
.detalis-text {
  padding-top: 20px;
  background: #fff;
  width: 100%;
  float: left;
  padding-bottom: 50px;
  margin-bottom: 50px;
}
.goods-icon{
  margin-top: 20px;
  width: 390px;
  color: #999999;
  padding-left: 20px;
  box-sizing: border-box;
  float: left;
  img{
    margin-right: 10px;
    vertical-align: middle;
  }
  p{
    display: inline-block;
    span{
      color: #333;
      margin: 0 5px;
    }
  }
}
/deep/ .tabvip .modal-container{
  width: 360px;
  padding: 0 18px;
}
.vipbox{
  padding-top:18px; 
  .vipulist li{
    line-height: 40px;
    height: 40px;
    font-size:14px;
    font-family:PingFang SC;
    color: #333;
    .viptxt{
      strong{
        font-weight:600;
      }
      em{
        color: #D8B06A;
      }
    }
    .vipactive{
      padding: 0 4px;
        width:54px;
        height:16px;
        background:rgba(230,194,130,1);
        border-radius:8px;
        display: inline-block;
        text-align: center;
        line-height: 16px;
        font-size: 11px;
        color: #FFF;
      }
    
    .vip-icon{
      background:url(../../assets/img/huiy.png) no-repeat;
      width: 50px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      color: #FFF;
      font-size:12px;
      font-family:Adobe Heiti Std;
      font-weight:normal;   
      padding-left: 12px;
      display: inline-block;
    }
  }
  .vipdown{
    margin-top: 47px;
      display: flex;
       align-items:center;
      line-height: 47px;
      border-top: 1px solid #EBEBEB;
      border-bottom: 1px solid #EBEBEB;
      font-size:12px;
      font-family:PingFang SC;
      font-weight:400;
      color: #000;
      .flex1{
        flex: 1;
      }
      a{
        width:74px;
        height:28px;
        background:linear-gradient(180deg,rgba(243,214,160,1),rgba(224,185,116,1));
        border-radius:6px;
        display: inline-block;
        color: #875C2A;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:600;
        line-height: 28px;
        text-align: center;
       
      }
  }
  .viptool{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    padding: 10px 0 20px;
    line-height: 28px;
  }
}

</style>

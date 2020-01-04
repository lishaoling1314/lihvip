<template>
  <div class="Interest">
    <div class="clock_In" @click="showhandel">
      <div class="clock_content">我的打卡</div>
    </div>
    <div class="banner">
      <img src="./img/Interest/Interest-banner.png" alt="">
    </div>
    <div class="Interest-main w-1200">
      <div class="banner-title">
        <p>活动期间连续每月下单，当月商品代售年化收益率在上月最高基础上额外奖励0.5%，连续叠加最高可达10%</p>
        <p>（商品代售收益 = 商品下单金额 x 商品代售年化收益率 / 360 x 商品代售周期）</p>
      </div>
      <div class="Interest-table">
        <div class="title">活动攻略</div>
        <div class="duce">张先生连续3个月下单，可获得收益如下：<span>如此连续每月下单，商品代售年化收益最高可达10%</span></div>
        <div class="table-main a">
          <ul class="table-col" style="width:210px">
            <li style="width:210px">月份</li>
            <li style="width:210px">6月</li>
            <li style="width:210px">7月</li>
            <li style="width:210px">8月</li>
          </ul>
          <ul class="table-col" style="width:120px">
            <li style="width:120px">代售周期</li>
            <li style="width:120px">30天</li>
            <li style="width:120px">30天</li>
            <li style="width:120px">30天</li>
          </ul>
          <ul class="table-col" style="width:120px">
            <li style="width:120px">商品价格</li>
            <li style="width:120px">¥20000</li>
            <li style="width:120px">¥20000</li>
            <li style="width:120px">¥20000</li>
          </ul>
          <ul class="table-col c" style="width:250px">
            <li style="width:250px">当月商品代售年化收益率</li>
            <li style="width:250px">6%</li>
            <li style="width:250px">6.5%</li>
            <li style="width:250px">7%</li>
          </ul>
          <ul class="table-col c" style="width:150px">
            <li style="width:150px">可赚取收益</li>
            <li style="width:150px">¥100.00</li>
            <li style="width:150px">¥108.33</li>
            <li style="width:150px">¥116.66</li>
          </ul>
          <img src="./img/Interest/Interest-icon.png" alt="" class="Interest-icon">
        </div>
        <div style="clear:both"></div><!-- 兼容IE9 -->
        <div class="title" style="margin-top:50px;">各平台收益对比</div>
        <div class="table-main">
          <ul class="table-col" style="width:160px">
            <li style="width:160px">平台名称</li>
            <li style="width:160px">本金</li>
            <li style="width:160px">周期</li>
            <li style="width:160px">年化收益率</li>
            <li style="width:160px">收益</li>
          </ul>
          <ul class="table-col c b" style="width:230px">
            <li style="width:230px">利汇优品</li>
            <li style="width:230px">¥50000</li>
            <li style="width:230px">180天</li>
            <li style="width:230px">10%</li>
            <li style="width:230px">¥2500</li>
          </ul>
          <ul class="table-col" style="width:230px">
            <li style="width:230px">某宝</li>
            <li style="width:230px">¥50000</li>
            <li style="width:230px">180天</li>
            <li style="width:230px">2.7%</li>
            <li style="width:230px">¥675</li>
          </ul>
          <ul class="table-col" style="width:230px">
            <li style="width:230px">银行定期</li>
            <li style="width:230px">¥50000</li>
            <li style="width:230px">180天</li>
            <li style="width:230px">1.3%</li>
            <li style="width:230px">¥325</li>
          </ul>

        </div>
        <div style="clear:both"></div><!-- 兼容IE9 -->
        <p class="layer">注：实际以360天/年计算年化收益</p>
      </div>

      <div class="Explain w-1200">
        <div class="title">
          <img src="@/components/activity/img/Interest/Interest-Explain.png" alt="">
        </div>
        <div class="Explain-main">
          <div class="Explain-p">1、当月成功下单，下月商品代售年化收益率额外奖励0.5%</div>
          <div class="Explain-p">2、订单完成时间，将以成功付款的时间为准</div>
          <div class="Explain-p">3、当月商品代售年化收益率=上月最高商品代售年化收益率+0.5%，商品代售年化收益率最高上限为10%</div>
          <div class="Explain-p">4、商品代售年化收益率达到10%时，仅需保持每月下单，商品代售年化收益率即可维持在10%</div>
          <div class="Explain-p" style="margin-bottom:20px;">5、每中断一个月下单，商品代售年化收益率减0.5%</div>
          <div class="table-main a" style="width:630px">
            <ul class="table-col" style="width:210px">
              <li style="width:210px">月份</li>
              <li style="width:210px">8月</li>
              <li style="width:210px">9月</li>
              <li style="width:210px">10月</li>
              <li style="width:210px">11月</li>
            </ul>
            <ul class="table-col" style="width:210px">
              <li style="width:210px">选择代售周期</li>
              <li style="width:210px">30天</li>
              <li style="width:210px">无下单</li>
              <li style="width:210px">无下单</li>
              <li style="width:210px">30天</li>
            </ul>
            <ul class="table-col c" style="width:210px">
              <li style="width:210px">可获商品代售利润率</li>
              <li style="width:210px">7.5% ( 连续打卡4个月）</li>
              <li style="width:210px">无收益</li>
              <li style="width:210px">无收益</li>
              <li style="width:210px">7.5%-0.5%-0.5%=6.5%</li>
            </ul>
            <img src="./img/Interest/Interest-icon.png" alt="" class="Interest-icon" style="width:85px;">
          </div>
          <div style="clear:both"></div><!-- 兼容IE9 -->
          <div class="Explain-p" style="margin-top:20px;">6、若当月实际可获商品代售年化收益率大于参与活动的年化收益率，将按照实际商品代售年化收益计算</div>
        </div>
      </div>
      <div class="Explain w-1200">
        <div class="title">
          <img src="./img/Interest/Interest-Explain1.png" alt="">
        </div>
        <div class="Explain-main">
          <div class="Explain-p">1、通过活动获得的额外商品代售年化收益将在每个订单代售结束后，7个工作日内发放至您的银行卡账户</div>
          <div class="Explain-p">2、若发现有用多个手机号与银行卡套取平台优惠的情况，平台有权取消其优惠与福利，并保留追究其法律责任的权利</div>
          <div class="Explain-p">3、本活动最终解释权归利汇优品所有，利汇优品有权根据市场情况调整活动时间、规则、奖励等</div>
          <div class="Explain-p">4、本活动长期有效，若有任何调整，平台将提前发布公告</div>
          <div class="Explain-p">5、如需了解更多，请拨打利汇优品客服热线：400-007-0755</div>
        </div>
      </div>
    </div>
    <el-collapse-transition>

    </el-collapse-transition>

    <transition name="el-zoom-in-top">
      <div v-show="show" v-if="show" class="clock_In_dialog">
        <div class="transition-box transition-box1">
          <div class="title_close">
            <div class="title"><span><img src="@/assets/img/chose.png" alt="">您已连续打卡{{data.inClockMonthSum}}个月</span></div>
            <div class="close" @click="close"><img src="@/assets/img/close.png" alt=""></div>
          </div>
          <div class="circle">
            <!-- {{data.rate && data.rate.noFirstPayRate}}% -->
            {{data.rate.noFirstPayRate ? data.rate.noFirstPayRate + '%' : data.rate}}
          </div>
          <p>当前保底商品代售利润率</p>
          <div class="profit">
            <div>
              <span>代售中</span>
              <span>￥{{data.agentSaleIn}}</span>
            </div>
            <div>
              <span>代售成功</span>
              <span>￥{{data.agentSaleSuccess}}</span>
            </div>
            <div>
              <span>活动收益</span>
              <span>￥{{data.profitSale}}</span>
            </div>
          </div>
        </div>
        <div class="transition-box transition-box2">
          <div class="chose-data">
            <span @click="prev">
            &lt;  </span> {{year}} <span @click="next"> &gt;
            </span></div>
          <ul class="earnings">
            <!-- <li v-for="(item,index) in month" :key="index" :class="!isNaN(data.orderRateList[index+1]) ? 'havebg' : data.orderRateList[index+1] ? '' : 'nobg'"> -->
            <!-- <li v-for="(item,index) in month" :key="index" :class="data.orderRateList[index+1]=='' ? 'nobg': !isNaN(data.orderRateList[index+1])? 'havebg' : ''">
              <span>{{item}}月</span>
              <span v-if='data.orderRateList[index+1]>0'>{{data.orderRateList[index+1]}}%</span>
              <span v-else>{{data.orderRateList[index+1]}}</span>
            </li> -->
            
            <!-- <li v-for="(item,index) in month" :key="index" :class="(data.orderRateList[index] && data.orderRateList[index].status=='已') ? 'havebg' : ''" :style="{border:data.orderRateList[index] && data.orderRateList[index].status=='缺' && data.orderRateList[index].rate==''?'1px solid #dedede':!data.orderRateList[index]?'1px solid #dedede':'',color:data.orderRateList[index] && data.orderRateList[index].status=='缺' && data.orderRateList[index].rate==''?'#dedede':!data.orderRateList[index]?'#dedede':''}"> -->
            <li v-for="(item,index) in month" :key="index" :class="(data.orderRateList[index] && data.orderRateList[index].status=='已') ? 'havebg' : ''" :style="{border:data.orderRateList[index] && data.orderRateList[index].status=='缺' ?'1px solid #333':'1px solid #ccc',color:data.orderRateList[index] && data.orderRateList[index].status=='缺' ?'#333':'#ccc'}">
              <span :style="{color:data.orderRateList[index] && data.orderRateList[index].status=='已'?'#fff':''}">{{item}}月</span>

              <span v-if="data.orderRateList[index] && data.orderRateList[index].rate>0" :style="{color:data.orderRateList[index] && data.orderRateList[index].status=='已'?'#fff':''}">{{data.orderRateList[index].rate}}%</span>
              <span v-else-if="data.orderRateList[index] && data.orderRateList[index].rate==''">{{data.orderRateList[index].status}}</span>
              <span v-else></span>
              <img src="@/assets/img/has_clock.png" alt="" v-if="data.orderRateList[index] && data.orderRateList[index].status=='已'">
            </li>
          </ul>
        </div>

      </div>
    </transition>
    <div v-show="show" @click="hide" class="mask"></div>
  </div>
</template>
<script>
export default {
  name: 'interest',
  data() {
    return {
      show: false,
      data: {},
      orderRateList: [],
      fullscreenLoading: false,
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: 2019
    }
  },
  created() {
    var date = new Date()
    var year = date.getFullYear()
    this.year = year;
    this.getRate();
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    prev() {
      this.year--
      this.getRate()
    },
    next() {
      var date = new Date()
      var year = date.getFullYear()
      if (this.year < year) {
        this.year++
        this.getRate()
      }
    },
    showhandel() {
      // console.log(this.user)
      if (this.user) {
        this.getRate()
      } else {
        this.$message({ message: '请登录后查看打卡记录！', type: 'error' })
      }
    },
    hide() {
      this.show = false
    },
    close() {
      this.show = false
    },
    getRate() {
      this.$get('/user/rate/getRate.do', {
        params: {
          year: this.year
        }
      }).then(({ data }) => {
        // this.fullscreenLoading = false
        this.show = true
        this.data = data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.transition-box {
  width: 100%;
  height: 325px;
}
.transition-box1 {
  background: url(../../assets/img/clock_in.png) no-repeat;
  background-size: 100% 100%;
  .title_close {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: relative;
    .title {
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        img {
          width: 15px;
          height: 15px;
          float: left;
          margin-top: 17.5px;
          margin-right: 5px;
        }
      }
    }
    .close {
      position: absolute;
      right: 20px;
      top: 0px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .circle {
    width: 95px;
    height: 95px;
    background: #ffc658;
    margin: 0 auto;
    border-radius: 50%;
    border: 13px solid #60543e;
    line-height: 95px;
    font-size: 29px;
    color: #383838;
    text-align: center;
  }
  p {
    text-align: center;
    color: #ffc658;
    margin-top: 24px;
    font-size: 17px;
  }
  .profit {
    div {
      float: left;
      width: 33.33%;
      span {
        display: block;
        text-align: center;
        color: #f0e8db;
      }
      span:first-child {
        margin-top: 33px;
        font-size: 14px;
      }
      span:last-child {
        margin-top: 5px;
        font-size: 17px;
      }
    }
  }
}
.transition-box2 {
  background: #fff;
  text-align: center;
  .chose-data {
    text-align: center;
    // margin-top: 34px;
    // margin-bottom: 32px;
    // margin: 34px auto 32px auto;
    padding-top: 34px;
    padding-bottom: 30px;
    font-size: 22px;
    span {
      display: inline-block;
      margin: 0 20px;
      cursor: pointer;
    }
  }
  .earnings {
    padding: 0 20px;
    li {
      width: 60px;
      height: 60px;
      margin-left: 26px;
      margin-bottom: 13px;
      border: 1px solid #ccc;
      border-radius: 50%;
      float: left;
      position: relative;
      span {
        display: block;
      }
      span:first-child {
        margin-top: 12px;
      }
      img {
        width: 16px;
        height: 16px;
        position: absolute;
        bottom: -8px;
        margin-left: -8px;
      }
    }
    .havebg {
      background: #91856f;
      color: #fff;
    }
    li.border{border:1px solid #dedede;color: #dedede}
    .nobg {
      color: #999;
      span {
        margin-top: 20px !important;
      }
    }
  }
}
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 2000;
  opacity: 0.8;
}
.clock_In_dialog {
  position: fixed;
  width: 500px;
  height: 650px;
  top: 100px;
  left: 50%;
  margin-left: -250px;
  // background: #fff;
  z-index: 2006;
}
.Interest {
  .clock_In {
    position: absolute;
    right: 300px;
    top: 100px;
    width: 71px;
    height: 71px;
    background: #ffc658;
    // background: rgba(255, 198, 88, 1);
    // opacity: 0.2;
    border-radius: 50%;
    z-index: 100;
      animation:mymove 1s infinite;
      -webkit-animation:mymove 1s infinite; /*Safari and Chrome*/
      animation-direction:alternate;
      -webkit-animation-direction:alternate; /* Safari 和 Chrome */
    .clock_content {
      width: 42px;
      margin-left: 15px;
      margin-top: 15px;
      // height: 44px;
      text-align: center;
      font-size: 16px;
      color: #353535;
      cursor: pointer;
      position: relative;z-index: 9;
    }
  }
  @keyframes mymove{
    20%{-moz-box-shadow:0px 0px 4px #fff; -webkit-box-shadow:0px 0px 4px #fff; box-shadow:0px 0px 4px #fff;}
    40%{-moz-box-shadow:0px 0px 6px #fff; -webkit-box-shadow:0px 0px 6px #fff; box-shadow:0px 0px 6px #fff;}
    60%{-moz-box-shadow:0px 0px 8px #fff; -webkit-box-shadow:0px 0px 8px #fff; box-shadow:0px 0px 8px #fff;}
    80%{-moz-box-shadow:0px 0px 10px #fff; -webkit-box-shadow:0px 0px 10px #fff; box-shadow:0px 0px 10px #fff;}
    100%{-moz-box-shadow:0px 0px 12px #fff; -webkit-box-shadow:0px 0px 12px #fff; box-shadow:0px 0px 12px #fff;}
  }
  padding-bottom: 80px;
  margin-top: -50px;
  position: relative;
  .banner {
    width: 100%;
    img {
      width: 100%;
      position: relative;
      z-index: 0;
    }
  }
  .banner-title {
    text-align: center;
    width: 1200px;
    margin-top: -380px;
    padding-top: 30px;
    text-align: left;
    padding-left: 350px;
    box-sizing: border-box;
    margin-bottom: 150px;
    height: 128px;
    background: url(img/Interest/Interest-banner-title.png) no-repeat;
    background-size: 100% 128;
    position: relative;
    z-index: 99;
    p {
      color: #d8d5d0;
      line-height: 30px;
    }
  }
  .Interest-table {
    width: 850px;
    margin: 0 auto;
    .title {
      color: #534f49;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 16px;
    }
    .duce {
      font-size: 12px;
      color: #ada79f;
      margin-bottom: 30px;
      span {
        color: #945440;
      }
    }

    .layer {
      margin-top: 30px;
      color: #ada79f;
      font-size: 12px;
    }
  }
  .Explain {
    .title {
      margin-top: 80px;
      margin-bottom: 50px;
    }
    .Explain-main {
      width: 850px;
      margin: 0 auto;
      .Explain-p {
        line-height: 36px;
        font-size: 14px;
        color: #534f49;
      }
    }
  }
  .table-main {
    float: left;
    border-left: 1px solid #dad6d0;
    width: 850px;
    margin: 0 auto;
    position: relative;
    .table-col {
      float: left;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #dad6d0;
      box-sizing: border-box;
      margin: 0 auto;
      li {
        float: left;
        padding: 10px 0;
        text-align: center;
        border-right: 1px solid #dad6d0;
        border-bottom: 1px solid #dad6d0;
        box-sizing: border-box;
      }
    }
    .table-col.c {
      color: #945440;
    }
    .table-col.b {
      background: #f4f2ef;
    }
    .table-col.h li {
      background: rgba(244, 242, 239, 1);
    }
    .Interest-icon {
      position: absolute;
      top: 0;
      left: -1px;
    }
  }
  .table-main.a {
    li:nth-child(1) {
      background: #f4f2ef;
    }
  }
}
</style>


<template>
  <div class="afterSale w-1000">
    <div class="user-shadow" style="padding:0;margin:20px 0;">
      <template-crumbs :crumbsdata="crumbs" style="padding:0;"></template-crumbs>
    </div>
    <div class="afterSale-info">
      <div class="title">{{type == 'tuikuan' ? '退款' : '退货'}}详情</div>
      <div class="info">
        <p>
          <span>订单类型</span>：{{orderInfo.orderType == 'AgentSale' ? '代售订单' : orderInfo.orderType == 'Ordinary' ? '普通订单' : '抢购订单'}}
        </p>
        <p>
          <span>订单编号</span>：{{orderInfo.orderNumber}}
        </p>
        <p>
          <span>下单时间</span>：{{orderInfo.createTime}}
        </p>
        <p>
          <span>{{type == 'tuikuan' ? '退款' : '退货'}}编号</span>：{{orderInfo.refundNumber}}
        </p>
        <p>
          <span>申请时间</span>：{{orderInfo.refundTime}}
        </p>
      </div>
      <div class="mode">
        <p>
          <span>订单类型</span>：{{orderInfo.payType == 'WeiX' ? '微信支付' : orderInfo.payType == 'ZhiFub' ? '支付宝支付' : '钱包支付'}}
        </p>
        <p>
          <span>商品总金额</span>：¥{{orderInfo.goodsAmount}}
        </p>
        <p v-if="couponDes">
          <span>优惠券</span>：{{couponDes}}
        </p>
      </div>
      <div class="price">
        <div class="text">
          <span>实退金额：</span>
          <i>￥</i>{{orderInfo.payPrice}}
        </div>
      </div>
    </div>
    <div class="afterSale-spes">
      <div class="title">{{type == 'tuikuan' ? '退款' : '退货'}}进度</div>
      <template-aftersalespes :infoList="infoList" v-if="type == 'tuikuan'"></template-aftersalespes><!-- 退款 -->
      <template-tuihuospes :infoList="infoList" v-if="type == 'afterSale'" @getinfoList='getinfoListTap' :addLogistics="addLogistics"></template-tuihuospes><!-- 退货 -->
    </div>
    <div class="afterSale-goods">
      <div class="title">商品信息</div>
      <div class="afterSale-detalis">
        <div class="detalis-title">
          <p>商品信息</p>
          <p>单价</p>
          <p>数量</p>
          <p>小计</p>
        </div>
        <div class="detalis-main">
          <div class="detalis-item" v-for="(item,index) in goodsList" :key="index">
            <div class="detalis-img">
              <img :src="item.goodsCoverImg" />
            </div>
            <div class="detalis-name">
              <p class="p1">{{item.goodsName}}</p>
              <p class="p2">
                <!-- <span>订单类型：普通订单</span> -->
                <span v-if="item.spec">规格：{{item.spec}}</span>
              </p>
            </div>
            <div class="detalis-price">¥{{item.salePrice}}</div>
            <div class="detalis-num">x<span>{{item.num}}</span></div>
            <div class="detalis-heji">¥{{item.payPrice}}</div>
            <div style="clear:both"></div>
          </div>
        </div>
      </div>
      <div class="call-text">若对订单信息有疑问请联系客户电话：<span>400-007-0755</span></div>
    </div>
  </div>
</template>
<script>
import templateAftersalespes from '@/components/template/template-afterSalespes';
import templateTuihuospes from '@/components/template/template-tuihuospes';
import templateCrumbs from '@/components/component/template_crumbs';
export default {
  data() {
    return {  
      type: "", //退款 || 退货
      orderInfo: {}, //订单详情
      goodsList:[],//商品列表
      infoList:[],//退款进度列表
      addLogistics:false,//是否显示物流
      crumbs: [
        { id: 0, name: '订单列表', path: '/orderList' }
      ],
    };
  },
  components: { templateAftersalespes,templateTuihuospes,templateCrumbs },
  mounted() {
    this.loading = this.$loading({ text: '' })
    if (this.$router.history.current.query.tuikuanId) {
      this.type = "tuikuan";
      this.Gettuikuan(this.$router.history.current.query.tuikuanId);

      this.crumbs = [
        { id: 0, name: '订单列表', path: '/orderList' },
        { id: 2, name: '订单详情', path: '/order?orderId='+this.$router.history.current.query.orderId },
        { id: 2, name: '退款详情', path: '/AfterSaleId' }
      ]

    } else if (this.$router.history.current.query.AfterSaleId) {
      this.type = "afterSale";
      this.GetAfterSale(this.$router.history.current.query.AfterSaleId);

      this.crumbs = [
        { id: 0, name: '订单列表', path: '/orderList' },
        { id: 2, name: '订单详情', path: '/order?orderId='+this.$router.history.current.query.orderId },
        { id: 2, name: '退货详情', path: '/AfterSaleId' }
      ]

    }
  },
  computed:{
    couponDes() {
        if(this.orderInfo.discountAmount == undefined || this.orderInfo.discountAmount <= 0) {
            return false
        }
        if (this.orderInfo.orderType == "AgentSale") {//代售订单
            return "加息 + " + this.orderInfo.discountAmount + '%';
        } else {
            return "-¥" + this.orderInfo.discountAmount
        }
    }
    
  },
  methods: {
    getinfoListTap(){
      // alert(111)
      this.GetAfterSale(this.$router.history.current.query.AfterSaleId);
    },
    getOrderInfo(id, res) {//退款--订单详情
      this.$get("user/orderInfo.do", {
        params: {
          orderId: id
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          this.orderInfo = Object.assign(data.orderInfo, res);
          this.goodsList = data.orderInfo.orderGoodVoList;//退款订单直接取所有商品
        //   console.log(this.goodsList)
        
        }
      });
    },
    Gettuikuan(id) {//退款
    //   console.log("退款");
    
      this.$get("user/refundInfo.do", {
        params: {
          orderId: id
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
            this.infoList = data.refundInfoVos
            // console.log(this.infoList)
            if(data.refundInfoVos.length){
                data.refundTime =  data.refundInfoVos[0].createTime
                this.getOrderInfo(id, data);
            }
        }
        setTimeout(()=>{
          this.loading.close()
        },300)
      });
    },
    GetAfterSale(id) {//退货详情
         this.$get(`user/aftermarket/orderInfo/${id}.do`).then(({data})=>{
            this.GetOrderAfterSale(id,data)
        })
    },
    GetOrderAfterSale(id,res){//退货进度
       this.$get(`user/aftermarket/info/${id}.do`).then(({data})=>{
            // console.log(data)
            if(data.infoList && data.infoList.length && data.code == '0000'){
                // console.log(data.infoList)
                this.addLogistics = data.addLogistics
                this.infoList = data.infoList;//进度
                res.orderInfo.refundTime = data.infoList[0].createTime;//退款申请时间
                res.orderInfo.refundNumber = res.aftermarket.aftermarketNumber;//退款单号
                res.orderInfo.orderNumber = res.orderPro.orderNumber;//
                this.orderInfo = res.orderInfo;//退款数据

                res.orderInfo.orderGoodVoList = [//周荣沙雕返回数据和伍辛不一样，做重新赋值处理
                    {
                        goodsCoverImg:res.orderInfo.goodsCoverImg,
                        goodsName:res.orderInfo.goodsName,
                        spec:res.orderInfo.spec,
                        salePrice:res.orderInfo.salePrice,
                        num:res.orderInfo.num,
                        payPrice:res.orderInfo.payPrice,
                        
                    }
                ]

                this.goodsList = res.orderInfo.orderGoodVoList;//商品列表
            }
            setTimeout(()=>{
              this.loading.close()
            },300)
        })
    }
  }
};
</script>
<style lang="less">
.afterSale-info {
  background: #fff;
  margin-top: 20px;
  padding: 50px;
  .title {
    font-weight: bold;
    font-size: 18px;
    color: #040000;
    margin-bottom: 20px;
  }
  .info {
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 30px;
    p {
      width: 33%;
      line-height: 30px;
      font-size: 12px;
      color: #666;
      display: inline-block;
      span {
        color: #999999;
      }
    }
  }
  .mode {
    padding: 30px 0;
    p {
      width: 33%;
      line-height: 30px;
      font-size: 12px;
      color: #666;
      display: inline-block;
      span {
        color: #999999;
      }
    }
  }
  .price {
    background: #f0f2f5;
    height: 48px;
    line-height: 48px;
    position: relative;
    .text {
      position: absolute;
      right: 60px;
      font-size: 25px;
      color: #91856f;
      font-weight: bold;
      span {
        font-size: 12px;
        color: #999999;
        font-weight: normal;
      }
      i {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
}
.afterSale-spes {
  margin-top: 10px;
  background: #fff;
  padding: 50px;
  .title {
    font-weight: bold;
    font-size: 18px;
    color: #040000;
    margin-bottom: 20px;
  }
}
.afterSale-goods {
  background: #fff;
  margin-top: 10px;
  padding: 50px;
  .title {
    font-weight: bold;
    font-size: 18px;
    color: #040000;
    margin-bottom: 20px;
  }
  .afterSale-detalis {
    margin-top: 35px;
    margin-bottom: 16px;
    position: relative;
    border-bottom: 1px solid #eaeaea;
    .detalis-title {
      background: #f0f2f5;
      border-left: none;
      padding: 0;
      line-height: 45px;
      height: 45px;
      margin: 0;
      padding: 0 20px;
      p {
        text-align: center;
        color: #666666;
        font-weight: normal;
        font-size: 12px;
        float: left;
        height: 45px;
      }
      p:nth-child(1) {
        width: 320px;
      }
      p:nth-child(2) {
        width: 180px;
      }
      p:nth-child(3) {
        width: 180px;
      }
      p:nth-child(4) {
        width: 180px;
      }
    }
    .detalis-main {
      width: 100%;
      .detalis-item {
        padding: 20px;
        border-bottom: rgb(234, 234, 234);
        .detalis-img {
          width: 94px;
          height: 94px;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .detalis-name {
          margin-left: 15px;
          float: left;
          width: 211px;
          padding-top: 20px;
          height: 68px;
          position: relative;
          p {
            font-size: 12px;
          }
          .p1 {
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 20px;
            height: 17px;
          }
          .p2 {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 250px;
            color: #999999;
          }
        }
        .detalis-price {
          float: left;
          padding-top: 20px;
          padding-left: 20px;
          width: 180px;
          box-sizing: border-box;
          text-align: center;
        }
        .detalis-num {
          float: left;
          padding-top: 20px;
          padding-left: 15px;
          width: 180px;
          text-align: center;
          box-sizing: border-box;
          span {
            margin-left: 3px;
          }
        }
        .detalis-heji {
          float: left;
          padding-top: 20px;
          padding-left: 20px;
          box-sizing: border-box;
          width: 180px;
          text-align: center;
        }
      }
    }
  }
}
.call-text {
  color: #999999;
  font-size: 12px;
  span {
    color: #333;
  }
}
</style>
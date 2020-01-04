<template>
  <div class="orderList">
    <div class="orderList-title">
      <div class="orderList-radio">
          <div class="t-state">
            <div :class="goodsType == 'Presell,Ordinary' ? 'text active' : 'text'" @click="orderStatusValue = '';checkAll=false;goodsType = 'Presell,Ordinary';pageNum = 1;orderData();"><span>商品订单</span></div>
            <div :class="goodsType == 'AgentSale' ? 'text active' : 'text'" @click="orderStatusValue = '';checkAll=false;goodsType = 'AgentSale';pageNum = 1;orderData()"><span>代售订单</span></div>
            <div :class="goodsType == 'refund' ? 'text active' : 'text'" @click="goodsType = 'refund';pageNum = 1;refundData();"><span>退款/售后</span></div>
          </div>
          <div class="t-radio" v-if="goodsType!='refund'">
            <el-checkbox v-model="checkAll" @change="orderStatusValue = '';orderStatusName = '';orderData()" style="margin-right:30px;">全部订单</el-checkbox>
            
            <el-checkbox true-label="ToPay,InPay" false-label="ToPay,InPay" v-model="orderStatusValue" v-if="goodsType == 'Presell,Ordinary'" @change="checkOrderList" :disabled="orderStatusValue == 'ToPay,InPay'">待支付&nbsp;({{orderCountVoPc.nonPayment}})</el-checkbox>
            <el-checkbox true-label="ToDelivery,ExpectDelivery" false-label="ToDelivery,ExpectDelivery" v-model="orderStatusValue" v-if="goodsType == 'Presell,Ordinary'" @change="checkOrderList" :disabled="orderStatusValue == 'ToDelivery,ExpectDelivery'">待发货&nbsp;({{orderCountVoPc.delivery}})</el-checkbox>
            <el-checkbox true-label="Delivery,OutBound" false-label="Delivery,OutBound" v-model="orderStatusValue" v-if="goodsType == 'Presell,Ordinary'" @change="checkOrderList" :disabled="orderStatusValue == 'Delivery,OutBound'">待收货&nbsp;({{orderCountVoPc.receiving}})</el-checkbox>


            <!-- <el-checkbox-group v-model="orderStatusValue" v-if="goodsType == 'AgentSale'"> -->
              <el-checkbox true-label="ToPay,InPay" false-label="ToPay,InPay" v-model="orderStatusValue"  v-if="goodsType == 'AgentSale'" @change="checkOrderList" :disabled="orderStatusValue == 'ToPay,InPay'">待支付&nbsp;({{orderCountVoPc.agentNonPayment}})</el-checkbox>
              <el-checkbox true-label="AgentSaleIn" false-label="AgentSaleIn" v-model="orderStatusValue"  v-if="goodsType == 'AgentSale'" @change="checkOrderList" :disabled="orderStatusValue == 'AgentSaleIn'">代售确定中&nbsp;({{orderCountVoPc.agentSaleIn}})</el-checkbox>
              <el-checkbox true-label="AgentSaleSuccess" false-label="AgentSaleSuccess" v-model="orderStatusValue"  v-if="goodsType == 'AgentSale'" @change="checkOrderList" :disabled="orderStatusValue == 'AgentSaleSuccess'">代售成功&nbsp;({{orderCountVoPc.agentSaleSuccess}})</el-checkbox>
              <el-checkbox true-label="AgentSaleBack" false-label="AgentSaleBack" v-model="orderStatusValue"  v-if="goodsType == 'AgentSale'" @change="checkOrderList" :disabled="orderStatusValue == 'AgentSaleBack'">代售回款中&nbsp;({{orderCountVoPc.agentSaleBack}})</el-checkbox>
            <!-- </el-checkbox-group> -->


          </div>
        <div style="clear:both"></div>
      </div>
      <el-form label-width="80px" v-if="goodsType == 'Presell,Ordinary'">
        <el-form-item label="订单状态:" label-width="80px" v-if="checkAll">
          <el-select v-model="orderStatusName" placeholder="请选择" @change="orderData()">
            <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
    </div>
    <div class="tabs-main" v-if="orderList.length">
      <div v-for="(item,index) in orderList" :key="index" class="tabs-item">
        <div class="title">
          <p>订单编号：{{item.orderNumber}}</p>
          <p>下单时间：{{item.createTime}}</p>
          <p class="r">订单状态：<span style="color:#91856F">{{item.orderStatus}}</span></p>
          <!-- 订单状态 -->
        </div>
        <div class="tabs-view">
          <!-- 多个商品布局START -->
          
          <div class="tabs-many" v-if="item.orderGoodVoList && item.orderGoodVoList.length > 1">
            <div class="tabs-many-centent" v-for="(itm,idx) in item.orderGoodVoList" :key="idx" :style="{borderBottom:idx == item.orderGoodVoList.length -1 ? '#EAEAEA':''}">
              <div class="many-img">
                <div class="many-layer" v-if="item.orderStatus == '申请退款中'|| item.orderStatus == '处理中'">处理中</div>
                <div class="many-layer" v-if="item.orderStatus == '退款失败'">退款失败</div>
                <div class="many-layer" v-if="item.orderStatus == '已退款'">已退款</div>
                <img :src="itm.goodsCoverImg" :alt="itm.goodsName">
              </div>
              <div class="many-name">
                <p class="p1" :title="itm.goodsName">{{itm.goodsName}}</p>
                <p class="p2">
                 <span>订单类型：{{item.orderType}}</span>
                  <span>规格：{{itm.spec}}</span>
                </p>
              </div>
              <div class="many-price">¥{{itm.salePrice}}</div>
              <div class="many-num">x<span>{{itm.num}}</span></div>
              <div style="clear:both"></div>
            </div>
            <div class="tabs-ope">
              <div class="ope-price">
                <p class="p1">¥{{item.payPrice}}</p>
                <p class="p2">(&nbsp;含运费{{item.freight}}&nbsp;)</p>
              </div>
              <div class="ope-btn">
                 <div class="path back" v-if="item.orderStatus == '待支付' || item.orderStatus == '支付中'" @click="goPay(item)">
                  去支付
                  <span v-if="item.orderStatus == '支付中' || item.orderStatus == '待支付'">{{item.date.minutes}}:{{item.date.seconds}}</span>
                </div>
                <router-link :to="{path:'/order',query:{orderId:item.orderId}}"  class="path" v-if="goodsType == 'refund'">订单详情</router-link>
                <router-link :to="{path:'/order',query:{orderId:item.id}}"  class="path" v-else>订单详情</router-link>
                <div class="path" @click="applyCancel(item.id)" v-if="item.orderStatus == '待支付' || item.orderStatus == '支付中'">取消订单</div>
              </div>
            </div>
          </div>


          <div class="tabs-single" v-if="item.orderGoodVoList && item.orderGoodVoList.length == 1"><!-- 单个商品布局 -->
            <div class="tabs-single-centent" v-for="(itm,idx) in item.orderGoodVoList" :key="idx" >
              <div class="single-img">
                <div class="single-layer" v-if="item.orderStatus == '申请退款中'|| item.orderStatus == '处理中'">处理中</div>
                <div class="single-layer" v-if="item.orderStatus == '退款失败'">退款失败</div>
                <div class="single-layer" v-if="item.orderStatus == '已退款'">已退款</div>
                <img :src="itm.goodsCoverImg" :alt="itm.goodsName">
              </div>
              <div class="single-name">
                <p class="p1" :title="itm.goodsName">{{itm.goodsName}}</p>
                <p class="p2">
                  <span>订单类型：{{item.orderType}}</span>
                  <span v-if="item.orderType != '代售订单'">规格：{{itm.spec}}</span>
                </p>
              </div>
              <div class="single-price">¥{{itm.salePrice}}</div>
              <div class="single-num">x<span>{{itm.num}}</span></div>
              <div class="single-ope">¥{{itm.payPrice}}</div>
              <div class="single-btn">
                <div class="path back" v-if="item.orderStatus == '待支付' || item.orderStatus == '支付中'" @click="goPay(item)">
                  去支付
                  <span v-if="item.orderStatus == '支付中' || item.orderStatus == '待支付'">{{item.date.minutes}}:{{item.date.seconds}}</span>
                </div>
                <router-link :to="{path:'/order',query:{orderId:item.orderId}}"  class="path" v-if="goodsType == 'refund'">订单详情</router-link>
                <router-link :to="{path:'/order',query:{orderId:item.id}}"  class="path" v-else>订单详情</router-link>



                <router-link :to="{path:'/AfterSale',query:{tuikuanId:item.orderId,orderId:item.orderId}}"  class="path" v-if="item.refundRecordType == 'REFUND'">退款详情</router-link>

                <router-link :to="{path:'/AfterSale',query:{AfterSaleId:item.orderId1,orderId:item.orderId}}"  class="path" v-if="item.refundRecordType == 'AFTERMARKET'">退货详情</router-link>




                <div class="path" @click="applyCancel(item.id)" v-if="item.orderStatus == '待支付' || item.orderStatus == '支付中'">取消订单</div>



                <div class="path" @click="deleteOrder(item.id)" v-if="item.orderStatus == '已关闭'">删除订单</div>


              </div>
              <div style="clear:both"></div>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <el-pagination v-if="totalPage>10" style="text-align:center;margin:50px 0 0 0;" background layout="prev, pager, next,sizes, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :total="totalPage"></el-pagination>
    </div>
    <div class="noData" v-if="!orderList.length">
      暂无数据
    </div>
  </div>
</template>
<script>
import Qs from 'qs';
export default {
  data() {
    return {
      order: {},
      
      goodsType:'Presell,Ordinary',//商品类型
      // orderType:'ToPay',//商品类型
      orderList: [],
      cities:['待支付','待发货','待收货'],
      orderCountVoPc:{},//订单状态数量
      isIndeterminate:false,
      orderStatusValue:'',//订单类型
      orderStatusName:'',//下拉Name
      checkAll:false,//未选中
      orderType: [],
      pageNum: 1,
      pageSize: 10,
      totalPage: 0, //总条目数
    }
  },
  watch: {
    $route(to) {
      this.pageNum = 1;
       if(to.name == 'orderList'){
          this.orderData()
        }
    },
    goodsType(){
      this.orderStatusName = ''
    },
  },
  mounted() {
    this.orderData();
  },
  methods: {
    checkOrderList(){//单选
      this.orderStatusName = '';
      this.checkAll = false;
      this.orderData()
    },
    goPay(item){//去支付
      this.loading = this.$loading({ text: "订单正在提交，请稍后..." });

      let Arr = [];

      Arr.push({
        orderId:item.id,//订单ID
        orderNumber:item.orderNumber,//订单号
        availableFund:this.$store.state.userinfo.availableFund,//用户可用余额
        sum:item.payPrice//需支付金额
      })



      this.$store.commit('handPayList',Arr)
      setTimeout(()=>{
          this.loading.close();
          this.$router.push('/payment');
      },500)

    },
    deleteOrder(id){//已关闭订单删除订单
      id = Qs.stringify({
        orderId:id
      })
      this.$confirm('是否删除订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$post('user/deleteOrder.do',id).then(({data})=>{
          // console.log(data)
          if(data.code == '0000'){
              this.$message({ type: 'success', message: '删除成功！' })
              setTimeout(() => {
                this.orderData();
              }, 1000)
          }
        })

      }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消'
          }); 
        })
    },
    applyCancel(id) {//取消支付
        this.$confirm('是否取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$get('/user/applyCancel.do',  {
            params: {
              orderIds: id
            }
      }).then(({ data }) => {
            if (data.code == '0000') {
              this.$message({ type: 'success', message: '取消成功！' })
              setTimeout(() => {
                this.orderData();
              }, 1000)
            }
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消'
          }); 
        })
    },
    refundData(){//获取退款售后
      this.loading = this.$loading({ text: '' })
      this.$get('user/refundList.do',{
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(({data})=>{
        if (data.code == '0000') {
          data.OrderRefundVo.data.map((item, index) => {

            if(data.OrderRefundVo.count == 0){
              return
            }  
            
            item.orderStatus = this.OrderRefundVo(item.status)
            // console.log(item)

          })




          // this.orderList = []
          this.orderList = data.OrderRefundVo.data;
          this.totalPage = data.OrderRefundVo.count;
          // console.log(this.orderList)
        }
        setTimeout(()=>{
          this.loading.close()
        },300)
      })
    }, 
    orderData() {
      //tabel数据
      this.loading = this.$loading({ text: '' })
      this.$get('user/orderLog.do', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          orderStatus: this.orderStatusValue || this.orderStatusName, //订单状态
          orderType: this.goodsType || 'Presell,Ordinary',//商品类型
          
          // orderStatusValue
        }
      }).then(({ data }) => {


        // console.log(data.list.count)
        if (data.code == '0000') {
          data.list.data.map((item, index) => {
            if(data.list.count == 0){
              return
            }  
            this.orderCountVoPc = data.orderCountVoPc
            item.orderType = this.Otype(item.orderType)
            item.orderStatus = this.status(item.orderStatus)
            // console.log(item)


            
            if(item.orderStatus == '支付中' || item.orderStatus == '待支付'){
             
              item.date = {minutes:'',seconds:''};
              this.dateHandle(item, data.now)
            }
          })



          if(this.goodsType == 'Presell,Ordinary' && this.$store.state.isAgentSale){
             this.orderType = [
              { value: '', label: '全部' },
              { value: 'InPay', label: '支付中' },
              { value: 'ExpectDelivery', label: '预发货' },
              { value: 'OutBound', label: '已出库' },
              { value: 'Complete', label: '已完成' },
              { value: 'Close', label: '关闭' },
              // { value: 'AgentSaleIn', label: '代售确定中' },
              // { value: 'AgentSaleSuccess', label: '代售成功' },
              // { value: 'AgentSaleBack', label: '代售回款中' },
              // { value: 'AgentSaleComplete', label: '代售完成' },
            ]
          }



          let l = data.list.count;//暂存总条数
          let OrderArray = [];//暂存总数据

          if(this.$store.state.isAgentSale){//销售显示代售【2.0.1需求】
            OrderArray = data.list.data;
            l = data.list.count
          }else{
             data.list.data.map((item,index)=> {
              if(item.orderType != '代售订单'){
                OrderArray.push(item)
              }else{
                l --
              }

            })
          }
          // console.log(OrderArray)
          // OrderArray.push(OrderArray[0].orderGoodVoList)
          this.orderList = OrderArray;
          this.totalPage = l;
          // console.log(this.orderList)
        }
        setTimeout(()=>{
          this.loading.close()
        },300)
      })
    },
    dateHandle(item, now) {//未支付订单倒计时
      let _this = this
      let CalcDate = 30 * 1000 * 60 //获取30分钟的时间戳
      // //console.log(orderdate)
      // //console.log(now)
      let orderdate = item.createTime;

      orderdate = orderdate.substring(0, 19)
      orderdate = orderdate.replace(/-/g, '/')
      let timestamp = new Date(orderdate).getTime()
      let A = timestamp + 30 * 1000 * 60 - now
      let date = {};
      this._intervalId = window.setInterval(() => {
        A = A - 1000
        // //console.log(now-timestamp)
        if (A <= 1000) {
          clearInterval(this._intervalId);//停止计时器
          return false
        }

        let minutes = parseInt((A % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = parseInt((A % (1000 * 60)) / 1000)

        item.date.minutes = _this.openZero(minutes)
        item.date.seconds = _this.openZero(seconds)
        // //console.log(parseInt((A % (1000 * 60 * 60)) / (1000 * 60)));
        // //console.log(parseInt((A % (1000 * 60)) / 1000))
        // //console.log(A)
        // console.log(item)
        
      }, 1000)
    },
    openZero(zero) {
      //加0
      if (zero <= 9) {
        zero = '0' + zero
      }
      return zero
    },
    sizeChangeHandle(val) {
      document.documentElement.scrollTop = 0;
      this.pageSize = val
      this.pageNum = 1;
      this.goodsType == 'refund' ? this.refundData() : this.orderData()
      
    },
    // 当前页
    currentChangeHandle(val) {
      document.documentElement.scrollTop = 0;
      this.pageNum = val
      this.goodsType == 'refund' ? this.refundData() : this.orderData()
    },
    Otype(text) {
      //订单类型判断
      let T = ''
      if (text == 'Ordinary') {
        T = '普通订单'
      } else if (text == 'AgentSale') {
        T = '代售订单'
      } else if (text == 'Presell') {
        T = '抢购订单'
      } 
      return T
    },
    OrderRefundVo(text){
      let T = ''
      if (text == 'APPLYING' || text == 'PROCESSING') {
        T = '处理中'
      }else if (text == 'FAILURE_OF_REFUND') {
        T = '退款失败'
      } else if (text == 'REFUNDED') {
        T = '已退款'
      }
      return T
    },
    status(text) {
      //订单状态
      let T = ''
      if (text == 'Close') {
        T = '已关闭'
      } else if (text == 'ToPay') {
        T = '待支付'
      }else if (text == 'OutBound') {
        T = '已出库'
      } else if (text == 'ToDelivery') {
        T = '待发货'
      } else if (text == 'Delivery') {
        T = '已发货'
      } else if (text == 'Complete') {
        T = '已完成'
      } else if (text == 'InPay') {
        T = '支付中'
      } else if (text == 'ExpectDelivery') {
        T = '预发货'
      } else if (text == 'AgentSaleIn') {
        T = '代售确定中'
      } else if (text == 'AgentSaleSuccess') {
        T = '代售成功'
      } else if (text == 'AgentSaleBack') {
        T = '代售回款中'
      } else if (text == 'AgentSaleComplete') {
        T = '代售完成'
      } else if (text == 'RefundIn') {
        T = '申请退款中'
      } else if (text == 'RefundComplete') {
        T = '退款完成'
      }
      return T
    }
  }
}
</script>
<style lang="less">

.orderList {
  background: #fff;
  width: 100%;
  max-width: 100%;
  min-height: 708px;
  .noData{
    text-align: center;
    margin-top: 100px;
  }
  .orderList-title {
    padding: 50px 50px 30px 50px;
    box-sizing: border-box;
    .orderList-radio{
      float: left;
      .t-state{
        margin-bottom: 30px;
        .text{
          display: inline-block;
          position: relative;
          text-align: center;
          font-size: 18px;
          color: #666666;
          margin-right: 30px;
          span{
            position: relative;
            z-index: 20;
            font-size: 14px;
            transition: all .3s;
          }
        }
        .text.active{
          font-size: 18px;
          span{
            font-size: 18px;
            font-weight: bold;
          }
        }
        .text::before{
          content: "";
          position: absolute;
          bottom: 3px;
          left: 0;
          height: 4px;
          width: 100%;
          background: #D8CBB4;
          z-index: 10;
        }
      }
      .t-radio{
        .el-checkbox,.el-checkbox-group{
          float: left;
        }
      }
    }
    .el-form {
      height: 35px;
      float: right;
      margin-top: 40px;
    }
    .el-form-item {
      width: 250px;
      float: left;
      .el-form-item__label,
      .el-form-item__content,
      .el-input,
      .el-input__inner {
        height: 35px;
        line-height: 35px;
        border-radius: 0;
      }
    }

  }
  .tabs-main {
    background: #fff;
    padding: 0 50px;
    padding-bottom: 50px;
    .tabs-item {
      margin: 10px 0;
      margin-top: 20px;
      // height: 190px;

      .title {
        // display: flex;
        line-height: 56px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 56px;
        background: #eaeaea;
        margin-bottom: 20px;
        p {
          float: left;
          margin-right: 24px;
        }
        p.r{
          float: right;
        }
        
      }
      .tabs-view {
        overflow: hidden;
        box-sizing: border-box;
        border: none;
        // display: flex;
        position: relative;
       
        .tabs-many{
          width: 540px;
          border-right:1px solid #EAEAEA;
          box-sizing: border-box;
          padding-right: 20px;
          .tabs-many-centent{
            border-bottom:1px solid #EAEAEA;
            padding: 20px 0;
          }
          .many-img{
            width: 94px;
            height: 94px;
            float: left;
            position: relative;
            .many-layer{
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background: rgba(000, 000, 000, .3);
              // opacity: 0.3;
              z-index: 99;
              color: #fff;
              line-height: 94px;
              text-align: center;
            }
            img{width: 100%;height: 100%;}
          }
          .many-name{
            margin-left: 20px;
            float: left;
            width: 170px;
            height: 68px;
            padding-top: 20px;
            position: relative;
            p{font-size:12px;}
            .p1{
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom:20px; 
                height: 17px;
            }
            .p2{
              position: absolute;
              bottom:20px;
              left: 0;
              width: 250px;
              color: #999999;
            }
          }
          .many-price{
            float: left;
            width: 80px;
            padding-top: 20px;
            margin-left: 30px;
          }
          .many-num{
            width: 50px;
            float: left;
            padding-top: 20px;
            margin-left: 30px;
            span{margin-left: 3px;}
          }
        }
        .tabs-ope{
          width: 300px;
          // border-left: 1px solid #ccc;
          box-sizing: border-box;
          height: 140px;
          position: absolute;
          top: calc(50% - 70px;);
          right:0;
          padding:30px 30px 0 30px;
          box-sizing: border-box;
          .ope-price{
            float: left;
            // margin-top: 20px;
            .p1{font-size: 12px;color: #666666;font-weight: bold;margin-bottom:15px;}
            .p1{font-size: 12px;color: #999999;}
          }
          .ope-btn{
            float:right;
            .path{
              display: block;
              width: 100px;
              line-height: 28px;
              text-align: center;
              color: #91856F;
              margin: 5px 0;
              font-size: 12px;
              cursor: pointer;
            }
            .path.back{
              background: #C2AB82;
              color: #fff;
              border-radius: 4px;
            }
          }
        }
          .tabs-single{
    .tabs-single-centent{
      padding: 20px 0;
      .single-img{
        width: 94px;
        float: left;
        height: 94px;
        position: relative;
        .single-layer{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(000, 000, 000, .3);
          // opacity: 0.3;
          z-index: 99;
          color: #fff;
          line-height: 94px;
          text-align: center;
        }
        img{width: 100%;height: 100%;}
      }
      .single-name{
        margin-left: 20px;
        float: left;
        width: 170px;
        padding-top: 20px;
        height: 68px;
        position: relative;
        p{font-size:12px;}
        .p1{
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom:20px;
            height: 17px;
        }
        .p2{
          position: absolute;
          bottom:20px;
          left: 0;
          width: 250px;
          color: #999999;
        }
      }
      .single-price{
        float: left;
        width: 80px;
        padding-top: 20px;
        margin-left: 30px;
      }
      .single-num{
        float: left;
        width: 50px;
        padding-top: 20px;
        margin-left: 30px;
        span{margin-left: 3px;}
      }
      .single-ope{
        float: left;
        width: 80px;
        padding-top: 20px;
        margin-left: 30px;
      }
      .single-btn{
        float:right;
        margin-right: 20px;
        padding-left: 100px;
        border-left: 1px solid #EEEEEE;
        .path{
          display: block;
          width: 100px;
          line-height: 28px;
          text-align: center;
          color: #91856F;
          margin: 5px 0;
          font-size: 12px;
          cursor: pointer;
        }
        .path.back{
          background: #C2AB82;
          color: #fff;
          border-radius: 4px;
        }
      }
    }

  }
       
      }
    }
    .tabs-item.back {
      background: #f1f1f1;
    }
  }
}
</style>

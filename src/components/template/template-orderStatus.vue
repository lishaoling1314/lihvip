<template>
    <div>


        <el-steps :space="200" :active="PresellStep" align-center v-if="order.orderType=='Ordinary'">
          <!-- 抢购订单 -->
          <el-step title="提交订单" :description="order.createTime">
            <i class="el-icon createTime" slot="icon"></i>
          </el-step>
          <!-- 【付款时间】判断是否存在付款时间 -->
          <el-step :title="order.payCallBackTime?'已付款':(order.payTime?'支付中':'未支付')" :description="order.payCallBackTime" v-if="order.finishTime && !order.payCallBackTime?false:true">
            <i class="el-icon payTime-on" slot="icon" v-if="order.payCallBackTime?true:false"></i>
            <i class="el-icon payTime-off" slot="icon" v-else></i>
            <template slot="description" v-if="!order.payCallBackTime && !order.finishTime && order.status!='已关闭'">
              <div class="step-to-pay" @click="$emit('goPay')">
                 去支付
                <div class="date" v-if="order.InPay">
                  {{minutes}}:{{seconds}}
                </div>
              </div>
            </template>
          </el-step>


          <!-- 【关闭订单时间】判断不存在付款时间 && 不存在发货时间 && 关闭时间存在 -->
            <el-step title="未付款,订单已关闭" :description="order.finishTime" v-if="!order.payCallBackTime &&!order.deliveryTime && order.finishTime">
                <i class="el-icon close-on" slot="icon" v-if="order.finishTime"></i>
                <i class="el-icon close-off" slot="icon" v-else></i>
            </el-step>

            <el-step title="待发货" v-if="order.status == '待支付' || order.status == '支付中'" :description="order.outBoundTime">
                <i class="el-icon delivery-on" slot="icon" v-if="order.status=='已出库'"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>


            <el-step title="处理中" v-if="order.status == '申请退款中'" :description="order.outBoundTime">
                <i class="el-icon delivery-on" slot="icon" v-if="order.status=='已出库'"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>


            <el-step :title="order.deliveryTime && order.status == '已完成'? '已收货' :  order.deliveryTime ? '已发货' : '待发货'" :description="order.deliveryTime" v-if="order.deliveryTime">
                <i class="el-icon delivery-on" slot="icon" v-if="order.deliveryTime?true:false"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>


            <el-step :title="order.status == '待发货' ? '待发货' : '已出库'" :description="order.outBoundTime" v-if="order.status == '待发货' || order.status == '已出库'">
                <i class="el-icon delivery-on" slot="icon" v-if="order.status == '已出库'"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>


            <el-step :title="order.status == '退款完成' ? '已退款' : '已完成' "  :description="order.finishTime" v-if="!order.payCallBackTime &&!order.deliveryTime && order.finishTime?false:(order.refundApplyTime?false:true)">
                <i class="el-icon complete-on" slot="icon" v-if="order.finishTime"></i>
                <i class="el-icon complete-off" slot="icon" v-else></i>
                <div slot="description" v-if="order.deliveryTime && order.status == '已发货'" @click="$emit('confirmReceipt')"  class="step-to-pay">确认收货</div>
            </el-step> 

        </el-steps>




        

        <el-steps :space="200" :active="AgentSaleStep" align-center v-if="order.orderType=='AgentSale'">
          <!-- 代售订单 -->

          <el-step title="提交订单" :description="order.createTime">
            <i class="el-icon createTime" slot="icon"></i>
          </el-step>

          <!-- 【付款时间】判断是否存在付款时间 -->
          <el-step :title="order.payCallBackTime?'已付款':(order.payTime?'支付中':'待支付')" :description="order.payCallBackTime" v-if="order.finishTime && !order.payCallBackTime?false:true">

            <i class="el-icon payTime-on" slot="icon" v-if="order.payCallBackTime?true:false"></i>
            <i class="el-icon payTime-off" slot="icon" v-else></i>
            <template slot="description" v-if="!order.payCallBackTime && !order.finishTime?true:false">
              <div class="step-to-pay" @click="$emit('goPay')">
                 去支付
                <div class="date" v-if="order.InPay">
                  {{minutes}}:{{seconds}}
                </div>
              </div>
            </template>

          </el-step>

          <el-step :title="order.refundNumTime?'退款完成':'退款中'" :description="order.refundApplyTime" v-if="order.payCallBackTime && order.refundApplyTime">

            <i class="el-icon close-on" slot="icon" v-if="order.refundApplyTime?true:false"></i>
            <i class="el-icon close-off" slot="icon" v-else></i>

          </el-step>




          <el-step :title="order.associateManufactTime?'代售已确认':order.payCallBackTime ? '代售确定中' : '平台代售'" :description="order.associateManufactTime">
            <i class="el-icon associateManufact-on" slot="icon" v-if="order.associateManufactTime"></i>
            <i class="el-icon associateManufact-off" slot="icon" v-else></i>
          </el-step>




          <el-step :title="order.status == '代售回款中' ?'回款中':order.status == '代售完成'?'回款完成':'回款'" :description="order.agentOrderRefundTime">
            <i class="el-icon complete-on" slot="icon" v-if="order.status == '代售完成'?true:false"></i>
            <i class="el-icon complete-off" slot="icon" v-else></i>
          </el-step>

          <el-step title="已关闭" :description="order.finishTime" v-if="order.finishTime && !order.payCallBackTime? true:false">

            <i class="el-icon close-on" slot="icon" v-if="order.finishTime?true:false"></i>
            <i class="el-icon close-off" slot="icon" v-else></i>

          </el-step>

        </el-steps>


<!-- {{PresellStep}} -->
        <el-steps :space="200" :active="PresellStep" align-center v-if="order.orderType=='Presell'">
          <!-- 抢购订单 -->
          <el-step title="提交订单" :description="order.createTime">
            <i class="el-icon createTime" slot="icon"></i>
          </el-step>
          <!-- 【付款时间】判断是否存在付款时间 -->
          <el-step :title="order.payCallBackTime?'已付款':(order.payTime?'支付中':'未支付')" :description="order.payCallBackTime" v-if="order.finishTime && !order.payCallBackTime?false:true">
            <i class="el-icon payTime-on" slot="icon" v-if="order.payCallBackTime?true:false"></i>
            <i class="el-icon payTime-off" slot="icon" v-else></i>
            <template slot="description" v-if="!order.payCallBackTime && !order.finishTime && order.status!='已关闭'">
              <div class="step-to-pay" @click="$emit('goPay')">
                 去支付
                <div class="date" v-if="order.InPay">
                  {{minutes}}:{{seconds}}
                </div>
              </div>
            </template>
          </el-step>
          <!-- 【关闭订单时间】判断不存在付款时间 && 不存在发货时间 && 关闭时间存在 -->
            <el-step title="未付款,订单已关闭" :description="order.finishTime" v-if="!order.payCallBackTime &&!order.deliveryTime && order.finishTime">
                <i class="el-icon close-on" slot="icon" v-if="order.finishTime"></i>
                <i class="el-icon close-off" slot="icon" v-else></i>
            </el-step>

            <el-step title="待发货" v-if="order.status == '待支付' || order.status == '支付中'" :description="order.outBoundTime">
                <i class="el-icon delivery-on" slot="icon" v-if="order.status=='已出库'"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>
            <el-step title="处理中" v-if="order.status == '申请退款中'" :description="order.outBoundTime">
                <i class="el-icon delivery-on" slot="icon" v-if="order.status=='已出库'"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>
            <el-step :title="order.status=='预发货'?'预发货':'已出库'" v-if="order.status == '预发货' || order.status == '已出库'" :description="order.outBoundTime">
                <i class="el-icon delivery-on" slot="icon" v-if="order.status=='已出库'"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>
            <el-step :title="order.deliveryTime && order.status == '已完成'? '已收货' :  order.deliveryTime ? '已发货' : '待发货'" :description="order.deliveryTime" v-if="order.deliveryTime">

                <i class="el-icon delivery-on" slot="icon" v-if="order.deliveryTime?true:false"></i>
                <i class="el-icon delivery-off" slot="icon" v-else></i>
            </el-step>
            <el-step :title="order.status == '退款完成' ? '已退款' : '已完成' " :description="order.finishTime" v-if="!order.payCallBackTime &&!order.deliveryTime && order.finishTime?false:(order.refundApplyTime?false:true)">
                <i class="el-icon complete-on" slot="icon" v-if="order.finishTime?true:false"></i>
                <i class="el-icon complete-off" slot="icon" v-else></i>
                <div slot="description" v-if="order.deliveryTime && order.status == '已发货'" class="step-to-pay" @click="$emit('confirmReceipt')">确认收货</div>
            </el-step> 

        </el-steps>
    </div>
</template>
<script>
export default {
    data(){
        return {
            step: 1,
        }
    },
    watch:{
        'order'(){
            this.order = this.order;
        }
    },
    computed:{
        PresellStep() {
        //抢购订单
            //支付完成订单
            if (this.order.finishTime && this.order.deliveryTime && this.order.payTime) {
                return 5
            }
            //支付申请退款成功
            else if (this.order.payTime && this.order.refundApplyTime && this.order.finishTime) {
                return 5
            }
            //支付待发货
            else if (this.order.deliveryTime && this.order.payTime) {
                return 4
            }
            //订单超时关闭
            else if (!this.order.payTime && !this.order.deliveryTime && this.order.finishTime) {
                return 
            }
            //申请退款中
            else if (this.order.refundApplyTime && this.order.payTime) {
                return 3
            }
            //支付完成待发货
            else if (!this.order.deliveryTime && this.order.payTime) {
                return 2
            } //待支付
            else if (!this.order.payTime && !this.order.deliveryTime && this.order.createTime) {
                return 1
            }
        },
        AgentSaleStep() {
          //【代售订单】

          // //确定代收完成
          // if (this.order.payTime && this.order.associateManufactTime && this.order.finishTime) {
          //   return 4
          // }

          // //代售未确定已关闭
          // else if (this.order.finishTime && this.order.payTime && !this.order.associateManufactTime) {
          //   return 4
          // }

          // //订单超时关闭
          // else if (this.order.payTime && this.order.finishTime && !this.order.associateManufactTime) {
          //   return 3
          // }
          // //申请退款中
          // else if (this.order.refundApplyTime && this.order.payTime) {
          //   return 3
          // }

          // //代售确定
          // else if (this.order.associateManufactTime && this.order.payTime) {
          //   return 3
          // }
          // //支付完成待发货【代售确定中】
          // else if (this.order.payTime) {
          //   return 2
          // }
          // //待支付
          // else if (!this.order.payTime && this.order.createTime) {
          //   return 1
          // }
        },
    },
    methods:{
      goPay(){}
    },
    props:{
        order:{
            type:Object
        }
    }
}
</script>
<template>
    <div>
       <el-step title="提交订单" :description="order.createTime"></el-step>
                    <!-- 【付款时间】判断是否存在付款时间 -->
                    <el-step :title="order.payTime?'已付款':'未付款'" :description="order.payTime"></el-step>
                    <!-- 【关闭订单时间】判断不存在付款时间 && 不存在发货时间 && 关闭时间存在 -->
                    <el-step :title="!order.finishTime?'申请中':'申请退款'" :description="order.refundApplyTime" v-if="order.payTime && order.refundApplyTime?true:false"></el-step>
                    <el-step title="退款完成" :description="order.finishTime" v-if="order.payTime && order.refundApplyTime?true:false"></el-step>
                    <!-- 判断是否存在发货时间 && 存在付款时间 -->

                    <el-step :title="order.associateManufactTime?'代售确认':'代售确定中'" :description="order.associateManufactTime" v-if="!order.refundApplyTime?true:false"></el-step>

                    <el-step title="已关闭" :description="order.finishTime" v-if="order.payTime &&!order.associateManufactTime && order.finishTime&&!order.refundApplyTime?true:false"></el-step>

                    

                     <el-step :title="order.finishTime?'已回款':'未完成'" :description="order.finishTime" v-if="!order.refundApplyTime?true:false"></el-step>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            order:{},
            orderData:{},
            order:{
                createTime:'111',//下单时间
                payTime:'',//支付时间
                deliveryTime:'',//发货时间
                shenqingTime:"",//申请退款日期
                finishTime:'',//关闭时间
            },
            steps:1,
        }
    },
   
    methods:{
        init(){
            //console.log(123)
            //console.log(this.orderData)
        }
    },
    computed:{
        step(){
         //确定代收完成
            if(this.order.payTime && this.order.associateManufactTime && this.order.finishTime){
                return 4
            }


        
            //代售未确定已关闭
            else if(this.order.finishTime && this.order.payTime && !this.order.associateManufactTime){
                return 4
            }

            //订单超时关闭
            else if(this.order.payTime && this.order.finishTime && !this.order.associateManufactTime){
                return 3
            }


            //代售确定
            else if(this.order.associateManufactTime && this.order.payTime){
                return 3
            }
            //支付完成待发货【代售确定中】
            else if(this.order.payTime){
                return 2
            }
            //待支付
            else if(!this.order.payTime && this.order.createTime){
                return 1
            }
        }
    }
}
</script>
<template>
    <!-- 确认订单（普通） -->
    <div class="confirmOrder w-1000">
        <div class="order-status user-shadow">
           <div class="sale col">
                <div class="title">平台代售</div>
                <div class="sale-mai">选择平台代售，销售所得的货款和利润将转至您的钱包，如遇节假日，则顺延至下一个工作日到账。</div> 
            </div>
        </div>
        <div class="order-goods">
            <div class="goods-title">确认订单信息</div>
            <div class="goods-content">
                <div class="goods-list" v-for="(item,index) in goodsList" :key="index">
                    <div class="title">商家：{{item.manufactName}}</div>
                    <div class="goods-item">
                        <div class="menu">
                            <div class="menu-col name">商品名称</div>
                            <div class="menu-col price">单价</div>
                            <div class="menu-col num">数量</div>
                            <div class="menu-col zongji">小计</div>
                            <div style="clear:both"></div>
                        </div>
                        <div class="goods-main">
                             <div class="m-col" v-for="(itm,idx) in item.createOrderDtoList" :key="idx">
                                <div class="col-img">
                                    <img :src="itm.goods.coverImg" alt="">
                                </div>
                                <div class="col-name">
                                    <div class="name" :title="itm.goods.name">{{itm.goods.name}}</div>
                                    <div class="specs">
                                        <span>订单：代售订单</span>
                                        <span>回款时间：{{itm.goods.agentBackTime}}</span>
                                    </div>
                                    <div class="rate">
                                        <!-- <span>年化收益：{{itm.goods.rate}}%</span> -->
                                        <span>利润：¥{{item.profit}}</span>
                                        <span>周期：{{itm.goods.cycle}}天</span>
                                    </div>
                                </div>
                                <div class="col-price">¥{{itm.goods.marketPrice}}</div>
                                <div class="col-num">{{itm.num}}</div>
                                <div class="col-xiaoji">¥{{itm.total}}</div>
                                <div style="clear:both"></div>
                            </div>
                            <div class="m-coupon">
                                <div class="select">
                                    <span class="p">优惠券</span>
                                    <el-select v-model="item.targetCouponValue" @change="selectChange(item)" placeholder="请选择优惠券">
                                        <el-option style="color:#606266;font-weight:bold;" value="" label='不使用优惠券'></el-option>
                                        <el-option  v-for="(itm,index) in coupons" :key="index" :label="`加息${itm.couponRate}%`" :value="itm.receiveId" :disabled="itm.disabled"></el-option>
                                    </el-select>
                                </div>
                                <div class="t" v-if="item.itemProfit && item.itemProfit > 0">加息¥{{item.itemProfit}}</div>
                                <div style="clear:both"></div>
                            </div>
                            <div class="m-note">
                                <div class="note-content">
                                    <div class="p">备注：</div>
                                    <input  placeholder="在此输入备注,限50字符(选填）" class="input" v-model="item.remark" @change="inputChange" max="50"/>
                                    <div class="text"><!-- 店铺合计 -->
                                        <p>店铺合计<span>¥{{item.toTal}}</span></p>
                                        <p class="p2">共获得代售利润¥{{item.profit}}</p>
                                    </div>
                                    <div style="clear:both"></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="goods-stati">
                <div class="stati-r">
                    <div class="b">
                        <span>实付款</span>
                        <span class="c"><i>¥</i>{{Total}}</span>
                    </div>
                    <div class="r">代售成功共获得代售利润¥{{allProfit}}</div>
                </div>
            </div>
            <div style="clear:both"></div>
            <div class="pay-tap" @click="payTap">提交订单</div>
            <div style="clear:both"></div>
        </div>
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
export default {
    data(){
        return {
            goodsList:[],//商品数据
            coupons:[],//优惠券
            interest:'',//代售可获得利润
            Total:'',//实付款
            disabledArr:[],//已使用优惠券
        }
    },
    watch: {
        $route() {
            this.loading.close();
            this.isAddress = false;
        }
    },
    computed:{
        allProfit(){
            let T = 0;
            this.goodsList.map(item=>{
                T = T + item.profit
            })
            return toDecimal(T)
        }
    },
    mounted(){
        this.loading = this.$loading({ text: "数据加载中，请稍后..." });

        this.createOrder(this.$store.state.orderList);
    },
    methods:{
        selectChange(item){//选择优惠券
            // console.log(item)
            
            if(item.couponId){//当前商品优惠券
                this.coupons.map(itm=>{
                    if(itm.receiveId == item.couponId){//优惠券数组ID和当前商品ID
                        itm.disabled = false
                    }
                })
            }
            

            this.coupons.map(itm=>{

                if(itm.receiveId == item.targetCouponValue){

                    itm.disabled = true

                }
            })

            
            

            item.couponId = item.targetCouponValue;//当前商品绑定优惠券ID





            let Arr = [{
                goodsId:item.createOrderDtoList[0].goodsId,
                periodId:item.createOrderDtoList[0].periodId,
                num:item.createOrderDtoList[0].num,
                couponId:item.targetCouponValue,
            }]
            
            
            // return 
            this.$post('/user/goodsDiscount.do',Arr).then(({data})=>{
                // console.log(item.createOrderDtoList[0].goodsId)
                if(data.code == '0000'){
                   
            
                    this.goodsList.map(itm=>{
                            if(item.createOrderDtoList[0].goodsId == itm.createOrderDtoList[0].goodsId && item.createOrderDtoList[0].periodId == itm.createOrderDtoList[0].periodId){

                                itm.couponRate = data.rate;
                                itm.profit = data.totalProfit;
                                itm.itemProfit = data.profit;
                                // console.log(itm)
                            }
                        })
                    // this.goodsList = this.goodsList
                }
                
            })
        },
        inputChange(e){//监听备注
            let v = e.srcElement.value;
            //遍历商品列表，动态加remark
            this.goodsList.map(item=>{
                item.remark = v
            })
        },
        createOrder(list) {//创建订单
            this.$post("/user/createOrder.do",list).then(({ data }) => {


                if (data.code == "0000") {

                data.createOrderVoList.map(item=>{
                    item.targetCouponValue = ''
                })
                this.goodsList = data.createOrderVoList;

                this.Total = data.Total;//实付款


                
                this.availableCouponList();//执行优惠券列表
                }else{
                    this.$router.push('/goodsList')
                }
                this.loading.close();
            });
        },
        availableCouponList() {//获取最优优惠券
            //backup
            this.$post("/goods/userCoupon.do", this.$store.state.orderList).then(({ data }) => {
                if (data.code == "0000") {


                    // data.coupons = data.coupons.splice(1,data.coupons.length)
                    // couponsAll = data.coupons;


                    
                    this.coupons = data.coupons;
                    this.coupons.map(item=>{
                        item.disabled = false
                    })
                    if(data.coupons.length) {
                        let item = data.coupons[0];
        
                        // this.disabledArr.push(item.receiveId)

                       

                        
                    } else {
                        this.targetCoupon = '请选择优惠券';
                    }
                    
                    this.$forceUpdate();//强制刷新

                }
            });
        },
         payTap(){
            
            let Arr = [];
            this.goodsList.map(i=>{
                i.createOrderDtoList.map(item=>{
                    Arr.push({
                        cartId:item.cartId,
                        goodsId:item.goodsId,//商品ID
                        num:item.num,//商品数量
                        remark:i.remark || '',//商品/店铺备注
                        periodId:item.periodId,//收货地址ID
                        couponId:i.couponId
                    })

                })
            })





            
            this.$post('/user/submitOrder.do',Arr).then(({data})=>{
                if(data.code == '0000'){
                    this.loading = this.$loading({ text: "订单正在提交，请稍后..." });


                    let Arr = [];
                    data.order.map((item)=>{
                        Arr.push({
                            orderId:item.id,//订单ID
                            orderNumber:item.orderNumber,//订单号
                            availableFund:data.userAccount.availableFund,//用户可用余额
                            sum:data.sum//需支付金额
                        })
                    })

                //    console.log(Arr)
                    this.$store.commit('handPayList',Arr)
                    setTimeout(()=>{
                        this.loading.close();
                        this.$router.push('/payment');
                        // let routeData = this.$router.resolve({path: "/payment"});
                        //  window.open(routeData.href, '_blank');
                    },500)
                }
            })
        },
    }
}
</script>
<style lang="less">
    .el-select-dropdown__item.selected.is-disabled{
       span{
           color:#ccc;
       }
    }
</style>
<style lang="less" scoped>
.order-status {
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  margin-top: 50px;
  padding: 0; 
  .sale{
      .title{
        color: #333;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 30px;
        padding: 50px 30px 0 50px;
      }
      .sale-mai{
        color: #666;
        font-size: 16px;
        padding: 0 50px 50px;
        .mai-icon{
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
      }
  }
}
.order-goods{
    background: #fff;
    padding: 50px;
    box-sizing: border-box;
    .goods-title{
        color: #333333;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 30px;
        
    }
    .goods-list{
        margin-bottom: 30px;
        .title{
            color: #666666;
            font-weight: bold;
            font-size:14px;
            margin-bottom: 20px;
        }
        .goods-item{
            .menu{
                background:rgba(240,242,245,1);
                height:48px;
                line-height: 48px;
                .menu-col{
                    font-size: 12px;
                    color: #666666;
                    float: left;
                    box-sizing: border-box;
                }
                .menu-col.name{width: 400px;padding-left: 140px};
                .menu-col.price{width: 130px;padding-left: 20px;};
                .menu-col.num{width: 240px;text-align:center;};
                .menu-col.zongji{width: 130px;padding-left: 20px;};
            }
            .goods-main{
                .m-col{
                    padding:25px 20px 50px 20px;
                    box-sizing: border-box;
                    border-bottom: 1px dashed rgba(238,238,238,1);
                    .col-img{
                        width: 100px;
                        height: 100px;
                        float: left;
                        img{max-width: 100px;max-height:100px; }
                    }
                    .col-name{
                        width: 280px;
                        float: left;
                        padding: 0 20px;
                        box-sizing: border-box;
                        position: relative;
                        .name{
                            margin-top: 20px;
                            line-height: 30px;
                            height: 30px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                        .specs{
                            margin-top: 10px;
                            color: #999999;
                            font-size: 12px;
                            position: absolute;
                            width: 400px;
                            top:40px;
                            left: 20px;
                            span{
                                margin-right: 10px;
                            }
                        }
                        .rate{
                            margin-top: 10px;
                            color: #999999;
                            font-size: 12px;
                            position: absolute;
                            width: 400px;
                            top:80px;
                            left: 20px;
                            span{
                                margin-right: 10px;
                                border:1px solid #D9D9D9;
                                font-size: 12px;
                                color: #999999;
                                padding: 5px 20px;
                                border-radius: 5px;
                                display: inline-block;
                            }
                        }
                    }
                    .col-price{
                        float: left;
                        width: 130px;
                        margin-top: 20px;
                        line-height: 30px;
                        padding-left: 20px;
                        box-sizing: border-box;
                        font-weight: bold;
                    }
                    .col-num{
                        float: left;
                        width: 240px;
                        padding-top: 20px;
                        box-sizing: border-box;
                        line-height: 30px;
                        text-align: center;
                    }
                    .col-xiaoji{
                        width: 110px;
                        float: left;
                        padding-left: 20px;
                        padding-top: 20px;
                        line-height: 30px;
                        box-sizing: border-box;
                        color: #91856F;
                        font-weight: bold;
                    }
                }
                .m-coupon{
                    padding-top: 20px;
                    padding-bottom: 50px;
                    box-sizing: border-box;
                    padding-left: 140px;
                    .select{
                        float: left;
                        .p{margin-right: 20px;}
                    }
                    .t{
                        float: right;
                        margin-right: 50px;
                        color: #91856F;
                        line-height: 40px;
                    }
                }
                .m-note{
                    width: 100%;
                    padding: 22px 70px 0 20px;
                    box-sizing: border-box;
                    height: 90px;
                    background: #F0F2F5;
                    .note-content{
                        height: 46px;
                        width: 100%;
                        line-height: 46px;
                        .p{float: left;color: #666666;font-size: 14px;}
                        .input{
                            float: left;
                            margin-left: 10px;
                            width: 460px;
                            height: 46px;
                            border:none;
                            padding: 0 10px;
                            box-sizing:border-box;
                            font-size: 12px;
                            background: #fff;
                            outline: none;
                            color: #999999;
                        }
                        .text{
                            float: right;
                            color: #999999;
                            font-size: 12px;
                            p{
                                line-height: 26px;
                                span{
                                    margin-left: 10px;
                                    font-size: 14px;
                                    color: #91856F;
                                    font-weight: bold;
                                }
                            }
                            .p2{color: #91856F;font-size: 14px;}
                        }
                    }
                }
            }
        }
    }
    .goods-stati{
        width: 370px;
        float: right;
        height: 160px;
        border:2px solid #C2AB82;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 20px 30px;
        .stati-r{
            .b{
                color: #999999;
                margin-top: 20px;
                text-align: right;
                span{
                    margin:0 10px;
                }
                .c{
                    color: #91856F;
                    font-size: 18px;
                    font-weight: bold;
                    i{
                        font-size: 12px;
                    }
                }
            }
            .r{
                text-align: right;
                color: #91856F;
                margin-top: 10px;
            }
        }
    }
    .pay-tap{
        width: 163px;
        height: 44px;
        background: #C2AB82;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 44px;
        margin-top:10px;
        float: right;
        cursor: pointer;
        border-radius: 4px;
    }
}
</style>


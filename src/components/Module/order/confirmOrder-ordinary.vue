<template>
    <!-- 确认订单（普通） -->
    <div class="confirmOrder w-1000">
        <div class="order-status user-shadow">
            <div class="address col">
                <div class="title">
                    选择收货地址 
                    <div class="add-address"  @click="isAddress = true">+创建收货地址</div>
                    <div style="clear:both"></div>
                </div>
                <div class="address-main">
                    <div class="col"  v-for="(item,index) in isaddresss?alladdressList:addressList" :key="index"  @click="addressTap(item.id)">
                        <div class="col-centent">
                        <div :class="item.isDefault=='YES'?'col-radio col-v active':'col-radio col-v'"><div class="radio-t"></div></div>
                        <div class="name col-v" :title="item.recipients">{{item.recipients}}</div>
                        <div class="phone col-v">{{item.iphone}}</div>
                        <div class="dizhi col-v" :title="item.regionName+item.detailed">{{item.dizhi}}</div>
                        <div class="col-modify col-v" v-if="item.isDefault=='YES'" @click="modifyAddress(item.id)">修改地址</div>
                        <div style="clear:both"></div>
                        </div>
                    </div>
                    <div style="clear:both"></div>
                </div>
                <div class="addressopen" @click="isaddresss = !isaddresss" v-if="alladdressList.length>4">{{isaddresss?'收起':'展开'}}地址<i class="b" v-if="!isaddresss"></i><i class="t" v-else></i></div>
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
                                        <span>订单：抢购订单</span>
                                        <span>发货时间：{{itm.goods.deliveryDeliverTime}}</span>
                                        <span>规格：{{itm.spec}}</span>
                                    </div>
                                </div>
                                <div class="col-price">
                                    
                                    <span class="vipbox">
                                    VIP
                                    </span>
                                    ¥{{itm.goods.salePrice}}
                                </div>
                                <div class="col-num">{{itm.num}}</div>
                                <div class="col-xiaoji">¥{{itm.total}}</div>
                                <div style="clear:both"></div>
                            </div>
                            <div class="m-freight">
                                <div class="title">运费</div>
                                <div class="text">¥{{item.feight}}</div>
                                <div style="clear:both"></div>
                            </div>
                            <div class="m-note">
                                <div class="note-content">
                                    <div class="p">备注：</div>
                                    <input  placeholder="在此输入备注,限50字符(选填）" class="input" v-model="item.remark" max="50"/>
                                    <div class="text">
                                        店铺合计
                                        <span>¥{{item.toTal}}</span>
                                    </div>
                                    <div style="clear:both"></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="goods-stati">
                <div class="stati-l">
                    <div class="l-coupon">
                        <div class="title">优惠券</div>
                        <div class="select">
                            <el-select v-model="targetCoupon" @change="changeSelect">
                                <el-option style="color:#606266;font-weight:bold;" value="" label='不使用优惠券'></el-option>
                                <el-option  v-for="(item,index) in coupons" :key="index" :label="item.type == 'DISCOUNT' ? `满${item.couponBuyAmount}打${item.couponDiscount}折` : item.type=='AMOUNT' ?`满${item.couponBuyAmount}减${item.couponAmount}` : item.type == 'NO' ? `无门槛减${item.couponAmount}` : '不使用优惠券'" :value="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="l-address">
                        <div class="t">
                            <p>{{addressActive.recipients}}</p>
                            <p>{{addressActive.phone}}</p>
                        </div>
                        <p :title="addressActive.regionName + addressActive.detailed" class="p">{{addressActive.regionName}}{{addressActive.detailed}}</p>
                    </div>
                </div>
                <div class="stati-r">
                    <div class="t" v-if="couponPrice">-¥{{couponPrice}}</div><!-- 优惠券 -->
                    <div class="b">
                        <span>实付款</span><!-- 商品金额 * 数量 + 运费  -->
                        <span class="c">
                            <i>¥</i>
                            {{Total}}
                        </span>
                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
             <div class="pay-tap" @click="payTap">提交订单</div>
             <div style="clear:both"></div>
        </div>
        <el-dialog :visible.sync="isAddress" width="617px"><!-- 收货地址 -->
            <template-address @successAddress="closeLaterAddress" ref="templateAddress" v-if="isAddress"></template-address>
        </el-dialog>
    </div>
</template>
<script>
import templateAddress from "@/components/user/module/template-address";
import Qs from 'qs';
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            isAddress:false,//创建收货地址
            addressList: [], //收货地址
            alladdressList: [], //所有收货地址
            addressActive:{},//当前选中收货地址
            isaddresss: false, //是否展开收货地址
            targetCoupon:'',//优惠券类型
            coupons:[],//优惠券
            goodsList:[],//商品列表
            Total:'',//实付款
            Coupon:'',//优惠券
            addressId:'',//选中收货地址
            receiveId:'',//优惠券ID
        }
    },
    watch: {
        $route() {
            this.loading.close();
            this.isAddress = false;
        }
    },
    computed:{
        couponPrice(){//优惠券减免金额
            return this.Coupon == undefined ? '0' : this.Coupon
        }
    },
    components: { templateAddress },
    mounted(){
        this.loading = this.$loading({ text: "数据加载中，请稍后..." });
        this.createOrder(this.$store.state.orderList);
    },
    methods:{
        changeSelect(coupon){//选择优惠券
            

            let Arr = [];
            this.goodsList.map(item=>{
                item.createOrderDtoList.map(itm=>{
                    Arr.push({
                        goodsId:itm.goodsId,
                        num:itm.num,
                        spec:itm.spec,
                        couponId:coupon.receiveId || ''
                    })
                })
            })
            this.receiveId = coupon.receiveId
            this.$post('/user/goodsDiscount.do',Arr).then(({data})=>{
                if(data.code == '0000'){
                    this.Coupon = coupon.actualCouponAmount;
                    this.Total = data.total
                    // alert(coupon.type)
                    this.targetCoupon = coupon.type == 'DISCOUNT' ? `满${coupon.couponBuyAmount}打${coupon.couponDiscount}折` : coupon.type=='AMOUNT' ?`满${coupon.couponBuyAmount}减${coupon.couponAmount}` : coupon.type == 'NO' ? `无门槛减${coupon.couponAmount}` : '不使用优惠券'
                }
            })
            
            
            // console.log(coupon)
        },
        modifyAddress(id) {//修改当前地址
            this.isAddress = true;
            this.loading = this.$loading({ text: "数据加载中，请稍后..." });

            this.alladdressList.map(item => {
                if (id == item.id) {
                this.$nextTick(() => {
                    this.$refs.templateAddress.init(item);
                });
                this.loading.close();
                }
            });

        },
        closeLaterAddress() {//收货地址操作成功回调
            this.isAddress = false;
            this.createOrder(this.$store.state.orderList);
        },
        addressTap(id) {//选择收货地址
            let data = this.isaddresss ? this.alladdressList : this.addressList;
            data.length == 2
                ? this.alladdressList.map(item => (item.isDefault = "NO"))
                : this.addressList.map(item => (item.isDefault = "NO"));
            data.map(item => {
                item.isDefault = "NO";
                if (item.id == id) {
                // console.log(item);
                this.addressActive = item
                item.isDefault = "YES";
                this.addressId = item.id;
                }
            });
        },
        createOrder(list) {//创建订单
            this.$post("/user/createOrder.do",list).then(({ data }) => {

                // console.log(data)
                this.loading.close();
                if (data.code == "0000") {

                    
                    data.createOrderVoList.map( item => item.remark = '')
                    this.goodsList = data.createOrderVoList;

                    




                    




                    if (data.address.length >= 1) {
                        //收货地址


                        //判断是否存在默认地址
                        //YES --->  默认地址
                        //NO  ----> 第一条 
                        if(data.address.find(item => item.isDefault === 'YES')){

                            this.addressId = data.address.find(item => item.isDefault === 'YES').id;

                        }else{

                            this.addressId = data.address[0].id;

                        }



                       

                        this.addressList = data.address.slice(0, 4);
                        this.alladdressList = data.address;


                        data.address.map(item => item.isDefault == 'YES' ? this.addressActive = item : '' );

                        this.addressList.map(item => {
                            item.iphone = item.phone;
                            if (item.regionName + item.detailed.length >= 30) {
                                item.dizhi = (item.regionName + item.detailed).slice(0, 30) + "...";
                            } else {
                                item.dizhi = item.regionName + item.detailed;
                            }
                        });

                        this.alladdressList.map(item => {
                        item.iphone = item.phone;
                            if ((item.regionName + item.detailed).length >= 30) {
                                item.dizhi =
                                (item.regionName + item.detailed).slice(0, 30) + "...";
                            } else {
                                item.dizhi = item.regionName + item.detailed;
                            }
                        });
                    }

                    this.Total = data.Total
                    this.availableCouponList();//执行优惠券列表
                }
            });
        },
        availableCouponList() {//获取最优优惠券
            //backup
            this.$post("/goods/userCoupon.do", this.$store.state.orderList).then(({ data }) => {
                if (data.code == "0000") {

                    this.coupons = data.coupons;
                    if(data.coupons.length) {
                        this.receiveId = data.coupons[0].receiveId;
                        this.Coupon = data.coupons[0].actualCouponAmount;
                        let item = data.coupons[0]
                        this.changeSelect(data.coupons[0]);//默认第一张
                        // alert(item.type)
                        this.targetCoupon = item.type == 'DISCOUNT' ? `满${item.couponBuyAmount}打${item.couponDiscount}折` : item.type=='AMOUNT' ?`满${item.couponBuyAmount}减${item.couponAmount}` : item.type == 'NO' ? `无门槛减${item.couponAmount}` : '不使用优惠券'
                    } else {
                        this.targetCoupon = '请选择优惠券';
                    }





                    this.$forceUpdate();//强制刷新
 
                }
            });
        },
        payTap(){//提交支付
            // console.log(this.goodsList)
            if (this.$point.isNull(this.addressId)) {
                this.$message({ title: '错误', message: '请添加收货地址！', type: 'error' })
                return
            }

            let Arr = [];
            this.goodsList.map(i=>{
                i.createOrderDtoList.map(item=>{
                    Arr.push({
                        cartId:item.cartId,
                        goodsId:item.goodsId,//商品ID
                        num:item.num,//商品数量
                        remark:i.remark,//商品/店铺备注
                        spec:item.spec,//商品规格
                        addressId:this.addressId,//收货地址ID
                        couponId:this.receiveId
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
                            orderNumber:typeof item.orderNumber == 'string' ? item.orderNumber : '',//只接受单个订单号
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

<style lang="less" scoped>
.order-status {
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  margin-top: 50px;
  padding: 0; 
  .col{
    .title{
      color: #333333;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 30px;
      padding: 50px 30px 0 50px;
      .add-address{
        font-size: 14px;
        color: #333333;
        display: inline-block;
        float: right;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
      }
      .add-address:hover{
        color: #91856F;
      }
    }
  }
  .address{
    background: #fff;
    padding-bottom: 50px;
    position: relative;
    .address-main{
      .col{
        padding: 15px 0;
        box-sizing: border-box;
        border:1px solid  #fff;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        .col-centent{
          padding: 0 50px;
          box-sizing: border-box;
          .col-radio{
            width: 20px;
            height: 20px;
            background: #fff;
            border:1px solid #CCCCCC;
            padding: 3px;
            box-sizing: border-box;
            border-radius: 50%;
            .radio-t{
              background: #fff;
              width: 12px;
              height: 12px;
              margin: 0 auto;
              border-radius: 50%;
            }
          }
          .col-radio.active{
            border:1px solid #91856F;
            .radio-t{
             background: #91856F;
            }
          }
          .col-v{
            float: left;
            margin-right: 20px;
            font-size: 14px;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .col-modify{float: right;margin-right: 0;border-left: 1px solid #EEEEEE;padding-left: 30px;cursor: pointer;position: relative;}
          .col-modify::before{
            content: '';
            height: 14px;
            width: 14px;
            position: absolute;
            left:10px;
            top: 3px;
            background: url(../../../assets/img/modify-address.png) no-repeat;
            background-size: 14px 14px;
          }
          .col-modify:hover{
              color: #91856F;
          }
          .name{color:#666666;font-weight:bold;width: 100px;}
          .phone{color:#666666;font-weight:bold;width: 110px;}
        }
      }
      .col:hover{
        border-top: 1px solid #91856F;
        border-bottom: 1px solid #91856F;
      }
      .col:nth-child(odd){
        box-shadow:0px 0px 50px 0px rgba(240,242,245,.2);
      }
      .col:nth-child(even){
        
        box-shadow:0px 0px 50px 0px rgba(153,153,153,.2); 
      }
    }
    .addressopen {
      color: #666;
      margin-left: 50px;
      margin-top: 20px;
      display: inline-block;
      margin-right: 50px;
      left: calc(50% - 60px);
      text-align: center;
      color: #999999;
      cursor: pointer;
      bottom: 0;
      width: 60px;
      position: absolute;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      i{
        width: 25px;
        height: 20px;
        background: url(../../../assets/img/allAddress.png) no-repeat;
        background-size:100% 100%;
        display: block;
        margin: 0 auto;
      }
      i.t{transform:rotate(180deg);}
    }
    .addressopen:hover{
      color: #91856F;
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
                    padding:25px 20px;
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
                    }
                    .col-price{
                        float: left;
                        width: 130px;
                        margin-top: 20px;
                        line-height: 30px;
                        padding-left: 20px;
                        box-sizing: border-box;
                        font-weight: bold;
                        .vipbox{          
                            background:url(../../../assets/img/huiy.png) no-repeat;
                            width: 50px;
                            height: 18px;
                            text-align: center;
                            line-height: 18px;
                            color: #FFF;
                            font-size:12px;
                            font-family:Adobe Heiti Std;
                            font-weight:normal;
                            margin: 10px 0 0 0;
                            padding-left: 12px;
                            display: inline-block;
                        }
                    }
                    .col-num{
                        float: left;
                        width: 240px;
                        padding-top: 20px;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    .col-xiaoji{
                        width: 110px;
                        float: left;
                        padding-left: 20px;
                        padding-top: 20px;
                        box-sizing: border-box;
                        color: #91856F;
                        font-weight: bold;
                    }
                }
                .m-freight{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    padding: 0 100px;
                    box-sizing: border-box;
                    .title{float: left;}
                    .text{float: right;}
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
                            span{
                                margin-left: 10px;
                                font-size: 14px;
                                color: #91856F;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
    .goods-stati{
        width: 100%;
        height: 160px;
        border:2px solid #C2AB82;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 20px 30px;
        .stati-l{
            float: left;
            width: 300px;
            .l-coupon{
                margin-bottom: 20px;
                .title{margin-right: 20px;}
                .title,.select{display: inline-block;}
            }
            .l-address{
                color: #666666;
                font-size: 14px;
                .t{
                    margin-bottom: 20px;
                    p{
                        display: inline-block;
                        color: #666666;
                        font-weight: bold;
                    }
                    p:nth-child(2){margin-left: 20px;}
                }
                .p{
                    display: -webkit-box;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .stati-r{
            float: right;
            .t{
                color: #666666;
                display: inline-block;
                padding-left: 50px;
                margin-top: 10px;
                box-sizing: border-box;
            }
            .b{
                color: #999999;
                margin-top: 20px;
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


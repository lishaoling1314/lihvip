<template>
  <div class="cart-centent w-1000">
    <div class="cart-menu" v-if="isNodata" id="cart-menu">
      
      <div class="menu-col" style="width:420px;text-align:left;padding-left:10px;">商品信息</div>
      <div class="menu-col" style="width:100px;text-align:center;">单价</div>
      <div class="menu-col" style="width:200px;text-align:center;">数量</div>
      <div class="menu-col" style="width:139px;text-align:center;">金额</div>
      <div class="menu-col" style="width:40px;text-align:center;">操作</div>
    </div>
    <div class="cart-main">




<!-- %  %  %  %  %  %  %  %  %  % 限时抢购 %  %  %  %  % %  %  %  %  % %  %  %  %  % -->



      <div class="cart-view" v-if="presellList.length">
        <div class="title">限时抢购</div>
        <div :class="!item.goodsSpec?'view-col red':'view-col'" v-for="(item,index) in presellList" :key="index">
          <div class="col checkbox" style="width:50px;">
            <el-checkbox v-model="item.isPick" @change="checkedChange(item.id,item.isPick,'PRESELL')" v-if="item.goodsSpec && (item.activityStatus == 'PROCEEDING' || item.activityStatus == 'SELL_WELL')"></el-checkbox>
            
            <!-- <div class="yure" v-if="!item.goodsSpec">无货</div> -->
            <div class="yure" v-if="item.activityStatus == 'PREHEAT'">预热</div>
            
          </div>
          <div class="col img" style="width:100px;" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.goodsId,ab:'path',activityType:'PRESELL'}})">
            <img :src="item.goodsPicUrl"/>
          </div>
          
          <div class="col name" style="width:280px;">

            <p class="p1" v-if="item.activityStatus == 'ACTIVITY_TERMINATION'">活动结束</p>
            <p class="p1" v-if="item.activityStatus=='SELL_WELL' || item.activityStatus=='PREHEAT'">{{item.activityStatus=='PREHEAT'?'活动开始时间：':'活动结束时间：'}}{{item.date.days}}天{{item.date.hours}}时{{item.date.minutes}}分{{item.date.seconds}}秒</p>
            
            <p class="p2" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.goodsId,ab:'path',activityType:'PRESELL'}})">{{item.goodsName}}</p>
            
            <!-- {{item.activityStatus}} -->
            <div class="select">
              <el-select v-model="item.goodsSpec" placeholder="请选择" @change="editCart(item.id,item.goodsId,item.goodsSpec,'')" :disabled="item.activityStatus == 'ACTIVITY_TERMINATION'">
                <el-option
                  v-for="(item,index) in item.specJson"
                  :key="index"
                  :label="item.specs"
                  :value="item.specs"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="col price" style="width:100px;">
            ¥{{item.goodsSalePrice}}
            <span class="vipbox">
              VIP
            </span>
          </div>
          <div class="col num" style="width:205px;">
            <el-input-number
              v-model="item.goodsNum"
              @change="changeNum(item.id,item.goodsNum)"
              :min="1"
              :max="99"
              label="描述文字"
              :precision="0"
              :disabled="!item.goodsSpec || item.activityStatus == 'ACTIVITY_TERMINATION'"
            ></el-input-number>
          </div>
          <div class="col money" style="width:135px;">¥{{SalePrice(item.goodsSalePrice,item.goodsNum)}}</div>
          <div class="col ope" style="width:40px;" @click="removeCart(item.id,item.activityStatus)">删除

          </div>
          <div style="clear:both"></div>
        </div>
      </div>




<!-- %  %  %  %  %  %  %  %  %  %  % 平台代售 %  %  %  % %  %  %  %  % %  %  %  %  % -->



      <div class="cart-view" v-if="agentSaleList.length">
        <div class="title">平台代售</div>
        <div :class="!item.goodsDay?'view-col red':'view-col'" v-for="(item,index) in agentSaleList" :key="index">
          <div class="col checkbox" style="width:50px;">
            <el-checkbox v-model="item.isPick" @change="checkedChange(item.id,item.isPick,'AGENT_SALE')" v-if="item.goodsDay && (item.activityStatus == 'PROCEEDING' || item.activityStatus == 'SELL_WELL')"></el-checkbox>
            <!-- <div class="yure" v-if="!item.goodsDay">无货</div> -->
            <div class="yure" v-if="item.activityStatus == 'PREHEAT'">预热</div>
          </div>
          <div class="col img" style="width:100px;" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.goodsId,periodId:item.periodId,activityType:'AGENT_SALE'}})">
            <img :src="item.goodsPicUrl"/>
            <!-- {{item.activityStatus}} -->
          </div>
          <div class="col name" style="width:280px;">
            <p class="p1" v-if="item.activityStatus == 'ACTIVITY_TERMINATION'">活动结束</p>
            <p class="p1" v-if="item.activityStatus=='SELL_WELL' || item.activityStatus=='PREHEAT'">{{item.activityStatus=='PREHEAT'?'活动开始时间：':'活动结束时间：'}}{{item.date.days}}天{{item.date.hours}}时{{item.date.minutes}}分{{item.date.seconds}}秒</p>
            <p class="p2" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.goodsId,periodId:item.periodId,activityType:'AGENT_SALE'}})">{{item.goodsName}}</p>
            <div class="select">
              <el-select v-model="item.goodsDay" placeholder="请选择" @change="editCart(item.id,item.goodsId,'',item.goodsDay)" :disabled="item.activityStatus == 'ACTIVITY_TERMINATION'">
                <el-option
                  v-for="(item,index) in item.periodList"
                  :key="index"
                  :label="item.periodName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="col price" style="width:100px;">¥{{item.goodsMarketPrice}}</div>
          <div class="col num" style="width:205px;">
            <el-input-number
              v-model="item.goodsNum"
              @change="changeNum(item.id,item.goodsNum)"
              :min="1"
              :max="99"
              label="描述文字"
              :precision="0"
              :disabled="!item.goodsDay || item.activityStatus == 'ACTIVITY_TERMINATION'"
            ></el-input-number>
          </div>
          <div class="col money" style="width:135px;">¥{{SalePrice(item.goodsMarketPrice
            ,item.goodsNum)}}</div>
          <div class="col ope" style="width:40px;" @click="removeCart(item.id,item.activityStatus)">删除</div>
          <div style="clear:both"></div>
        </div>
      </div>




<!-- %  %  %  %  %  %  %  %  %  % 普通商品 %  %  %  %  % %  %  %  %  % %  %  %  %  % -->




      <div class="cart-view" v-if="ordinaryList.length">
        <div class="title">普通商品</div>
        <div :class="!item.goodsSpec?'view-col red':'view-col'" v-for="(item,index) in ordinaryList" :key="index">
          <div class="col checkbox" style="width:50px;">
            <el-checkbox v-model="item.isPick" @change="checkedChange(item.id,item.isPick,'ORDINARY')" v-if="!item.isStart && item.goodsSpec"></el-checkbox>
            <!-- {{item.isPick}} -->
            <!-- <div class="yure" v-if="!item.goodsSpec">无货</div> -->
            <div class="yure" v-if="item.isStart">预热</div>
          </div>
          <div class="col img" style="width:100px;" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.goodsId,activityType:'ORDINARY'}})">
            <img :src="item.goodsPicUrl"/>
          </div>
          <div class="col name" style="width:280px;">
            <p class="p2" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.goodsId,activityType:'ORDINARY'}})">{{item.goodsName}}</p>
            <div class="select">
              <el-select v-model="item.goodsSpec" placeholder="请选择" @change="editCart(item.id,item.goodsId,item.goodsSpec,'')" :disabled="item.isStart">
                <el-option
                  v-for="(item,index) in item.specJson"
                  :key="index"
                  :label="item.specs"
                  :value="item.specs"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="col price" style="width:100px;">¥{{item.goodsSalePrice}}</div>
          <div class="col num" style="width:205px;">
            <el-input-number
              v-model="item.goodsNum"
              @change="changeNum(item.id,item.goodsNum)"
              :min="1"
              :max="99"
              label="描述文字"
              :precision="0"
              :disabled="item.isStart"
            ></el-input-number>
          </div>
          <div class="col money" style="width:135px;">¥{{SalePrice(item.goodsSalePrice,item.goodsNum)}}</div>
          <div class="col ope" style="width:40px;" @click="removeCart(item.id,item.activityStatus)">删除</div>
          <div style="clear:both"></div>
        </div>
      </div>




 <!-- %  %  %  %  %  %  %  %  %  % 失效商品 %  %  %  %  % %  %  %  %  % %  %  %  %  % -->



      <div class="cart-view" v-if="loseEfficacyList.length">
        <div class="title">失效商品</div>
        <div class="view-col" v-for="(item,index) in loseEfficacyList" :key="index">
          <div class="col checkbox" style="width:50px;">
            <div class="yure">失效</div>
          </div>
          <div class="col img" style="width:100px;">
            <img :src="item.goodsPicUrl" />
          </div>
          <div class="col name" style="width:280px;">
            <p class="p2">{{item.goodsName}}</p>
             <!-- <div class="select">
              <el-select v-model="item.goodsSpec" placeholder="请选择" @change="editCart(item.id,item.goodsId,item.goodsSpec,'')" :disabled="true">
                <el-option
                  v-for="(item,index) in item.specJson"
                  :key="index"
                  :label="item.specs"
                  :value="item.specs"
                ></el-option>
              </el-select>
            </div> -->
          </div>
          <div class="col price" style="width:100px;">¥{{item.goodsSalePrice}}</div>
          <div class="col num" style="width:205px;">
            <el-input-number
              v-model="item.goodsNum"
              @change="editCart(item.id,item.goodsId,item.goodsNum,'',item.goodsSpec)"
              label="描述文字"
              :disabled="true"
            ></el-input-number>
          </div>
          <div class="col money" style="width:135px;">¥{{SalePrice(item.goodsSalePrice,item.goodsNum)}}</div>
          <div class="col ope" style="width:40px;" @click="removeCart(item.id,item.activityStatus)">删除</div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>



 <!-- %  %  %  %  %  %  %  %  %  % %  %  %  %  % %  %  %  %  % %  %  %  %  % -->



    <div class="cart-floatbar" v-if="isNodata" id="cartFloatbar">
      <div class="floatbar-ope">
        <div class="ope-che" v-if="moreveList.length && allChecked">
          <el-checkbox v-model="allChecked" @change="handleCheckAllChange ">已选（{{cartNum}}）</el-checkbox>
        </div>
        <div class="ope-modify" @click="removeCart(moreveList)" v-if="moreveList.length && allChecked">删除所选商品</div>
      </div>
      <div class="floatbar-pay">
        <div class="comm-right">
          <div class="price">
            <div class="p">
              合计：
              <span class="c">¥{{cartVo.goodsTotalPrice}}</span>
            </div>
            <div class="p">
              <span>商品金额：¥{{cartVo.goodsTotalMarket}}</span>
              <span v-if="isType != 'AGENT_SALE' && cartVo.discountPrice > 0">优惠：¥{{cartVo.discountPrice}}</span>
            </div>
          </div>
          <div class="pay" @click="setCart">去结算</div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="isNodata" v-else>
      <img src="@/assets/img/cart-Nodata.png" alt />
      <div class="nodata-text">
        <p>您的购物车可什么都没有呢~</p>
        <div class="pay" @click="$router.push('/goodsList')">前去添加</div>
      </div>
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
import { setTimeout } from 'timers';
import Qs from 'qs';
export default {
  data() {
    return {
      allChecked: false, //全选
      isNodata:false,//是否有数据
      presellList:[],//抢购
      agentSaleList:[],//代售
      ordinaryList:[],//普通
      loseEfficacyList:[],//失效
      cartNum:0,//购物车商品选中数量
      isType:'',//当前选中商品类型
      cartVo:{},//购物车价格信息
      moreveList:[],//批量删除数组
    };
  },
  computed:{
    SalePrice(){//计算单个商品总价
     return (p,n)=>{
       return toDecimal(p * n)
     }
    },
  },
  mounted(){
   


    if(this.$store.state.user){
      this.cartData();
      this.GetCartNum();
    }else{
      this.$router.push('/login')
      this.loading.close();
    }
  },
  methods: {
    GetCartNum(){//购物车件数
      this.$get('/user/cart/size.do').then(({data})=>{
        if(data.code == '0000'){
        //  this.$store.state.cartNum = data.size
         this.$store.commit('successCart',data.size)
        }
      })
    },
    changeNum(id,num){//编辑商品件数
      
      
      this.$post('/user/cart/editGoodsNum.do',{
        id:id,
        goodsNum:num
      }).then(({data})=>{

        this.cartVo = data.cartVo

      })


    },
    removeCart(id,status){//商品删除
      

      this.loading = this.$loading({ text: '' })
      let Arr = null;
      if(typeof id == 'number'){
        Arr = []
        Arr.push(id)
      }else{
        Arr = id
      }
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        // let ids = []
        // ids.push(id)
        this.$post('/user/cart/del.do',Arr).then(({data})=>{
          
          if(data.code == '0000'){
           
            
            this.$message({ type: 'success', message: '删除商品成功' });


            this.cartData();

            
            this.loading.close();

            this.$get('/user/cart/size.do').then(({data})=>{
              if(data.code == '0000'){
              //  this.$store.state.cartNum = data.size
              this.$store.commit('successCart',data.size)
              }
            })


          }


        })
      }).catch(()=>{
        setTimeout(()=>{
          this.loading.close();
        },300)
      })
    },
    editCart(id,goodsId,spec,periodId) {//编辑商品
      //ID -- 数量 -- 规格 -- 周期
      let D = {
        id:id,
        goodsId:goodsId,
        spec:spec,
        periodId:periodId
      }
      this.$post('/user/cart/edit.do',D).then(({data})=>{
         this.cartData();
      })

    },
    checkedChange(v, c,t) {//单个选择
      //V == 购物车商品ID
      //C == 是否已经选中
      //C == 类型

      switch (t) {
        case 'PRESELL'://抢购
          this.presellList.map( item =>{
            if(item.id == v){
              // item.isPick = c;
              // console.log(item.isPick)

              item.isPick ? this.Yescheck(item,t) : this.Nocheck(item)
             
            }
            
          })
          break;
        case 'AGENT_SALE'://代售
          this.agentSaleList.map( item =>{
            if(item.id == v){
              item.isPick = c;
              item.isPick ? this.Yescheck(item,t) : this.Nocheck(item)
            }
          })
          // this.agentSaleList.every( item => Q.push(item.isPick))
          break;
        case 'ORDINARY'://普通
          this.ordinaryList.map( item =>{
            if(item.id == v){
              item.isPick = c;
              item.isPick ? this.Yescheck(item,t) : this.Nocheck(item)
            }
          })
          break;
      }
    },
    Yescheck(item,type){ //选中单个商品
    
      this.$get(`/user/cart/getGoods/${item.id}.do`).then(({data})=>{
        if(data.code=='1004' && data.msg == '只能勾选同类型商品'){
          item.isPick = false
        }
        if(data.code == '0000'){
          this.cartNum ++ ;
          this.allChecked = true;
          this.moreveList.push(item.id)
          this.cartVo = data.cartVo
          this.isType = type
        }
      })
    },
    Nocheck(item){ //取消选中单个商品
      this.$post(`/user/cart/unCheck/${item.id}.do`).then(({data})=>{
          if(data.code == '0000'){
            this.cartNum --;
            this.cartVo = data.cartVo;
            this.moreveList.splice(this.moreveList.indexOf(item.id),this.moreveList.indexOf(item.id)+1)


            if(this.cartNum <= 0){
              this.allChecked = false;
            }
          }
      })
     },
    handleCheckAllChange(val) {//全选
      // presellList:[],//抢购
      // agentSaleList:[],//代售
      // ordinaryList:[],//普通
      // if(val) return
      this.cartNum = 0;
      // console.log(this.isType)
      if(val){
        this.allChecked = false
        return
      }
      if(this.moreveList.length <= 0){
        this.allChecked = false;

        return
      }
      switch (this.isType) {
        case 'PRESELL':
          this.presellList.map( item => item.isPick = false);
          break;
        case 'AGENT_SALE':
           this.agentSaleList.map( item => item.isPick = false);
          break;
        case 'ORDINARY':
           this.ordinaryList.map( item => item.isPick = false);
          break;
      }
     //初始化删除数组
      this.$post('/user/cart/batchUncheck.do',this.moreveList).then(({data})=>{
        if(data.code == '0000'){
          this.cartVo = data.cartVo
           this.moreveList = [];
        }
      })
    },
    setCart(){//提交订单支付
      let ArrAy = [];
        let isType = ''



        this.presellList.map(item=>item.isPick? isType = 'PRESELL':'')
        this.agentSaleList.map(item=>item.isPick? isType = 'AGENT_SALE':'')
        this.ordinaryList.map(item=>item.isPick? isType = 'ORDINARY':'')

      
   
      // console.log(isType)
      switch (isType) {
        case 'PRESELL'://预售
          this.presellList.map( item => {
            if(item.isPick && item.activityStatus == 'SELL_WELL'){
              ArrAy.push({
                goodsId:item.goodsId,
                cartId:item.id,
                num:item.goodsNum,
                spec:item.goodsSpec
              })
            }
          });
          break;
        case 'AGENT_SALE':
            this.agentSaleList.map( item => {
              // console.log(item)
              if(item.isPick && item.activityStatus == 'SELL_WELL'){
                ArrAy.push({
                  goodsId:item.goodsId,
                  num:item.goodsNum,
                  cartId:item.id,
                  periodId:item.periodId
                })
              }
            });
          break;
        case 'ORDINARY':
            this.ordinaryList.map( item => {
              
              if(item.isPick && item.activityStatus == 'SELL_WELL'){
                ArrAy.push({
                  goodsId:item.goodsId,
                  num:item.goodsNum,
                  cartId:item.id,
                  spec:item.goodsSpec
                })
              }
            });
          break;
      }

        // console.log(ArrAy)
      
      if(ArrAy.length <= 0){
        this.$message({ title: '错误', message: '请勾选商品!', type: 'error' });
        return
      }


      if(ArrAy.length > 10){
        this.$message({ title: '错误', message: '商品种类不能大于10种!', type: 'error' });
        return
      }





      if(this.isType == 'PRESELL'){//抢购

          this.$store.commit('handOrderList',ArrAy)

          setTimeout(()=>{
            this.$router.push('/confirmOrderPresell')
          },300)

        }
        else if(this.isType == 'AGENT_SALE'){//代售
          this.$store.commit('handOrderList',ArrAy)
          this.$router.push('confirmOrderAgentSale')
        }
        else if(this.isType == 'ORDINARY'){
          
          this.$store.commit('handOrderList',ArrAy)
          setTimeout(()=>{
            this.$router.push('/confirmOrderOrdinary')
          },300)
          
        }else{
          this.$message({ title: '错误', message: '参数有误！', type: 'error' })
        }
    },
    cartData(){//购物车数据
      this.loading = this.$loading();
      this.isType = '';
      this.moreveList = []
      this.cartNum = 0;
      // console.log(111)
      
      this.$get('user/cart/getCartList.do').then(({data})=>{
        // console.log(data)
        if(data.code == '0000'){
          // console.log(222)
          this.cartVo = data.cartVo;//购物车价格信息


          data.agentSaleList.length || data.presellList.length || data.ordinaryList.length || data.loseEfficacyList.length ? this.isNodata = true : this.isNodata = false;

          //处理选中




          data.presellList.map( (item) => {//抢购
            
            if(item.isPick == 'YES'){//默认选中
              item.isPick = true;
              this.allChecked = true;
              this.isType = 'PRESELL';
            }else{
              item.isPick = false;
            }

            if(item.isPick && item.activityStatus == 'SELL_WELL'){
              this.isType = 'PRESELL';
              this.cartNum++;
              // console.log(2)
              this.moreveList.push(item.id)
            }
            item.date = {  days:'', hours:'', minutes:'', seconds:'' };

            if(item.activityEndTime && (item.activityStatus == 'SELL_WELL' || item.activityStatus == 'NOT_PICK' || item.activityStatus == 'PREHEAT')){//执行抢购倒计时
              this.newDate(item,data.now)
            } 

          });






















          data.agentSaleList.map((item,index) => {//代售
            //isPick选中状态

            // console.log(item.isPick && item.activityStatus == 'SELL_WELL')
            // console.log(item.isPick)
            if(item.isPick == 'YES'){//默认选中
              item.isPick = true;
              this.allChecked = true;
              this.isType = 'AGENT_SALE';
            }else{
              item.isPick = false;
            }


            if(item.isPick && item.activityStatus == 'SELL_WELL'){
              this.cartNum++;
              // console.log(3)
              this.moreveList.push(item.id)
            }
            

            item.date = {  days:'', hours:'', minutes:'', seconds:'' };
            item.goodsDay = item.goodsDay?item.goodsDay + '天':'';


            if(item.activityEndTime && (item.activityStatus == 'SELL_WELL' || item.activityStatus == 'NOT_PICK' || item.activityStatus == 'PREHEAT')){//执行代售倒计时
              this.newDate(item,data.now)
            } 


          })





          


          data.ordinaryList.map( (item) => {//普通
            
            if(item.isPick == 'YES'){//默认选中
              item.isPick = true;
              this.allChecked = true;
              this.isType = 'ORDINARY';
            }else{
              item.isPick = false;
            }

            if(item.isPick && item.activityStatus == 'SELL_WELL'){
              this.cartNum++;
              this.moreveList.push(item.id)
            }
          });




          data.loseEfficacyList.map( item => {item.isPick == 'YES' ? item.isPick = true : item.isPick = false})//失效




          this.presellList = data.presellList//抢购
          this.agentSaleList = data.agentSaleList//代售
          this.ordinaryList = data.ordinaryList//普通
          this.loseEfficacyList = data.loseEfficacyList//失效
          // console.log(this.ordinaryList)
          
        }
        this.loading.close();
      })
    },
    newDate(item,now){//倒计时
    
        


       
        //获取结束时间

        



        let BeginTime = new Date(item.activityBeginTime.replace(/-/g, '/')).getTime();//活动开始时间

        let EndTime = new Date(item.activityEndTime.replace(/-/g, '/')).getTime();//活动结束时间


        let GDate = now;
        this._intervalId = setInterval(() => {
        GDate = GDate  + 1000


          let leftTime = ''
          
          // console.log(item.activityStatusType)
          if(BeginTime < GDate){//未到活动时间，isStart为判断活动是否开始 
            // item.isStart = false;
            leftTime = EndTime - GDate
          }else{
            // item.isStart = true;
            leftTime = BeginTime - GDate
          }
          var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
          var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
          var minutes = parseInt((leftTime / 1000 / 60) % 60, 10) //计算剩余的分钟
          var seconds = parseInt((leftTime / 1000) % 60, 10) //计算剩余的秒数
          // console.log(GDate)
          item.date.days = days
          item.date.hours = this.openZero(hours)
          item.date.minutes = this.openZero(minutes)
          item.date.seconds = this.openZero(seconds)
          if (leftTime <= 0) {
            window.location.reload();
            // this.cartData();
            // item.end = true
          }


        }, 1000)
    },
    openZero(zero) {//加0
      if (zero <= 9) {
        zero = '0' + zero
      }
      return zero
    },
  }
};
</script>

<style lang="less">
.cart-centent {
  margin-top: 50px;
  margin-bottom: 50px;
  .cart-menu {
    background: #fff;
    // height: 48px;
    width: 100%;
    padding: 15px 40px;
    box-sizing: border-box;
    .menu-col {
      // margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      box-sizing: border-box;
      .el-checkbox__label {
        font-size: 12px;
      }
    }
  }
  .cart-main {
    margin-top: 15px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      padding: 30px 0;
      margin-left: 30px;
    }
    .view-col:first-child {
      margin-top: -5px;
    }
    .view-col {
      background: #f8f8f8;
      margin: 5px 0;
      padding: 25px 20px 25px 0;
      box-sizing: border-box;
      height: 140px;
      &:hover{
        background:rgba(244,192,192,.3);

      }
      .col {
        display: inline-block;
        box-sizing: border-box;
        display: table-cell;
        vertical-align: middle;
        float: left;
        margin: 0 2px;
        color: #666666;
      }
      .yure{
        border:1px solid #91856F;
        color: #91856F;
        font-size: 12px;
        width: 35px;
        margin: 0 auto;
      }
      .el-input-number {
        margin-left: 30px;
        width: 150px;
      }
      .col.checkbox {
        margin-top: 40px;
        text-align: center;
      }
      .col.img {
        text-align: center;
        cursor: pointer;
        img {
          max-width: 94px;
          max-height: 94px;
        }
      }
      .col.name {
        padding-left: 10px;
        cursor: pointer;
        p {
          // 
        }
        p.p1 {
          color: #cc3333;
        }
        p.p2 {
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 24px;
          height: 21px;
          margin-top: 10px;
        }
        p.p2:hover{
          color: #c2ab82;
        }
        .select {
          width: 120px;
          margin-top: 17px;
        }
        .el-input__inner {
          border: none;
          background: none;
          padding-left: 0;
          height: 26px;
        }
        .el-input__icon {
          line-height: 26px;
        }
      }
      .col.price {
        margin-top: 20px;
        text-align: left;
        font-size: 12px;
        font-weight: bold;
        .vipbox{
          
              background:url(../../assets/img/huiy.png) no-repeat;
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
                display: block;
            }
      }
      .col.num {
        margin-top: 10px;
      }
      .col.money {
        margin-top: 20px;
        text-align: center;
      }
      .col.ope {
        margin-top: 20px;
        text-align: center;
        color: #cc3333;
        cursor: pointer;
      }
    }
    .view-col.red{background: rgba(244, 192, 192, .3)}
  }
  .cart-floatbar {
    .floatbar-ope {
      float: left;
      width: 280px;
      margin-left: 20px;
      .ope-che,
      .ope-modify {
        margin-top: 35px;
        margin-left: 20px;
        display: inline-block;
      }
      .ope-modify {
        color: #cc3333;
        cursor: pointer;
        transition: all 0.3s;
      }
      .ope-modify:hover {
        color: #c2ab82;
      }
    }
    .floatbar-pay {
      float: right;
      width: 700px;
      // height: 80px;
      .comm-right {
        float: right;
      }
      .price {
        float: left;
        color: #999999;
        margin-top: 13px;
        margin-right: 20px;
        .p {
          line-height: 30px;
          text-align: right;
          font-size: 12px;
        }
        .c {
          color: #91856f;
          font-weight: bold;
          margin-left: 0;
          font-size: 16px;
        }
        span {
          margin-left: 10px;
        }
      }
      .pay {
        width: 189px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        float: right;
        background: #c2ab82;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .cart-floatbar {
    background: #fff;
    width: 100%;
    height: 80px;
    margin-top: 15px;
  }
}
.isNodata {
  background: #fff;
  padding: 148px;
  width: 100%;
  box-sizing: border-box;
  img {
    float: left;
    display: inline-block;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-animation-name: buzz-out;
    animation-name: buzz-out;
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
  }
  .nodata-text {
    float: right;
    width: 310px;
    p {
      color: #91856f;
      margin-top: 80px;
      font-size: 24px;
    }
    .pay {
      width: 176px;
      margin: 0 auto;
      margin-top: 40px;
      color: #91856f;
      border: 1px solid #91856f;
      text-align: center;
      line-height: 50px;
      height: 50px;
      font-size: 20px;
      transition: all 0.3s;
      cursor: pointer;
    }
    .pay:hover {
      border: 1px solid #fff;
      background: #91856f;
      color: #fff;
    }
  }
}
@keyframes buzz-out {
  10% {
    -webkit-transform: translateX(3px) rotate(2deg);
    -ms-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }

  20% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    -ms-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }

  30% {
    -webkit-transform: translateX(3px) rotate(2deg);
    -ms-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }

  40% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    -ms-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }

  50% {
    -webkit-transform: translateX(2px) rotate(1deg);
    -ms-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }

  60% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    -ms-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }

  70% {
    -webkit-transform: translateX(2px) rotate(1deg);
    -ms-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }

  80% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    -ms-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }

  90% {
    -webkit-transform: translateX(1px) rotate(0);
    -ms-transform: translateX(1px) rotate(0);
    transform: translateX(1px) rotate(0);
  }

  100% {
    -webkit-transform: translateX(-1px) rotate(0);
    -ms-transform: translateX(-1px) rotate(0);
    transform: translateX(-1px) rotate(0);
  }
}
</style>

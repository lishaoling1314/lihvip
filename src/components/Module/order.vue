<template>
  <div class="order w-1000">
    <div class="user-shadow" style="padding:0;margin:20px 0;">
      <template-crumbs :crumbsdata="crumbs" style="padding:0;"></template-crumbs>
    </div>
    <div class="order-steps user-shadow" style="margin:10px 0;">
      <!-- <div class="title">
        <p class="orderNumber">订单号：{{order.orderNumber}}</p>
        <p class="status">最新状态：{{order.status}}</p>
        <p class="orderType">订单类型：{{orderType}}</p>
      </div> -->

      <div class="steps-main">

        <template-orderstatus :order="order" @confirmReceipt="confirmReceipt" @goPay="goPay"></template-orderstatus>
        
      </div>
    </div>

    <div class="order-address user-shadow" style="margin:10px 0;">
      <div v-if="order.orderType != 'AgentSale'">
        <div class="title">收货信息</div>
        <div class="title-p">
          <p><span>收货人：</span>{{order.receiveRecipients}}</p>
          <p><span>手机号：</span>{{order.receivePhone}}</p>
          <p><span>收货地址：</span>{{order.receiveRegion}}{{order.receiveDetailed}}</p>
          <p v-if="order.remark"><span>备注：</span>{{order.remark}}</p>
        </div>
      </div>
      <div class="sale col" v-if="order.orderType == 'AgentSale'">
        <div class="title">平台代售</div>
        <div class="sale-mai">
          <p>销售所得的货款和利润将在*{{order.agentBackTime}}*转至您个人中心的钱包中</p>
          <div class="mai-icon">
            <!-- <p v-if="order.noFirstPayRate">年化收益：{{order.rate > order.noFirstPayRate ? order.rate : order.noFirstPayRate}}%</p>
            <p v-else>年化收益：{{order.rate}}%</p> -->
            <p>利润：¥{{profit}}</p>
            <p>周期：{{order.cycle}}天</p>
          </div>
        </div> 
      </div>
    </div>
 <!-- v-if="order.orderType !='AgentSale' && order.deliveryTime" -->
    <div class="order-logistics user-shadow" style="margin:10px 0;" v-if="order.orderType !='AgentSale'">
      <div class="logistics-info">
        <div class="title">物流信息</div>
        <div class="text">
          <p><span>物流公司：</span>{{order.expressName || '暂无'}}</p>
          <p><span>快递单号：</span>{{order.expressCode || '暂无'}}</p>
        </div>
      </div>
      
      <div class="logistics-main">
        <div class="main-date">
          <p v-if="order.finishTime">{{order.finishTime}}</p>
          <p v-for="(item,index) in logisticsInfo.data" :key="index">{{item.ftime}}</p>
          <p v-if="order.deliveryTime" style="height:30px;">{{order.deliveryTime}}</p>
          <p v-if="order.outBoundTime" style="height:30px;">{{order.outBoundTime}}</p>
          <p v-if="order.payTime" style="height:20px;">{{order.payTime}}</p>
        </div>
        <div class="logistics-steps">
          <div class="steps-li" v-for="(item,index) in logisticsInfo.data" :key="index">
            <i class="steps-i"></i>
          </div>
          <div class="steps-li" v-if="order.deliveryTime"><i class="steps-i" style="margin-bottom:30px;"></i></div>
          <div class="steps-li" v-if="order.outBoundTime"><i class="steps-i" style="margin-bottom:30px;"></i></div>
          <div class="steps-li" v-if="order.payTime"><i class="steps-i" style="margin-bottom:0px;"></i></div>
        </div>
        <div class="main-text">
          <p v-if="order.finishTime">感谢您在利汇优品购物,欢迎下次光临</p>
          <p v-for="(item,index) in logisticsInfo.data" :key="index">{{item.context}}</p>
          <p v-if="order.deliveryTime" style="height:30px;">您的订单已提交{{order.expressName}}，订单号为：{{order.expressCode}}</p>
          <p v-if="order.outBoundTime" style="height:30px;">您的订单已确认,等待配送</p>
          <p v-if="order.payTime" style="height:20px;">您提交了订单,请等待系统确认</p>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="order-info user-shadow" style="margin:10px 0;">
      
      <div class="title">
        <p class="t">订单信息</p>
        <div class="title-q">
          <p><span></span>{{order.manufactName}}</p>
          <p><span>订单编号：</span>{{order.orderNumber}}</p>
          <!-- <p><span>创建时间：</span>{{order.createTime}}</p> -->
          <p v-if="order.agentBackTime  && orderType=='代售订单'"><span>回款时间：</span>{{order.agentBackTime}}</p>
          <!-- <p v-if="orderType == '抢购订单' && order.deliveryTime"><span>发货时间：</span>{{order.deliveryTime}}</p> -->
          <p v-if="orderType == '抢购订单' && order.deliveryDeliverTime "><span>预计发货时间：</span>{{order.deliveryDeliverTime}}</p>
          <p v-if="order.status != '待支付' && order.status != '支付中' && order.status != '已关闭'"><span>支付时间：</span>{{order.payTime}}</p>
        </div>
      <div style="clear:both"></div>
      </div>
      <div class="order-detalis">
        <div :class="(order.status == '已完成' && order.finishTime) || order.status == '待支付' || order.status == '代售成功' || order.status == '代售回款中' || order.status == '代售完成'?'title wancheng':'title'">
          <p>商品信息{{ID}}</p>
          <p>单价</p>
          <p>数量</p>
          <p></p>
          <p style="width:240px" v-if="order.status != '已完成' && order.finishTime">合计</p>
        </div>
        <div :class="(order.status == '已完成' && order.finishTime) || order.status == '待支付' || order.status == '代售成功' || order.status == '代售回款中' || order.status == '代售完成'?'goods-list wancheng':'goods-list'" v-for="(item,index) in order.orderGoodVoList" :key="index">
          <div class="goods-list-centent" :style="{borderBottom:index == order.orderGoodVoList.length -1 ? '#EAEAEA':''}"> 
            <div class="goods-img">
              <img :src="item.goodsCoverImg" alt="">
            </div>
            <div class="goods-name">
              <p class="p1" :title="item.goodsName">{{item.goodsName}}</p>
              <p class="p2">
                <span>订单类型：{{orderType}}</span>
                <span v-if="order.orderType != 'AgentSale'">规格：{{item.spec}}</span>

                <span v-if="order.orderType == 'AgentSale' && order.presellEndTime">计息时间：{{presellEndTime}}</span>
              </p>
            </div>
            <div class="goods-price">¥{{item.salePrice}}</div>
            <div class="goods-num">x<span>{{item.num}}</span></div>
            <div class="goods-shouhou" @click="shouhouObj.isAfterSale = true; shouhouObj.AfterSalePrice = item.payPrice; shouhouObj.AfterSaleId = item.id" v-if="isSupport && item.aftermarketStatus == 'NORMAL'">申请售后</div>
            <div class="goods-shouhou" v-if="item.aftermarketStatus != 'NORMAL'" @click="$router.push({path:'/AfterSale',query:{AfterSaleId:item.id,orderId:ID}})">退货详情</div>
            <div style="clear:both"></div>
          </div>
        </div>
        <div class="goods-heji" v-if="order.status != '已完成'">
          <div class="path s" v-if="order.status == '已发货'" @click="confirmReceipt">确认收货</div>
          <div class="path t" @click="tuikuanObj.tuikuanPrice = order.payPrice;tuikuanObj.istuikuan = true;" v-if="(order.status == '预发货' ||order.status == '待发货' || order.status == '代售确定中') && !isSupport">申请退款</div>
          <div class="path t" v-if="order.status=='申请退款中' || order.status == '退款完成'" @click="$router.push({path:'/AfterSale',query:{tuikuanId:ID,orderId:ID}})">退款详情</div>
          <!-- 待发货，预发货 *********  退款-->
          <!--  *********  退货-->
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="goods-total">
          <div class="text">
            <p><span>商品金额</span>¥{{order.goodsAmount}}</p>
            <p v-if="order.freight"><span>运费</span>¥{{order.freight}}</p>
            <p v-if="order.discountAmount && order.orderType != 'AgentSale'"><span>优惠</span>-¥{{order.discountAmount}}</p>
            <p v-if="order.discountAmount && order.orderType == 'AgentSale'"><span>加息</span>{{order.discountAmount}}%</p>
          </div>
          <div style="clear:both"></div>
          <div class="total">
            <div class="t">
              <span>实付款</span>¥{{order.payPrice}}
            </div>
          </div>
      </div>
      <div class="goods-duce">
        <div class="duce">若对订单信息有疑问请联系客户电话：400-007-0755</div>
        <div class="pay" v-if="order.status== '待支付'||order.status== '支付中'">
          <p>{{order.date.minutes}}:{{order.date.seconds}}内支付否则订单将自动取消</p>
          <div class="path" @click="goPay">立即支付</div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>



    <!-- 申请售后 -->
    <el-dialog :visible.sync="shouhouObj.isAfterSale" width="580px" v-if="shouhouObj.isAfterSale" top="25vh">
      <div class="layer-shouhou">
          <div class="title">申请售后</div>
          <div class="shouhou-form">
            <div class="form-item">
              <div class="label">退货原因：</div>
              <el-select v-model="shouhouObj.selectValue" placeholder="请选择" class="label-input">
                <el-option
                  v-for="(item,index) in shouhouObj.selectList"
                  :key="index"
                  :label="item.label"
                  :value="item.key">
                </el-option>
              </el-select>
              <div style="clear:both"></div>
            </div>
            <div class="form-item">
              <div class="label">退款金额：</div>
              <div class="label-price">￥{{shouhouObj.AfterSalePrice}}</div>
              <div style="clear:both"></div>
            </div>
            <div class="form-item">
              <div class="label">退货说明：</div>
              <el-input type="textarea" :rows="2" placeholder="请输入,限200字符" class="label-text" v-model="shouhouObj.textarea" maxlength="200"></el-input>
              <div style="clear:both"></div>
            </div>
            <div class="form-item">
              <div class="label"></div>
              <div class="label-img">
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :limit="5"
                  :on-success="handleAvatarSuccess"
                  :file-list="shouhouObj.fileList"
                  :before-upload="beforeAvatarUpload"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <p>最多可上传5张照片,只能上传jpg/png/webp格式图片!</p>
              </div>
              <div style="clear:both"></div>
            </div>
            <div class="layer-btp" @click="AftermarketBtn">提交申请</div>
          </div>
      </div>
    </el-dialog>

    <!-- 申请退款 -->
    <el-dialog :visible.sync="tuikuanObj.istuikuan" width="580px" v-if="tuikuanObj.istuikuan" top="25vh">
      <div class="layer-tuikuan">
        <div class="title">申请退款</div>
        <div class="tuikuan-form">
          <div class="form-item">
            <div class="label">退款原因：</div>
            <el-select v-model="tuikuanObj.selectValue" placeholder="请选择" class="label-input">
              <el-option
                v-for="(item,index) in tuikuanObj.selectList"
                :key="index"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
            <div style="clear:both"></div>
          </div>
          <div class="form-item">
            <div class="label">退款金额：</div>
            <div class="label-price">￥{{tuikuanObj.tuikuanPrice}}</div>
            <div style="clear:both"></div>
          </div>
          <div class="form-item">
            <div class="label">退款说明：</div>
            <el-input type="textarea" :rows="2" placeholder="请输入,限200字符" class="label-text" v-model="tuikuanObj.textarea" maxlength="200"></el-input>
            <div style="clear:both"></div>
          </div>
          <div class="layer-btp" @click="tukuanBtn">提交申请</div>
        </div>
      </div>
    </el-dialog>


  </div>
</template>
<script>
import templateCrumbs from '@/components/component/template_crumbs';

import templateOrderstatus from '@/components/template/template-orderStatus';
import { parse } from 'path';
export default {
  data() {
    return {
      ID: '',
      uploadUrl:'',//上传图片
      isSupport:true,//是否超过十五天不支持退货退款
      tuikuanObj:{
        istuikuan:false,//退款
        selectList:[
          {key:'CONSENSUS_REFUND',label:'协商一致退款'},
          {key:'FAILURE_DELIVER_AGREED_TIME',label:'未按照约定时间发货'},
          {key:'OTHER',label:'其他'},
        ],
        tuikuanPrice:'',//退款金额
        selectValue:'',//退款原因
        textarea:'',//退款说明
      },
      shouhouObj:{//售后
        isAfterSale:false,//售后layer
        selectList:[
          {key:'COLOUR_DESIGN_PATTERN_ERROR',label:'颜色、款式、图案描述不符合'},
          {key:'COUNTERFEIT_BRANDS',label:'假冒品牌'},
          {key:'SIZE_NOT_DESCRIPTION',label:'大小尺寸与描述不符'},
          {key:'DEFECTS_IN_WORKMANSHIP',label:'做工瑕疵'},
          {key:'DISLIKE_WRONG_SIZE_BAD_EFFECT',label:'尺寸拍错不喜欢、效果不好'},
          {key:'MATERIAL_FABRIC_COMMODITY_NOT_MATCH',label:'材质、面料与商品描述不符'},
          {key:'SEVEN_DAYS_REASON_GOODS',label:'七天无理由退换货'},
          {key:'SELLER_MISDELIVERED_GOODS',label:'卖家发错货'},
          {key:'SELLER_COUNTERFEIT_GOODS',label:'卖家虚假发货'}
        ],
        textarea:'',//退货原因
        AfterSalePrice:'',//退款金额
        AfterSaleId:'',//退款ID
        fileList:[],//上传图片
        selectValue:'',//退货原因
      },
      _intervalId: null, //页面销毁停止setInterval
      minutes:'',//时
      seconds:'',//分
      date: {
        createTime: '', //下单时间
        payTime: '', //支付时间
        associateManufactTime: '', //预售时间
        refundApplyTime: '', //申请退款日期
        finishTime: '' //关闭时间
      },
      steps: 1,
      order: {},
      num: '',
      logisticsInfo:{},//物流信息
      crumbs: [
        { id: 0, name: '个人中心', path: '/user' },
        { id: 1, name: '订单列表', path: '/orderList' },
        { id: 2, name: '订单详情', path: '/order' }
      ],
      goods: {}
    }
  },
  watch:{
    'shouhouObj.isAfterSale'(){
      this.shouhouObj.fileList = [];
      this.shouhouObj.selectValue = '';
      this.shouhouObj.textarea = '';
    },
    'tuikuanObj.istuikuan'(){
      this.tuikuanObj.textarea = '';
      this.tuikuanObj.selectValue = '';
    }
  },
  computed: {
    presellEndTime(){
      return this.order.presellEndTime.slice(0,10)
    },
    profit(){
      return Number(this.order.agentSaleNum - this.order.payPrice).toFixed(2)
    },
    TotalPrice() {
      let A = this.order.num * this.order.salePrice
      return A.toFixed(2)
    },
    AgentSaleStep() {
      //【代售订单】

      //确定代收完成
      if (this.order.payTime && this.order.associateManufactTime && this.order.finishTime) {
        return 4
      }

      //代售未确定已关闭
      else if (this.order.finishTime && this.order.payTime && !this.order.associateManufactTime) {
        return 4
      }

      //订单超时关闭
      else if (this.order.payTime && this.order.finishTime && !this.order.associateManufactTime) {
        return 3
      }
      //申请退款中
      else if (this.order.refundApplyTime && this.order.payTime) {
        return 3
      }

      //代售确定
      else if (this.order.associateManufactTime && this.order.payTime) {
        return 3
      }
      //支付完成待发货【代售确定中】
      else if (this.order.payTime) {
        return 2
      }
      //待支付
      else if (!this.order.payTime && this.order.createTime) {
        return 1
      }
    },
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
        return 3
      }
      //申请退款中
      else if (this.order.refundApplyTime && this.order.payTime) {
        return 3
      }
      //支付完成待发货
      else if (!this.order.deliveryTime && this.order.payTime) {
        return 3
      } //待支付
      else if (!this.order.payTime && !this.order.deliveryTime && this.order.createTime) {
        return 1
      }
    },
    step() {
      //计算普通订单
      //支付完成订单
      if (this.order.finishTime && this.order.deliveryTime && this.order.payTime) {
        return 4
      }
      //支付申请退款成功
      else if (this.order.payTime && this.order.refundApplyTime && this.order.finishTime) {
        return 4
      }
      //支付待发货
      else if (this.order.deliveryTime && this.order.payTime) {
        return 3
      }
      //订单超时关闭
      else if (!this.order.payTime && !this.order.deliveryTime && this.order.finishTime) {
        return 3
      }
      //申请退款中
      else if (this.order.refundApplyTime && this.order.payTime) {
        return 3
      }
      //申请退款中【预售】
      else if (this.order.presellEndTime && this.order.payTime) {
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
    orderType() {
      return this.order.orderType == 'Ordinary'
        ? '普通订单'
        : this.order.orderType == 'AgentSale'
        ? '代售订单'
        : '抢购订单'
    },
    payType() {
      return this.order.payType == 'WeiX'
        ? '微信支付'
        : this.order.payType == 'ZhiFub'
        ? '支付宝支付'
        : this.order.payType == 'Wallet'
        ? '钱包支付'
        : ''
    },
    couponDes() {
      if(this.order.discountAmount == undefined) {
        return false
      }
      if (this.order.orderType == "AgentSale") {
        // const rate = Number(this.order.discountAmount) + this.order.noFirstPayRate
        //待售订单
        return "年化收益 + " + this.order.discountAmount + '%';
      } else {
        return "-¥" + this.order.discountAmount
      }
    }
  },
  components: {
    templateCrumbs,
    templateOrderstatus
  },
  mounted(e) {
    this.ID = this.$router.history.current.query.orderId;
    this.GetorderInfo(this.$router.history.current.query.orderId);
    this.getUploadFileUrl();
    this.GetisSupport(this.$router.history.current.query.orderId);
  },
  methods: {
    tukuanBtn(){//退款申请
      this.$get('/user/applyRefund.do',{
        params:{
          orderId:this.order.id,
          refundType:this.tuikuanObj.selectValue,
          remark:this.tuikuanObj.textarea
        }
      }).then(({data})=>{
        // console.log(data)
        if(data.code == '0000'){
          this.$message({ type: 'success', message: '提交成功!' });
          this.tuikuanObj.istuikuan = false;
          this.GetorderInfo(this.ID);
        }
      })
    },
    AftermarketBtn(){//提交退货申请
      // console.log(this.textarea)
      // console.log(this.selectValue)
      // return 
      this.$post('/user/aftermarket/addAftermarket.do',{
        aftermarketMark:this.shouhouObj.textarea,//退货说明
        aftermarketReason:this.shouhouObj.selectValue,
        orderId:this.shouhouObj.AfterSaleId,
        picUrl:this.shouhouObj.fileList.map(item => item.url)
      }).then(({data})=>{
        if(data.code == '0000'){
          this.addLogistics = data.addLogistics
          this.$message({ type: 'success', message: '提交成功!' });
          this.shouhouObj.isAfterSale = false;
          this.GetorderInfo(this.ID);
        }
      })
    },
    GetisSupport(orderId){//获取当前订单是否支持售后
      this.$get(`user/aftermarket/isSupport/${orderId}.do`).then(({data})=>{
        // console.log(data)
        this.isSupport = data.isSupport
      })
    },
    getUploadFileUrl(){//获取上传图片url
      this.$get('/getUploadFileUrl.do',{
        params:{
          uploadFileType:"showImgs"
        }
      }).then(({data})=>{
        if(data.code == '0000'){
          this.uploadUrl = data.uploadUrl;
        }

      })
    },
    beforeAvatarUpload(file){
      
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!');
        return isLt2M
      }
      // console.log(file.name.includes('png'))
      if(!file.name.includes('png') && !file.name.includes('jpg') && !file.name.includes('webp')){
        this.$message.error('只能上传jpg/png/webp格式图片!');
        return false;
      }
      
    },
    handleAvatarSuccess(res, file){//图片上传成功
      let obj = {
        name:res.urls[0]?res.urls[0].slice(res.urls[0].indexOf('/img/')+14):'',//截取名字
        url:res.urls[0]?res.urls[0]:''
      }
      this.shouhouObj.fileList.push(obj);
    },
    handleRemove(file,filelist){//删除退换货图片
      this.shouhouObj.fileList = filelist
    },
    getLogistics(com,num){//获取物流信息

      this.$get('/kuaidi100.do',{
        params:{
          com:com, 
          num:num
        }
      }).then(({data})=>{
        if(data.code == '0000'){
          // console.log(data)
          this.logisticsInfo = data.info
        }
      })
    },
    goPay(){//去支付
      this.loading = this.$loading({ text: "订单正在提交，请稍后..." });
      // alert(1)
      let Arr = [];
      Arr.push({
        orderId:this.order.id,//订单ID
        orderNumber:this.order.orderNumber,//订单号
        availableFund:this.$store.state.userinfo.availableFund,//用户可用余额
        sum:this.order.payPrice//需支付金额
      })

      // console.log(Arr)
      this.$store.commit('handPayList',Arr)
      setTimeout(()=>{
          this.loading.close();
          this.$router.push('/payment');
      },500)

    },
    copyExpress(){//复制物流单号
        let _this = this;
        //复制分享链接
        let Url2 = this.order.expressCode;

        let oInput = document.createElement("input");
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = "oInput";
        oInput.style.display = "none";
        this.$message({
          message: "复制成功！",
          type: "success",
          duration: 2000,
          onClose() {
            _this.shareVisible = false;
          }
        });
    },
    GetorderInfo(id) {
      // console.log(pid)
     this.loading = this.$loading({ text: '' })

      this.$get('user/orderInfo.do', {
        params: {
          orderId:id
        }
      }).then(({ data }) => {
        if (data.code == '0000') {

          if(data.orderInfo.expressRefer && data.orderInfo.expressCode){//物流信息
            this.getLogistics(data.orderInfo.expressRefer,data.orderInfo.expressCode);
          }

          
          data.orderInfo.status = this.ifstatus(data.orderInfo.status)//发货状态判断

          // console.log(data.orderInfo)
          if(data.orderInfo.status == '待支付' && data.orderInfo.createTime){
            this.order.InPay = true
            this.dateHandle(data.orderInfo.createTime, data.now)
          }

          if(data.orderInfo.status == '支付中' && data.orderInfo.payTime){
            this.order.InPay = true
            this.dateHandle(data.orderInfo.payTime, data.now)
          }


          
          // if(data.orderInfo.expressCode && data.orderInfo.expressRefer){
          
          // }
          data.orderInfo.date = {minutes:'',seconds:''}

          this.order = data.orderInfo;
        }
        setTimeout(()=>{
          this.loading.close()
        },300)
      })
    },
    dateHandle(orderdate, now) {//未支付订单倒计时
      let _this = this
      let CalcDate = 30 * 1000 * 60 //获取30分钟的时间戳

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

        this.order.date.minutes = _this.openZero(minutes)
        this.order.date.seconds = _this.openZero(seconds)
      }, 1000)
    },
    openZero(zero) {
      //加0
      if (zero <= 9) {
        zero = '0' + zero
      }
      return zero
    },
    applyRefund() {
      let _this = this
      this.$confirm('是否申请退款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$get('user/applyRefund.do', {
            params: {
              orderId: this.ID
            }
          }).then(({ data }) => {
            if (data.code == '0000') {
              this.$message({
                message: '申请成功',
                type: 'success',
                duration: 2000,
                onClose() {
                  _this.GetorderInfo(_this.ID)
                }
              })
            }
          })
        })
        .catch(() => {})
    },
    confirmReceipt() {//确认收货
      let _this = this
      this.$confirm('是否确认收货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$get('user/confirmReceipt.do', {
            params: {
              orderId: this.ID
            }
          }).then(({ data }) => {
            if (data.code == '0000') {
              this.$message({
                message: '确认收货成功',
                type: 'success',
                duration: 2000,
                onClose() {
                  _this.GetorderInfo(_this.ID)
                  // _this.$router.push('/user')
                }
              })
            }
          })
        })
        .catch(() => {})
    },
    stepstype() {
      //订单时间判断
      // createTime:"",//下单时间
      // payTime:"",//支付时间
      // deliveryTime:'',//发货时间
      // finishTime:'',//完成或者关闭时间
      if (this.payTime == '' && this.deliveryTime == '') {
        //刚刚下单，未完成支付
        this.steps == 1
        //console.log('已下单，未完成支付【待支付】')
        return false
      } else if (this.payTime && this.payTime != '' && this.deliveryTime == '') {
        //已经支付，未发货
        this.steps == 2
        //console.log('已经支付，未发货【待发货】')
        return false
      } else if (this.payTime != '' && this.deliveryTime != '' && this.finishTime == '') {
        //支付成功，已发货
        this.steps == 3
        //console.log('支付成功【已发货】')
        return false
      } else if (this.payTime != '' && this.deliveryTime != '' && this.finishTime != '') {
        //订单已完成
        this.steps == 4
        //console.log('订单已完成【已完成】')
        return false
      }
    },
    ifstatus(text) {
      //发货状态判断
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
.order {
  .order-steps {
    box-sizing: border-box;
    padding: 0;
    .title {
      // display: flex;
      padding: 15px;
      text-align: center;
      box-sizing: border-box;
      // justify-content: space-between;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #eaeaea;
      overflow: hidden;
      text-align: center;
      p {
        display: inline-block;
        width: 300px;
        // float: left;
      }
      .orderNumber {
        text-align: left;
        float: left;
      }
      .status {
        text-align: center;
      }
      .orderType {
        text-align: right;
        float: right;
      }
    }
    .steps-main {
      padding: 50px 0;
      box-sizing: border-box;
    }
    .el-steps--horizontal {
      justify-content: center;
      text-align: center;
    }
    .el-step__head.is-success {
      color: #f25f6f;
      border-color: #f25f6f;
    }
    .el-step__title.is-success,
    .el-step__description.is-success {
      color: #000;
    }
    // .el-step__description.is-success,.el-step__description.is-process,.el-step__description.is-wait{padding-right:100px}
  }
  .order-address{
    padding: 50px;
    box-sizing: border-box;
      .sale{
        .sale-mai{
          color: #666666;
          font-size: 16px;
          .mai-icon{
            margin-top: 20px;
            p{
              padding: 6px 20px;
              display: inline-block;
              color: #999999;
              font-size: 12px;
              border:1px solid #ccc;
              margin-right: 20px;
              border-radius: 4px;
            }  
          }

        }
      }
      .title {
        font-weight: bold;
        font-size: 18px;
        color: #040000;
        margin-bottom: 20px;
      }
      .title-p {
        color: #666666;
        line-height: 36px;
        margin-bottom: 20px;
        overflow: hidden;
        //   display: flex;
        //   width: 600px;
        flex-wrap: wrap;
        p:nth-child(2) {
          width: 600px;
        }
        p:nth-child(3) {
          flex-basis: 100%;
          width: 100%;
        }
        .copy_logistics{
          width: 60px;
          height: 28px;
          border-radius: 4px;
          background: #C2AB82;
          color: #fff;
          float: left;
          margin-top: 4px;
          margin-left: 20px;
          cursor: pointer;
          text-align: center;
          line-height: 28px;
        }
        p {
          width: 250px;
          span{
            color: #999999;
            width: 80px;
            display: inline-block;
          }

        }
      }
  }
  .order-info {
    padding: 50px;
    box-sizing: border-box;
    .title {
      font-weight: bold;
      font-size: 18px;
      color: #040000;
      margin-bottom: 20px;
      .t{display: inline-block;float: left;}
      .title-q {
        float: right;
        padding-left: 20px;
        width: calc(100% - 100px);
        font-size: 12px;
        color: #666666;
        text-align: right;
        font-weight: normal;
        p {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }

    .note {
      margin-bottom: 64px;
    }
    .order-detalis {
      margin-top: 35px;
      margin-bottom: 16px;
      position: relative;
      border-bottom: 1px solid #EAEAEA;
      // padding-bottom: 20px;
     
      .title {
        background: #F0F2F5;
        // display: flex;
        border-left: none;
        padding: 0;
        line-height: 45px;
        height: 45px;
        margin: 0;
        margin-bottom: 20px;
        p:nth-child(1) {
          min-width: 300px;
          max-width: 300px;
          text-align: center;
        }
        p {
          width: 120px;
          text-align: center;
          color: #666666;
          font-weight: normal;
          font-size: 12px;
          float: left;
          height: 45px;
        }
      }
      .goods-heji{
        float: right;
        height: 140px;
        width: 240px;
        position: absolute;
        right: 0;
        top: 65px;
        text-align: center;
        line-height: 130px;
        padding-top: 40px;
        box-sizing: border-box;
        .path{
          line-height: 24px;
        }
        .path.s{
          width: 78px;
          line-height: 28px;
          height: 28px;
          background: #C6B078;
          color: #fff;
          text-align: center;
          margin: 0 auto;
          border-radius: 2px;
          font-size: 12px;
          cursor: pointer;
        }
        .path.t{
          color: #91856F;
          font-size: 12px;
          cursor: pointer;
        }

      }
      .goods-list{
        width: 660px;
        border-right: 1px solid #EAEAEA;
        float: left;
        .goods-list-centent{
          width: calc(100% - 20px);
          border-bottom: 1px solid #EAEAEA;
          padding: 20px 0 20px 20px;
          box-sizing: border-box;
          height: 140px;
        }
        .goods-img{
          width: 94px;
          height: 94px;
          float: left;
          img{width: 100%;height: 100%;}
        }
        .goods-name{
          margin-left: 15px;
          float: left;
          width: 171px;
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
            width: 300px;
            color: #999999;
            span{
              margin-right: 10px;
            }
          }
        }
        .goods-price{
          float: left;
          padding-top: 20px;
          padding-left: 20px;
          width: 100px;
          text-align: center;
        }
        .goods-num{
          float: left;
          padding-top: 20px;
          padding-left: 15px;
          width: 104px;
          text-align: center;
          span{margin-left: 3px;}
        }
        .goods-shouhou{
          float: left;
          padding-top: 20px;
          padding-left: 20px;
          width: 80px;
          font-size: 12px;
          text-align: center;
          color: #91856F;
          cursor: pointer;
        }
        .goods-shouhou:hover{color:#dac49c;}
      }

      
      .profit_box {
        overflow: hidden;
        margin-bottom: 24px;
        padding-right: 8px;
        span {
          float: right;
          padding: 10px 25px;
          margin-right: 16px;
          border: 1px solid rgba(222, 222, 222, 1);
          border-radius: 4px;
        }
      }
      .goods-list.wancheng{
        width: 100%;
        border: none;
        .goods-price,.goods-num,.goods-shouhou{width: 160px;}
      }
      .title.wancheng{
          p{width: 180px;}
      }
    }
    .goods-total{
      width: 100%;
      margin-top: 30px;
      
      .text{
        width: 220px;
        float: right;
        line-height: 36px;
        margin-right: 50px;
        text-align: right;
        color: #666666;
        span{margin-right: 30px;color: #999999;float: left;}
      }
      .total{
        width: 100%;
        background: #F0F2F5;
        height: 48px;
        line-height: 48px;
        margin-top: 10px;
        padding-right: 50px;
        box-sizing: border-box;
        .t{
          line-height: 48px;
          width: 220px;
          text-align: right;
          float: right;
          color: #91856F;
          font-size: 25px;
          font-weight: bold;
          span{margin-right: 30px;color: #999999;font-size: 14px;font-weight: 400;float: left;}
        }
      }
    }
    .goods-duce{
      margin-top: 25px;
      .duce{
        line-height: 48px;
        float: left;
        font-size: 12px;
        color: #999999;
      }
      .pay{
        float: right;
        line-height: 48px;
        color: #999999;
        font-size: 12px;
        p{float: left;}
        .path{
          width: 150px;
          float: left;
          margin-left: 20px;
          text-align: center;
          background: #C2AB82;
          border-radius: 4px;
          font-size: 18px;
          color: #FFFFFF;
        }
      }
    }
    
  }
    .order-logistics{
    padding: 50px 50px 30px 50px;
    background: #fff;
    .logistics-info{
      height: 194px;
      width: 339px;
      float: left;
      border-right: 1px solid #EAEAEA;
      .title{
        font-weight: bold;
        font-size: 18px;
        color: #040000;
        margin-bottom: 20px;
      }
      .text{
        p{
          color: #666666;
          line-height: 36px;
          word-wrap:break-word;
          width: 100%;
          span{
            color: #999999;
            width: 80px;
            display: inline-block;
          }
        }
      }
    }
    
    .logistics-main{
      width: 560px;
      float: left;
      padding:0 0 0 20px;
      box-sizing: border-box;
      overflow-y: auto;
      .main-date{
        float: left;
        color: #666666;
        font-size: 12px;
        height: 194px;
        box-sizing: border-box;
        width: 141px;
        p{
          padding-bottom: 20px;
          height: 75px;
          padding-right: 20px;
        }
      }
      .logistics-steps{
        float: left;
        width: 50px;
        height: 194px;
        .steps-li{
          position: relative;
          .steps-i{
            width: 20px;
            height: 20px;
            background: #EAEAEA;
            margin: 0 auto;
            display: block;
            margin-bottom: 75px;
            position: relative;
            z-index: 99;
            border-radius: 50%;
          }
        }
        
        .steps-li::before{
          content: '';
          position: absolute;
          width: 1px;
          height: 100px;
          left: 50%;
          bottom: 0;
          background: #ccc;
          z-index: 9;
        }
        .steps-li:first-child{
          .steps-i{
            background: #91856F;
          }
        }
      }
      .main-text{
        width: 330px;
        float: left;
        color: #666666;
        font-size: 12px;
        height: 194px;
        padding-left: 20px;
        box-sizing: border-box;
        p{
          height: 75px;
          overflow-y: auto;
          margin-bottom: 20px;
        }
        p::-webkit-scrollbar {display:none}
      }
    }
    ::-webkit-scrollbar{  
        width: 8px;  
        height: 8px;  
        background-color: #c1e2f1;
        border-radius: 4px;
    }  
    /*定义滚动条轨道 内阴影+圆角*/  
    ::-webkit-scrollbar-track {  
        border-radius: 10px;  
        background-color: #F2F2F2;  
    }  
      
    /*定义滑块 内阴影+圆角*/  
    ::-webkit-scrollbar-thumb{  
        border-radius: 10px;  
        background-color: #D0D0D0;  
    }
  }

  .step-to-pay {
    border-radius: 0;
    border: none;
    font-size: 12px;
    background: #C2AB82;
    color: #fff;
    text-align: center;
    display: inline-block;
    padding: 0 14px;
    margin-top: 5px;
    border-radius: 4px;
    height: 28px;
    cursor: pointer;
    line-height: 28px;
    .date{
      display: inline-block;
    }
  }
  .el-icon {
    width: 36px;
    height: 36px;
    display: inline-block;
  }
  .el-icon.createTime {
    background: url(../../assets/img/order-createTime.png) no-repeat;
    background-size: 100% 100%;
  } //提交订单

  .el-icon.payTime-on {
    background: url(../../assets/img/payTime-on.png) no-repeat;
    background-size: 100% 100%;
  } //已付款
  .el-icon.payTime-off {
    background: url(../../assets/img/payTime-off.png) no-repeat;
    background-size: 100% 100%;
  } //未付款

  .el-icon.close-on {
    background: url(../../assets/img/close-on.png) no-repeat;
    background-size: 100% 100%;
  } //关闭
  .el-icon.close-off {
    background: url(../../assets/img/close-off.png) no-repeat;
    background-size: 100% 100%;
  } //未关闭

  .el-icon.delivery-on {
    background: url(../../assets/img/delivery-on.png) no-repeat;
    background-size: 100% 100%;
  } //已发货
  .el-icon.delivery-off {
    background: url(../../assets/img/delivery-off.png) no-repeat;
    background-size: 100% 100%;
  } //待发货

  .el-icon.complete-on {
    background: url(../../assets/img/complete-on.png) no-repeat;
    background-size: 100% 100%;
  } //已完成
  .el-icon.complete-off {
    background: url(../../assets/img/complete-off.png) no-repeat;
    background-size: 100% 100%;
  } //未完成

  .el-icon.refundApply-on {
    background: url(../../assets/img/refundApply-on.png) no-repeat;
    background-size: 100% 100%;
  } //已退款
  .el-icon.refundApply-off {
    background: url(../../assets/img/refundApply-off.png) no-repeat;
    background-size: 100% 100%;
  } //申请退款中

  .el-icon.associateManufact-on {
    background: url(../../assets/img/associateManufact-on.png) no-repeat;
    background-size: 100% 100%;
  } //代售已确定
  .el-icon.associateManufact-off {
    background: url(../../assets/img/associateManufact-off.png) no-repeat;
    background-size: 100% 100%;
  } //代售确定中

  .steps-main {
    .el-step__icon.is-text {
      width: 36px;
      height: 36px;
      border: none;
    }
    .el-step__icon {
      display: inline;
    }
    .el-step.is-horizontal.is-center {
      width: 200px;
    }
    .el-step__title.is-process {
      color: #000;
      font-weight: normal;
    }
    .el-step__head.is-finish {
      color: inherit;
      border: none;
      height: 36px;
    }
    .el-step.is-center .el-step__line {
      left: 64%;
      right: -36%;
      top: 18px;
    }
    .el-step__icon {
      //   left: 82px;
    }
    .el-step.is-horizontal .el-step__line {
      top: 18px;
    }
    .el-step__title.is-finish,
    .el-step__description.is-finish {
      color: #666666;
    }
  }
  .newlog {
    color: #999999;
    font-size: 14px;
    margin-top: 20px;
  }
}
.total {
  // border: 1px solid #d9d9d9;
  .total-t {
    // padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    float: right;
    margin-right: 90px;
    p:first-child {
      width: 100%;
    }
    p {
      line-height: 36px;
      font-size: 14px;
      color: #666666;
      // text-align: right;
      span {
        color: #999999;
        width: 100px;
        text-align: right;
        font-size: 12px;
        display: inline-block;
        margin-right: 30px;
      }
    }
  }
  .total-b {
    background: #F0F2F5;
    padding: 20px;
    box-sizing: border-box;
    text-align: right;
    padding-right: 40px;
    p {
      line-height: 36px;
      color: #91856f;
      font-size: 24px;
      font-weight: bold;
      span {
        color: #999999;
        width: 100px;
        text-align: right;
        display: inline-block;
        font-weight: normal;
        font-size: 12px;
        margin-right: 30px;
      }
    }
  }
  
}
  .layer-shouhou{
    padding: 0 20px;
    box-sizing: border-box;
      .title{
        text-align: center;
        margin-top: -20px;
        color: #333333;
        font-size: 20px;
        font-weight: bold;
      }
      .shouhou-form{
        margin-top: 50px;
        .form-item{
          // display: flex;
          margin-top: 20px;
          .label{
            float: left;
            color: #333333;
            font-weight: bold;
            width: 80px;
            text-align: center;
            height: 40px;
            line-height: 40px;
          }
          .label-input{
            float: left;
            width: calc(100% - 80px);
            input{border-radius: 0;border-color:#D9D9D9;}
          }
          .label-price{
            border:1px solid #D9D9D9;
            width: calc(100% - 80px);
            height: 40px;
            float: left;
            line-height: 40px;
            padding-left: 20px;
            box-sizing: border-box;
            color: #CC9999;
          }
          .label-text{
            width: calc(100% - 80px);
            
            .el-textarea__inner{
            word-break:break-all;
             word-wrap:break-word;
              width: 100%;
              height: 140px;
            }
          }
          .label-img{
            width: calc(100% - 80px);
            float: left;
            .el-upload--picture-card,.el-upload-list__item{
              width: 100px;
              height: 100px;
              line-height: 100px;
            }
            .el-upload-list__item-status-label{
              line-height: 0;
            }
            p{
              margin-top: 20px;
              color: #CCCCCC;

            }
          }
          
        }
      }
  
  }
   .layer-tuikuan{
    .title{
      text-align: center;
      margin-top: -20px;
      color: #333333;
      font-size: 20px;
      font-weight: bold;
    }
    .tuikuan-form{
      .form-item{
        // display: flex;
        margin-top: 20px;
        .label{
          float: left;
          color: #333333;
          font-weight: bold;
          width: 80px;
          text-align: center;
          height: 40px;
          line-height: 40px;
        }
        .label-input{
          float: left;
          width: calc(100% - 80px);
          input{border-radius: 0;border-color:#D9D9D9;}
        }

        .label-price{
          border:1px solid #D9D9D9;
          width: calc(100% - 80px);
          height: 40px;
          float: left;
          line-height: 40px;
          padding-left: 20px;
          box-sizing: border-box;
          color: #CC9999;
        }
        .label-text{
          width: calc(100% - 80px);
          .el-textarea__inner{
          word-break:break-all; word-wrap:break-word;
            height: 140px;
            width: 100%;
          }
        }
      }
    }
  }
  .layer-btp{
      margin-left: 80px;
      margin-top: 50px;
      width: 170px;
      height: 40px;
      line-height: 40px;
      background: #91856F;
      color: #fff;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
    }
    .layer-btp:hover{ background: #b2a285; }
</style>
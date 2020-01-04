<template>
  <div class="payMent w-1000">
    <div class="payMent-title">
        <div class="le">
          <p class="p1" v-if="PayList.length <= 1">订单号：{{PayList.length == 1 ? PayList[0].orderNumber:''}}</p>
          <p class="p2">订单提交支付成功，请您在30分钟之内完成支付，否则订单会被自动取消</p>
        </div>
        <div class="ri">
          <span>应付金额：</span>
          <span>¥</span>
          <span>{{sum}}</span>
        </div>
        <div style="clear:both"></div>
    </div>
    <div class="payMent-mode" v-if="!isWeChatPay">
        <div class="mode-col" @click="modeType = 1; payPasswd = ''"><i :class="modeType == 1?'radio active':'radio'"><i class="radio-t"></i></i><b>支付宝</b></div>
        <!-- <div class="mode-col" @click="modeType = 2; payPasswd = ''"><i :class="modeType == 2?'radio active':'radio'"><i class="radio-t"></i></i><b>微信</b></div> -->
        <!-- 可用资产为零则不显示 -->
        <!-- <div class="mode-col" @click="modeType = 3; payPasswd = ''" v-if="isPayMode"><i :class="modeType == 3?'radio active':'radio'"><i class="radio-t"></i></i><b style="margin-right:10px;">可用资产支付</b>(可用资产{{availableFund}})</div>
        <div class="mode-all"><span @click="isPayMode = !isPayMode">{{isPayMode?'隐藏':'展示'}}更多</span></div> -->

        <div class="mode-col" @click="modeType = 3; payPasswd = ''" v-if="isPayMode && availableFund >= sum"><i :class="modeType == 3?'radio active':'radio'"><i class="radio-t"></i></i><b style="margin-right:10px;">可用资产支付</b>(可用资产¥{{availableFund}})</div>
        <div class="mode-col" v-else-if="isPayMode && availableFund < sum" @click="$message({type: 'info',message: '账户可用余额不足!'})"><i :class="modeType == 3?'radio active':'radio'"><i class="radio-t"></i></i><b style="margin-right:10px;">可用资产支付</b>(可用资产¥{{availableFund}})</div>



        <div class="mode-all"><span @click="isPayMode = !isPayMode">{{isPayMode?'隐藏':'展示'}}更多</span></div>
    </div>
    <div class="payMent-pswd" v-if="!isWeChatPay">
        <div class="pswd-title" v-if="modeType == 3">
          <span>支付密码</span>
          <div class="path" @click="dialogVisible = true,PasswordTitle='找回交易密码'" v-if="isSetTradePassword">忘记密码</div>
        </div>
        <div class="immediate_payment" v-if="modeType == 3">
          <div class="enter-psd-input">
            <div class="code_main">
              <div class="code-input-main-item" :class="(payPasswd.length == 0 && isfocus)?'psd-blink':''" v-if="isSetTradePassword">{{changePsd[0]}}</div>
              <div class="code-input-main-item" :class="(payPasswd.length == 1 && isfocus)?'psd-blink':''" v-if="isSetTradePassword">{{changePsd[1]}}</div>
              <div class="code-input-main-item" :class="(payPasswd.length == 2 && isfocus)?'psd-blink':''" v-if="isSetTradePassword">{{changePsd[2]}}</div>
              <div class="code-input-main-item" :class="(payPasswd.length == 3 && isfocus)?'psd-blink':''" v-if="isSetTradePassword">{{changePsd[3]}}</div>
              <div class="code-input-main-item" :class="(payPasswd.length == 4 && isfocus)?'psd-blink':''" v-if="isSetTradePassword">{{changePsd[4]}}</div>
              <div class="code-input-main-item" :class="(payPasswd.length >= 5 && isfocus)?'psd-blink':''" v-if="isSetTradePassword">{{changePsd[5]}}</div>
              <input class="code-input-input" v-model="payPasswd" maxlength="6" type="tel" @focus="isfocus = true" @blur="isfocus = false"  v-if="isSetTradePassword"/>
              <div @click="dialogVisible = true,PasswordTitle='设置交易密码'" v-else class="nosetTradePassword">设置交易密码</div>
              <div class="input-clear"></div>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
        <div @click="payTap" class="payBtn">立即支付</div>
    </div>
    <div class="WeChat-pay user-shadow" v-if="isWeChatPay">
      <div class="WeChat-pay-main">
        <p class="p1">微信支付</p>
        <p class="p2">
          距离二维码过期还有30分钟，过期后请重新获取二维码</p>
        <div class="code" id="WeChat-pay" v-if="isWeChatPay"></div>
        <div class="wechat">
          <img src="@/assets/img/pay-weChat.png" alt="">
          <div class="text">请使用微信扫一扫扫描二维码支付</div>
        </div>
        <div class="path clearfix">
          <div class="pay-tap" @click="applyCancel()" style="float: left;">取消支付</div>
          <div class="pay-tap" @click="confirmPayment()" style="float: right;">已完成支付</div>
        </div>
      </div>
      <div class="path clearfix">
        <p @click="isWeChatPay = false">&lt;选择其他支付方式</p>
      </div>
    </div>
    <el-dialog :title="PasswordTitle" :visible.sync="dialogVisible" width="600px" custom-class="chgtranspassword">
      <chgtranspassword @closeDialog="closeDialog" v-if="dialogVisible"></chgtranspassword>
    </el-dialog>
  </div>
</template>
<script>
import Qs from 'qs';
import QRCode from 'qrcodejs2' // 引入qrcode
// import chgtranspassword from './chg_trans_password'
import chgtranspassword from '@/components/template/chg_trans_password'
  export default {
    data(){
      return {
        modeType:1,//1支付宝、2微信、3余额
        isSetTradePassword:true,//是否设置过交易密码
        payPasswd:'',//支付密码
        isfocus:'',//支付密码获取焦点下划线
        isPayMode:false,//默认隐藏资产支付
        availableFund:'',//可用资产
        isWeChatPay:false,//显示微信支付
        usableSum:'',//用户可用余额
        sum:'',//需支付金额
        orderId:'',//订单ID
        orderNumber:'',//订单编号
        PayList:[],//订单数组
        PasswordTitle:'找回交易密码',//找回交易密码
        dialogVisible: false,// 忘记支付密码
      }
    },
    components: {
      chgtranspassword
    },
    mounted(){
      // console.log(this.$store.state.PayList)

      // if(this.$store.state.PayList == 'undefined'){//选择支付成功之后强制回到个人中心
      //   this.$router.push('/user')
      //   return
      // }
      this.isSetTradePassword = JSON.parse(localStorage.getItem('user')).isSetTradePassword
      if(typeof this.$store.state.PayList == 'string'){
        this.PayList = JSON.parse(this.$store.state.PayList)
      }else{
        this.PayList = this.$store.state.PayList
      }
      this.availableFund = this.PayList[0].availableFund;
      this.sum = this.PayList[0].sum;
      this.GetCartNum();
    },
    computed: {
      changePsd() {
        let cipher = ''
        for (var i = 0; i < this.payPasswd.length; i++) {
          cipher += '*'
        }
        return cipher
      }
    },
    methods:{
      GetCartNum(){//获取购物车数量
        this.$get('/user/cart/size.do').then(({data})=>{
          if(data.code == '0000'){
          //  this.$store.state.cartNum = data.size
          this.$store.commit('successCart',data.size)
          }
        })
      },
      applyCancel() {//取消支付
        let orderId = '';
        for(let i in this.PayList){
          orderId +=  ','+this.PayList[i].orderId
        }
        
        orderId = orderId.slice(1)


        this.$get('user/applyCancel.do', {
          params: {
            orderIds: orderId
          }
        }).then(({ data }) => {
          if (data.code == '0000') {
            this.$message({ type: 'success', message: '取消成功！' })
            setTimeout(() => {
              this.$router.replace('/user')
            }, 2000)
          }
        })
      },
      confirmPayment() {//订单确认是否已经支付
        let orderId = '';
        for(let i in this.PayList){
          orderId +=  ','+this.PayList[i].orderId
        }
        
        orderId = orderId.slice(1)
        this.$get('user/confirmPayment.do', {
          params: {
            orderIds: orderId
          }
        }).then(({ data }) => {
          if (data.code == '0000') {
            this.$router.replace({
              path: '/user'
            })
          }
        })
      },
      closeDialog() {//支付密码回调
        this.dialogVisible = false;
        this.isSetTradePassword = true;
      },
      payTap() {
        // console.log(type)

        if(document.getElementById('zhifubao')){//解决支付宝支付问题
          document.getElementById('zhifubao').remove()
        }

        let paytype = ''
        switch (this.modeType) {
          case 1:
            paytype = 'ZhiFub'
            break
          case 2:
            paytype = 'WeiX'
            break
          case 3:
            if (this.payPasswd == '') {
              this.$message({ message: '请输入交易密码', type: 'error' })
              return false
            }
            paytype = 'Wallet'
            break
        }
        // 支付



        let _this = this
       

        let Obj = {};//提交ID
        Obj.payPasswd = this.payPasswd
        Obj.payType = paytype
        Obj.orderIds = ''

        for(let i in this.PayList){
          Obj.orderIds +=  ','+this.PayList[i].orderId
        }
        
        Obj.orderIds = Obj.orderIds.slice(1)
        // console.log(Obj)




        if (paytype == 'WeiX') {
          this.loading = this.$loading({ text: '正在生成支付二维码，请稍后...' })
          this.isWeChatPay = !this.isWeChatPay
        }

        this.loading = this.$loading({ text: '正在支付...' })
        this.$post('user/payOrder.do?'+Qs.stringify(Obj)).then(({ data }) => {
          if (data.code == '0000') {
            // if(this.minutes!='' && this.seconds!=''){
            // }
            // this.getpay()
            if (paytype == 'ZhiFub') {
              //支付宝支付
              const div = document.createElement('div');
              div.id = 'zhifubao'
              div.innerHTML = data.payForm //此处form就是后台返回接收到的数据
              document.body.appendChild(div)
              // document.forms.target = new front;
              document.forms[0].submit()
            } else if (paytype == 'WeiX') {
              setTimeout(() => {
                let qrcode = new QRCode(document.getElementById('WeChat-pay'), {
                  width: 285,
                  height: 285,
                  text: data.code_url, // 二维码地址
                  colorDark: '#000',
                  colorLight: '#fff'
                })
              }, 500)
            } else {
              this.$message({ message: '支付成功', type: 'success' })
              this.$router.push('/user')
            }

            // localStorage.removeItem('PayList');
            // this.$store.commit('handPayList');

          }else{
            this.$router.push('/user')
          }
          _this.loading.close()
        })
      },
    }
  } 
</script>
<style lang="less">
  .payMent{
    margin-top:50px;
    margin-bottom:50px;
    .payMent-title{
      background: red;
      width: 100%;
      height:114px;
      background: url(../../assets/img/payMent-back.png) no-repeat;
      background-size: 100% 114px;
      padding: 30px 50px;
      box-sizing: border-box;
      .le{
        float: left;
        p{ color: #fff; margin-bottom: 10px; }
        .p1{font-size: 14px;}
        .p2{font-size: 16px;}
      }
      .ri{
        float: right;
        color: #fff;
        span:nth-child(1){font-size: 14px;}
        span:nth-child(2){font-size: 12px;}
        span:nth-child(3){font-size: 24px;font-weight: bold;}
      }

    }
    .payMent-mode{
      background: #fff;
      // padding-bottom: 50px;
      padding: 20px 0;
      .mode-all{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        span:hover{ color:#91856f; }
      }
      .mode-col:hover{
        border-top: 1px solid #91856F;
        border-bottom: 1px solid #91856F;
      }
      .mode-col{
        width: 100%;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        background: #fff;
        padding: 0 50px;
        box-sizing: border-box;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        box-shadow:0px 0px 20px 0px rgba(153, 153, 153, 0.2);
        transition: all .3s;
        .radio{
            width: 20px;
            height: 20px;
            background: #fff;
            border: 1px solid #91856F;
            padding: 3px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 50%;
            display: inline-block;
            margin-right: 20px;
            vertical-align: middle;
            position: relative;
            .radio-t{
              position: absolute;
              top: 3px;
              left: 3px;
              background: #fff;
              width: 12px;
              height: 12px;
              margin: 0 auto;
              border-radius: 50%;
              display: inline-block;
            }
        }
        .radio.active{
          .radio-t{background: #91856f;}
        }
      }
    }
    .payMent-pswd{
      width: 100%;
      background: #fff;
      margin-top: 10px;
      padding: 60px 50px;
      box-sizing: border-box;
      .pswd-title{
        span{color: #333333;font-weight: bold;font-size: 18px;margin-right: 20px;}
        .path{font-size: 14px;color: #999999;cursor: pointer;display: inline-block;}
        .path:hover{color: #91856f;}
      }
      .immediate_payment {
        margin-top: 30px;
        span {
          color: #999;
          font-size: 14px;
        }
        .enter-psd-input {
          overflow: hidden;
          margin-top: 11px;
          line-height: 43px;
          .code_main {
            // width: 287px;
            // height: 43px;
            position: relative;
            float: left;
            // border: 1px solid #c6c6c6;
            z-index: 100;
            .code-input-input {
              width:calc( 100% + 160px);
              height: 100%;
              position: absolute;
              top: 0;
              // left: 0;
              left: -80px;
              border: none;
              outline: none;
              color: #fff;
              opacity: 0;
              // background: #ccc;
              font-size: 12px;
              // caret-color: rgba(0, 0, 0, 0);
              z-index: 10;
              
            }
            .input-clear{
              width: 80px;
              height: 80px;
              opacity: 0;
              position: absolute;
              // background: goldenrod;
              right: -70px;
              top: 0;
              z-index: 20;
            }
            .code-input-main-item {
              float: left;
              width: 80px;
              margin-right:10px;
              height: 80px;
              font-size: 20px;
              text-align: center;
              line-height: 80px;
              border:1px solid #ccc;
              font-size: 38px;
              position: relative;
              // border-right: 1px solid #d9d9d9;
            }
            .nosetTradePassword{
              width: 100%;
              height: 43px;
              background: #fff;
              color: #91856f;
              text-align: center;
              cursor: pointer;
            }
            .psd-blink::before {
              content: '';
              width: 50px;
              position: absolute;
              left: 15px;
              bottom: 5px;
              height: 1px;
              background: #91856F;
              opacity: 0.5;
            }

            .code-input-item {
              width: 1px;
              height: 27px;
              background: #d9d9d9;
              margin-top: 9px;
              float: left;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
            input[type='number'] {
              -moz-appearance: textfield;
            }
          }
          span {
            float: left;
            font-size: 14px;
            color: #856020;
            margin-left: 13px;
            cursor: pointer;
          }
        }
      }
    }
    .payBtn{
      width: 163px;
      height: 43px;
      line-height: 43px;
      text-align: center;
      color: #fff;
      background: #C2AB82;
      border-radius: 2px;
      margin-top: 50px;
      font-size: 18px;
      cursor: pointer;
      transition: all .3s;
    }
    .payBtn:hover{background: #91856F;}
    .WeChat-pay-main {
      width: 570px;
      margin: 0 auto;
      text-align: center;
      .p1 {
        font-size: 20px;
      }
      .p2 {
        color: #333;
        img {
          width: 36px;
          height: 36px;
        }
      }
      p {
        // padding-left: 130px;
        line-height: 36px;
      }
      .wechat {
        width: 307px;
        margin: 0 auto;
        height: 64px;
        background: #91856f;
        padding: 10px 75px;
        line-height: 64px;
        box-sizing: border-box;
        font-size: 16px;
        text-align: center;
        font-size: 12px;
        img {
          float: left;
          margin-top: 5px;
          width: 38px;
          height: 38px;
        }
        .text {
          width: 100px;
          float: right;
          line-height: 24px;
          color: #fff;
          text-align: left;
        }
      }
      .code {
        width: 307px;
        height: 307px;
        padding: 10px;
        margin: 10px auto;
        box-sizing: border-box;
        border: 1px solid #bfbfbf;
      }
      .path {
        display: flex;
        width: 307px;
        margin: 0 auto;
        justify-content: space-between;
        .pay-tap {
          width: 147px;
          height: 49px;
          line-height: 49px;
          text-align: center;
          color: #fff;
          background: #91856f;
          margin-top: 20px;
        }
        .pay-tap:nth-child(1) {
          margin-right: 10px;
        }
      }
    }
  }
</style>
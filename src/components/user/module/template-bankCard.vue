<template>
  <div class="bankCard-add">
    <el-form
      :model="dataForm"
      ref="dataForm"
      label-width="80px"
      class="form"
      @keyup.enter.native="submitTap()"
    >
      <el-form-item label="开户名：" prop="cardRealName" label-width="120px">
        <el-input v-model="dataForm.cardRealName" placeholder="请填写开户名！"></el-input>
      </el-form-item>
 <el-form-item label="银行卡号：" prop="cardId" label-width="120px">
        <el-input v-model="dataForm.cardId" placeholder="请填写银行卡号！"></el-input>
      </el-form-item>
      <el-form-item label="开户城市：" label-width="120px">
        <el-select v-model="provinceValue" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="cityValue" placeholder="请选择">
          <el-option v-for="item in city" :key="item.value" :label="item.text" :value="item.text"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="身份证号：" prop="idCard" label-width="120px">
        <el-input v-model="dataForm.idCard" placeholder="请填写身份证号！"></el-input>
      </el-form-item>
 <el-form-item label="预留手机号：" prop="cardReservePhone" label-width="120px">
        <el-input v-model="dataForm.cardReservePhone" placeholder="请填写银行卡预留手机号！"></el-input>
      </el-form-item>
      

     
     
     

      <el-form-item label label-width="120px">
        <el-button class="Bankcard-Tap" @click="submitTap()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { setTimeout } from "timers";
import cascade from "../../../../static/City";
import Qs from 'qs';
export default {
  data() {
    return {
      province: [], //省
      city: [], //市
      provinceValue: "", //省
      cityValue: "", //城市
      dataForm: {
        twoSuccKey: "", //codeKey
        cardId: "", //银行卡号
        cardRealName: "", //银行卡实名
        cardReservePhone: "", //银行卡预留手机号【提现手机号码】
        idCard: "", //身份证号
        phone: "" //手机号码【手机号码】
      }
    };
  },
  mounted() {
    this.province = cascade;
    // console.log(this.dataForm)
  },
  methods: {
    init(view, key) {
      this.dataForm.twoSuccKey = key
      if(view && view!=undefined){
        this.dataForm.id = view.id;
            if(view.bankArea && view.bankArea!=''){
              this.provinceValue = view.bankArea.slice(0,view.bankArea.indexOf(','))
              this.cityValue = view.bankArea.slice(view.bankArea.indexOf(',')+1)
            }
            this.dataForm.cardRealName = view.cardRealName
            this.dataForm.cardId = view.cardId
            this.dataForm.idCard = view.idCard;
            this.dataForm.cardReservePhone = view.cardReservePhone;
            
      }
      
    },
    handleChange(v) {
      //省
      this.city = [];
      this.cityValue = "";

      this.province.map((item, index) => {
        if (item.value == v) {
          this.provinceValue = item.text;
          this.city = item.children;
        }
      });
      // this.provinceTwo
    },
    submitTap(){
              //新增银行卡
            this.loading = this.$loading({text: '数据加载中，请稍后...'});
        let _this = this



          if (this.dataForm.twoSuccKey == '') {
            this.$message.error("验证码已过期，请刷新页面后重新获取验证码!");
            this.loading.close()
            return false;
          }
          
          if(this.dataForm.cardId == '') {
            this.$message.error("银行卡号不能为空!");
            this.loading.close()
            return false;
          }


          if(this.provinceValue == '' || this.cityValue == '') {
            this.$message.error("请选择开户城市!");
            this.loading.close()
            return false;
          }



          if(this.dataForm.cardRealName == '') {
            this.$message.error("银行卡实名不能为空!");
            this.loading.close()
            return false;
          }

          if(this.dataForm.cardReservePhone == '') {
            this.$message.error("银行卡预留手机号不能为空!");
            this.loading.close()
            return false;
          }



          if(this.dataForm.idCard == '') {
            this.$message.error("身份证号码不能为空!");
            this.loading.close()
            return false;
          }


          let reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

          if(!reg.test(this.dataForm.idCard)) {
            this.$message.error("身份证号码格式不正确!");
            this.loading.close()
            return false;
          }

        
            
          

          let D = Qs.stringify({
            id: this.dataForm.id?this.dataForm.id:'',
            twoSuccKey:this.dataForm.twoSuccKey,
            cardId:this.dataForm.cardId,
            cardRealName:encodeURI(this.dataForm.cardRealName),
            cardReservePhone:this.dataForm.cardReservePhone,
            idCard:this.dataForm.idCard,
            bankArea:encodeURI(this.provinceValue+','+this.cityValue),
          })
            
            
            this.$post('user/bankcard/save.do', D).then(({ data }) => {
              // //console.log(data)
              if (data.code == '0000') {
                _this.loading.close()
                this.$emit('closeLater');
                this.$message({
                  type: 'success',
                  message: this.dataForm.id?'修改成功!':'新增成功!',
                  onClose() {
                    //console.log(typeof _this.confirmOrder=='undefined')
                    
                      





                  }
                })
                
              }else{
                this.loading.close()
              }
            })
    },
  }
};
</script>
<style lang="less" scoped>
.bankCard-add {
  .el-form-item__label{text-align: right;font-weight: bold;}
  .el-input__inner{border-radius: 0;}
  .title {
    line-height: 44px;
    padding-left: 20px;
    color: #91856F;
    text-align: left;
    // background: #f1f1f1;
    font-size: 16px;
    width: 255px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .form {
    width: 477px;
    margin: 0 auto;
  }
}
  .el-input__suffix{
    border-left:1px solid #D9D9D9;
    width: 40px;
  }
  .el-form-item__label{text-align: center;}
  .el-input__suffix {right:0;}
  .el-input--suffix .el-input__inner{padding-right: 0;}
    .el-select{
    float: left;
    width: calc(50% - 5px);
  }
  .el-select:nth-child(2){margin-left: 10px;}
  .Bankcard-Tap {
    width: 358px;
    border: none;
    border-radius: 0;
    color: #fff;
    background: #91856F ;
    color: #fff ;
    border-color:#91856F ;
  }
  .Bankcard-Tap:hover{
    background: #91856F !important;
    color: #fff !important;
    border-color:#91856F !important;
  }
</style>


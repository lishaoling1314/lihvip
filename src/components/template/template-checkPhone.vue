<template>
  <div class="templateCheckPhone">
    <el-form
      ref="dataForm"
      :model="formData"
      label-width="80px"
      class="form"
      v-loading="loading"
    >
      <el-form-item label prop="phone" label-width="0">
        <el-input placeholder="请输入手机号码" v-model="formData.phone" class="input-with-select" disabled>
          <div slot="prepend" class="input-slot" style="width:60px;">手机号码</div>
        </el-input>
      </el-form-item>
      <el-form-item label prop="code" label-width="0">
        <el-input placeholder="请输入验证码" v-model="formData.code">
          <div slot="prepend" class="input-slot" style="width:60px;">手机验证码</div>
          <el-button
            slot="append"
            @click="codeTap()"
            :disabled="disabled"
            v-loading.fullscreen.lock="fullscreenLoading"
          >{{codeText}}</el-button>
        </el-input>
      </el-form-item>
      <el-button class="templateCheckPhone-tap" @click="submitTap">确认</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      codeText: "获取验证码",
      disabled: false, //是否禁用验证码
      fullscreenLoading: false, //loding
      formData: {
        phone: "",
        code: ""
      }
    };
  },
  mounted(){
    this.formData.phone = JSON.parse(localStorage.getItem('user')).phone;
    // console.log(JSON.parse(localStorage.getItem('user')).phone)
  },
  props:['orderType','checkBankDelete'],
  // checkBankDelete为是否为删除银行卡验证
  methods: {
    submitTap(){//校验验证码


    if (this.formData.code=='') {
        this.fullscreenLoading = false;
        this.$message({
          title: "错误",
          message: "请输入验证码",
          type: "error"
        });
        return false;
      }
      this.$get('checkCode.do',{
        params:{
            // phone:this.formData.phone,
            type:this.checkBankDelete?'checkBankDelete':'checkBankCard',
            code:this.formData.code
        }
        }).then(({data})=>{
          
          if( data.code=='0000' && data.twoSuccKey ){
              this.$emit('twoSuccKey',data.twoSuccKey,this.formData.phone)
          }
          this.fullscreenLoading = false;
        })

    },
    codeTap() {
      //获取验证码
      this.fullscreenLoading = true;
      if (this.formData.phone == "") {
        this.fullscreenLoading = false;
        this.$message({
          title: "错误",
          message: "请输入手机号码！",
          type: "error"
        });
        return false;
      }











      this.$get("sendCode.do", {
        params: {
          // phoneOremail: this.formData.phone,
          type: "checkBankCard"
        }
      }).then(({ data }) => {
        ////console.log(data)
        if (data.code == "0000") {
          this.$message({
            message: "验证码发送成功，请注意查收！",
            type: "success"
          });

          let T = this.codeText;
          T = Number(60);
          let setDate = setInterval(() => {
            if (T >= 1) {
              T--;
              this.codeText = T + "s";
              this.disabled = true;
            } else {
              this.codeText = "重新获取";
              this.disabled = false;
              clearInterval(setDate);
            }
          }, 1000);
        }
        this.fullscreenLoading = false;
      });
    }
  }
};
</script>
<style lang="less">
    .templateCheckPhone{
        text-align: center;
        .el-input-group__append, .el-input-group__prepend{background: #fff;border-radius: 0;}
        .el-input__inner{border-radius: 0;}
        .el-button{
            padding: 12px 10px;
        }
        .form{
            width: 400px;
            margin: 0 auto;
        }
        .templateCheckPhone-tap{
            width: 400px;
            background: #91856F;
            border-radius: 0;
            color: #fff;
            border:none;
            border-radius: 4px;
        }
    }
</style>


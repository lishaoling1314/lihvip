<template>
  <div class="chg_trans_password">
    <hr color="#DEDEDE" size="1px" />
    <div class="forgetPsd">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="125px" class="demo-ruleForm">
        <el-form-item label="手机号码">
          <span class="phone">{{_phone}}</span>
        </el-form-item>
        <el-form-item label="输入验证码" prop="code">
          <div class="code_box">

            <!-- <span @click="codeTap">获取验证码</span> -->
            <el-button @click="codeTap()" :disabled="disabled">{{codeText}}</el-button>
            <div class="border_left"></div>
            <el-input v-model="formData.code" maxlength="6" minlength="6" autocomplete="off"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="设置新交易密码" prop="passwd">
          <div class="psd_box">
            <el-input v-model="formData.passwd" type="password" autocomplete="new-password" maxlength="6" minlength="6" placeholder='请输入6位纯数字'></el-input>
          </div>
        </el-form-item>
        <el-form-item label="确认交易密码" prop="passwdQd">
          <div class="psd_box">
            <el-input v-model="formData.passwdQd" maxlength="6" type="password" autocomplete="new-password" minlength="6" placeholder='再次输入交易密码'></el-input>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span class="dialog-footer" @click="nextModify()">
      <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      提 交
    </span>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      formData: {
        code: '',
        passwd: '',
        passwdQd: ''
      },
      disabled: false, //是否禁用验证码
      rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        passwd: [{ required: true, message: '请输入交易密码', trigger: 'blur' }],
        passwdQd: [{ required: true, message: '请确认交易密码', trigger: 'blur' }]
      },
      codeText: '获取验证码'
    }
  },
  props: ['phone'],
  // mounted() {},
  computed: {
    //限制输入只能为数字
    _phone() {
      // var phone =
      // var mtel = this.phone.substr(0, 3) + '****' + this.phone.substr(7)
      // console.error(mtel)
      return JSON.parse(localStorage.getItem('user')).phone
    }
  },
  methods: {
    nextModify() {
      //下一步
      let _this = this
      if (this.formData.passwd != this.formData.passwdQd) {
        this.TapLoading = false
        this.$message.error('两次交易密码不一致')
        return false
      }

      if (this.formData.passwd.length < 6 || this.formData.passwdQd.length < 6) {
        this.TapLoading = false
        this.$message.error('交易密码长度不够')
        return false
      }
      // this.steps
      this.$get('user/setTradePasswd.do', {
        params: {
          code: this.formData.code,
          twoSuccKey: this.formData.twoSuccKey,
          passwd: this.formData.passwd,
          passwdQd: this.formData.passwdQd
        }
      }).then(({ data }) => {
        if (data.code == '0000') {
          this.$message({
            message: '交易密码设置成功!',
            type: 'success',
            duration: 2000
          })




          //设置交易密码成功之后改变sessionStorage值 
          let A = JSON.parse(localStorage.getItem('user'));
          A.isSetTradePassword = true
          localStorage.setItem("user", JSON.stringify(A));

          this.$emit('closeDialog')
          // this.$refs[formData].resetFields()
        }
      })
    },
    codeTap() {
      this.$get('sendCode.do', {
        params: {
          // phoneOremail: this._phone,
          type: 'passwdBack'
        }
      })
        .then(({ data }) => {
          // //console.log(data)
          if (data.code == '0000') {
            this.$message({
              message: '验证码发送成功，请注意查收！',
              type: 'success',
              duration: 1000
            })
            let T = this.codeText
            T = Number(60)
            let setDate = setInterval(() => {
              if (T >= 1) {
                T--
                this.codeText = T + 's'
                this.disabled = true
              } else {
                this.codeText = '重新获取'
                this.disabled = false
                clearInterval(setDate)
              }
            }, 1000)
            this.fullscreenLoading = false
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
        })
    }
  }
}
</script>
<style lang="less">
.el-dialog.chgtranspassword {
  .el-dialog__title {
    color: #91856f;
  }
}
.chg_trans_password {
  position: relative;
  hr {
    position: absolute;
    top: -30px;
    width: 100%;
  }
  .forgetPsd {
    width: 400px;
    margin: 0 auto;
    .code_box {
      border: 1px solid rgba(222, 222, 222, 1);
      overflow: hidden;
      .el-input {
        float: right;
        width: 160px;
        input {
          border: none;
          width: 100%;
        }
      }
      .border_left {
        width: 1px;
        height: 24px;
        background: #dedede;
        float: right;
        margin-top: 8px;
      }
      button {
        float: right;
        width: 110px;
        line-height: 40px;
        height: 40px;
        box-sizing: border-box;
        padding: 0;
        text-align: center;
        cursor: pointer;
        color: #333;
        border: none;
        font-size:12px;
      }
      button:hover {
        color: #91856f;
        background: none;
        border-radius: 0;
      }
    }
    .psd_box {
      border: 1px solid rgba(222, 222, 222, 1);
      .el-input {
        input {
          border: none;
          width: 100%;
        }
      }
    }
  }
  .dialog-footer {
    width: 350px;
    height: 40px;
    background: #91856f;
    margin-top: 30px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin-left: 105px;
  }
}
</style>
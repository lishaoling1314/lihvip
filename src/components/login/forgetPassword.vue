<template>
  <div class="forgetPassword">
    <!-- <template-head></template-head> -->

    <el-form
      ref="dataForm"
      :model="formData"
      label-width="80px"
      class="form"
      :rules="dataRule"
    >
      <div class="steps-main">
        <el-steps :active="steps" align-center>
          <el-step title="手机验证"></el-step>
          <el-step title="重置密码"></el-step>
          <el-step title="重置成功"></el-step>
        </el-steps>
      </div>
      
      <div v-if="steps==1?true:false">
        <el-form-item label prop="phone" label-width="0">
          <el-input placeholder="请输入手机号码" v-model="formData.phone" class="input-with-select">
             <div slot="prepend" class="input-slot">手机号码</div>
          </el-input>
        </el-form-item>
        <el-form-item label prop="code" label-width="0">
          <el-input placeholder="请输入验证码" v-model="formData.code">
            <div slot="prepend" class="input-slot">手机验证码</div>
            <el-button
              slot="append"
              @click="codeTap()"
              :disabled="disabled"
              v-loading.fullscreen.lock="fullscreenLoading"
              style="width:100px;padding:0;text-align:center;border-radius:0;"
            >{{codeText}}</el-button>
          </el-input>
        </el-form-item>
      </div>

      <div v-if="steps==2?true:false">
        <el-form-item label prop="passwd" label-width="0">
          <el-input placeholder="建议使用两种或者两种以上字符" v-model="formData.passwd" type="password">
            <div slot="prepend" class="input-slot">设置登录密码</div>
          </el-input>
        </el-form-item>
        <el-form-item label prop="passwdQd" label-width="0">
          <el-input placeholder="再次输入密码" v-model="formData.passwdQd" type="password">
            <div slot="prepend" class="input-slot">确认登录密码</div>
          </el-input>
        </el-form-item>
      </div>

      <div v-if="steps==3?true:false" class="successlogin">
        <img src="@/assets/img/success.png" alt>
        <p>修改成功</p>
        <p>{{count}}秒之后返回登录界面</p>
        <router-link to="/login" class="path">返回登录界面</router-link>
      </div>

      <el-button
        class="forgetPassword-tap"
        v-if="steps>=3?false:true"
        @click="nextModify()"
      >{{steps == 2 ? '提交' : "下一步"}}</el-button>
    </el-form>
    <!-- <template-footer></template-footer> -->
  </div>
</template>
<script>
import templateHead from '../component/template_head' //头部文件
import templateFooter from '../component/template_footer' //底部文件
import Cookies from 'js-cookie';
import Qs from "qs";
export default {
  data() {
    return {
      name: false, //调用头部，是否为login页面
      steps:1,
      count: 5, //3秒后
      fullscreenLoading: false, //loding
      codeText: "获取验证码",
      _intervalId:null,
      disabled: false, //是否禁用验证码
      formData: {
        selecttext: "",
        phone: "",
        code: "",
        twoSuccKey: "",
        passwd: "",
        passwdQd: ""
      },
      dataRule: {
        phone: [
          { required: true, message: "请输入手机号码！", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  mounted(){
    this.count = 5;
  },
  watch: {
    $route() {//切换路由初始化数据
      this.steps = 1;
      this.count = 1;
      this.codeText = '获取验证码';
      this.disabled = false;
      this.fullscreenLoading = false;
      this.formData = {};
      if(this._intervalId!=null){
        clearInterval(this._intervalId);
      }
    }
  },
  components: { templateHead,templateFooter },
  methods: {
    checkCode(){//校验验证码
        this.$get('checkCode.do',{
          params:{
            phone:this.formData.phone,
            type:'passwdBack',
            code:this.formData.code
          }
        }).then(({data})=>{
          this.fullscreenLoading = false;
          if( data.code=='0000' && data.twoSuccKey){
            this.formData.twoSuccKey = data.twoSuccKey
            this.steps++
          }
        })
    },
    nextModify() {
      this.fullscreenLoading = true;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.steps == 1) {
            this.checkCode();
            return false;
          }

          if (this.$point.isNull(this.formData.passwd) || this.$point.isNull(this.formData.passwdQd)) {
            this.fullscreenLoading = false;
            this.$message({ title: "错误", message: "密码不能为空！",type:'error' });
            return false;
          }
          if (this.formData.passwd != this.formData.passwdQd) {
            this.fullscreenLoading = false;
            this.$message({ title: "错误", message: "密码填写不一致！",type:'error' });
            return false;
          }
          if (
            this.formData.passwd.length < 6 ||
            this.formData.passwdQd.length < 6
          ) {
            this.fullscreenLoading = false;
            this.$message({ title: "错误", message: "密码长度不能少于6位数！",type:'error' });
            return false;
          }
          if (this.steps > 1) {
            this.stepsSubmit();
          }
        }
        this.fullscreenLoading = false;
      });
    },
    stepsSubmit() {



      
      let _this = this;

      let D = Qs.stringify({
        phone: this.formData.phone,
        code: this.formData.code,
        twoSuccKey: this.formData.twoSuccKey,
        passwd: this.formData.passwd,
        passwdQd: this.formData.passwdQd
      })


      this.$post("findPasswd.do",D).then(({ data }) => {
        if (data.code == "0000" && data.twoSuccKey) {
          this.formData.twoSuccKey = data.twoSuccKey;
          setTimeout(() => {
            this.steps++;
          }, 500);
          return false;
        }

        if (data.code == "0000") {
          this.steps++;
          this.$message({
            message: "找回密码成功！",
            type: "success"
          });





          this._intervalId = window.setInterval(() => {
            if(this.count<=0){
              _this.steps = 1;
              Cookies.remove('Gtoken');
              _this.$store.state.user = false;
              _this.$store.state.userinfo = {};
              localStorage.removeItem('user');
              localStorage.removeItem('userId')
              _this.formData = {};
              _this.$router.push("/login");
              clearInterval(this._intervalId);
              return false
            }
            if (this.count > 0) {
              this.count--;
            }
            this.fullscreenLoading = false;
          }, 1000);

        } 
      this.fullscreenLoading = false;
        
      });
    },
    codeTap() {
      //获取验证码
      this.fullscreenLoading = true;
      if (this.$point.isNull(this.formData.phone)) {
        this.fullscreenLoading = false;
        this.$message({ title: "错误", message: "请输入手机号码！",type:'error' });
        return false;
      } // else if (!/^1[34578]\d{9}$/.test(this.formData.phone)) {
      //   this.fullscreenLoading = false;
      //   this.$message({ title: "错误", message: "手机号码格式不正确！",type:'error' });
      //   return false;
      // }

      this.$get("sendCode.do", {
        params: {
          phoneOremail: this.formData.phone,
          type: "passwdBack"
        }
      })
        .then(({ data }) => {
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
        })
    }
  }
};
</script>
<style lang="less">
  .forgetPassword{
    .el-form-item__error{
      top:55px;
      left: 60px;
    }
    .el-input-group__prepend{text-align: center;img{width: 18px;} }
    .el-input-group__append, .el-input-group__prepend{border-radius: 0;text-align: center;}
    .el-input__inner{border-radius: 0;}
  }
</style>
<style lang="less">

.forgetPassword {
   width: 100%;
    background: none;
    background-size:100% 100%; 
    /*background-position-y: 120px;*/
    min-height: calc(100vh - 420px);
    background: #fff;
    padding-top:0; 
    box-sizing: border-box;
    text-align: center;
    .el-input-group__prepend{width: 100px;padding: 0;text-align: center;border-radius: 0;.input-slot{margin: 0 auto;}}
  .form {
    display: inline-block;
    z-index: 99;
    width: 530px;
    /*margin: 150px auto;*/
    padding: 50px 80px;
    position: relative;
    top:15px;
    box-sizing: border-box;
    margin: 0 auto;
    input {
      height: 50px;
      line-height: 50px;
    }
    .steps-main {
      margin-bottom: 50px;
    }
    .successlogin {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      img {
        width: 91px;
      }
      p:nth-child(2) {
        color: #28ae3d;
        font-size: 31px;
        margin: 15px 0;
      }
      p:nth-child(3) {
        color: #bcbcbc;
        font-size: 16px;
      }
      .path {
        color: #fff;
        width: 122px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: #91856F;
        margin-top: 15px;
      }
    }
  }
  .forgetPassword-tap {
    width: 100%;
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    background: #91856F;
    border: none;
    color: #fff;
    font-size: 16px;
    border-radius: 0;
    margin-bottom: 20px;
  }
  .el-select .el-input {
    width: 110px;
  }
  .input-slot {
    text-align: center;
    color: #c0c4cc;
    background: #fff;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background: #fff;
  }
}

.forgetPassword {
  .el-step__head.is-finish {
    border-color: #28ae3d;
    .el-step__icon{background:#28ae3d;color: #fff;border:none; }
  }
  .el-step__title.is-finish {
    color: #28ae3d;
  }
  .el-step__title.is-process {
    color: #c0c4cc;
    font-weight: normal;
  }
  .el-step__head.is-process {
    color: #c0c4cc;
    border-color: #c0c4cc;
  }
  
}
</style>
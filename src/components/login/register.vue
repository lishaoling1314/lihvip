<template>
  <div class="register">
    <!-- <template-head></template-head> -->
    <el-form
      ref="form"
      :model="formData"
      label-width="80px"
      class="form"
      @keyup.enter.native="submitTap()"
    >
      <div class="steps-main">
        <el-steps :active="steps" align-center>
          <el-step title="验证手机号"></el-step>
          <el-step title="填写信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
      </div>
      <div v-if="steps==1?true:false">
        <div class="input-item">
          <el-input
            placeholder="请输入手机号码"
            v-model="formData.phone"
            class="input-with-select"
            prop="phone"
            type="number"
          >
            <div slot="prepend" class="input-slot">手机号码</div>
          </el-input>
        </div>
        <div class="input-item">
          <el-input placeholder="请输入验证码" v-model="formData.code" prop="code">
            <div slot="prepend" class="input-slot">验证码</div>
            <el-button
              slot="append"
              @click="codeTap()"
              :disabled="disabled"
              v-loading.fullscreen.lock="fullscreenLoading"
            >{{codeText}}</el-button>
          </el-input>
        </div>
        <div class="input-item">
          <el-input placeholder="请输入推荐人手机号码(选填)" v-model="formData.initUserID" :disabled="initUserIDDisabled">
            <div slot="prepend" class="input-slot">推荐人</div>
          </el-input>
        </div>
      </div>
      <div v-if="steps==2?true:false">
        <div class="input-item">
          <el-input
            placeholder="建议使用两种或两种以上字符"
            v-model="formData.passwd"
            prop="passwd"
            type="password"
          >
            <div slot="prepend" class="input-slot">设置登录密码</div>
          </el-input>
          <p>建议使用字母数字和符号两种及两种以上的组合，6-20个字符</p>
        </div>
        <div class="input-item">
          <el-input
            placeholder="确认登录密码"
            v-model="formData.passwdQd"
            prop="passwdQd"
            type="password"
          >
            <div slot="prepend" class="input-slot">确认登录密码</div>
          </el-input>
        </div>

        <div class="input-item">
          <!-- <el-checkbox-group   >
            
          </el-checkbox-group> -->
          <el-checkbox label="" name="type" style="float:left;" :checked="formData.type" @change="handleCheckedCitiesChange"></el-checkbox>
          <span class="Agreement">《
            <span @click="layerTap(0)">用户协议、</span>  
            <span @click="layerTap(1)">法律申明、</span>  
            <span @click="layerTap(2)">隐私权政策、</span>  
            <span @click="layerTap(3)">平台服务协议</span>  
          》</span>
        </div>
      </div>

      <div v-if="steps==3?true:false" class="successlogin">
        <img src="@/assets/img/success.png" alt>
        <p>注册成功</p>
        <p>{{count}}秒之后返回登录界面</p>
        <router-link to="/login">返回登录界面</router-link>
      </div>

      <el-button
        class="register-tap"
        v-if="steps>=3?false:true"
        @click="submitTap()"
      >{{steps == 2 ? '提交' : "下一步"}}</el-button>
      <div class="push-login" v-if="steps==1|| steps==2">
        已有账号？<router-link to="/login">登录</router-link>
      </div>
    </el-form>
    <!-- 用户协议 -->
    <el-dialog :visible.sync="istemplateContract" width="1200px"><template-contract :layer="layerType"></template-contract></el-dialog>
    <!-- <template-footer></template-footer> -->
  </div>
</template>
<script>
import Cookies from "js-cookie";
import Qs from "qs";
import { setInterval, setTimeout } from "timers";
import templateHead from '../component/template_head' //头部文件
import templateFooter from '../component/template_footer' //底部文件
import templateContract from "@/components/template/template-contract";
export default {
  data() {
    return {
      initUserIDDisabled:false,
      istemplateContract:false,//用户协议
      layerType:"",//协议
      text:'',
      name: false, //调用头部，是否为login页面
      steps: 1,
      count:5,
      fullscreenLoading: false, //loding
      codeText: "获取验证码",
      disabled: false, //是否禁用验证码
      formData: {
        type: false, //用户注册协议
        phone: "", //手机号码
        code: "", //手机号码
        twoSuccKey: "", //第二步成功KEY
        passwd: "", //登录密码
        passwdQd: "", //确认登录密码
        initUserID: "" //推荐人手机号码或者昵称
      }
    };
  },
  watch: {
    $route() {//切换路由初始化数据
      this.steps = 1;
      this.codeText = '获取验证码';
      this.disabled = false;
      this.fullscreenLoading = false;
      this.formData = {};
       this.formData.type = false
      if(localStorage.getItem('initUserID')){
        this.initUserIDDisabled = true
        this.formData.initUserID = localStorage.getItem('initUserID');
      }
      if(this._intervalId!=null){
        clearInterval(this._intervalId);
      }
    }
  },
  mounted(){
    if(this.$router.history.current.query.initUserID){//携带分享ID进入到注册界面
        localStorage.setItem('initUserID',this.$router.history.current.query.initUserID)
        this.initUserIDDisabled = true
        this.formData.initUserID = localStorage.getItem('initUserID');
    }
    this.count = 5;
  },
  components: { templateHead,templateFooter,templateContract },
  methods: {
    handleCheckedCitiesChange(v){
      this.formData.type = v
    },
    checkCode(){//校验验证码
        this.$get('checkCode.do',{
          params:{
            phone:this.formData.phone,
            type:'register',
            code:this.formData.code
          }
        }).then(({data})=>{
          if( data.code=='0000' && data.twoSuccKey){
            this.formData.twoSuccKey = data.twoSuccKey
            this.steps++
          }
        })
    },
    layerTap(type){//用户协议
      this.layerType = type;
      this.istemplateContract = true
    },
    submitTap() {
      //提交表单

      this.fullscreenLoading = true;
      



      // let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      // if(!reg.test(this.formData.phone)){
      //   this.loading = false;
      //   this.$message({ title: "错误", message: "手机号码不符合规则!",type:'error' });
      //   return false;
      // }



      if (this.$point.isNull(this.formData.phone)) {
        this.$message({ title: "错误", message: "手机号码不能为空！",type:'error' });
        this.fullscreenLoading = false;
        return false;
      }


      if(this.formData.phone.length!==11){
        this.$message({ title: "错误", message: "手机号码不符合规则!",type:'error' });
        this.fullscreenLoading = false;
        return false;
      } 



      if ((this.formData.phone == this.formData.initUserID) && this.formData.phone != '' ) {
        this.$message({ title: "错误", message: "手机号码不能与推荐人一致",type:'error' });
        this.fullscreenLoading = false;
        return false;
      }

      
      if (this.$point.isNull(this.formData.code)) {
        this.fullscreenLoading = false;
        this.$message({ title: "错误", message: "请输入验证码！",type:'error' });
        return false;
      }

      

      if (this.steps == 1) {
        //执行第一步
        this.fullscreenLoading = false;
        this.checkCode();
        return false;
      }


      if (this.formData.passwd.length < 6 || this.formData.passwdQd.length < 6) {
        this.fullscreenLoading = false;
        this.$message({ title: "错误", message: "密码长度不能少于6位数！",type:'error' });
        return false;
      }

      if (this.$point.isNull(this.formData.passwd) || this.$point.isNull(this.formData.passwdQd)) {
        this.fullscreenLoading = false;
        this.$message({ title: "错误", message: "请输入密码！",type:'error' });
        return false;
      }

      if (this.formData.passwd != this.formData.passwdQd) {
        this.fullscreenLoading = false;
        this.$message({ title: "错误", message: "输入密码不一致！",type:'error' });
        return false;
      }

      if (!this.formData.type) {
        this.$message({ title: "错误", message: "请勾选用户注册协议！",type:'error' });
        this.fullscreenLoading = false;
        return false;
      }

      

      if (this.steps == 2) {
        //执行第二步
        this.fullscreenLoading = false;
        this.stepsSubmit();
      }
    },
    stepsSubmit() {
      //封装请求
      let _this = this;
     let D = Qs.stringify({
         phone: this.formData.phone,
        code: this.formData.code,
        twoSuccKey: this.formData.twoSuccKey,
        passwd: this.formData.passwd,
        passwdQd: this.formData.passwdQd,
        initUser: this.formData.initUserID
      })



      this.$post('regUser.do', D).then(({ data }) => {
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 500);

        if (data.twoSuccKey) {
          //第一步
          this.formData.twoSuccKey = data.twoSuccKey;
          setTimeout(() => {
            this.steps++;
          }, 1000);
          return false;
        }

        if (data.code == "0000" && data.token) {
          Cookies.set("Gtoken", data.token); //保存token
          this.$store.commit("handleUserName", data.user); //存用户数据
          this.$store.state.user = true;
          this.$message({
            message: "注册成功！",
            type: "success",
            onClose() {
              localStorage.removeItem('initUserID');
              _this.formData = {};
              _this.steps = 1;
            }
          });

          this._intervalId = window.setInterval(() => {
            if(this.count<=0){
              _this.steps = 1;
              _this.formData = {};
              _this.$router.push("/user");
              clearInterval(this._intervalId);
              return false
            }
            if (this.count > 0) {
              this.count--;
            }
          }, 300);
        }
      });
    },
    codeTap() {
      //获取验证码
      this.fullscreenLoading = true;
      if (this.$point.isNull(this.formData.phone)) {
        this.$message({ title: "错误", message: "请输入手机号码！",type:'error' });
        this.fullscreenLoading = false;
        return false;
      }

      this.$get("sendCode.do", {
        params: {
          phoneOremail: this.formData.phone,
          type: "register"
        }
      })
        .then(({ data }) => {
          ////console.log(data)
          if (data.code == "0000") {
            this.$message({
              message: "验证码发送成功",
              type: "success"
            });
            // this.codeText = "重新获取";
            let T = this.codeText;
            T = Number(60);
            let setDate = window.setInterval(() => {
              //console.log(T)
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
        .catch(err => {
          ////console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
  .register{
    .el-form-item__error{
      top:55px;
      left: 60px;
    }
    .el-input-group__append, .el-input-group__prepend{width: 100px;box-sizing:border-box;border-radius: 0;padding: 0;width:100px;text-align: center;}
    .el-input-group__prepend{ img{width: 18px;} }
    .el-input__inner{border-radius: 0;}
  }
</style>
<style lang="less">
.register {
   width: 100%;
    background:#fff;
    background-size:100% 100%; 
    /*background-position-y: 120px;*/
     min-height: calc(100vh - 420px);
    padding-top:0; 
    box-sizing: border-box;
    text-align: center;
    .el-checkbox{
      margin-right: 0;
      margin-top: -1px;
    }
  .form {
  	top: 0;
    position: relative;
    z-index: 99;
    width: 530px;
   	display: inline-block;
    margin: 0 auto;
    padding:50px 80px;
    box-sizing: border-box;
    .input-item {
      margin-top: 10px;
      text-align: left;
      font-size: 12px;
      p {
        font-size: 12px;
        color: #cdcdcd;
        padding: 8px 0 0 10px;
        box-sizing: border-box;
      }
      input {
        height: 50px;
        line-height: 50px;
      }
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
      a{
        width: 122px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        background: #91856F;
        margin-top: 20px;
      }
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
    }
    .el-checkbox__label {
      color: #91856F;
    }
  }
  .register-tap {
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
  .push-login{
    a{color: #856020;}
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-slot {
    width: 100px;
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

.register {
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
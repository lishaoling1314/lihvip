<template>
    <div class="login">
        
        <el-form ref="dataForm" :model="formData" label-width="80px" class="form"  @keyup.enter.native="submitTap()" autocomplete="off">
            <div class="login-code">
              <div :class="switchLogin?'switch-login active':'switch-login'" @click="switchTap">验证码登录</div>
              <span style="float:left;margin:0 20px;color:#91856F;">|</span>
              <div :class="!switchLogin?'switch-login active':'switch-login'" @click="switchTap">密码登录</div>
              <div style="clear:both"></div>
            </div>
            <div v-if="switchLogin" class="code-login"><!-- 验证码登录 -->
              <div class="input-item">
                <el-input
                  placeholder="请输入手机号码"
                  v-model="formData.phonecode"
                  class="input-with-select input"
                >
                  <div slot="prepend" class="input-slot">手机号码</div>
                </el-input>
              </div>
              <div class="input-item">
                <el-input placeholder="请输入验证码" v-model="formData.code" class="input">
                  <div slot="prepend" class="input-slot">验证码</div>
                  <el-button
                    slot="append"
                    @click="codeTap()"
                    :disabled="disabled"
                  >{{codeText}}</el-button>
                </el-input>
              </div>
            </div>

            <div v-else><!-- 密码登录 -->
              <div class="input-item">
                <el-input
                  placeholder="请输入手机号码"
                  v-model="formData.phone"
                  class="input-with-select input"
                  prop="phone"
                  type="text"
                >
                  <div slot="prepend" class="input-slot">手机号码</div>
                </el-input>
              </div>
              <div class="input-item">
                <el-input
                  placeholder="请输入登录密码"
                  v-model="formData.passwd"
                  class="input-with-select input"
                  prop="passwd"
                  type="password"
                >
                  <div slot="prepend" class="input-slot">密码</div>
                </el-input>
              </div>
            </div>



            <div class="path l" v-if="!switchLogin">
                <router-link to="/forgetPassword">忘记密码?</router-link>
            </div>
            <div style="clear:both"></div><!-- 兼容IE9 -->
            <el-button class="login-tap" @click="submitTap()" :style="{marginTop:switchLogin?'20px':'40px'}">登录</el-button>
            <div class="path r">
                <router-link to="/register">免费注册</router-link>
            </div>
        </el-form>
        <!-- <template-footer></template-footer> -->
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import Qs from "qs";
export default {
    data(){
        return {
            name:true,//调用头部，是否为login页面
            switchLogin:true,//登录方式
            codeText: "获取验证码",
            disabled: false, //是否禁用验证码
            formData:{
                phone:"",//手机号码、邮箱
                passwd:'',
                code:'',
                phonecode:''
            }
        }
    },
    methods:{
    switchTap(){
        this.switchLogin = !this.switchLogin
    },
    submitTap(){//提交
        if(this.switchLogin){
          this.codeLogin();//验证码登录
        }else{
          this.phoneLogin();//普通登录
        }
    },
    codeLogin(){//验证码登录
      this.loading = this.$loading({ text: '' })
      if(this.$point.isNull(this.formData.phonecode)){
         this.loading.close()
          this.$message({ title: "错误", message: "手机号码不能为空!",type:'error' });
          return false;
      } 

      if(this.formData.phonecode.length!==11){
        this.loading.close()
        this.$message({ title: "错误", message: "手机号码不符合规则!",type:'error' });
        return false;
      } 

      if(this.$point.isNull(this.formData.code)){
          this.loading.close()
          this.$message({ title: "错误", message: "验证码不能为空!",type:'error' });
          return false;
      }
      this.loginRequst()
    },
    phoneLogin(){//普通登录
    
    this.loading = this.$loading({ text: '' })
    if(this.$point.isNull(this.formData.phone)){
        this.loading.close()
        this.$message({ title: "错误", message: "手机号码不能为空!",type:'error' });
        return false;
    } 


    if(this.formData.phone.length!==11){
      this.loading.close()
      this.$message({ title: "错误", message: "手机号码不符合规则!",type:'error' });
      return false;
    } 



    if(this.$point.isNull(this.formData.passwd)){
        this.loading.close()
        this.$message({ title: "错误", message: "密码不能为空!",type:'error' });
        return false;
    } 





    if(this.formData.passwd.length<6){
        this.loading.close()
          this.$message({ title: "错误", message: "密码不符合规则!",type:'error' });
        return false;
    }

     
      this.loginRequst()
      // ////console.log(Cookies.get('token'))

    },
    loginRequst(){
      
          let D;
          ////console.log(this.formData)
          if(this.switchLogin){
            D = {
              phone: this.formData.phonecode,
              code: this.formData.code
            }
          }else{
            D = {
              phone: this.formData.phone,
              passwd: this.formData.passwd
            }
          }
          ////console.log(D)
          D = Qs.stringify(D)

          
          this.$post('login.do', D).then(({ data }) => {
            if (data.code == '0000') {
              Cookies.set('Gtoken', data.token); //保存Gtoken
              data.user.isAgentSale = data.isAgentSale;//初始化为true 

              this.$store.commit('watchIsAgentSale', data.user.isAgentSale) //是否为销售
              this.$store.commit('handleUserName', data.user) //存用户数据
              
              this.$store.state.user = true
              localStorage.getItem('initUserID') ? localStorage.removeItem('initUserID') : '' //用户登录以后清除分享ID
              
              setTimeout(() => {
                this.loading.close()
                if (this.$router.history.current.query.goodsId) {
                  //未登录点击购买商品携带参数，登录之后直接跳转到订单
                  this.$router.push({
                    name: 'goodsDetalis',
                    query:{goodsId:this.$router.history.current.query.goodsId,periodId:this.$router.history.current.query.periodId,activityType:this.$router.history.current.query.activityType}
                  })
                } else {
                  this.$router.push('/')
                }
              }, 500)
            }
             this.loading.close()
          })
    },
    codeTap() {
      //获取验证码
    this.loading = this.$loading({ text: '' })

      
      if (this.$point.isNull(this.formData.phonecode)) {
        this.$message({ title: "错误", message: "请输入手机号码！",type:'error' });
       this.loading.close()
        return false;
      }
      

      if(this.formData.phonecode.length!==11){
        this.loading.close()
        this.$message({ title: "错误", message: "手机号码不符合规则!",type:'error' });
        return false;
      }

      
      this.$get("sendCode.do", {
        params: {
          phoneOremail: this.formData.phonecode,
          type: "login"
        }
      }).then(({ data }) => {
          ////console.log(data)
          if (data.code == "0000") {
            this.$message({
              message: "验证码发送成功",
              type: "success"
            });
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
          this.loading.close()
        })
        .catch(err => {
          ////console.log(err);
        });
    }
  }
}
</script>
<style lang="less">
  .login{
    .el-form-item__error{
      top:55px;
      left: 60px;
    }
    // .el-input-group__append, .el-input-group__prepend{width: 50px;box-sizing:border-box;border-radius: 0;padding: 0;}
    // .el-input-group__prepend{ img{width: 18px;} }
    // .el-input__inner{border-radius: 0;}
    .el-input-group--prepend .el-input__inner, .el-input-group__append{border-radius: 0;}
    .el-input-group__append, .el-input-group__prepend{width: 100px;box-sizing:border-box;border-radius: 0;padding: 0;background: #fff;text-align: center;}
  }
</style>

<style scoped lang="less">
.login {
  .el-form-item__error{
    top:55px;
    left: 60px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-input__inner {
    height: 50px;
  }
}
.login {
  width: 100%;
  background: #fff;
  background-size: 100% 100%;
  /*background-position-y: 120px;*/
  min-height: calc(100vh - 420px);
  // overflow: hidden;
  padding-top: 0;
  box-sizing: border-box;
  text-align: center;
  .login-code{
    margin-bottom: 30px;
    .switch-login{
      float: left;
      color: #CCCCCC;
      cursor: pointer;
      font-size: 16px;
    }
    .switch-login.active{
      color: #91856F;
      font-weight: 600;
    }
  }
  .form {
    display: inline-block;
    position: relative;
    z-index: 99;
    width: 480px;
    top: 20px;
    /*margin: 150px auto;*/
    padding: 50px 80px;
    box-sizing: border-box;
    .input-item {
      margin: 10px 0;
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
  }
  .el-input__inner,
  .el-input-group__prepend {
    height: 50px;
    box-sizing: border-box;
  }
  .input {
    margin: 10px 0;
  }
  .login-tap {
    width: 320px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    background: #91856f;
    border: none;
    color: #fff;
    font-size: 16px;
    border-radius: 0;
    margin-bottom: 10px;
  }
}
.path {
  // display: inline-block;
 
  a {
    color: #bebebe;
  }
  a:hover {
    color: #91856f;
  }
}
.path.l {
  float: right;
}
.path.r {
  a {
    color: #856020;
  }
}
.el-input-group__prepend {
  box-sizing: border-box;
}
</style>
<template>
    <div class="cash w-1200">
        <template-crumbs :crumbsdata="crumbs"></template-crumbs>
        <div class="cash-content">
            <!-- 设置成功交易密码 -->
            <div class="successPassword user-shadow" v-if="!modifyPassword && isSetTradePasswd">
                    <p>您已成功设置交易密码</p>
                    <el-button @click="modifyPassword = true">修改交易密码</el-button>
            </div>



            <!-- 没有设置交易密码 -->
            <div class="nosuccessPassword user-shadow" v-if="!isSetTradePasswd">
                
                <el-form ref="nosuccessPasswordform" :model="nosuccessPassword">
                    <el-form-item label="设置交易密码">
                        <el-input v-model="_passwd" type="password" maxlength="6" minlength="6" placeholder='请输入6位纯数字'></el-input>
                    </el-form-item>
                    <el-form-item label="确认交易密码">
                        <el-input v-model="_passwdQd" type="password" maxlength="6" minlength="6" placeholder='再次输入交易密码'></el-input>
                    </el-form-item>
                    <el-button class="formTap" @click="nextModify()">设置</el-button>
                </el-form>
            </div>

            

            <!-- 找回交易密码 -->
            <div class="cash-main user-shadow" v-if="modifyPassword">
                <div class="cash-steps">
                    <el-steps :active="steps" finish-status="success" :space="300" align-center>
                        <el-step title="手机验证"></el-step>
                        <el-step title="重置密码"></el-step>
                        <el-step title="重置成功"></el-step>
                    </el-steps>
                </div>

                <div class="steps-form">

                    <el-form ref="form" :model="formData" label-width="120px" v-if="steps==3?false:true">

                        <!-- 11111111111111111 -->
                        <div v-if="steps==1?true:false">
                            <el-form-item label="手机号码">
                                <el-input v-model="formData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="formData.code" style="width:100%;"></el-input>
                                <el-button @click="codeTap()" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">{{codeText}}</el-button>
                            </el-form-item>
                        </div>




                        <!-- 222222222222222222 -->
                        <div v-if="steps==2?true:false">
                            <el-form-item label="新密码">
                                <el-input v-model="_passwd" type="password" maxlength="6" minlength="6" placeholder='请输入6位纯数字'></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码">
                                <el-input v-model="_passwdQd" type="password" maxlength="6" minlength="6" placeholder='再次输入交易密码'></el-input>
                            </el-form-item>
                        </div>

                        <el-form-item label="">
                            <el-button class="formTap" @click="nextModify()" :loading="TapLoading">下一步</el-button>
                        </el-form-item>

                    </el-form>
                    <!-- 33333333333333333333333 -->
                    <div v-if="steps==3?true:false" class="steps-3">
                        <img src="@/assets/img/success.png" alt="">
                        <p class="p1">设置成功</p>
                        <router-link to="/" class="path">返回首页</router-link>
                    </div>
                </div>




            </div>
        </div>
    </div>
</template>
<script>
import templateCrumbs from '@/components/component/template_crumbs';
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            TapLoading:false,//下一步loadding
            fullscreenLoading:false,
           codeText:"获取验证码",
            disabled:false,//是否禁用验证码
            isSetTradePasswd:false,//是否设置过交易密码
            modifyPassword:false,//是否修改交易密码
            nosuccessPassword:{//直接设置交易密码

            },
            formData:{
                phone:"",
                code:"",
                twoSuccKey:'',
                passwd:"",
                passwdQd:""
            },
            btnDisabled:false,//验证码禁用
            steps:1,//步骤条
            crumbs:[
                {id:0,name:"个人中心",path:"/user"},
                {id:1,name:"交易密码",path:"/transactionPassword"},
            ]
        }
    },
    mounted(){
        this.isSetTradePasswd = this.$router.history.current.query.isSetTradePasswd
        // this.isSetTradePasswd = false
    },
    computed:{//限制输入只能为数字
        _passwd: {
            set(value) {
                this.formData.passwd = value;
            },
            get() {
                return this.formData.passwd.replace(/[^0-9]+/g,'')
            }
        },
        _passwdQd: {
            set(value) {
                this.formData.passwdQd = value;
            },
            get() {
                return this.formData.passwdQd.replace(/[^0-9]+/g,'')
            }
        },
    },
    components:{
        templateCrumbs
    },
    methods:{
        nextModify(){//下一步
            let _this = this
            this.TapLoading = true
            if(this.formData.passwd != this.formData.passwdQd){
                this.TapLoading = false;
                this.$message.error('两次交易密码不一致');
                return false;
            }

            if(this.formData.passwd.length<6 || this.formData.passwdQd.length<6){
                this.TapLoading = false;
                this.$message.error('交易密码长度不够');
                return false;
            }
            // this.steps
           this.$get('user/setTradePasswd.do',{
               params:{
                   code:this.formData.code,
                   twoSuccKey:this.formData.twoSuccKey,
                   passwd:this.formData.passwd,
                   passwdQd:this.formData.passwdQd
               }
           }).then(({data})=>{
               
            //    passwd:"",
            //     passwdQd:""
            // let reg = /^[0-9]+$/;
            // if(reg.test(number))
               if(!this.isSetTradePasswd &&data.code=='0000' ){
                    this.$message({
                        message: '交易密码设置成功!',
                        type: 'success',
                        duration:2000,
                        onClose(){
                            _this.TapLoading = false;
                            _this.$router.push('/user')
                        }
                    });
               }
               if(data.code=='0000' && data.twoSuccKey){
                   
                   this.formData.twoSuccKey = data.twoSuccKey
                   setTimeout(()=>{
                       _this.TapLoading = false;
                       this.steps++
                   },500)
                   return false;
               }else if(data.code=='0000'){
                   this.$message({
                        message: '交易密码设置成功!',
                        type: 'success',
                        duration:2000
                    });
                   setTimeout(()=>{
                       _this.TapLoading = false;
                       this.steps++
                   },500)
               }else{
                    this.TapLoading = false;
               }

           })
        }, 
        codeTap(){//获取验证码
            
            this.fullscreenLoading = true;
            
            if(this.formData.phone == ''){
                this.fullscreenLoading = false;
                this.$message.error('请输入手机号码！');
                return false;
            }
            
            

            this.$get('sendCode.do',{
                params:{
                    phoneOremail:this.formData.phone,
                    type:'passwdBack'
                }
            }).then(({data})=>{
                // //console.log(data)
                this.$message({
                        message: '验证码发送成功，请注意查收！',
                        type: 'success',
                        duration:1000
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


                    this.fullscreenLoading = false;
            }).catch((err)=>{
                this.fullscreenLoading = false;
            })
        },
    }
}
</script>
<style lang="less">
    .nosuccessPassword{
        .el-form{
            width: 350px;
            margin: 30px auto;
// 
        }
        .el-form-item{
            width: 350px;
            border:1px solid #ccc;
            .el-form-item__label{
                font-size: 12px;
                width: 110px;
                padding: 0;
                text-align: center;
            }
            .el-input__inner{
                border:none;
                border-left: 1px solid #ccc;
                border-radius: 0;
            }
           
        }
        .el-button{
            width:100%;
            border-radius: 0;
            color: #fff;
            background: #91856F;
            border: none;
        }
        .el-form-item__content{display: flex;}
    }
    .successPassword{
        height: 480px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            font-size: 20px;
            color: #515151;
        }
        button{
            background: #91856F;
            border: none;border-radius: none;
            color: #fff;
            margin-top: 30px;
        }
        .el-button:focus, .el-button:hover{
            background-color: #e44c5d;
            border:none;
            border-radius: none;color: #fff;
        }
    }
    .cash-steps{
        text-align: center;
        margin-top: 30px;
    }
    .el-steps--horizontal{
        justify-content: center;
    }
    .steps-form{
        width: 500px;
        justify-content: center;
        margin: 50px auto;
        .formTap{
            width: 100%;
            height: 42px;
            background: #91856F;
            line-height: 42px;
            text-align: center;
            color: #fff;
            padding: 0;
            border:none;
            border-radius: 0;
            font-size: 16px;
            margin-left: 0 !important;
        }
        .el-form-item__content{
            display: flex;
            .thisCard{
                flex-basis: 50%;
                height:66px;
                max-width: 250px;
                min-width: 250px;
                flex:1;
                border:1px solid  #91856F;
                margin-right: 20px;
                text-align: center;
                justify-content: center;
                align-items: center;
                line-height: 66px;
            }
            .addCard{
                background: #F1F1F1;
                text-align: center;
                justify-content: center;
                align-items: center;
                line-height: 66px;
                height:66px;
                flex-basis:50%;
                text-align: center;
            }
        }

    }
    .cash-main .el-form-item__content{
        display: flex;
    }

    .steps-3{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            margin: 10px 0;
        }
        img{
            width: 109px;
            margin-bottom: 10px;
        }
        .p1{
            color: #28AE3D;
            font-size: 24px;
        }
        .p2{
            font-size: 16px;
            color: #BCBCBC;
        }
        .path{
            width: 149px;
            height: 36px;
            margin-top: 20px;
            line-height: 36px;
            text-align: center;
            border:1px solid #91856F;
            background: none;
            color: #91856F;
            font-size: 16px;
        }
    }

    .cash-main .el-form-item__content .el-button{margin-left: 20px;}
</style>
<template>
    <div class="cash w-1200">
        <template-crumbs :crumbsdata="crumbs"></template-crumbs>
        <div class="cash-content">
            <div class="cash-steps user-shadow">
                <el-steps :active="steps" finish-status="success" :space="300" align-center>
                    <el-step title="验证身份"></el-step>
                    <el-step title="申请提现"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <div class="cash-main user-shadow">
                <div class="tiele" v-if="steps==1?true:false">为确定是你本人操作，请完成以下验证</div>


                <div class="steps-form">
                    <el-form ref="form" :model="formData" label-width="80px" v-if="steps==3?false:true">

                        <!-- 11111111111111111 -->
                        <div v-if="steps==1?true:false">
                            <el-form-item label="手机号码">
                                <el-input v-model="formData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input v-model="formData.code" style="width:100%;"></el-input>
                                <el-button :disabled="btnDisabled">获取验证码</el-button>
                            </el-form-item>
                        </div>




                        <!-- 222222222222222222 -->
                        <div v-if="steps==2?true:false">
                            <el-form-item label="提现金额">
                                <el-input v-model="formData.jine" style="width:250px;margin-right:20px;"></el-input>
                                <p>可提余额：￥1000.00</p>
                            </el-form-item>
                            <el-form-item label="手续费">
                                <el-input v-model="formData.shouxufei" style="width:250px;margin-right:20px;"></el-input>
                                <div>?</div>
                            </el-form-item>
                            <el-form-item label="提现到" class="cash-input">
                                <div class="thisCard">招商银行</div>
                                <div class="addCard">添加新的银行卡</div>
                            </el-form-item>
                        </div>

                        <el-form-item label="">
                            <el-button class="formTap">确认</el-button>
                        </el-form-item>

                    </el-form>
                    <!-- 33333333333333333333333 -->
                    <div v-if="steps==3?true:false" class="steps-3">
                        <img src="@/assets/img/success.png" alt="">
                        <p class="p1">提现申请成功</p>
                        <p class="p2">款项将会在T+7工作日到账，请留意短信或者平台通知</p>
                        <router-link to="/" class="path">返回首页</router-link>
                    </div>
                </div>


                <div class="cash-Explain" v-if="steps==1?true:false">
                    <p>没收到短信验证码？</p>
                    <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</p>
                    <p>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</p>
                    <p>3、如果手机已丢失或停用， 请联系客服人工处理。</p>
                    <p>4、您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
                </div>


            </div>
        </div>
    </div>
</template>
<script>  
import templateCrumbs from '@/components/component/template_crumbs';
export default {
    data(){
        return {
            formData:{
                phone:"",
                code:""
            },
            btnDisabled:false,//验证码禁用
            steps:2,//步骤条
            crumbs:[
                {id:0,name:"个人中心",path:"/user"},
                {id:1,name:"提现",path:"/address"},
            ]
        }
    },
    components:{
        templateCrumbs
    }
}
</script>
<style lang="less">
    .cash-steps{
        text-align: center;
    }
    .el-steps--horizontal{
        justify-content: center;
    }
    .cash-main{
        .tiele{
            padding: 0 20px;
            box-sizing:border-box;
            width: 100%;
            height: 50px;
            line-height: 50px;
            color: #333333;
            font-weight: bold;
            background: #F1F1F1;
        }
        
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
    .cash-Explain{
        margin: 200px 0 20px 20px;
        p{
            color: #333333;
            line-height: 24px;
        }
        p:nth-child(1){
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
            color: #333333;
        }
    }
</style>
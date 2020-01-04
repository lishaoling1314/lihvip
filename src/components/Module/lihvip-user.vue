<template >
    <div class="w-1200 minh">
       <div class="v-contact clearfix mt20">
           <div class="vleft">
               <span class="vuser">
                   <img src="@/assets/img/user.png"/>
               </span>
               <div class="vtxt">
                   <h6>13312345678</h6>
                   <span class="vpic">
                       VIP
                   </span>
                   <span class="vrouter">
                        <router-link to="" >
                            购买会员礼包升级 >
                        </router-link>
                        <router-link to="" >
                            免费升级 >
                        </router-link>
                   </span>
               </div>
               <ul class="vlist">
                   <li v-for="(item,index) in vlist" :key="index" @click="vtap(index)" :class="index==vindex?'active':''">
                      {{item}}
                   </li>             
               </ul>
           </div>
           <div class="vright" v-if="vindex==0">
                <h6>VIP会员专属权益</h6>
                <p class="vrtool">您当前已享有该权益<router-link to="/lihvipUserCopy">权益规则<i class="i-m"></i></router-link></p>
                <ul class="v-list">
                    <li>
                        <img src="@/assets/img/v100.png" />
                        <em>邀请有奖</em>
                        <p>高至750元/人</p>
                    </li>
                    <li>
                        <img src="@/assets/img/v101.png" />
                        <em>专享折扣</em>
                        <p>低至9.5折</p>
                    </li>
                    <li>
                        <img src="@/assets/img/v102.png" />
                        <em>购物返现 </em>
                        <p>高至2%</p>
                    </li>
                </ul>
           </div>
           <div class="vright" v-else-if="vindex==1">
                <h6>黄金会员专属权益</h6>
                <p class="vrtool">您当前已享有该权益<router-link to="/lihvipUserCopy">权益规则<i class="i-m"></i></router-link></p>
                <ul class="v-list">
                    <li>
                        <img src="@/assets/img/v100.png" />
                        <em>邀请有奖</em>
                        <p>高至1200元/人</p>
                    </li>
                    <li>
                        <img src="@/assets/img/v101.png" />
                        <em>专享折扣</em>
                        <p>低至9折</p>
                    </li>
                    <li>
                        <img src="@/assets/img/v102.png" />
                        <em>购物返现 </em>
                        <p>高至4%</p>
                    </li>
                </ul>
           </div>
           <div class="vright" v-else>
                <h6>铂金会员专属权益</h6>
                <p class="vrtool">您当前已享有该权益<router-link to="/lihvipUserCopy">权益规则<i class="i-m"></i></router-link></p>
                <ul class="v-list">
                    <li>
                        <img src="@/assets/img/v100.png" />
                        <em>邀请有奖</em>
                        <p>高至3500元/人</p>
                    </li>
                    <li>
                        <img src="@/assets/img/v101.png" />
                        <em>专享折扣</em>
                        <p>低至8.8折</p>
                    </li>
                    <li>
                        <img src="@/assets/img/v102.png" />
                        <em>购物返现 </em>
                        <p>高至5%</p>
                    </li>
                </ul>
           </div>
       </div>
       <div class="v-contact clearfix mt20">
           <div class="vtlt-box">
               <h6>VIP会员</h6>
               <p>购买以下任意一件会员礼包即可升级为VIP会员</p>               
           </div>
           <div class="vcaro">
                <templateCarousel></templateCarousel>
           </div>
       </div>
       <div class="v-contact clearfix mt20">
           <div class="vtlt-box">
               <h6>黄金会员</h6>
               <p>购买以下任意一件会员礼包即可升级为VIP会员</p>               
           </div>
           <div class="vcaro">
                <templateCarousel></templateCarousel>
           </div>
       </div>
       <div class="v-contact clearfix mt20 mb20">
           <div class="vtlt-box">
               <h6>铂金会员</h6>
               <p>购买以下任意一件会员礼包即可升级为VIP会员</p>               
           </div>
           <div class="vcaro">
                <templateCarousel></templateCarousel>
           </div>
       </div>
    </div>
    
</template>
<script>
 import templateCarousel from '@/components/template/template-carousel.vue';
import utils from '../../assets/utils';
export default {
    components:{
        templateCarousel
    },
    data(){
        return {
            vlist:['VIP会员','黄金会员','铂金会员'],
            vindex:0
        }
    },
    computed:{
    
    },
    mounted(){
        
    },
    methods:{
       vtap(index)
       {
           this.vindex=index;
       }
    }
}
</script>
<style lang="less" scoped>
    .minh{
        min-height: calc(100vh - 440px);
    }
    .mt20{
        margin-top: 20px;
    }
    .mb20{
        margin-bottom: 20px;
    }
   .v-contact{
       background: #FFF;
       -webkit-box-shadow: 0px 10px 15px #f1f1f1;
        box-shadow: 0px 10px 15px #f1f1f1;
        border-radius: 10px;
        .vleft{
            float: left;
            width: 484px;
            height: 345px;
            background: url(../../assets/img/lihvipuser.png) no-repeat;
            .vuser{
                padding: 101px 0 0 92px;
                width: 80px;
                height: 80px;
                float: left;
                img{
                    width: 78px;
                    height: 78px;
                    border-radius: 50%;
                    border:2px solid #FFF;
                }
            }
            .vtxt{
                padding: 101px 0 0 19px;
                width: 140px;
                float: left;
                h6{
                    font-size:18px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color: #FFF;
                    line-height: 41px;
                }
                .vpic{
                    width: 60px;
                    height: 20px;
                    padding-left: 14px;
                    text-align: center;
                    line-height: 20px;
                    display: block;
                    background: url(../../assets/img/vipic.png) no-repeat;
                    font-size:14px;
                    font-family:Adobe Heiti Std;
                    font-weight:normal;
                    color: #A79D8C;
                    margin-top: 5px;
                }
                .vrouter{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:300;
                    line-height: 34px;
                    margin-top: 18px;
                    display: block;
                    a{
                        color: rgba(232,225,212,.8);
                        &:hover{
                            color: rgba(232,225,212,1);
                        }
                    }
                }
            }
            .vlist{
                float: right;
                width: 110px;
                margin-top: 62px;
                >li{
                    margin-top: 10px;
                    height:60px;
                    line-height: 60px;
                    text-align: center;
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:300;
                    background:rgba(204,204,204,1);
                    box-shadow:0px 0px 50px 0px rgba(153,153,153,0.2);
                    border-radius:30px 0px 0px 30px;
                    cursor: pointer;
                }
                >li.active{
                    background: #FFF;
                    color: #91856F;
                }
            }
        }
        .vright{
            float:right;
            width: 680px;
            margin:57px  18px 0 0;
            text-align: center;
            h6{
                line-height: 39px;
                font-size:18px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color: #666666;
            }
            .vrtool{
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:300;
                color: #999999;
                line-height: 32px;
                a{
                    margin-left: 10px;
                    color: #666666;
                    &:hover{
                        color: #91856F;
                    }
                    .i-m {
                        background: url(../../../static/icon/icon-mark.png) no-repeat;
                        background-size: 15px 15px;
                        width: 15px;
                        height: 15px;
                        display: inline-block;
                        vertical-align: middle;
                        margin:-2px 0 0 2px; 

                    }
                }
            }
            .v-list{
                margin: 40px 0 0 82px;
                >li{
                    width: 168px;
                    float: left;
                    em{
                        display: block;
                        font-size:16px;
                        font-family:PingFang SC;
                        font-weight:600;
                        color: #666666;
                        line-height: 30px;
                    }
                    p{
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color: #91856F;
                        line-height: 40px;
                    }
                }
            }
        }
        .vtlt-box{
            padding-top: 53px;
            h6{
                text-align: center;
                line-height: 44px;
                font-size:30px;
                color: #333333;
                font-weight:bold;
            }
            p{
                text-align: center;
                line-height: 30px;
                font-size:18px;
                font-family:Adobe Heiti Std;
                color: #999999;
            }
        }
        .vcaro{
            padding: 44px 0 20px;
        }
   }
   
</style>
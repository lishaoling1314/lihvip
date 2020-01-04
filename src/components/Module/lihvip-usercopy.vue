<template >
    <div class=" minh">
       <div class="v-contact clearfix vradius">
           <div class="w-1200 velcaro">
                <el-carousel :autoplay="false" type="card" height="240px" indicator-position="none" >
                    <el-carousel-item v-for="(item,index) in carodata" :key="index">
                        <div class="itemcaro">
                            <img :src="item.img" />
                            <i class="itag">{{item.txt}}</i>
                        </div>
                    </el-carousel-item>
                </el-carousel>
           </div>
           <div class="vipdown">
               <div class="w-1200 clearfix">
                   <div class="downleft">
                       <em>会员等级：</em>
                       <span class="Ordmember">
                           <em>普通</em>
                       </span>
                       <span class="ordtip">
                           您目前是普通用户  <router-link to="/">免费升级 >></router-link>
                       </span>
                   </div>
                   <div class="downright">
                       权益规则<i class="i-m"></i>
                   </div>
               </div>
           </div>
       </div>
        <div class="w-1200">
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
            carodata:[{
                img:require('@/assets/img/slicestwo.png'),
                txt:'立即开通'
            },{
                img:require('@/assets/img/slicesone.png'),
                txt:'立即升级'
            },{
                img:require('@/assets/img/slicesthree.png'),
                txt:'立即升级'
            }]
        }
    },
    computed:{
    
    },
    mounted(){
        
    },
    methods:{
   
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
   .vradius{
       border-radius: 0;
   }
   .velcaro{
       padding: 60px 0 67px;
   }
    .el-carousel__item{
   
    .itemcaro{
        width: 472px;
    height: 240px;
    margin: 0 auto;
        position: relative;
        .itag{
            position: absolute;
            right: 24px;
            top:18px;
            width:112px;
            height:40px;
            background:rgba(0, 0, 0,.2);
            border-radius:20px;
            display: block;
            font-size:19px;
            color:rgba(255,255,255,.8);
            font-weight:400;
            line-height: 40px;
            text-align: center;
        }
    }
  }
  .vipdown{
      border-top: 1px solid #FAFAFA;
      height: 80px;
      line-height: 80px;
      .downleft{
          float: left;
          >em{
              font-weight:bold;
              font-size:18px;
              color: #333333;
          }
          .Ordmember{
              background: url(../../assets/img/vip-user.png) no-repeat;
              width: 61px;
              height: 20px;
              padding-left: 13px;
              text-align: center;
              font-size:14px;
              line-height: 20px;
              color: #FFF;
              display: inline-block;
              margin: 0 5px;
          }
          .ordtip{
              color: #666666;
              font-weight:300;
              font-size:14px;
              a{
                  color: #91856F;
              }
          }
      }
      .downright{
          float: right;
          color: #666666;
          font-size:14px;
          font-weight:400;
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
 /deep/.el-carousel__arrow{
        display: none;
    }
</style>
<template>
    <div class="productbox">
        <i class="prev icon" @click="prev()"></i>
        <i class="next icon" @click="next()"></i>
        <div class="productlist" >
        <ul ref="carouser">
            <li v-for="(item,index) in listdata" :key="index" class="tab"> 
                <router-link to="/" >     
                    <img src="@/assets/img/flash1.png"  class="img"/>
                    <h6>{{item.text}}</h6>
                    <p class="pt10">
                        <span class="vipbox">
                            <em v-if="item.vipnun==1">铂金</em>
                        </span>
                        <span class="vsalce">￥{{item.salce}}</span>
                    </p>
                    <p class="vtool">售价:￥10650</p>
                    <i class="itea">会员礼包</i>  
                </router-link>     
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            listdata:[
                {
                    img:"",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },{
                    img:"@/assets/img/flash1.png",
                    text:"数一下最多字数就到这数一下最多字数就到这",
                    vipnun:1,
                    salce:"10000",
                    plack:"10605"
                },
            ],
            offsetCount:0
        }
    },
    created(){
        
    },
    methods:{
       
        prev(){
            if (this.listdata.length - 4 > 0) {
                if (this.offsetCount > 0) {
                    this.offsetCount --;					
                    this.$refs.carouser.style.marginLeft = '-' + (270 * this.offsetCount) + 'px';					
                } else {
                    return false
                }			
            } else {
                return false				
            }

        },
        next(){
            if (this.listdata.length - 4 > 0) {
                if (this.offsetCount < this.listdata.length - 4) {
                    this.offsetCount ++;					
                    this.$refs.carouser.style.marginLeft = '-' + (270 * this.offsetCount) + 'px';					
                } else {
                    return false
                }			
            } else {
                return false				
            }
        }
    }
}
</script>
<style lang="less" scoped>
  /* .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }*/
  
  .productbox{
    position: relative;
    padding-left: 43px;
    height: 415px;
    overflow: hidden;
    .productlist{
       width: 1080px;
       height: 415px;
       overflow: hidden;
       ul{
           transition: all .3s;
       }
        .pt10{
            padding-top: 10px;
        }
    }
    .icon{
        position: absolute;
        top: 118px;
        width:42px;
        height: 42px;
        display: none; 
        cursor: pointer;       
    }
    .prev{
        left: 16px;
        background: url(../../assets/img/swiper-left-hover.png) no-repeat;
    }
    .next{
        right: 16px;
       background: url(../../assets/img/swiper-right-hover.png) no-repeat; 
    }
    &:hover {
        .icon{
            display: block;
        }
    }
  }
  .tab{
      width: 240px;
    height: 415px;
    float: left;
    margin-left: 30px;
      .img{
          width: 240px;
          height: 240px;
      }
      h6{
          padding-top: 10px;
          line-height: 43px;
          font-size:22px;
            font-weight:400;
        height: 43px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333333;
      }
      .vipbox{
        background:url(../../assets/img/viptwo.png) no-repeat;
        width: 80px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #FFF;
        font-size:20px;
        font-family:Adobe Heiti Std;
        font-weight:normal;
        padding-left: 19px;
        display: inline-block;
    }
    .vsalce{
        font-size:20px;
        font-family:PingFang SC;
        font-weight:500;
        color: #C6B078;
    }
    .vtool{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:300;
        color: #999999;
        margin-top: 5px;
        line-height: 47px;
    }
    .itea{
        font-size:12px;
        font-weight:400;
        color: #91856F;
        width:60px;
        height:18px;
        border:1px solid rgba(145,133,111,1);
        display: inline-block;
        text-align: center;
    }

  }

</style>
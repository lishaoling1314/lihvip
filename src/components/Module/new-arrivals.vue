<template>
    <div class="Arrivals w-1200">
        <div class="Arrivals-view" v-if="ArrivalsList.length">
            <!-- 新品推荐都为普通商品 -->
            <div class="Arrivals-item" v-for="(item,index) in ArrivalsList" :key="index"  @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.id,ab:'path',activityType:'ORDINARY'}})">
                <div class="Arrivals-content">
                    <div class="Arrivals-img">
                        <img :src="item.coverImg" alt="">
                    </div>
                    <div class="Arrivals-price">
                        ¥{{item.salePrice}}
                        <span>¥{{item.marketPrice}}</span>
                    </div>
                    <div class="Arrivals-name" :title="item.name">{{item.name}}</div>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
        <div v-else class="Arrivals-nodata">暂无数据</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            ArrivalsList:[]
        }
    },
    mounted(){
        this.$get('getNewProductRecommend.do').then(({data})=>{
            if(data.code=='0000'){
                this.ArrivalsList = data.goodsList
            }
        })
    }
}
</script>

<style lang="less">
    .Arrivals{
        background: #fff;
        margin: 70px auto;
    }
    .Arrivals-nodata{
        width: 100%;
        padding: 20px;
        margin: 50px 0;
        text-align: center;
    }
    .Arrivals-view{
        width: 100%;
        padding: 20px;
        margin: 50px 0;
        border-radius: 5px;
        box-sizing: border-box;
        .Arrivals-item{
          width: 25%;
          flex-basis: 25%;
          float: left;
          text-align: center;
          box-sizing: border-box;
          position: relative;
          height: 415px;
          cursor: pointer;
          box-sizing: border-box;
          padding: 20px;
          .Arrivals-content{
            border: 1px solid #fff;
            padding-bottom: 30px;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
          }
          .Arrivals-img{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              min-width: 248px;
              min-height: 248px;
              box-sizing: border-box;
            }
          }
          .Arrivals-price{
            margin: 10px 0;
            color: #f71929;
            font-size: 22px;
            padding-left: 20px;
            box-sizing: border-box;
            font-weight: 600;
            text-align: left;
            span{
                color:#BDBDBD;
                font-size:14px;
                margin-left:10px;
                font-weight:400;
                text-decoration:line-through;
            }
          }
          .Arrivals-name{
            height: 46px;
            overflow: hidden;
            padding: 0 20px;
            box-sizing: border-box;
            width: 100%;
            text-align: left;
            margin-top: 20px;
            font-weight: bold;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 24px;
          }
        }
        .Arrivals-item:hover {
            .Arrivals-content{
                border: 1px solid #ecdab8;
            }
        }
    }
</style>

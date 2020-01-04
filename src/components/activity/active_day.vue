<template>
    <div class="Arrivals w-1200">
        <div class="Arrivals-view" v-if="ActiveList.length">
            <div class="Arrivals-item" v-for="(item,index) in ActiveList" :key="index" @click="pathGoods(item)">
                <div class="Arrivals-content">
                    <div class="Arrivals-img">
                        <img :src="item.coverImg" alt="">
                    </div>
                    <div class="Arrivals-price">
                        ¥{{item.activityType == 'AGENT_SALE'?item.marketPrice : item.salePrice}}
                        <span style="color:#BDBDBD;font-size:14px;margin-left:10px;font-weight:400;text-decoration:line-through;" v-if="item.activityType != 'AGENT_SALE'">¥{{item.marketPrice}}</span>
                    </div>
                    <div class="Arrivals-name" :title="item.name">{{item.name}}</div>
                    <div class="Arrivals-class">
                        <div class="class-col" v-if="item.activityType=='PRESELL'" style="background:#E51C34">限时抢购</div>
                        <div class="class-col" v-if="item.activityType=='AGENT_SALE'" style="background:#91856F">平台代售</div>
                    </div>
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
            ActiveList:[]
        }
    },
    mounted(){
        this.$get('/goods/nationalGoods.do').then(({data})=>{
            if(data.code=='0000'){
                data.list.forEach(item => {
                    if (item.activityType == 'AGENT_SALE') {
                        //商品详情需要传周期ID，这里默认新增一个参数为默认第一个周期ID
                        item.periodId = item.periodInfo[0].id
                    }
                });
                this.ActiveList = data.list
            }
        })
    },
    methods:{
        pathGoods(item){//新页面打开商品详情 
            let routeData = this.$router.resolve({path:'/goodsdetalis',query:{goodsId:item.id,ab:'path',periodId:item.periodId,activityType:item.activityType}})
            window.open(routeData.href, '_blank');
        },
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
          height: 456px;
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
          .Arrivals-class {
            margin-top: 25px;
            text-align: left;
            padding: 0 20px;
            box-sizing: border-box;
            .class-col {
              // background: #E51C34;
              display: inline-block;
              color: #fff;
              font-size: 12px;
              padding: 3px 5px;
            }
          }
        }
        .Arrivals-item:hover {
            .Arrivals-content{
                border: 1px solid #ecdab8;
            }
        }
    }
</style>

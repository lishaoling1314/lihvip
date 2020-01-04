<template>
  <div class="home">
    <!-- banner -->
    
    <div class="banner">
      <el-carousel trigger="click" height="570px">
        <el-carousel-item v-for="(item,index) in swiper" :key="index">
          <div class="carousel-img" :style="{ background: 'url('+item.imgUrl+')'}" @click="openHref(item.skipUrlType,item.skipUrl)"></div>
          <!-- <img :src="item.imgUrl"  @click="openHref(item.skipUrlType,item.skipUrl)"/> -->
        </el-carousel-item>
      </el-carousel>
      <div class="cate_content">
        <div class="cate_main">
          <div class="cate_menu">
            <div class="cate_menu_item" v-for="(item,index) in goodsTypes" :key="index">
              <div class="title">{{item.name}}</div>
              <ul class="menu_ul">
                <li class="menu_li" v-for="(items,index) in item.children" :key="index" @click="toGoodsList(2,items.key,items.name)">{{items.name}}</li>
                <div style="clear:both"></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

 <div class="hzy">
      <div class="hzy-left">
        <img src="@/assets/img/hzy-title.png" alt="" class="title-img">
        <img src="@/assets/img/lanyingwu.png" alt="" class="title-top4" @click="toGoodsList(2,brandGoods.key,brandGoods.name)">
      </div>

      <div class="hzy-right">
        <div class="img-layer">
          <div class="hzy-layer-main">
            <img src="@/assets/img/hong-hzy-code.png" alt=""  class="hzy-right-img">
          </div>
          <div class="text">微信扫码，即可打开网站！</div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div style="clear:both"></div><!-- 平台代售 -->
    <!-- <div class="agents"> -->
    <div class="agents" v-if="presellGoodsList.leng >= 3 && $store.state.isAgentSale">
      <div class="agents_banner">
        <img src="@/assets/img/agents.png" alt="平台代售" />
        <div class="path" @click="toGoodsList(1,'AGENT_SALE','平台代售')">更多></div>
      </div>
      <div class="agents-goods">
        <div class="goods-l">
          <div class="goods-col" @click="$router.push({path:'/goodsdetalis',query:{goodsId:presellGoodsList.goods0.id,periodId:presellGoodsList.goods0.periodInfo[0].id,activityType:presellGoodsList.goods0.activityType}})">
            <div class="agents-goods-img">
              <img :src="presellGoodsList.goods0.coverImg" alt />
            </div>
            <div class="agents-goods-info">
              <p class="name" :title="presellGoodsList.goods0.name">{{presellGoodsList.goods0.name}}</p>
              <p class="rate">最高利润</p>
              <p class="price">¥{{presellGoodsList.goods0.maxProfit}}</p>
            </div>
            <div class="tap">参与代售</div>
            <i class="tap-shaodow"></i>
          </div>
          <div class="goods-col" @click="$router.push({path:'/goodsdetalis',query:{goodsId:presellGoodsList.goods1.id,periodId:presellGoodsList.goods1.periodInfo[0].id,activityType:presellGoodsList.goods1.activityType}})">
            <div class="agents-goods-img">
              <img :src="presellGoodsList.goods1.coverImg" alt />
            </div>
            <div class="agents-goods-info">
              <p class="name" :title="presellGoodsList.goods1.name">{{presellGoodsList.goods1.name}}</p>
              <p class="rate">最高利润</p>
              <p class="price">¥{{presellGoodsList.goods1.maxProfit}}</p>
            </div>
            <div class="tap">参与代售</div>
            <i class="tap-shaodow"></i>
          </div>
        </div>
        <div class="goods-r" @click="$router.push({path:'/goodsdetalis',query:{goodsId:presellGoodsList.goods2.id,periodId:presellGoodsList.goods2.periodInfo[0].id,activityType:presellGoodsList.goods2.activityType}})">
          <div class="agents-goods-img">
            <img :src="presellGoodsList.goods2.coverImg" alt />
          </div>
          <div class="agents-goods-info">
            <p class="name" :title="presellGoodsList.goods2.name">{{presellGoodsList.goods2.name}}</p>
            <p class="rate">最高利润</p>
              <p class="price">¥{{presellGoodsList.goods2.maxProfit}}</p>
          </div>
          <div class="tap">参与代售</div>
          <i class="tap-shaodow"></i>
        </div>
        <div style="clear:both"></div><!-- 平台代售 -->

      </div>
    </div>
    <div style="clear:both"></div>
    <!-- 限时抢购模块 -->
    <!-- <div class="rush"> -->
    <div class="rush" v-if="rushGoods && rushGoods.length >= 3">
      <div class="rush_banner">
        <img src="@/assets/img/rush.png" alt="限时抢购" />
        <div class="date">
          <span style="background:none;color:#333333">{{date.days}}&nbsp;&nbsp;天</span>
          <span>{{date.hours}}</span>&nbsp;&nbsp;:&nbsp;
          <span>{{date.minutes}}</span>&nbsp;&nbsp;:&nbsp;
          <span>{{date.seconds}}</span>
        </div>
        <div class="path" @click="toGoodsList(1,'PRESELL','限时抢购')">更多></div>
      </div>
      <div class="rush-goods">
        <div class="goods-col" v-for="(item,index) in rushGoods" :key="index" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.id,activityType:item.activityType}})">
          <div class="goods-view">
            <div class="rush-goods-img">
              <img :src="item.coverImg" alt />
            </div>
            <p class="name" :title="item.name">{{item.name}}</p>
            <p class="price2">
              <span class="price-icon">
                <em>VIP</em>
              </span>
               <span class="t">¥{{item.salePrice}}</span>
            </p>
            <p class="price1">抢购价：<span>¥&nbsp;</span>{{item.marketPrice}}</p>
            <div class="rush-tap">抢</div>
            <i class="tap-shaodow"></i>
          </div>
        </div>
        <div style="clear:both"></div><!-- 平台代售 -->
      </div>
    </div>
    <div style="clear:both"></div>
    <!-- 轻奢优品  -->
    <!-- <div class="home-goods"> -->
    <div class="home-goods" v-if="luxuriousList && luxuriousList.length && luxurious">
      <div class="home-goods-banner b1">
        <!-- <img src="@/assets/img/home-goods-banner1.png" alt=""> -->
      </div>
      <div class="home-main">
        <div class="title">
          <span class="s1"><span>{{luxurious.name}}</span></span>
          <div class="s2" @click="toGoodsList(3,luxurious.key,luxurious.name)">查看更多</div>
        </div>
        <ul class="home-ul">
          <li v-for="(item,index) in luxuriousList" :key="index" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.id,activityType:item.activityType}})">
            <img :src="item.coverImg" alt />
            <p class="p1">{{item.name}}</p>
            <p class="p2">
              <span class="price-icon">
     
                <em>VIP</em>
              </span>
              ¥{{item.salePrice}}
            </p>
            <p class="tool">售价:￥{{item.sale}}</p>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- 居家优品 -->
    <!-- <div class="home-goods"> -->
    <div class="home-goods" v-if="homeList && homeList.length && home">
      <div class="home-goods-banner b2">
        <!-- <img src="@/assets/img/home-goods-banner2.png" alt=""> -->
      </div>
      <div class="home-main">
        <div class="title">
          <span class="s1"><span>{{home.name}}</span></span>
          <div class="s2" @click="toGoodsList(3,home.key,home.name)">查看更多</div>
        </div>
        <ul class="home-ul">
          <li v-for="(item,index) in homeList" :key="index" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.id,activityType:item.activityType}})">
            <img :src="item.coverImg" alt />
            <p class="p1">{{item.name}}</p>
            <p class="p2">
              <span class="price-icon">
            
                <em>VIP</em>
              </span>
              ¥{{item.salePrice}}</p>
            <p class="tool">售价:￥{{item.sale}}</p>
          </li>
        </ul>
      </div> 
      <div style="clear:both"></div>
    </div>
    <!-- 数码优品 -->

    <!-- <div class="home-goods"> -->
    <div class="home-goods" v-if="digitalList && digitalList.length && digital">
      <div class="home-goods-banner b3">
        <!-- <img src="@/assets/img/home-goods-banner3.png" alt=""> -->
      </div>
      <div class="home-main">
        <div class="title">
          <span class="s1"><span>{{digital.name}}</span></span>
          <div class="s2" @click="toGoodsList(3,digital.key,digital.name)">查看更多</div>
        </div>
        <ul class="home-ul">
          <li v-for="(item,index) in digitalList" :key="index" @click="$router.push({path:'/goodsdetalis',query:{goodsId:item.id,activityType:item.activityType}})">
            <img :src="item.coverImg" alt />
            <p class="p1">{{item.name}}</p>
            <p class="p2">
              <span class="price-icon">
             
                <em>VIP</em>
              </span>
              ¥{{item.salePrice}}</p>
              <p class="tool">售价:￥{{item.sale}}</p>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
    
    <!-- <div style="width:100%;height:1000px;background:red;margin-top:50px;"></div> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      date: {
        date: '', //时间
        days: '', //天数
        hours: '', //小时
        minutes: '', //分钟
        seconds: '' //秒数
      }, //时间
      
      swiper:[],//banner
      goodsTypes:[],//商品分类
      rushGoods:{},//限时抢购
      digitalList:[],//轻奢优品 
      homeList:[],//数码优品
      luxuriousList:[],//居家优品
      digital:{},//轻奢优品 key
      home:{},//数码优品key
      luxurious:{},//居家优品key
      presellGoodsList:{//平台代售
          goods0:{},
          goods1:{},
          goods2:{},
          leng:''
      },
    }
  },
  mounted(){
    this.indexType();
    this.indexDo();
  },
  methods:{
    toGoodsList(t,n,m){
      let Obj = {};
      Obj.typeKey = t == 1 ? n : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).typeKey ? JSON.parse(sessionStorage.getItem('goodsListObj')).typeKey : '';
      Obj.typeName = t == 1 ? m : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).typeName ? JSON.parse(sessionStorage.getItem('goodsListObj')).typeName : '';
      Obj.menuKey = t == 2 ? n : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).menuKey ? JSON.parse(sessionStorage.getItem('goodsListObj')).menuKey : '';
      Obj.menuName = t == 2 ? m : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).menuName ? JSON.parse(sessionStorage.getItem('goodsListObj')).menuName : '';
      Obj.goodsClass = t == 3 ? n : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClass ? JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClass : '';
      Obj.goodsClassName = t == 3 ? m : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClassName ? JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClassName : '';
      sessionStorage.setItem('goodsListObj',JSON.stringify(Obj))
      this.$router.push('goodsList')
    },
    openHref(key, url) {
      if (key == "lianjie") {
        this.$router.push({ path: url });
      } else {
        var p = window.location.protocol;
        var a = document.createElement("a");
        a.setAttribute("href", `${p}//${url}`);
        a.setAttribute("target", "_blank");
        a.click();
        document.getElementsByTagName("body")[0].appendChild(a);
      }
    },
    indexDo(){//首页数据
      this.$get('index.do',{}).then(({data})=>{
        if(data.code=='0000'){
          // console.log(data)
          this.swiper = data.banners;
          //抢购非空判断
          
          if(data.brandGoodsType){
            this.brandGoods = data.brandGoodsType
          }
          
          if(data.presellGoodsList.length >= 3){
            this.presellGoodsList.leng = data.presellGoodsList.length;
            this.presellGoodsList.goods0 = data.presellGoodsList[0];
            this.presellGoodsList.goods1 = data.presellGoodsList[1];
            this.presellGoodsList.goods2 = data.presellGoodsList[2];
          }
          
          this.digitalList = data.digitalList;//轻奢优品
          this.homeList = data.homeList;//居家优品
          this.luxuriousList = data.luxuriousList;//数码优品
          console.log(this.luxuriousList )
          this.digital = data.digital;//轻奢优品 key
          this.home = data.home;//居家优品key
          this.luxurious = data.luxurious;//数码优品key

          // data.goods.length >= 3 ? this.rushGoods = data.goods : this.rushGoods = [];
          this.rushGoods = data.goods
          //代售非空判断
          if(data.activityGoods.endTime){
            this.newDate(data.activityGoods.endTime);
          }
        }
      })
    },
    newDate(time){//倒计时
      let GDate = new Date().getTime();
      //获取结束时间
      var end_date = time
      end_date = end_date.replace(/-/g, '/')
      var end_time = new Date(end_date)
      end_time = end_time.getTime()
      this._intervalId = setInterval(() => {
        this.presellDate(end_time)
      }, 1000)
    },
    presellDate(endTime) {//
      let GDate = new Date().getTime()
      let leftTime = endTime - GDate
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
      var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
      var minutes = parseInt((leftTime / 1000 / 60) % 60, 10) //计算剩余的分钟
      var seconds = parseInt((leftTime / 1000) % 60, 10) //计算剩余的秒数
      this.date.days = days
      this.date.hours = this.openZero(hours)
      this.date.minutes = this.openZero(minutes)
      this.date.seconds = this.openZero(seconds)
      if (leftTime <= 0) {
        clearInterval(this._intervalId)
      }
    },

    openZero(zero) {
      //加0
      if (zero <= 9) {
        zero = '0' + zero
      }
      return zero
    },
    indexType(){//商品分类
      this.$get('selectAllType.do',{}).then(({data})=>{
        if(data.code=='0000'){
          if(data.goodsType.length >= 5){//一级超过6条截取，二级超过三条截取
            data.goodsType = data.goodsType.splice(0,3);
          }
          // for(let i in data.goodsType){
          //   if(data.goodsType[i].children.length>=2){
          //     data.goodsType[i].children = data.goodsType[i].children.splice(0,3);
          //   }
          // }
          // console.log(data.goodsTypes)
          this.goodsTypes = data.goodsType;
        }
      })
    }
  }
}
</script>

<style lang="less">
  .el-carousel__button{
    height: 4px;
  }
.home{
  background: #fff;

}
.home-goods{
  margin-top: 50px;
  padding-bottom: 50px;
  .home-goods-banner{position: relative;z-index: 10; width: 100%; height: 330px; img{ width: 100%; height: 330px; }}
  .home-goods-banner.b1{
    background:url(../../assets/img/home-goods-banner1.png) center no-repeat;
    background-size: 1920px 330px;
  }
  .home-goods-banner.b2{
    background:url(../../assets/img/home-goods-banner2.png) center no-repeat;
    background-size: 1920px 330px;
  }
  .home-goods-banner.b3{
    background:url(../../assets/img/home-goods-banner3.png) center no-repeat;
    background-size: 1920px 330px;
  }
  .home-main{
    position: relative;
    z-index: 99;
    background: #fff;
    width: 1200px;
    margin: 0 auto;
    margin-top: -179px;
    .title{
      padding: 50px 0;
      text-align: center;
      position: relative;
      z-index: 20;
      background: #fff;
      .s1{
        color: #333333;
        font-size: 32px;
        position: relative;
        display: inline-block;
        z-index: 20;
        span{
          position: relative;
          z-index: 20;
          font-weight: bold;
        }
      }
      .s1:before{
        content:'';
        position: absolute;
        bottom: 3px;
        left: 0;
        height: 10px;
        width: 100%;
        background: #FFDBCE;
        z-index: 10;
      }
      .s2{
        display: block;
        margin-top:5px;
        color:#999999;
        font-size: 15px;
        cursor: pointer;
      }
    }
    .home-ul{
      padding: 13px 35px 35px 43px;
      box-sizing:border-box;
      float: left;
      position: relative;
      z-index: 10;
      box-shadow:0px 0px 50px 0px rgba(153,153,153,0.2);
      background: #fff;
      width: 100%; 
      margin-top: -35px;     
      li{
        width: 240px;
        float: left;
        
        margin:35px 0 0 30px;
        // padding: 30px 20px;
        box-sizing: border-box;
        text-align: center;
        transition-duration: 0.3s;
        // border-radius: 4px;
        cursor: pointer;
        height: 400px;
        >img{
          width: 240px;
          height: 240px;
          // margin: 0 auto;
        }
        .p1{
          text-align: left;
          color: #333333;
          font-size: 22px;
          height: 43px;
          line-height: 43px;
          margin-top: 20px;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .p2{
          text-align: left;
          margin-top: 10px;
          color: #C6B078;
          font-size: 20px;
          line-height:  24px;
          
        }
        .tool{
          display: block;
          line-height: 37px;
          margin-top: 10px;
          font-size: 18px;
          color: #999999;
          text-align: left;
          font-weight: 300;
        }
      }
      li:hover{
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>

<style lang="less">
.el-carousel{z-index: 30;}
.banner {
  position: relative;
  text-align: center;
  .carousel-img{
    width: 1920px;
    margin: 0 auto;
    height: 570px;
    background-size:1920px  570px;
  }
  .cate_content {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // z-index: 20;
    .cate_main {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .cate_menu {
        width: 300px;
        height: 570px;
        background: rgba(255, 255, 255, 1);
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 40;
        .cate_menu_item {
          width: 300px;
          height: 190px;
          padding: 50px 20px 0 20px;
          text-align: left;
          border-top: 1px solid #eeeeee;
          box-sizing: border-box;
          transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          .title {
            font-size: 14px;
            color: #333;
            font-weight: bold;
          }
          .menu_ul {
            margin-top: 10px;
            max-height: 110px;
            overflow: hidden;
            .menu_li {
              float: left;
              margin-top: 15px;
              margin-right: 37px;
              color: #666666;
              cursor: pointer;
              font-size: 12px;
            }
            .menu_li:last-child {
              margin-right: 0;
            }
            .menu_li:hover{
              color: #bfbfbf;
            }
          }
        }
        .cate_menu_item:hover {
          background: rgba(142, 128, 103, 1);
          color: #fff;
          .title,
          .menu_li {
            color: #fff;
          }
        }
      }
    }
  }
}
.agents {
  width: 1200px;
  margin: 50px auto;
  .agents_banner {
    position: relative;
    z-index: 10;
    img {
      width: 100%;
      height: 300px;
    }
    .path {
      position: absolute;
      right: 50px;
      top: calc(50% - 45px);
      color: #666666;
      font-size: 28px;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
    }
    .path:hover {
      color: #8e8067;
    }
  }
  .agents-goods {
    margin-top: -70px;
    position: relative;
    z-index: 99;
    padding: 0 50px;
    box-sizing: border-box;
    .goods-l {
      width: 650px;
      margin-right: 20px;
      margin-top: -20px;
      float: left;
      .goods-col {
        width: 650px;
        height: 316px;
        background: #fff;
        margin-top: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 30px 0px rgba(153, 153, 153, 0.5);
        padding: 20px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        .agents-goods-img {
          width: 270px;
          height: 270px;
          float: left;
          img {
            width: 100%;
            height: 100%;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
          }
        }
        .agents-goods-info {
          float: left;
          width: 290px;
          margin-left: 50px;
          .name {
            color: #333333;
            font-size: 36px;
            // margin-top: 20px;
            height: 95px;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .rate {
            margin-top: 20px;
            color: #666666;
            font-size: 16px;
          }
          .price {
            font-size: 38px;
            color: #edc360;
            font-family: PingFang-SC-Regular;
            font-weight: bold;
            margin-top: 20px;
          }

        }
        .tap {
          width: 165px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          border-radius: 4px;
          color: #fff;
          font-size: 25px;
          margin-top: 20px;
          letter-spacing: 2px;
          font-weight: 0;
          /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#faeba3+1,d7b461+100 */
          background: #faeba3; /* Old browsers */
          background: -moz-linear-gradient(
            top,
            #faeba3 1%,
            #d7b461 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            top,
            #faeba3 1%,
            #d7b461 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to bottom,
            #faeba3 1%,
            #d7b461 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#faeba3', endColorstr='#d7b461',GradientType=0 ); /* IE6-9 */
          position: absolute;
          bottom: 30px;
          right: 145px;
          z-index: 20;
        }
        .tap-shaodow{
          width: 132px;
          height: 39px;
          background: rgba(208,178,102,.6);
          -moz-box-shadow:0px 10px 15px rgba(208,178,102,.6); 
          -webkit-box-shadow:0px 10px 15px rgba(208,178,102,.6);
          box-shadow:0px 10px 15px rgba(208,178,102,.6);
          border-radius: 10px;
          bottom: 30px;
          right: 162px;
          position: absolute;
          z-index: 10;
        }
      }
      .goods-col:hover {
        // box-shadow:0px 0px 30px 0px rgba(142,128,103,0.8);
        -moz-box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
        -webkit-box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
        box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
        .agents-goods-img {
          img {
            transform: translateY(5px);
            -ms-transform: translateY(5px); /* IE 9 */
            -moz-transform: translateY(5px); /* Firefox */
            -webkit-transform: translateY(5px); /* Safari 和 Chrome */
            -o-transform: translateY(5px); /* Opera */
          }
        }
      }
    }
    .goods-r {
      float: left;
      width: 430px;
      background: #fff;
      height: 652px;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0px 0px 30px 0px rgba(153, 153, 153, 0.5);
      cursor: pointer;
      position: relative;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      .agents-goods-img {
        width: 270px;
        height: 270px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
        }
      }
      .agents-goods-info {
        width: 290px;
        margin: 0 auto;
        margin-top: 70px;
        text-align: left;
        .name {
          color: #333333;
          font-size: 36px;
          margin-top: 20px;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rate {
          margin-top: 20px;
          color: #666666;
          font-size: 16px;
        }
        .price {
          font-size: 38px;
          color: #edc360;
          font-family: PingFang-SC-Regular;
          font-weight: bold;
          margin-top: 20px;
        }
        
      }
       .tap {
          width: 165px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          border-radius: 4px;
          color: #fff;
          font-size: 25px;
          margin-top: 20px;
          letter-spacing: 2px;
          font-weight: 0;
          /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#faeba3+1,d7b461+100 */
          background: #faeba3; /* Old browsers */
          background: -moz-linear-gradient(
            top,
            #faeba3 1%,
            #d7b461 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            top,
            #faeba3 1%,
            #d7b461 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to bottom,
            #faeba3 1%,
            #d7b461 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#faeba3', endColorstr='#d7b461',GradientType=0 ); /* IE6-9 */
          position: absolute;
          bottom: 30px;
          right: 190px;
          z-index: 20;
        }
        .tap-shaodow{
          width: 132px;
          height: 39px;
          background: rgba(208,178,102,.6);
          -moz-box-shadow:0px 10px 15px rgba(208,178,102,.6); 
          -webkit-box-shadow:0px 10px 15px rgba(208,178,102,.6);
          box-shadow:0px 10px 15px rgba(208,178,102,.6);
          border-radius: 10px;
          bottom: 30px;
          right: 200px;
          position: absolute;
          z-index: 10;
        }
    }
    .goods-r:hover {
      // box-shadow:0px 0px 30px 0px rgba(142,128,103,0.8);
      -moz-box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
      -webkit-box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
      box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
      .agents-goods-img {
        img {
          transform: translateY(5px);
          -ms-transform: translateY(5px); /* IE 9 */
          -moz-transform: translateY(5px); /* Firefox */
          -webkit-transform: translateY(5px); /* Safari 和 Chrome */
          -o-transform: translateY(5px); /* Opera */
        }
      }
    }
  }
}
.rush {
  width: 1200px;
  margin: 50px auto;
  .rush_banner {
    position: relative;
    z-index: 10;
    img {
      width: 100%;
      height: 300px;
    }
    .date {
      position: absolute;
      left: 335px;
      top: calc(50% - 60px);
      font-size: 28px;
      span {
        padding: 20px;
        background: #333333;
        color: #fff;
        font-weight: bold;
        font-family: Impact;
        font-size: 36px;
      }
    }
    .path {
      position: absolute;
      right: 50px;
      top: calc(50% - 60px);
      color: #666666;
      font-size: 28px;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
    }
    .path:hover {
      color: #8e8067;
    }
  }
  .rush-goods {
    margin-top: -70px;
    padding: 0 30px;
    position: relative;
    z-index: 99;
    box-sizing: border-box;
    .goods-col {
      width: 33.33%;
      float: left;
      padding: 0 20px;
      box-sizing: border-box;
      
      .goods-view {
        background: #fff;
        padding: 30px 20px 50px 20px;
        box-sizing: border-box;
        box-shadow: 0px 0px 30px 0px rgba(153, 153, 153, 0.5);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        position: relative;
        .rush-goods-img {
          width: 287px;
          height: 287px;
          img {
            width: 100%;
            height: 100%;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
          }
        }
        
        .name {
          color: #333333;
          font-size: 36px;
          margin-top: 20px;
          display: -webkit-box;
          height: 47px;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price1 {
          font-size: 20px;
          color: #999;
          // text-decoration: line-through;
          margin-top: 15px;
          font-weight:100;
          // span{padding-right: 5px;}
        }
        .price2 {
          margin-top: 30px;
          font-size: 26px;
          color: #edc360;
          font-family: PingFang-SC-Regular;
          font-weight: bold;
          margin-top: 15px;
         
        
        }
        .rush-tap {
          width: 70px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#faeaa3+0,d7b461+100 */
          background: #faeaa3; /* Old browsers */
          background: -moz-linear-gradient(top,  #faeaa3 0%, #d7b461 100%); /* FF3.6-15 */
          background: -webkit-linear-gradient(top,  #faeaa3 0%,#d7b461 100%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to bottom,  #faeaa3 0%,#d7b461 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#faeaa3', endColorstr='#d7b461',GradientType=0 ); /* IE6-9 */

          border-radius: 50%;
          color: #fff;
          font-size: 36px;
          display: inline-block;
          position: absolute;
          bottom: 20px;
          right: 20px;
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-property: -webkit-transform;
          transition-property: transform;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          z-index: 20;
        }
        .tap-shaodow{
          width: 50px;
          height: 35px;
          border-radius: 50%;
          background: rgba(208,178,102,.6);
          -moz-box-shadow:0px 10px 15px rgba(208,178,102,.6); 
          -webkit-box-shadow:0px 10px 15px rgba(208,178,102,.6);
          box-shadow:0px 10px 15px rgba(208,178,102,.6);
          bottom: 21px;
          right: 30px;
          position: absolute;
          z-index: 10;
        }
      }
      .goods-view:hover {
        -moz-box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
        -webkit-box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
        box-shadow: 0px 10px 20px rgba(142, 128, 103, 0.8);
      }
    }
  }
}
.price-icon{
            background:url(../../assets/img/viptwo.png) center no-repeat;
            width: 99px;
            height: 25px;
            display: inline-block;
            vertical-align: middle;
            line-height: 22px;
            margin-right: 10px;
            em{
              font-weight: normal;
              font-style: normal;
              color: #FFF;
              font-size: 20px;
              width: 66px;
              text-align: center;
              line-height: 25px;
              height: 25px;
              font-family:Adobe Heiti Std;         
              padding-left: 33px;
              border-radius: 0 12px 12px 0;
              display: inline-block;
            }
          }
.hzy{
    width: 1200px;
    margin: 112px auto;
    .hzy-left{
      width: 490px;
      float: left;
      text-align: right;
      padding-top: 10px;
      box-sizing: border-box;
      .title-img{
        width: 434px;
        height: 113px;
      }
      .title-top4{
        margin-top: 90px;
        width: 100%;
        height:362px;
        cursor: pointer;
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
      }
      .title-top4:hover{
        transform: translate(0,-10px);
        -webkit-transform: translate(0,-10px);
        -moz-transform: translate(0,-10px);
        -o-transform: translate(0,-10px);
        -ms-transform: translate(0,-10px);
      }
    }
    // <div class="hzy-right">
    //     <div class="img-layer">
    //       <div class="hzy-layer-main">
    //         <img src="@/assets/img/hong-hzy-code.png" alt=""  class="hzy-right-img">
    //         <p>打开微信，使用“扫一扫”即可打开网站。</p>
    //       </div>
    //     </div>
    //   </div>
    .hzy-right{
      width: 640px;
      float: right;
      height: 580px;
      background: url(../../assets/img/hongzhiyan.png) center center no-repeat;
      background-size: 640px 580px;
      position: relative;
      overflow: hidden;
      .img-layer{
        width: 640px;
        height:458px;
        transition: all 0.5s;
        // display: none;
        background: rgba(222, 212, 193, .8);
        text-align: center;
        position: absolute;
        top: 580px;
        padding-top: 68px;
        box-sizing: border-box;
        .hzy-layer-main{
          width: 280px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
          color: #fff;
          background: #fff;
          border-radius: 4px;
          img{width: 100%;}
        }
        .text{
          text-align: center;
          margin-top: 20px;
          color: #8A7E67;
          font-size: 16px;
        }
      }
    }
    .hzy-right:hover .img-layer{
      top: 123px;
    }
  }
</style>
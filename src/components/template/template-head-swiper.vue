<template>
    <!-- 头部活动专区组件 Swiper -->
  <div class="swiper">
    <div class="swiper-layer" v-if="layer" v-loading="loading"></div>
    <div class="swiper-content" v-if="activityList.length">
      <swiper :options="swiperOption" ref="mySwiper" class="header_swiper">
        <swiper-slide
          v-for="(item,index) in activityList"
          :key="index"
          @click.native="openHref(item.skipUrlType,item.skipUrl)"
        >
          <img :src="item.imgUrl" />
          <p>{{item.name}}</p>
        </swiper-slide>
        <div style="clear:both"></div>
      </swiper>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div v-else class="noDate">
      <img src="@/assets/img/head-swiper-noData.png" alt="">
      <p>暂时没有活动~</p>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      text: "",
      loading:true,
      layer:true,
      activityList: [],
      swiperOption: {
        spaceBetween: 30,//间隔
        slidesPerView: 4,//每页个数
        // grabCursor:true,  //开启抓手光标
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        
      }
    };
  },
  mounted() {
    this.bannerList();
  },
  components: { swiper, swiperSlide },
  methods: {
    bannerList() {
      this.$get("bannerList.do", {
        params: {
          position: "active"
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
            setTimeout(()=>{
                this.layer = false;
                this.loading = false;
            },200)
            this.activityList = data.list.data;
          
        }
      });
    },
    openHref(key, url) {
      if (key == "lianjie") {
        if(this.$router.history.current.name == 'goodsList'){

          if(location.href.indexOf('lihvip.com') >=1 ){//判断是否在本地
            location.href = location.href.slice(0,location.href.indexOf('lihvip.com') + 11 ) + url
          }else{
            location.href =  location.href.slice(0,location.href.indexOf(':8')+6)+url
          }

        }else{
          this.$router.push({ path: url });
        }
      } else {
        var p = window.location.protocol;
        var a = document.createElement("a");
        a.setAttribute("href", `${p}//${url}`);
        a.setAttribute("target", "_blank");
        a.click();
        document.getElementsByTagName("body")[0].appendChild(a);
      }
    }
  }
};
</script>
<style lang="less">
.swiper {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  position: relative;
  .noDate{
    width: 195px;
    margin: 20px auto;
    img{
      max-width:195px;
      max-height: 195px; 
    }
    p{
      font-size: 15px;
      color: #D0C9BB;
      line-height: 26px;
    }
  }
  .swiper-layer{
      position: absolute;
      z-index: 999;
      width: 100%;
      height: 100%;
  }
  .swiper-content {
    width: 1040px;
    margin: 0 auto;
    
    .header_swiper {
      width: 100%;
      box-sizing: border-box;
      .swiper-slide {
       box-sizing: border-box;
        cursor: pointer;
        float: left;
        max-width: 237px;
        margin-top: 30px;
        // padding-bottom: 20px;
        border:1px solid #fff;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        text-align: center;
        line-height: 24px;
        p {
          // margin-top: 20px;
          text-align: center;
          color: #999999;
          font-size: 14px;
          margin-bottom: 10px;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 100%;
          margin: 0 auto;
          height: 141px;
          
        }
      }
      .swiper-slide:hover{
        border-bottom: 1px solid #DED4C1;
        p{
          color: #817161;
        }
      }
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    outline: none;
    width: 42px;
    height: 42px;
  }
  .swiper-button-prev.button-disabled {
    background: url(../../assets/img/icon/swiper-left.png);
  }
  .swiper-button-next.button-disabled {
    background: url(../../assets/img/icon/swiper-right.png);
    
  }
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next {
    //亮左
    background: url(../../assets/img/icon/swiper-left-hover.png);
  }
  .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev {
    //亮右
    background: url(../../assets/img/icon/swiper-right-hover.png);
  }
}
</style>
<template>
  <!-- <div class="logo"></div>
  <div class=""></div>
  <div></div>-->
  <div class="footer">
    <div class="corporate_information">
      <div class="inf_box">
        <div class="phone_time">
          <img src="@/assets/img/phone.png" alt />
          <div class="num_time">
            <p class="phone_num">400-007-0755</p>
            <p class="time">工作日：09:00-18:00</p>
          </div>
        </div>
        <img class="border" src="@/assets/img/dashed.png" alt />
        <div class="nav">
          <el-row>
            <el-col :span="6">
              <router-link to="footeraftersale">售后服务</router-link>
            </el-col>
            <el-col :span="6">
              <router-link to="guarantee">正品保障</router-link>
            </el-col>
            <el-col :span="6">
              <router-link to="relateus">联系我们</router-link>
            </el-col>
            <el-col :span="6">
              <router-link to="faq">常见问题</router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <router-link to="paypath">支付方式</router-link>
            </el-col>
            <el-col :span="6">
              <router-link to="logistics">物流配送</router-link>
            </el-col>
            <el-col :span="6">
              <router-link to="cooperation">商务合作</router-link>
            </el-col>
          </el-row>
        </div>
        <img class="border" src="@/assets/img/border.png" alt />
        <div class="phone">
          <div class="text">
            <p>手机扫码，关注官方公众号</p>
            <p>更多资讯等你了解~</p>
          </div>
        </div>
        <img src="@/assets/img/fuwu.png" alt class="fuwu" />
      </div>
    </div>
    <div class="sx_content-footer">
      <div class="content">
         2019 利汇优品
          <!-- <a href="http://www.miitbeian.gov.cn">粤ICP备19028989号-1</a> -->
          粤ICP备19028989号-1
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientWidth: ""
    };
  },
  computed: {
    elastic: function() {
      var codeHeight = (50 * this.clientWidth) / 1920 + "px"; // 限时抢购高度
      var navHeight = (250 * this.clientWidth) / 1920; // 跳转区域高度
      var logoHeight = (90 * this.clientWidth) / 1920 + "px"; // logo的高度
      var logoMarginTop = -(45 * this.clientWidth) / 1920 + "px"; // logo的margintop
      var navMarginTop = (navHeight - 60) / 2 + "px"; // 中间区域的margintop
      var erHeight = (80 * this.clientWidth) / 1920; // 二维码的高度
      var phoneTimeMarginTop = erHeight / 2 + "px"; // 电话，时间margin-top
      var phoneMarginTop = (navHeight - erHeight) / 2 + "px";
      var styles = {
        codeHeight,
        navHeight: navHeight + "px",
        logoHeight,
        logoMarginTop,
        navMarginTop,
        erHeight: erHeight + "px",
        phoneTimeMarginTop,
        phoneMarginTop
      };
      return styles;
    }
  },
  mounted() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    this.clientWidth = w;
    window.onresize = () => {
      // 监听浏览器的宽度
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      // //console.error(w)
      if (w > 1200) {
        this.clientWidth = w;
      } else {
        this.clientWidth = 1200;
      }
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.footer {
  .corporate_information .inf_box .nav .el-col a {
    color: #8b8476;
  }
  .corporate_information .inf_box .nav .el-col a:hover {
    color: #d1b98e;
  }
}
.corporate_information {
  height: 200px;
  width: 100%;
  overflow: hidden;
  background: #efefef;
  .inf_box {
    width: 1260px;
    margin: 0 auto;
    .border {
      float: left;
      height: 160px;
      width: 1px;
      margin-top: 30px;
    }

    .phone_time {
      width: 200px;
      float: left;
      height: 100%;
      margin-right: 49px;
      margin-top: 60px;
      .address {
        line-height: 23px;
        font-size: 12px;
        margin-top: 10px;
        padding-left: 60px;
      }
      .num_time {
        height: 41px;
        float: left;
      }
      .phone_num {
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        color: #8B8476;
        font-weight: bold;
      }
      .time {
        font-size: 12px;
        color: #8B8476;
        margin-top: 10px;
      }
      img {
        float: left;
        margin-right: 20px;
      }
    }
    .nav {
      float: left;
      width: 540px;
      height: 60px;
      margin-top: 60px;
      a {
        color: #8b8476;
      }
      .el-row:first-child {
        margin-bottom: 38px;
      }
      .el-col {
        text-align: center;
        font-size: 11px;
        height: 11px;
        line-height: 11px;
      }
    }
    .phone {
      float: left;
      height: 41px;
      width: 250px;
      margin-top: 55px;
      .text {
        float: left;
        margin-left: 50px;
        p:nth-child(1) {
          color: #8b8476;
        }
        p:nth-child(2) {
          color: #8b8476;
          font-weight: bold;
          margin-top: 10px;
          font-size: 18px;
        }
      }
    }
    .fuwu {
        width: 130px;
        height: 130px;
        vertical-align: middle;
        margin-top: 30px;
      }
  }
}
.sx_content-footer {
  width: 100%;
  background: #e8e8e8;
  height: 30px;
  line-height: 30px;
  .content {
    margin: 0 auto;
    width: 1200px;
    min-width: 1200px;
    font-size: 12px;
    text-align: center;
  }
}
</style>

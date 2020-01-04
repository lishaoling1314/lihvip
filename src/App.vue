<template>
  <div class="app" id="app">
    <template-head></template-head>
    <div style="clear:both"></div>
    <!-- 兼容IE9 -->
    <router-view id="lhsc-home"></router-view>
    <template-footer></template-footer>
  </div>
</template>

<script>
import templateHead from '@/components/component/template_head' //头部文件
import templateFooter from '@/components/component/template_footer' //底部文件
export default {
  name: 'App',
  data() {
    return {
      isheader: true
    }
  },
  components: {
    templateHead,
    templateFooter
  }
}
</script>

<style lang="less">

#app {
  background: #f2f2f2;
}
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  input[type="number"]{
      -moz-appearance: textfield;
  }
.el-pagination.is-background .el-pager li:not(.disabled):hover{color: #91856F !important;}
.el-pagination.is-background .el-pager li.active:hover{color: #fff !important;}
.el-select-dropdown__item.selected{color: #606266 !important;}
.el-select .el-input__inner:focus{border-color:#D9D9D9;}
.el-select .el-input.is-focus .el-input__inner{border-color:#91856F !important;}
.el-button--primary{background: #91856f !important;border-style: #91856f !important;}
.el-button--primary:focus, .el-button--primary:hover{background: #91856f !important;border-color: #91856f !important;}
.el-loading-spinner .el-loading-text {
  color: #91856f !important;
}
.el-loading-spinner .path {
  stroke: #91856f !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #91856f !important;
  border-color: #91856f !important;
}
.el-checkbox__inner:hover{
  border-color: #91856f;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: #91856f;
}
.el-checkbox__input.is-checked+.el-checkbox__label{color: #91856f !important;}
@import './assets/css/index.less';
.w-1200 {
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
}
.w-1000{
  width: 1000px;
  margin: 0 auto;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.user-shadow {
  // box-shadow: 0px 0px 43px 0px rgba(55, 58, 79, 0.15);
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  margin: 30px 0;
}
.no-data {
  padding: 50px 0 300px 0;
  text-align: center;
  color: #bebebe;
  font-size: 16px;
}
// IE兼容
.el-step__icon {
  margin: 0 auto;
}
.is-horizontal.el-step {
  width: 150px;
}

.el-message,
.el-message--error {
  z-index: 9999999 !important;
}

// @media (max-width: 1024px) {
//      .templateNews{
//    height: 60px;
//      line-height: 60px;
//   }
//   .logo_box {
//     height: 60px;
//     line-height: 60px;
//     .logo{
//       height: 60px;
//     }
//     img {
//       width: 150px;
//     }
//     height: 64px;
//   }
//   .occupied {
//     height: 110px;
//   }
//   .advantage {
//     width: 1200px !important;
//     .ad_comtent {
//       .first,
//       .third,
//       .second {
//         height: 420px !important;
//       }
//       .ad_row {
//         h5 {
//           margin: 40px 0 30px 0 !important;
//         }
//         img {
//           width: 146px !important;
//           height: 146px !important;
//           margin-top: 24px !important;
//         }
//       }
//     }
//   }
//   .master_box {
//     .content {
//       right: 12% !important;
//     }
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 500px !important;
//     }
//   }
// } /*>=1024的设备*/

// @media (min-width: 1100px) {
//      .templateNews{
//    height: 80px;
//      line-height: 80px;
//   }
//   .logo_box {
//     height: 80px;
//      line-height: 80px;
//      .logo{
//       height: 80px;
//     }
//     img {
//       width: 180px;
//       height: 70px;
//     }
//   }
//   .occupied {
//     height: 130px;
//   }
//   .advantage {
//     width: 1200px !important;
//     .ad_comtent {
//       .first,
//       .third,
//       .second {
//         height: 420px !important;
//       }
//       .ad_row {
//         h5 {
//           margin: 40px 0 30px 0 !important;
//         }
//         img {
//           width: 146px !important;
//           height: 146px !important;
//           margin-top: 24px !important;
//         }
//       }
//     }
//   }
//   .master_box {
//     .content {
//       right: 12% !important;
//     }
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 520px !important;
//     }
//   }
// } /*>=1100的设备*/
// @media (min-width: 1280px) {
//      .templateNews{
//    height: 80px;
//      line-height: 80px;
//   }
//   .logo_box {
//     height: 80px;
//      line-height: 80px;
//      .logo{
//       height: 80px;
//     }
//     img {
//       width: 180px;
//       height: 70px;
//     }
//   }
//   .occupied {
//     height: 130px;
//   }
//   .advantage {
//     width: 1200px !important;
//     .ad_comtent {
//       .first,
//       .third,
//       .second {
//         height: 420px !important;
//       }
//       .ad_row {
//         h5 {
//           margin: 40px 0 30px 0 !important;
//         }
//         img {
//           width: 146px !important;
//           height: 146px !important;
//           margin-top: 24px !important;
//         }
//       }
//     }
//   }
//   .master_box {
//     .content {
//       right: 13% !important;
//     }
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 540px !important;
//     }
//   }
// } /*>=1280的设备*/

// @media (min-width: 1366px) {
//    .templateNews{
//    height: 80px;
//      line-height: 80px;
//   }
//   .logo_box {
//     height: 80px;
//      line-height: 80px;
//      .logo{
//       height: 80px;
//     }
//     img {
//       width: 180px;
//       height: 70px;
//     }
//   }
//   .occupied {
//     height: 130px;
//   }
//   .advantage {
//     width: 1200px !important;
//     .ad_comtent {
//       .first,
//       .third,
//       .second {
//         height: 420px !important;
//       }
//       .ad_row {
//         h5 {
//           margin: 40px 0 30px 0 !important;
//         }
//         img {
//           width: 146px !important;
//           height: 146px !important;
//           margin-top: 24px !important;
//         }
//       }
//     }
//   }
//   .master_box {
//     .content {
//       right: 14% !important;
//     }
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 580px !important;
//     }
//   }
// }

// @media (min-width: 1440px) {
//    .templateNews{
//    height: 100px;
//      line-height: 100px;
//      padding-top: 40px;
//   }
//   .logo_box {
//     height: 100px;
//      line-height: 100px;
//      .logo{
//       height: 100px;
//     }
//     img {
//       width: 200px;
//       height: 75px;
//     }
//   }
//   .occupied {
//     height: 150px;
//   }
//   .advantage {
//     width: 1200px !important;
//   }
//   .master_box {
//     .content {
//       right: 15% !important;
//     }
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 600px !important;
//     }
//   }
// }

// @media (min-width: 1680px) {
//    .templateNews{
//    height: 110px;
//      line-height: 110px;
//      padding-top: 45px;
//   }
//   .logo_box {
//     height: 110px;
//      line-height: 110px;
//      .logo{
//       height: 110px;
//     }
//     img {
//       width: 223px;
//       height: 81px;
//     }
//   }
//   .occupied {
//     height: 160px;
//   }
//   .advantage {
//     width: 1200px !important;
//   }
//   .master_box {
//     .content {
//       right: 17% !important;
//     }
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 620px !important;
//     }
//   }
// }
// @media (min-width: 1920px) {
//   .templateNews{
//     height: 120px;
//     line-height: 120px;
//     padding-top: 50px;
//   }
//   .logo_box {
//     height: 120px;
//     line-height: 120px;
//     .logo{
//       height: 120px;
//     }
//     img {
//       width: 243px;
//       height: 89px;
//     }
//   }
//   .occupied {
//     height: 170px;
//   }
//   .advantage {
//     width: 1200px !important;
//   }
//   .activity520 {
//     .banner {
//       background-size: 100% 650px !important;
//     }
//   }
// }
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #91856f;
  border: none;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  border: 1px solid #dcdcdc;
  margin: 0 1px;
}
</style>
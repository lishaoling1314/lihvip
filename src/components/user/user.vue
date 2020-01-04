<template>
  <div class="user w-1200">
    <div class="user-content user-shadow">
      <div class="user-main" :style="{height:userHeight}">
        <div class="user-img">
          <!-- 头像 -->
          <img :src="userInfo.headImg" alt class="img">
          <img src="@/assets/img/user-modifyImg.png" class="icon" @click="modifyImg()">
          <input
            v-show="false"
            type="file"
            ref="uploadFile"
            id="fileInput"
            @change="fileImg($event)"
          >
        </div>
        <div class="user-phone">
          <span>{{userInfo.phone}}</span>
        </div>
        <span class="user-vip">
            <em> VIP</em>
        </span>
        <!-- gg -->
        <router-link to="" class="beijingbox clearfix">
          <span class="leftbox">
            <em>超低优惠来袭</em>
            <i>会员价低至6折</i>
          </span>
          <span class="rightbox">
            开通会员 >
          </span>
        </router-link>
        <!-- 名字 -->
        <div class="user-operation">
          <div @click="$router.push('/forgetPassword')" class="path">修改登录密码 ></div>
          <div class="path" @click="modifyPasswd()">修改交易密码 ></div>
          <div style="clear:both"></div>
        </div>
        <div class="share-divider"></div>
        <!-- 操作 -->
        <div class="user-share">
        	<div class="u-s-wrap">
	          <div class="code-wrap">
	          	<p>
	           	 邀请码
	            <span>{{userInfo.id}}</span>
	          	</p>
	          </div>
	          <div class="btn-wrap">
	          	<div class="btn-box">
	          		<div class="share-tap" @click="IsCashOpen = true;WechatImg = false;"><i class="el-icon-share"></i>&nbsp;邀请好友</div>
	          	</div>
	          </div>
        		
        	</div>
        </div>
        <div class="share-divider1"></div>
        <div class="user-col">
          <router-link to="/wallet" :class="$route.name == 'wallet'?'user-l active':'user-l'">
            <i class="user-icon i-q"></i>
            <span>我的钱包</span>
          </router-link>
          <router-link to="/orderList" :class="$route.name == 'orderList'?'user-l active':'user-l'">
            <i class="user-icon i-o"></i>
            <span>我的订单</span>
          </router-link>
          <router-link to="/bankCard" :class="$route.name == 'bankCard'?'user-l active':'user-l'">
            <i class="user-icon i-b"></i>
            <span>我的银行卡</span>
          </router-link>
          <router-link to="/address" :class="$route.name == 'address'?'user-l active':'user-l'">
            <i class="user-icon i-s"></i>
            <span>我的收货地址</span>
          </router-link>
           <router-link to="/coupon" :class="$route.name == 'coupon'?'user-l active':'user-l'">
            <i class="user-icon i-c"></i>
            <span>我的优惠券({{counponCount}})</span>
          </router-link>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="user-view">
        <router-view></router-view>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="617px"
      v-if="dialogVisible"
      top="25vh"
      title="设置交易密码"
    >
      <!-- 修改交易密码 -->
      <chgtranspassword @closeDialog="closeDialog" v-if="dialogVisible"></chgtranspassword>
    </el-dialog>

    <el-dialog title width="618px" :visible.sync="IsCashOpen" class="IsCashOpen">
      <div class="IsCashOpen-content">
        <div class="title">
          <span>分享地址</span>
          <!-- <i><img src="" alt=""></i> -->
        </div>
        <div class="CashOpen-main">
          <div class="path">{{routerHref}}</div>
          <p>可复制地址转发给您的好友</p>
        </div>
        <div class="CashOpen-tap">
          <div class="clone-path" @click="copy">复制链接</div>
          <div class="clone-Wechat" @click="codePath()">
            分享到微信
            <div class="Wechat-img" v-if="WechatImg">
              <div class="img" id="codeId"></div>
              <p>扫描二维码，即刻将网页分享给好友或朋友圈</p>
            </div>
            <div class="triangle_border_up" v-if="WechatImg">
              <span></span>
            </div>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import chgtranspassword from "@/components/template/chg_trans_password";
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  data() {
    return {
      WechatImg: false, //微信二维码
      IsCashOpen: false, //邀请
      routerHref: "", //分享链接
      dialogVisible: null,
      userHeight: "708px",
      userInfo: {},
      counponCount: 0
    };
  },
  mounted() {
    this.getCouponCount() //获取优惠券总数
    this.dialogVisible = this.$store.state.dialogVisible;
    if (this.$store.state.user) {
      this.userInfo =
        this.$store.state.userinfo ||
        JSON.parse(localStorage.getItem("user"));
      this.routerHref =
        "https://www.lihvip.com/register?initUserID=" +
        JSON.parse(localStorage.getItem("user")).id;
    }
    this.path(this.$router.history.current.name);
  },
  watch: {
    $route(to, form) {
      this.dialogVisible = false;
      this.$store.state.dialogVisible = false;
      this.path(to.name);
    }
  },
  components: { chgtranspassword },
  methods: {
    codePath() {
      let _this = this;
      if (this.WechatImg) {
        //防止重复执行
        return false;
      }
      this.WechatImg = !this.WechatImg;
      this.loading = this.$loading({ text: "正在生成，请稍后..." });
      setTimeout(() => {
        let qrcode = new QRCode(document.getElementById("codeId"), {
          width: 285,
          height: 285,
          text:
            "https://www.lihvip.com/register?initUserID=" +
            JSON.parse(localStorage.getItem("user")).id, // 二维码地址
          colorDark: "#000",
          colorLight: "#fff"
        });
        _this.loading.close();
      }, 500);
    },
    copy() {
      //复制链接

      let _this = this;
      //复制分享链接
      let Url2 =
        "https://www.lihvip.com/register?initUserID=" +
        JSON.parse(localStorage.getItem("user")).id;

      let oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message({
        message: "复制成功！",
        type: "success",
        duration: 2000,
        onClose() {
          _this.shareVisible = false;
        }
      });
    },
    path(p) {
      //动态改变左侧高度
      switch (p) {
        case "wallet":
          this.userHeight = "997px";
          break;
        case "orderList":
          this.userHeight = "708px";
          break;
        case "bankCard":
          this.userHeight = "708px";
          break;
        case "address":
          this.userHeight = "100%";
          break;
        case "coupon":
          this.userHeight = "100%";
          break;
      }
    },
    modifyPasswd() {
      //忘记交易密码
      this.dialogVisible = true;
      this.$store.state.dialogVisible = true;
    },
    closeDialog() {
      //交易密码回调
      this.dialogVisible = false;
      this.$store.state.dialogVisible = false;
    },
    modifyImg() {
      //修改用户头像
      document.getElementById("fileInput").click();
    },
    fileImg() {
      this.$get("getUploadFileUrl.do", {
        params: {
          uploadFileType: "saveHeadImg"
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          let reader, files;
          files = this.$refs.uploadFile.files[0];
          reader = new FileReader();
          reader.onload = () => {
            this.imgUrl = reader.result;
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
              let w = img.naturalWidth,
                h = img.naturalHeight,
                resizeW = 0,
                resizeH = 0;
              let maxSize = {
                width: 300,
                height: 300,
                level: 0.6
              };
              if (w > maxSize.width || h > maxSize.height) {
                let multiple = Math.max(w / maxSize.width, h / maxSize.height);
                resizeW = w / multiple;
                resizeH = w / multiple;
              } else {
                return this.callback(files);
              }
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");
              canvas.width = resizeW;
              canvas.height = resizeH;
              ctx.drawImage(img, 0, 0, resizeW, resizeH);
              let base64 = canvas.toDataURL("image/jpeg", maxSize.level);
              this.convertBlob(window.atob(base64.split(",")[1]));
            };
          };
          reader.readAsDataURL(files);
        }
      });
    },
    callback(fileResize) {
      this.$get("getUploadFileUrl.do", {
        params: {
          uploadFileType: "saveHeadImg"
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          let xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.open("POST", data.uploadUrl, true);
          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              const res = JSON.parse(xhr.responseText);
              if (res.code == "0000") {
                this.updateHeadImg(res.urls[0]);
              } else {
                this.$message({ title: "错误", message: data.msg,type:'error' });
              }
            }
          };
          formData = new FormData();
          formData.append("avatar", fileResize);
          xhr.send(formData);
        }
      });
    },
    updateHeadImg(headImg) {
      this.$get("user/updateHeadImg.do", {
        params: {
          headImg: headImg
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          this.userInfo.headImg = headImg;
          this.$store.commit("handleUserName", this.userInfo);
          localStorage.setItem("user", JSON.stringify(this.userInfo));
          // console.log(localStorage.getItem('user'))
        }
      });
    },
    convertBlob(base64) {
      let buffer = new ArrayBuffer(base64.length);
      let ubuffer = new Uint8Array(buffer);
      for (let i = 0; i < base64.length; i++) {
        ubuffer[i] = base64.charCodeAt(i);
      }
      let blob;
      try {
        blob = new Blob([buffer], { type: "image/jpg" });
      } catch (e) {
        window.BlobBuilder =
          window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder ||
          window.MSBlobBuilder;
        if (e.name === "TypeError" && window.BlobBuilder) {
          var blobBuilder = new BlobBuilder();
          blobBuilder.append(buffer);
          blob = blobBuilder.getBlob("image/jpg");
        }
      }
      this.callback(blob);
    },
    getCouponCount() {
       this.$get("user/coupon.do", {
        params: {
          pageNum: 1,
          pageSize: "10",
          status: "NOT",
          type: ""
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          if(data.list && data.list.count) {
            this.counponCount = data.list.count
          }
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.user {
  display: flex;
}
.user-col {
  .user-l {
    background: #fff;
    transition: all 0.3s;
    width: 100%;
    float: left;
    text-align: left;
    color: #333;
    span {
      width: 100px;
      display: inline-block;
      text-align: left;
    }
    .user-icon {
      width: 50px;
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
      height: 70px;
    }

    .user-icon.i-q {
      background: url(../../../static/icon/user-qianbao.png) right no-repeat;
      background-size: 18px 18px;
    }
    .user-icon.i-o {
      background: url(../../../static/icon/user-order.png) right no-repeat;
      background-size: 18px 18px;
    }
    .user-icon.i-b {
      background: url(../../../static/icon/user-backcard.png) right no-repeat;
      background-size: 18px 18px;
    }
    .user-icon.i-s {
      background: url(../../../static/icon/user-address.png) right no-repeat;
      background-size: 18px 18px;
    }
    .user-icon.i-c {
      background: url(../../../static/icon/user-coupon.png) right no-repeat;
      background-size: 18px 18px;
    }
  }

  .user-l.active,
  .user-l:hover {
    background: #EEEEEE;
  }
}
.user-content {
  padding: 0;
  background: #f1f1f1;
  .user-main {
    width: 250px;
    float: left;
    background: #fff;
    margin-right: 10px;
    padding: 40px 0;
    height: 940px;
    box-sizing: border-box;
    text-align: center;
    .user-img {
      width: 82px;
      height: 82px;
      margin: 0 auto;
      margin-bottom: 30px;
      position: relative;
      .img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .icon {
        position: absolute;
        bottom: -10px;
        left: calc(50% - 10px);
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    .user-phone {
      font-size: 14px;
      margin-bottom: 8px;
      font-weight: bold;
      span {
        color: #000;
        transition: all 0.3s;
      }
    }
    .user-vip{
      background: url(../../assets/img/vip-tuser.png)  no-repeat;
      width: 74px;
      height: 20px;
      color: #FFF;
      display: block;
      margin: 0 auto;
      em{
        padding-left: 11px;
        text-align: center;
        display: block;
      }
    }
    .beijingbox{
      background: url(../../assets/img/beijing.png)  no-repeat;
      width: 250px;
      height: 57px;
      color: #FFF;
      display: block;
      margin-top: 20px;
      text-align: left;
      .leftbox{
        float: left;
        width: 120px;
        padding:6px 0 0 19px;
        em{
          display: block;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          line-height: 22px;
        }
        i{
          display: block;
          font-size:12px;
          font-family:Microsoft YaHei;
          line-height: 20px;
        }
      }
      .rightbox{
        float: right;
        text-align:  center;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:600;
        color: #875C2A;
        width: 101px;
        line-height: 57px;
      }
    }
    .user-phone span:hover {
      color: #91856f;
    }
    .user-operation {
      //display: flex;
      // text-align: center;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      padding: 20px 18px 0;
      box-sizing: border-box;
      font-size: 12px;
      .path {
        float: left;
        // margin: 0 10px;
        cursor: pointer;
        color: #999999;
        transition: all 0.3s;
      }
      .path+.path{
        float: right;
      }
      .path:hover {
        color: #d1b98e;
      }
    }
    .share-divider{
    	margin-top: 20px;
    	width: 100%;
    	border: 1px dashed #EEEEEE;
    }
    .share-divider1{
    	width: 100%;
    	border: 1px dashed #EEEEEE;
    }
    .user-share {
    	padding: 20px;
      width: calc(100% - 40px);
      display: table;
    	text-align: center;
    	.u-s-wrap{
    			display: table-cell;
      		vertical-align: middle;
      .code-wrap{
      	height: 100%;
      	display: table;
      	float: left;
      	p {
      		display: table-cell;
      		vertical-align: middle;
      		font-size: 12px;
      	  color: #666666;
      	  span {
      	    color: 12px;
      	    margin-left: 5px;
      	    display: block;
      	    font-weight: bold;
      	  }
      	}
      }
      .btn-wrap{
      	height: 100%;
      	float: right;
      	display: table;
      	.btn-box{
      		display: table-cell;
      		vertical-align: middle;
      		.share-tap {
      		  width: 112px;
      		  height: 30px;
      		  line-height: 30px;
      		  text-align: center;
      		  color: #fff;
      		  background: #C2AB82;
      		  font-size: 12px;
      		  border-radius: 4px;
      		  transition: all 0.3s;
      		  cursor: pointer;
      		}
      	}
      	
      }
      .share-tap:hover {
        background: #d1b98e;
      }
    }
    		
    	}
  }
  .user-view {
    width: 940px;
    float: right;
    max-width: 940px;
    overflow-x: hidden;
    background: #fff;
    overflow-y: scroll;
  }
  .user-view::-webkit-scrollbar {
    display: none;
  }
}
.IsCashOpen {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 50px 30px 64px 30px;
  }
  .IsCashOpen-content {
    box-sizing: border-box;
    .title {
      background: #f1f1f1;
      padding: 10px 20px;
      font-weight: bold;
      font-size: 15px;
      color: #856020;
      box-sizing: border-box;
    }
    .CashOpen-main {
      width: 377px;
      margin: 30px auto;
      .path {
        width: 100%;
        border: 1px solid #d9d9d9;
        line-height: 36px;
        height: 36px;
        padding: 0 15px;
        box-sizing: border-box;
        color: #999999;
      }
      p {
        margin-top: 10px;
        color: #999999;
      }
    }
    .CashOpen-tap {
      width: 377px;
      margin: 30px auto;
      padding: 0 10px;
      box-sizing: box-border;
      .clone-path {
        float: left;
        width: 148px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background: #91856f;
      }
      .clone-Wechat {
        float: right;
        width: 148px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background: #91856f;
        position: relative;

        .triangle_border_up {
          width: 0;
          height: 0;
          border-width: 0 15px 15px;
          border-style: solid;
          border-color: transparent transparent #f7f7f7; /*透明 透明  灰*/
          margin: 40px auto;
          position: absolute;
          top: 17px;
          left: 60px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.Wechat-img {
  width: 272px;
  padding: 30px 36px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  left: calc(50% - 136px);
  color: #666666;
  line-height: 23px;
  top: 36px;
  -moz-box-shadow: 0px -5px 18px #ccc;
  -webkit-box-shadow: 0px -5px 18px #ccc;
  box-shadow: 0px -5px 18px #ccc;
  img {
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
    border: 1px solid #fff;
  }
}
</style>

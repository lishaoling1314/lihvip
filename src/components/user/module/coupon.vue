<template>
  <div class="coupon">
    <div class="tab-container">
      <!-- 选项 -->
      <div class="cat">
        <div class="title">优惠券({{couponList['NOT'].length}})</div>
        <el-form ref="form">
          <el-checkbox-group v-model="checkedCats" @change="handleCheckedCatsChange">
            <el-checkbox
              v-for="(item,index) in couponList"
              :key="index"
              :label="index"
              :name="index"
              @change="checkboxChange(index)"
              :class="index == checkedCats[0]?'active':''"
            >{{item.name}}({{couponList[index].length}})</el-checkbox>
          </el-checkbox-group>
        </el-form>
      </div>
      <div v-if="!couponList[selected].length" class="no-available">
        <img src="@/assets/img/no_coupon.png">
        暂无优惠券
      </div>
      <!-- 优惠券列表 -->
      <div class="coupon-container">
        <div v-for="item in cats" :key="item.id">
          <p
            class="coupon-type"
            v-if="couponList[checkedCats[0]][item.id].length"
          >{{item.name}}({{couponList[checkedCats[0]][item.id].length}})</p>
          <div
            class="coupon-available-inner-wrap"
            :class="selected == 'APPLIED'?'has-been-used':(selected == 'OVER'?'expired':'')"
          >
            <div
              class="coupon-available-list"
              v-for="(item,index) in couponList[selected][item.id]"
              :key="index"
            >
              <div class="coupon-available-item" :counpon-type="item.type">
                <div class="coupon-available-item-left">
                  <div class="coupon-des">
                    <span>{{(item.couponAmount ? item.couponAmount :(item.couponDiscount ? item.couponDiscount:item.couponRate))}}</span>
                    <span
                      :class="item.couponRate ?'percent':''"
                    >{{couponType[item.type] ? couponType[item.type].type :'￥'}}</span>
                    <span></span>
                    <span v-if="item.type=='DISCOUNT'">满{{item.couponBuyAmount}}用</span>
                    <span v-else-if="item.type=='RATE'">仅限代售</span>
                    <span v-else-if="item.type=='AMOUNT'">满{{item.couponBuyAmount}}减</span>
                    <span v-else>无门槛</span>
                  </div>
                  <div class="time-limit">
                    使用期限：{{(item.applyType == 'PERMENT' ? '永久有效':(item.applyType == 'DAY' ? `领取${item.receiveDay}天内有效`:`${item.applyBeginDate.substr(0,10).replace(/-/gi,'.')}-${item.applyEndDate.substr(0,10).replace(/-/gi,'.')}`))}}
                  </div>
                </div>
                <div
                  class="coupon-available-item-right"
                  @click="toGoodsList"
                ><span>{{selected=='NOT'?'立即使用':(selected=='APPLIED'?'已使用':'已过期')}}</span></div>
              </div>
              <div class="available-des" v-if="item.remark">{{item.remark}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </el-tab-pane> -->
  </div>
</template>
<script>
import Qs from "qs";
import templateAddress from "./template-address";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      loading: false,
      checkedCats: ["NOT"], //选中项
      cats: {
        AMOUNT: {
          id: "AMOUNT",
          name: "满减优惠券",
          type: "￥"
        },
        RATE: {
          id: "RATE",
          name: "加息优惠券",
          type: "加息"
        },
        DISCOUNT: {
          id: "DISCOUNT",
          name: "折扣优惠券",
          type: "折"
        }
      },
      //选项列表
      couponList: {
        //优惠券列表
        NOT: {
          name: "未使用",
          length: 0,
          currentPageNum: 1,
          ALL: {},
          AMOUNT: [],
          RATE: [],
          DISCOUNT: []
        },
        APPLIED: {
          name: "已使用",
          length: 0,
          currentPageNum: 1,
          ALL: {},
          AMOUNT: [],
          RATE: [],
          DISCOUNT: []
        },
        OVER: {
          name: "已过期",
          length: 0,
          currentPageNum: 1,
          ALL: {},
          AMOUNT: [],
          RATE: [],
          DISCOUNT: []
        }
      },
      selected: "NOT", //当前选中状态
      couponType: {
        ALL: {
          name: "全部",
          type: "￥"
        },
        AMOUNT: {
          name: "减免",
          type: "￥"
        },
        RATE: {
          name: "加息",
          type: "加息"
        },
        DISCOUNT: {
          name: "折扣",
          type: "折"
        }
      }
    };
  },
  components: { templateAddress },
  created() {
    this.getCouponListData('NOT')
    this.getCouponListData('APPLIED')
    this.getCouponListData('OVER')
  },
  mounted() {
    //兼容IE
    const wrap = document.getElementsByClassName('user-view')[0];
    wrap.style.overflow = 'hidden' 
  },
  computed: {
    noAvailableCoupon() {
      if (
        this.couponList[this.selected][this.checkedCats[0]] &&
        !this.couponList[this.selected][this.checkedCats[0]].length
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getCouponListData(targetStatus) {
      const targetSlected = this.couponList[targetStatus];
      if (targetSlected && targetSlected.pages === 0) {
        //无任何优惠券
        return;
      }
      if (
        targetSlected &&
        targetSlected.pages && targetSlected.currentPageNum &&
        targetSlected.currentPageNum > targetSlected.pages
      ) {
        //使用缓存数据
        return;
      }
      this.$get("user/coupon.do", {
        params: {
          pageNum: targetSlected.currentPageNum,
          pageSize: "10",
          status: targetStatus,
          type: ""
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          const couponData = data.list.data;
          if (couponData) {
            targetSlected.length = data.list.count;
            targetSlected.pages = data.list.pages; //每种状态总页数
            targetSlected.currentPageNum =  targetSlected.currentPageNum + 1; //每种状态当前页数
            this.handleData(couponData, targetStatus);
          }
          if(data.list.pages && data.list.currentPageNum == data.list.pages){
            return
          }
          this.getCouponListData(targetStatus); //！！不做分页，递归获取全部状态优惠券
        }
      });
    },
    handleData(data, status) {
      data.map(item => {
        this.couponList[status][item.type] &&
          this.couponList[status][item.type].push(item);
        if (item.type === "NO") {
          //无门槛优惠券包括在满减优惠券中
          this.couponList[status]["AMOUNT"].push(item);
        }
      });
    },
    handleCheckedCatsChange(value) {
      this.selected = value;
    },
    checkboxChange(val) {
      //实现单选
      this.checkedCats = [];
      this.checkedCats.push(val);
    },
    toGoodsList() {
      if (this.selected == "NOT") {
        this.$router.push({ path: "/goodsList" });
      }
    }
  },
  props: ["confirmOrder"]
};
</script>
<style lang="less">
.coupon {
  .cat {
    .el-form-item {
      display: block;
      float: left !important;
    }
  }
  .el-form-item__content {
    line-height: 1px !important;
  }
  .el-tabs__item {
    color: #cccccc !important;
  }
  .el-tabs__header {
    margin: 0 !important;
  }
  .el-tabs__active-bar {
    background-color: #91856f;
  }
  .el-tabs__item.is-active {
    color: #333333 !important;
  }
  .el-tabs__item {
    font-size: 18px !important;
    height: auto;
    padding-bottom: 14px;
  }
  .el-checkbox__inner {
    width: 12px;
    height: 12px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #91856f;
    border-color: #91856f;
  }
  .el-checkbox__inner::after {
    top: 0;
  }
  .el-checkbox {
    margin-right: 20px !important;
  }
  .el-checkbox__label,
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #666 !important;
    font-size: 12px;
    margin-left: 5px;
    padding-left: 0;
  }
  .active {
    .el-checkbox__label,
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #91856f !important;
    }
  }
}
</style>
<style lang="less" scoped>
.user-view {
  height: 100%;
}
.el-checkbox__label {
  color: red !important;
}
.user-main {
  height: 750px!important;
}
.coupon {
  height: 100%;
  padding: 50px;
  min-height: 750px;
  box-sizing: border-box;
  position: relative;
  .no-available {
    display: inline-block;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    text-align: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(153, 153, 153, 1);
    margin-top: 120px;
    img {
      margin-bottom: 40px;
      display: block;
    }
  }
  .coupon-container {
    height: calc(100% - 98px);
    overflow: auto;
    position: absolute;
    top: 98px;
  }
  .tab-wrap {
    // display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    div {
      font-size: 18px;
      position: relative;
      padding-bottom: 14px;
      cursor: pointer;
      color: #ccc;
      &:not(:first-child) {
        margin-left: 48px;
      }
    }
    .is-active {
      color: #333;
      &:after {
        content: "";
        display: inline-block;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        border-bottom: 1px solid #91856f;
      }
    }
  }
  .cat {
    display: inline-block;
    width: 100%;
    // justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
    width: 100%;
    .title {
      color: #666666;
      font-weight: bold;
      font-size: 18px;
      float: left;
    }
    form {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      
    }
  }
  .has-been-used {
    opacity: 0.5;
  }
  .expired {
    opacity: 0.5;
    .coupon-des span:nth-child(3) {
      opacity: 0.5;
    }
    .coupon-available-item-left {
      background-color: #f3f3f3 !important;
    }
    .time-limit {
      color: #ccc !important;
    }
    .coupon-des {
      * {
        color: #666 !important;
        opacity: 0.8;
      }
      span:nth-child(3) {
        background-color: linear-gradient(
          transparent,
          rgba(204, 204, 204, 0.2),
          transparent
        ) !important;
      }
    }
    .coupon-available-item-left:after,
    .coupon-available-item-right {
      background-color: #ccc !important;
      &:before {
        background-color: inherit !important;
      }
      &:after {
        background-color: rgba(243, 243, 243, 1) !important;
      }
    }
    .coupon-available-item-right:after {
      background-color: #ccc !important;
    }
  }
  .coupon-type {
    font-size: 14px;
    color: #999999;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .coupon-available-inner-wrap {
    width: 100%;
    overflow: auto;
    // display: flex;
    // align-items: flex-start;
    // flex-wrap: wrap;
    // justify-content: space-start;
    overflow-y: hidden;
    .coupon-available-list {
      display: inline-block;
      width: 254px;
      position: relative;
      margin-bottom: 30px;
      margin-right: 30px;
      vertical-align: top;
      &:nth-child(3n) {
        margin-right: 0 !important;
      }
      &:hover {
        .available-des {
          display: block;
        }
      }
      .available-des {
        display: none;
        position: relative;
        font-size: 12px;
        color: #666666;
        padding: 20px;
        box-sizing: border-box;
        line-height: 1.5;
        background-color: rgba(243, 243, 243, 1);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        &:before {
          content: "";
          display: inline-block;
          width: 100%;
          height: 10px;
          background-color: rgba(243, 243, 243, 1);
          position: absolute;
          top: -5px;
          right: 0;
        }
      }
      .coupon-available-item {
        // display: flex;
        justify-content: space-between;
        align-items: center;
        height: 88px;
        // justify-content: flex-start;
        overflow: hidden;
        .coupon-available-item-left {
          width: 221px;
          height: 100%;
          // flex: 1;
          float: left;
          // display: inline-flex;
          display: inline-block;
          // justify-content: space-around;
          // flex-direction: column;
          border-radius: 10px;
          background-color: #faf7eb;
          position: relative;
          z-index: 99;
          &:before {
            content: "";
            width: 20px;
            height: 20px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
          }
          &:after {
            content: "";
            clear: both;
            width: 20px;
            height: 20px;
            background-color: #91856f;
            border-radius: 50%;
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 198;
          }
          .coupon-des {
            width: 100%;
            // display: inline-flex;
            display: inline-block;
            align-items: center;
            // justify-content: flex-end;
            position: relative;
            height: 100%;
            span:first-child {
              // min-width: 45px;
              font-size: 33px;
              font-weight: bold;
              position: relative;
              color: #807157;
              // display: inline-flex;
              display: inline-block;
              position: absolute;
              right: 152px;
              top:23px;
              justify-content: center;
              text-align: center;
              line-height: 1;
            }
            span:nth-child(2) {
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              position: absolute;
              right: 135px;
              top: 13px;
              line-height: 1;
              color: #807157;
              // align-self: flex-start;
              transform: translateY(25%);
              &.percent {
                font-size: 12px;
                width: 12px;
                top: -10px;
                position: absolute;
                left: 74px;
                line-height: 1.5;
                & + span {
                  // font-size: 12px !important;
                }
                &::after {
                  content: "%";
                  display: inline-block;
                  position: relative;
                  font-size: 14px;
                }
              }
            }
            span:nth-child(3) {
              display: inline-block;
              width: 1px;
              height: 50%;
              font-size: 10px;
              line-height: 1;
              font-weight: bold;
              position: absolute;
              left: 96px;
              // top: 0;
              margin-top: 15px;
              background: linear-gradient(transparent, #91856f, transparent);
              filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#ffffff, endColorstr=#91856f);
            }
            span:last-child {
              width: 115px;
              display: inline-block;
              color: #7b7569;
              font-size: 20px;
              font-weight: 400;
              position: absolute;
              left: 113px;
              top: 28px;
              line-height: 1;
            }
          }
          .time-limit {
            font-size: 12px;
            color: #7b7569;
            font-weight: 400;
            margin-bottom: 10px;
            display: inline-block;
            position: absolute;
            left: 21px;
            bottom: 0;
            img {
              width: 12px;
              height: 12px;
              margin-left: 33px;
            }
          }
        }
        .coupon-available-item-right {
          width: 33px;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 5px;
          vertical-align: middle;
          height: 100%;
          color: #fff;
          float: right;
          // writing-mode: vertical-rl;
          background-color: #91856f;
          text-align: center;
          // display: inline-flex;
          // justify-content: center;
          // align-items: center;
          position: relative;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          z-index: 6;
          cursor: pointer;
          span {
            writing-mode: vertical-rl;
            position: absolute;
            height: 100%;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            word-wrap: break-word;
            display: inline-block;

          }
          &:after {
            content: "";
            width: 6px;
            height: 100%;
            background-color: #91856f;
            position: absolute;
            left: -5px;
            z-index: 96;
          }
          &.disabled {
            background-color: #999;
            &:before {
              background-color: #999;
            }
            &:after {
              background-color: #999;
            }
          }
        }
      }
    }
  }
}
</style>
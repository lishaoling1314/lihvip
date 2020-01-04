<template>
  <div class="address">
    <div class="address-content">
      



      <el-dialog :visible.sync="addAddressShow" width="580px" v-if="addAddressShow" top="25vh"><!-- 收货地址 -->
        <template-address v-if="addAddressShow" @successAddress="successAddressTap" ref="templateAddress"></template-address>
      </el-dialog>


      <div class="address-tap" @click="addAddressShow = true">
        <span>+</span>添加地址
      </div>
      <div class="address-tabel" v-if="tableData.length<1 || !this.confirmOrder">
          <div class="tabel-col" v-for="(item,index) in tableData" :key="index">
            <div class="col" style="width:95px;" :title="item.recipients">{{item.recipients}}</div>
            <div class="col" style="width:120px;" :title="item.iphone">{{item.iphone}}</div>
            <div class="col" style="width:400px;" :title="item.regionName+item.detailed">{{item.regionName}}{{item.detailed}}</div>
            <div class="col" style="width:100px;">
                <el-button type="text" size="small" @click="modifyAddress(item.id)">修改</el-button>
                <el-button type="text" size="small" @click="removeAddress(item.id,item.isDefault)">删除</el-button>
            </div>
            <div style="text-align:center;" :class="item.isDefault=='YES'?'default col':'col'" @click="setDefault(item.id,item.isDefault)" >默认地址</div>
            <div style="clear:both"></div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
import templateAddress from "./template-address";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      loading:false,
      addAddressShow:false,//新增修改收获地址
      bodyWidth: "1200px",
      tableData: [], //收货地址
      ModifyAddress:{},//修改渲染地址
      isAddModify: 0, //0则为新增，1为修改


    };
  },
  components:{templateAddress},
  mounted() {
    this.allAddress();
  },
  methods: {
    successAddressTap(){//成功修改或者添加收获地址
      this.addAddressShow = false;
      this.allAddress();
    },
    modifyAddress(id) {
      //修改收货地址
      this.addAddressShow = true
       this.loading = this.$loading({text: '数据加载中，请稍后...'});
      this.isAddModify = 1; //
      setTimeout(()=>{
        this.tableData.map(item => {
          
          if (id == item.id) {
           this.$nextTick(() => {
                this.$refs.templateAddress.init(item);
            });
            this.loading.close()
          }
        });
      },300)
      
    },
    
    removeAddress(id,isDefault) {
      //删除收货地址
      let _this = this;
      if(isDefault == 'YES'){
        this.$message.error("默认地址不能删除!");
        return false;
      }
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$get("user/address/del.do", {
            params: {
              addressId: id
            }
          }).then(({ data }) => {
            if (data.code == "0000") {
              this.$message({
                type: "success",
                message: "删除成功!",
                onClose() {
                  _this.allAddress();
                }
              });
            }
          });
        })
        .catch(() => {});
    },
    setDefault(id,isDefault) {
      //设置默认
      //user/address/setDefault.do
      let _this = this;
      if(isDefault == 'YES'){
        this.$message.error("当前地址已经是默认地址!");
        return false;
      }
      this.$get("user/address/setDefault.do", {
        params: { addressId: id }
      }).then(({ data }) => {
        if (data.code == "0000") {
          _this.allAddress();
          this.$message({
            type: "success",
            message: "设置成功!"
          });
        }
      });
    },
    allAddress() {
      //所有收货地址
      this.$get("user/address/all.do").then(({ data }) => {
        //console.log(data);
        if (data.code == "0000") {
          data.address.map(item=> {
            item.iphone = item.phone
            item.phone = item.phone.slice(0,3) + '****' + item.phone.substr(item.phone.length-4,item.phone)
          })
            this.tableData = data.address;
        }
      });
    }
  },
  props: ["confirmOrder"]
};
</script>
<style lang="less" scoped>
.address{
  background: #fff;
  min-height: 708px;
  .el-button--text{color: #91856f}
}
.address-content {
  display: flex;
  flex-direction: column;
  background: #fff;
  .address-tap{
    text-align: right;
    padding-right: 40px;
    cursor: pointer;
    box-sizing: border-box;
    margin-top: 50px;
    font-size: 18px;
    color: #91856F;
    width: 150px;
    margin-left: auto;
    span{margin-right: 5px;}
  }
}
.add-address {
  width: 100%;
  .title {
    width: 100%;
    background: #f1f1f1;
    color: #91856F;
    line-height: 44px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
  }
  .form {
    margin-top: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    .input,
    .el-cascader {
      width: 337px;
    }
    .formTap {
      width: 114px;
      height: 36px;
      border: none;
      background: #91856F;
      color: #fff;
      border-radius: 0;
      text-align: center;
    }
  }
}
.address-tabel {
  margin: 30px 0;
  padding: 0 40px;
  box-sizing: border-box;
  .tabel-col{
    border:1px solid #ccc;
    padding: 23px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
    .col{
      float: left;
      // margin-left: 65px;
      padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
      height: 35px;
      line-height: 35px;
      word-break:keep-all;           /* 不换行 */
      white-space:nowrap;          /* 不换行 */
      overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
    .col:nth-child(1){margin-left: 0;}
  }
  .default {
    background: #91856F;
    width: 80px;
    text-align: center;
    line-height: 35px;
    color: #fff;
    border-radius: 4px;
  }
}
.address .el-table__header-wrapper .el-table td,
.el-table th.is-leaf {
  background-color: #fafafa;
}
</style>
<template>
  <div class="add-address">
    <!-- <div class="title">{{!this.id?'新增':'修改'}}收货地址</div> -->
    <el-form
      ref="dataForm"
      :model="formData"
      class="form"
      :rules="dataRule"
      @keyup.enter.native="addAddress()"
       v-loading="loading"
    >
      <el-form-item label="收货人：" label-width="140px" prop="recipients">
        <el-input v-model="formData.recipients" class="input" style="width:315px"></el-input>
      </el-form-item>
      <el-form-item label="所在地区：" label-width="140px">
        <el-select
          v-model="formData.value"
          placeholder="省级"
          style="width:87px"
          @change="selectChang"
        >
          <el-option v-for="item in options0" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="formData.value1"
          placeholder="市级"
          style="width:110px"
          @change="selectChang1"
        >
          <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="formData.value2"
          placeholder="区县"
          style="width:110px"
          @change="selectChang2"
        >
          <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：" label-width="140px" prop="detailed">
        <el-input v-model="formData.detailed" class="input" style="width:315px"></el-input>
      </el-form-item>

      <el-form-item label="手机号码：" label-width="140px" prop="phone">
        <el-select
          v-model="formData.quyu"
          placeholder="+86"
          style="width:70px"
        >
          <el-option v-for="(item,index) in quyu" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-input v-model="formData.phone" class="input"  style="width:240px"></el-input>
      </el-form-item>
     

      
      <el-form-item label label-width="140px">
        <el-checkbox-group v-model="formData.isDefault">
          <el-checkbox label="设置为默认地址" name="isDefault"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label label-width="140px">
        <el-button
          type="primary"
          class="formTap"
          @click="addAddress()"
          :disabled="addAddressisDisable"
          style="width:350px"
        >{{this.id==0?'新增':'修改'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import { setTimeout } from 'timers';
import Qs from 'qs';
export default {
  data() {
    return {
      id: "",
      loading:false,
      options0: [], //省级
      options1: [], //市级
      options2: [], //县级
      quyu:['+86'],//+86
      formData: {
        quyu:'',
        detailed: "", //详细地址
        recipients: "", //收件人
        phone: "", //收件人手机号码
        isDefault: "", //是否设置默认
        regionId: "", //收货地址ID
        value: "",
        value1: "",
        value2: ""
      },
      addAddressisDisable: false, //防止按钮重复点击
      dataRule: {
        recipients: [
          { required: true, message: "请输入收货姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入收货人号码", trigger: "blur" }
        ],
        detailed: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  props:{
      ModifyAddress:{
          type:Object
      }
  },
  mounted() {
    this.$get("selectRegion.do", {
      params: {
        regionId: 0
      }
    }).then(({ data }) => {
      if (data.code == "0000") {
        this.options0 = data.region;
      }
    });
  },
  methods: {
    init(view){
        // console.log(view)
        setTimeout(()=>{
            this.id = view.id;
            this.formData.recipients = view.recipients;
            // console.log(view)
            this.formData.phone = view.iphone;
            this.formData.detailed = view.detailed;
            this.formData.isDefault = view.isDefault=='YES'?true:false;
            this.addressModify(view.regionIds);
        },300)
    },
    selectChang(val, callback) {
      //省级
      this.$get("selectRegion.do", {
        params: {
          regionId: val
        }
      }).then(({ data }) => {
        if (data.code == "0000" && val >= 1) {
          if (typeof callback == "function") {
            callback(data.region);
          } else {
            // this.options2 = [];
            this.formData.value1 = "";
            this.formData.value2 = "";
            this.options1 = data.region;
            this.options2 = [];
          }
        }
      });
    },
    selectChang1(val) {
      //市级
      this.formData.value2 = "";
      this.$get("selectRegion.do", {
        params: {
          regionId: val
        }
      }).then(({ data }) => {
        // //console.log(data);
        if (data.code == "0000" && val >= 1) {
          this.options2 = data.region;
        }
      });
    },
    selectChang2(val) {
      //区县
      // console.log(val)
      this.formData.regionId = val;
    },
    addAddress() {

    //  console.log(this.formData.regionId)

      if (this.formData.recipients.length > 15) {
        this.$message.error("收件人姓名不符合规则！");
        return false;
      }
      if (this.formData.phone == '') {
        this.$message.error("请输入手机号码!");
        return false;
      }











      let _this = this;


      let D = Qs.stringify({
        id: this.id || "",
        isDefault:this.formData.isDefault ? "YES" : "NO",
        regionId: this.formData.regionId,
        detailed: encodeURI(this.formData.detailed),
        recipients: encodeURI(this.formData.recipients),
        phone: this.formData.phone
      })

      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (
            this.formData.value == "" ||
            this.formData.value1 == "" ||
            this.formData.value2 == ""
          ) {
            this.$message.error("请选择地址！");
            return false;
          }
          // //console.log(this.formData.isDefault)
          this.$post('user/address/save.do', D).then(({ data }) => {
            if (data.code == "0000") {
              this.addAddressisDisable = true;
              this.$emit('successAddress');
              this.$message({
                type: "success",
                message: "添加成功!",
                onClose() {
                  _this.addAddressisDisable = false;
                  // _this.formData = {};
                  // _this.options = [];
                  _this.options1 = [];
                  _this.options2 = [];
                  _this.formData.isDefault = "";
                  _this.formData.recipients = "";
                  _this.formData.phone = "";
                  _this.formData.detailed = "";
                  _this.formData.isDefault = false;
                  _this.formData.value = "";
                  _this.formData.value1 = "";
                  _this.formData.value2 = "";
                }
              });
            }
          });
        }
      });

      // //console.log(Obj)
    },
    addressModify(reg) {
      //修改收货地址一次性请求地址
      let arr = reg.split(",");
      // //console.log(arr)

      this.$get("selectRegion.do", {
        //传0获取省
        params: {
          regionId: 0
        }
      }).then(({ data }) => {
        if (data.code == "0000") {
          // this.options0 = data.region;
          data.region.map(item => {
            if (item.id == arr[0]) {
              this.formData.value = item.name; //对省会进行赋值

              this.selectChang(item.id, res => {
                //传省会ID获取市列表
                res.map(items => {
                  if (items.id == arr[1]) {
                    this.formData.value1 = items.name; //对市进行赋值
                    this.options1 = res;
                    //console.log(this.options1);
                    this.selectChang(items.id, itemx => {
                      // //console.log(itemx)
                      itemx.map(ress => {
                        if (ress.id == arr[2]) {
                          this.selectChang(items.id, itemq => {
                            this.options2 = itemq;
                            itemq.map(resq => {
                              if (resq.id == arr[2]) {
                                this.formData.value2 = resq.name; //对区县进行赋值
                                this.formData.regionId = resq.id;
                              }
                            });
                          });
                        }
                      });
                    });
                  }
                });
              });
            }
          });
        }
      });
      // this.loading = false;
    }
  }
};
</script>

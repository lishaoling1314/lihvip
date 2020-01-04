<template>
    <div class="template-spes" v-if="infoList">


        <!-- <div class="spes" v-if="infoList">
            <div class="spes-time"></div>
            <div class="spes-icon active"><i class="success"></i></div>
            <div class="spes-text">
                <p class="title">同意退款，预计在X个工作日后到账，请注意查收退款</p>
            </div>
            <div style="clear:both"></div>
        </div> -->

        <div class="spes" v-for="(item,index) in infoList" :key="index">
            <div class="spes-time">{{item.createTime}}</div>
            <div :class="index != infoList.length-1?'spes-icon i':'spes-icon'"><i></i></div>
            <div class="spes-text">
                <p class="title" v-if="!item.returnGoodsAddr">{{item.title}}</p>

                <el-button  class="title path" v-if="item.returnGoodsAddr && item.newStatus =='PROCESSING' && !addLogistics" @click="istuihuo = true;getLogisticsSelect()">填写退货物流</el-button>
                <p class="p" v-if="item.remark && item.newStatus =='FAILURE_OF_REFUND'">拒绝原因：{{item.remark}}</p>



                <p class="p" v-if="item.logisticsCompany && item.newStatus =='PROCESSING'">物流公司：{{item.logisticsCompany}}</p>




                <p class="p" v-if="item.logisticsNo && item.newStatus =='PROCESSING'">物流单号：{{item.logisticsNo}}</p>

                <p class="p b" v-if="item.returnGoodsAddr && item.newStatus =='PROCESSING'">商家已同意退款，请退货给商家</p>
                <p class="p" v-if="item.returnGoodsAddr && item.newStatus =='PROCESSING'">退货地址：{{item.returnGoodsAddr}}</p>


                <p class="p" v-if="item.newStatus == 'APPLYING'">退货原因：{{refundReason(item.afterSaleReason)}}</p>
                <p class="p" v-if="item.newStatus == 'APPLYING'">退货说明：{{item.remark}}</p>


            </div>
            <div style="clear:both"></div>
        </div>


    <el-dialog :visible.sync="istuihuo" width="580px" v-if="istuihuo" top="25vh">
      <div class="layer-tuihuo">
        <div class="title">填写退货物流信息</div>
        <div class="form-item">
            <div class="label">物流公司：</div>
            <el-select v-model="selectValue" placeholder="请选择" class="label-input">
              <el-option
                v-for="(item,index) in selectList"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <div style="clear:both"></div>
        </div>
        <div class="form-item">
            <div class="label">物流单号：</div>
            <el-input type="text" :rows="2" placeholder="请输入,限200字符" class="label-text" v-model="logisticsNum" maxlength="30"></el-input>
            <div style="clear:both"></div>
        </div>
        <div class="form-item">
            <div class="label">说明：</div>
            <el-input type="textarea" :rows="2" placeholder="请输入,限200字符" class="label-text" v-model="textarea"></el-input>
            <div style="clear:both"></div>
        </div>
        <div class="layer-btp" @click="submitLogistics">提交申请</div>
      </div>
    </el-dialog>
    
       
    </div>
</template>
<script>
export default {
    data(){
        return {
            istuihuo:false,//退货物流
            selectValue:'',//物流公司
            selectList:[],//物流列表
            logisticsNum:'',//物流单号
            textarea:'',//填写备注
        }
    },
    watch:{
        'istuihuo'(){
            this.selectValue = '';
            this.logisticsNum = '';
            this.textarea = '';
        }
    },
    computed:{
        refundReason(){
            return (text)=>{
                let T = ''
                switch (text) {
                    case 'COLOUR_DESIGN_PATTERN_ERROR':
                        T = '颜色、款式、图案描述不符合';
                        break;
                    case 'COUNTERFEIT_BRANDS':
                        T = '假冒品牌';
                        break;
                    case 'SIZE_NOT_DESCRIPTION':
                        T = '大小尺寸与描述不符';
                        break;
                    case 'DEFECTS_IN_WORKMANSHIP':
                        T = '做工瑕疵';
                        break;
                    case 'DISLIKE_WRONG_SIZE_BAD_EFFECT':
                        T = '尺寸拍错不喜欢、效果不好';
                        break;
                    case 'MATERIAL_FABRIC_COMMODITY_NOT_MATCH':
                        T = '材质、面料与商品描述不符';
                        break;
                    case 'SEVEN_DAYS_REASON_GOODS':
                        T = '七天无理由退换货';
                        break;
                    case 'SELLER_MISDELIVERED_GOODS':
                        T = '卖家发错货';
                        break;
                    case 'SELLER_COUNTERFEIT_GOODS':
                        T = '卖家虚假发货';
                        break;
                }
                return T
            }
        }
    },
    methods:{
        submitLogistics(){//提交物流信息
        // alert(1)
            this.loading = this.$loading({ text: "" });
            this.$post('user/aftermarket/addLogistics.do',{
                logisticsCompany:this.selectValue,//物流公司
                logisticsNo:this.logisticsNum,//物流单号
                logisticsRemark:this.textarea,//备注
                orderId:this.infoList[0].orderId
            }).then(({data})=>{
                // console.log(data)
                if(data.code == '0000'){
                    this.$message({ type: 'success', message: '提交成功!' });
                    this.istuihuo = false;
                    this.$emit('getinfoList')
                }
                this.loading.close();
            })
            
        },
        getLogisticsSelect(){//获取物流公司
            let list = []
            this.$get('logisticsSelect.do').then(({data})=>{
                for(let i in data.list){
                    if(data.list[i].length){
                        for(let o of data.list[i]){
                            list.push(o)
                        }
                    }
                }
                this.selectList = list;
            })
        },
    },
    props:{
        infoList:{
            type:Array
        },
        addLogistics:{
            type:Boolean
        }
    }
}
</script>
<style lang="less">
    .layer-tuihuo{
        .title{
            text-align: center;
        }
        .form-item{
          // display: flex;
          margin-top: 20px;
          .label{
            float: left;
            color: #333333;
            font-weight: bold;
            width: 80px;
            text-align: left;
            height: 40px;
            line-height: 40px;
          }
          .label-input{
            float: left;
            width: calc(100% - 80px);
            input{border-radius: 0;border-color:#D9D9D9;}
          }
          .label-text{
            width: calc(100% - 80px);
            .el-textarea__inner{
              height: 140px;
            }
          }
          
        }
        .layer-btp{
            margin-left: 80px;
            margin-top: 50px;
            width: 170px;
            height: 40px;
            line-height: 40px;
            background: #91856F;
            color: #fff;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            transition: all .3s;
        }
        .layer-btp:hover{ background: #b2a285; }
    }
</style>
<style lang="less">
    .template-spes{
        .spes:first-child{
            .spes-icon{
                i{background: #91856F;}
            }
        }
        .spes{
            width: 100%;
            font-size: 12px;
            .spes-time,.spes-icon{
                float: left;
                height: 100px;
                // background: #ccc;
                margin-right: 20px;
            }
            .spes-time{
                width: 150px;
                text-align: center;
            }
            .spes-icon{
                width:20px;
                position: relative;
                padding-bottom: 30px;
                i{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    position: relative;
                    background: #CCCCCC;
                    z-index: 20;
                }
            }
            
            .spes-icon.i::before{
                content:"";
                position: absolute;
                // left: 1px;
                left: 50%;
                width: 1px;
                height: 100%;
                background: #EAEAEA;
                z-index: 9;
                top: 10px;
            }
            .spes-text{
                float: left;
                // background: #ccc;
                margin-right: 20px;
                width: 400px;
                .title{
                    font-size: 12px;
                    color: #333333;
                    margin-bottom: 10px;
                }
                .title.path{
                    padding: 7px 15px;
                    background: #C6B078;
                    display: inline-block;
                    font-size: 12px;
                    color: #fff;
                    border-radius: 4px;
                    font-weight: normal;
                }
                .p{
                    margin-bottom: 10px;
                    line-height: 20px;
                    word-wrap: break-word;
                }
                .p.b{font-weight: bold;}
            }
        }

    }
</style>





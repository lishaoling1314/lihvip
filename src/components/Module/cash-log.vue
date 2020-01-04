<template>
    <div class="cashlog w-1200">
        <template-crumbs :crumbsdata="crumbs"></template-crumbs>
        <div class="bankCard-tabel user-shadow">
            <el-table :data="tableData" stripe style="width: 100%" header-align="center" class="tabel"  v-if="tableData.length==0?false:true">
                <el-table-column prop="date" label="申请提现日期" align="center"></el-table-column>
                <el-table-column prop="jine" label="提现金额" align="center"></el-table-column>
                <el-table-column prop="zhanghu" label="收款账户" align="center"></el-table-column>
                <el-table-column prop="shijian" label="提现到账时间"  align="center"></el-table-column>
                <el-table-column prop="type" label="提现状态" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>  
import templateCrumbs from '@/components/component/template_crumbs';
export default {
    data(){
        return {
            tableData: [
                { date: '2019年3月18日11:48:18', jine: ' <span style="margin-right:5px;">¥</span>1200.00', zhanghu: '中国银行(4466)',shijian:"2019年3月18日11:47:56",type:"提现中" },
                { date: '2019年3月18日11:48:18', jine: ' <span style="margin-right:5px;">¥</span>1200.00', zhanghu: '中国银行(4466)',shijian:"2019年3月18日11:47:56",type:"提现中" },
                { date: '2019年3月18日11:48:18', jine: ' <span style="margin-right:5px;">¥</span>1200.00', zhanghu: '中国银行(4466)',shijian:"2019年3月18日11:47:56",type:"提现中" },
                { date: '2019年3月18日11:48:18', jine: ' <span style="margin-right:5px;">¥</span>1200.00', zhanghu: '中国银行(4466)',shijian:"2019年3月18日11:47:56",type:"提现中" },
                { date: '2019年3月18日11:48:18', jine: ' <span style="margin-right:5px;">¥</span>1200.00', zhanghu: '中国银行(4466)',shijian:"2019年3月18日11:47:56",type:"提现中" }
            ],
            crumbs:[
                {id:0,name:"个人中心",path:"/user"},
                {id:1,name:"提现明细",path:"/cashLog"},
            ]
        }
    },
    components:{
        templateCrumbs
    }
}
</script>
<style lang="less">
    .bankCard-tabel{
        height: 700px;
        .tabel{
            border:1px solid #EBEEF5;
        }
    }
    .cashlog .el-table__header-wrapper .el-table td, .el-table th.is-leaf{
        background-color: #FAFAFA;
       
    }
</style>
<template>
    <el-dialog  title="查看明细" :visible.sync="isconsumption" width="1000px">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="createTime" label="日期"></el-table-column>
            <el-table-column prop="remark" label="操作内容"></el-table-column>
            <el-table-column prop="sum" label="金额"></el-table-column>
            <el-table-column prop="newSurplusSum" label="可用额度"></el-table-column>
        </el-table>
        
        <div class="isconsumptionTap">
            <el-button type="primary" @click="isconsumption = false">确 定</el-button>
            <el-pagination
                style="text-align:center;margin:50px 0;"
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return {
            id:'',
            pageNum:1,
            pageSize:5,
            totalPage: 0, //总条目数
            isconsumption:false,
            tableData:[]
        }
    },
    methods:{
        init(){
            this.isconsumption = true
            this.getData(this.id);
        },
        getData(id){//数据展示
            this.id = id
            this.$get('user/cardLog.do',{
                params:{
                    memberCardId:this.id,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(({data})=>{
                //console.log(data)
                if(data.code== '0000'){
                    this.tableData = data.list.data;
                    this.totalPage = data.list.count
                }
            })
        },
        sizeChangeHandle(val) {
            //console.log(val)
            this.pageSize = val;
            this.pageNum = 1;
            this.getData(this.id);
        },
        // 当前页
        currentChangeHandle(val) {
            //console.log(val)
            this.pageNum = val;
            this.getData(this.id);
        },
    },
    props:['ID']
}
</script>
<style lang="less">
    .isconsumptionTap{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        align-items: center;
        .el-button{
            width: 138px;
            background: #91856F;
            border-radius: 0;
            border:none;
            height: 38px;
            line-height: 38px;
            padding: 0;
        }
    }
        .tabs-content .el-pagination{margin-top: 0;}
</style>

<template>
    <div class="newsLog w-1200">
        <!-- <template-crumbs :crumbsdata="crumbs"></template-crumbs> -->
       <div class="newsLog-content user-shadow">
           <div class="title">我的消息</div>
            <div class="newsLog-main" v-if="tableData.length>=1">
                <div class="main-log" v-for="(item,index) in tableData" :key="index">
                    <div class="title">{{item.title}}</div>
                    <p>{{item.content}}</p>
                    <div class="f">
                        <div class="date">{{item.createTime}}</div>
                        <router-link :to="item.url" class="link" v-if="item.newsTyp=='OrderNews'">订单详情</router-link>
                        <div class="link" v-if="item.newsTyp == 'Refund' || item.newsTyp == 'AfterMarket'" @click="AfterSaleTap(item)">退款/退货详情</div>
                        <router-link to="/user" class="link" v-if="!item.isorder && item.newsTyp == 'WithdrawNews'">查看</router-link>
                        <!-- <div>订单详情</div> -->
                    </div>
                    <div style="clear:both"></div>
                </div>
            </div>
            <el-pagination v-if="tableData.length>1" style="text-align:center;margin:50px 0;" background layout="prev, pager, next,sizes, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" :total="totalPage"></el-pagination>
            <p v-if="tableData.length<1?true:false" class="no-data">暂无消息记录</p>
       </div>
    </div>
</template>
<script>
// import templateCrumbs from '@/components/component/template_crumbs';
import utils from '../../assets/utils';
export default {
    data(){
        return {
            tableData: [],
            crumbs:[
                {id:0,name:"首页",path:"/"},
                {id:1,name:"我的消息",path:"/newsLog"},
            ],
            pageNum:1,
            pageSize:5,
            totalPage:0
        }
    },
    // components:{
    //     templateCrumbs
    // },
    computed:{
        orderShow(){
            this.tableData.map(item=>{
                item.url.indexOf('orderId')
            })
        }
    },
    mounted(){
        this.newsData();
    },
    methods:{
        AfterSaleTap(item){//退款退货
        // console.log(item)
        // return 
            if(item.newsTyp == 'AfterMarket'){//退货
                this.$router.push({path:'AfterSale',query:{AfterSaleId:item.url}})
            }else{
                this.$router.push({path:'AfterSale',query:{tuikuanId:item.url}})
            }
        },
        newsData(){//消息数据
            this.$get('user/news.do',{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(({data})=>{
                if(data.code=='0000'){



                    data.list.data.map(item=>{
                        if(item.newsTyp == 'OrderNews' && item.url){
                            item.url = item.url.replace('orderID','orderId')
                            if(item.url.indexOf('=')>=0){
                                //判断是否
                                item.isorder = true;
                            }
                        }

                    })

                    this.tableData = data.list.data
                    this.pageNum = data.list.currentNum
                    this.pageSize = data.list.pageSize
                    this.totalPage = data.list.count
                }
            })
        },
        sizeChangeHandle(val) {
            this.pageSize = val;
            this.pageNum = 1;
            this.newsData();
        },
        // 当前页
        currentChangeHandle(val) {
            this.pageNum = val;
            this.newsData();
        },
    }
}
</script>
<style lang="less">
    .newsLog-content{
        .title{
            font-size: 20px;
            color: #000;
            margin:20px 30px; 
            font-weight: bold;
            margin-left: 0;
        }
        .main-log{
            margin-bottom: 20px;
            background:#F8F8F8;
            padding: 20px;
            box-sizing: border-box;
            .title{
                font-size: 18px;
                color: #040000;
                margin: 0;
                font-weight: bold;
                padding-bottom: 15px;
                border-bottom: 1px solid #D9D9D9;
            }
            p{
                margin-top: 20px;
                font-size: 14px;
                color: #333333;
                line-height: 26px;
            }
            .f{
                display: flex;
                margin-top: 20px;
                justify-content: space-between;
                .date{
                    color: #999;
                    float: left;
                }
                .link{
                    text-align: right;
                    color: #91856F;
                    float: right;
                    cursor: pointer;
                }
            }
        }
    }
</style>
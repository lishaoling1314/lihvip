<template>
    <div class="noticeList w-1200">
        <div class="user-shadow" style="padding:0;margin:20px 0;">
            <template-crumbs :crumbsdata="crumbs" style="padding:0;"></template-crumbs>
        </div>
        <div class="noticeList-main">
            <div class="title">利汇公告</div>
            <div class="noticeList-banner">
                <img src="@/assets/img/noticeList-banner.png" alt="">
            </div>
            <div class="notice-view">
                <div class="notice-col" v-for="(item,index) in noticeList" :key="index" @click="$router.push({path:'notice',query:{noticeId:item.id}})">
                    <div class="col-time">{{item.showTime}}</div>
                    <div class="col-item">
                        <div class="name">{{item.name}}</div>
                        <div v-html="item.content" class="text"></div>
                        <!-- <router-link class="text" v-html="item.content" :to="{path:'notice',query:{noticeId:item.id}}"></router-link> -->
                    </div>
                </div>
                <el-pagination style="text-align:center;margin:50px 0;" background layout="prev, pager, next,sizes, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" :total="totalPage"></el-pagination>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .noticeList-main{
        background: #fff;
        padding:  50px 170px 0 170px;
        margin-bottom: 20px;
        .noticeList-banner{
            img{
                width: 100%;
            }
        }
        .title{
             font-size: 16px;
             color: #91856F;
             margin-bottom: 38px;
        }
        .notice-view{
            display: flex;
            justify-content: left;
            flex-direction: column;
            .notice-col{
                cursor: pointer;
                border-bottom: 1px solid #F1F1F1;
                padding: 30px 0;
                .col-time{
                    float: left;
                    margin-right: 56px;
                    color: #91856F;
                    font-size: 14px;
                    width: 150px;
                    padding-top: 5px;
                }
                .col-item{
                    width: 654px;
                    float: left;
                    .name{
                        color: #91856F;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    .text{
                        color: #928E85;
                        font-size: 14px;
                        display: -webkit-box;
                        /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
                        -webkit-line-clamp: 2;
                        height: 45px;
                        overflow: hidden;
                        line-height: 23px;
                        transition: all .2s;
                        -webkit-transition: all .2s;
                        -o-transition: all .2s;
                        -ms-transition: all .2s;
                    }
                    .text:hover{color: #D1B98E}
                }
            }
        }
    }
</style>

<script>
import templateCrumbs from '@/components/component/template_crumbs'
export default {
    data(){
        return{
            text:"",
            noticeList:[],
            crumbs: [
                { id: 0, name: '首页', path: '/' },
                { id: 1, name: '公告列表', path: '/noticeList' }
            ],
            pageNum:1,
            pageSize:5,
            totalPage: 0, //总条目数
        }
    },
    components: {
        templateCrumbs
    },
    mounted(){
        this.noticeData();
    },
    methods:{
        noticeData(){
            this.$get('announcement/list.do',{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                }
            }).then(({data})=>{
                if(data.code=='0000'){
                    this.noticeList = data.pageList.data
                    this.totalPage = data.pageList.count
                }
                // console.log(this.noticeList)
            })
        },
        sizeChangeHandle(val) {
            this.pageSize = val;
            this.pageNum = 1;
            document.documentElement.scrollTop = 0;
            this.noticeData();
        },
        // 当前页
        currentChangeHandle(val) {
            this.pageNum = val;
            document.documentElement.scrollTop = 0;
            this.noticeData();
        },
    }
}
</script>

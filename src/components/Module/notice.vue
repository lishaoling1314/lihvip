<template>
    <div class="notice w-1200">
        <div class="user-shadow" style="padding:0;margin:20px 0;">
            <template-crumbs :crumbsdata="crumbs" style="padding:0;"></template-crumbs>
        </div>
        <div class="notice-main user-shadow" style="margin-top:0;">
            <div class="name">{{noticeInfo.name}}</div>
            <div class="text" v-html="noticeInfo.content"></div>
        </div>
    </div>
</template>
<style lang="less">
    .notice-main{
        padding:  50px 170px 70px 170px;
        box-sizing: border-box;
        min-height: calc(100vh - 596px);
        .name{
            text-align:center;
            color: #91856F;
            font-size: 16px;
            margin-bottom: 40px;
        }
    }
</style>

<script>
import templateCrumbs from '@/components/component/template_crumbs'
export default {
    data(){
        return{
            noticeInfo:{},
            crumbs: [
                { id: 0, name: '首页', path: '/' },
                { id: 1, name: '公告列表', path: '/noticeList' },
                { id: 2, name: '公告详细', path: '/notice' }
            ]
        }
    },
    mounted(){
        // console.log(this.$router.history.current.query.noticeId);
        this.noticeData(this.$router.history.current.query.noticeId)
    },
    components: { templateCrumbs },
    methods:{
        noticeData(id){
            this.$get('announcement/getInfo.do',{
                params:{
                    announcementId:id
                }
            }).then(({data})=>{
                if(data.code=='0000'){
                    this.noticeInfo = data.announcement
                    // console.log(this.noticeInfo)
                }
            })
        }
    }
}
</script>

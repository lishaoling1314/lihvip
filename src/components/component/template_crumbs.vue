<template>
    <div class="crumbs">
        <div class="crumbs-main">
            <div class="crumbs-view">
                <router-link :to="item.path"  class="crumbs-item"  v-for="(item,index) in crumbsList" :key="index">{{item.name}}<span v-if="index != crumbsList.length-1">></span></router-link>
            </div>
            <div class="crumbs-view">
                <div  class="triangle_border_right"><span></span></div>
                <div  class="crumbs-page">{{crumbs.name}}</div>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
</template> 
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            crumbsList:[],
            crumbs:{
                id:'',
                name:'',
                path:'',
            }
        }
    },
    mounted(){
        setTimeout(()=>{//此处加延时以防有动态数据修改之后传值
            this.crumbsList = this.crumbsdata.slice(0,-1);
            this.crumbs = this.crumbsdata.slice(-1)[0];
        },200)
    },
    props:{
        crumbsdata:{
            type:Array
        }
    }
}
</script>
<style lang="less">
    .crumbs{
        padding: 20px 0;
        display: flex;
        .crumbs-main{
            background: #fff;
            width: 100%;
            height: 56px;
            .crumbs-view{
                padding: 5px 0;
                box-sizing: border-box;
                line-height: 56px;
                height: 56px;
                float: left;
                // margin-top: 5px;
                
                background: #f0f0f0;
                .crumbs-item{
                    float: left;
                    height: 46px;
                    line-height: 46px;
                    background: #F9F9F9;
                    color: #CCCCCC;
                    span{
                        margin:0 5px;
                    }
                }
                .crumbs-item:hover{color: #91856F;span{color: #CCCCCC}}
                .crumbs-item:first-child{padding-left: 50px;}
                .crumbs-item:last-child{padding-right: 50px;}
                .crumbs-page{
                    line-height: 56px;
                    height: 56px;
                    color: #91856F;
                }
            }
            .crumbs-view:nth-child(2){padding: 0 0 0 50px;height: 56px;line-height: 56px;margin-top: 0;background: #fff;position: relative;z-index: 10;}
            .triangle_border_right{
                width:0;
                height:0;
                border-width:12px 0 12px 12px;
                border-style:solid;
                border-color:transparent transparent transparent #F9F9F9;/*透明 透明 透明 灰*/
                position:absolute;
                top:calc(50% - 12px);
                left:-0;
                z-index: 99;
            }
        }

    }
    

</style>
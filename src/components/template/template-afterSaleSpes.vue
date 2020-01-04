<template>
    <div class="template-spes">
        <div class="spes" v-if="infoList[1]">
            <div class="spes-time">{{infoList[1].createTime}}</div>
            <div class="spes-icon active"><i></i></div>
            <div class="spes-text">
                <p class="title">{{infoList[1].title}}</p>
            </div>
            <div style="clear:both"></div>
        </div>
        <div class="spes" v-if="infoList[0]">
            <div class="spes-time">{{infoList[0].createTime}}</div>
            <div class="spes-icon"><i></i></div>
            <div class="spes-text">
                <p class="title">{{infoList[0].title}}</p>
                <p class="p">退货原因：{{refundReason(infoList[0].refundReason)}}</p>
                <p class="p">原因说明：{{infoList[0].remark}}</p>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<style lang="less">
    .template-spes{
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
            .spes-icon.active{
                i{background: #91856F;}
            }
            .spes-icon.active::before{
                content:"";
                position: absolute;
                // left: 1px;
                left: 50%;
                width: 1px;
                height: 100%;
                background: #EAEAEA;
                z-index: 9;
            }
            .spes-text{
                float: left;
                // background: #ccc;
                margin-right: 20px;
                width: 400px;
                .title{
                    font-size: 12px;
                    color: #333333;
                }
                .p{
                    margin-top: 10px;
                    line-height: 26px;
                    word-wrap: break-word;
                }
            }
        }

    }
</style>
<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        refundReason(){
            return (text)=>{
                let T = ''
                switch (text) {
                    case 'CONSENSUS_REFUND':
                        T = '协商一致退款';
                        break;
                    case 'FAILURE_DELIVER_AGREED_TIME':
                        T = '未按照约定时间发货';
                        break;
                    case 'OTHER':
                        T = '其他';
                        break;
                }
                return T
            }
        }
    },
    props:{
        infoList:{
            type:Array
        }
    }
}
</script>>




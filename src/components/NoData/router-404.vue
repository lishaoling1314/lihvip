<template>
    <div class="no404 w-1200">
        <div class="no404-main">
            <img src="@/assets/img/404huojian.png" alt="" class="huojian404">
            <div class="main-right">
                <img src="@/assets/img/404.png" alt="">
                <p>你要找的页面不存在</p>
                <router-link to="/" class="tap">返回首页</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .no404{
        background: #fff;
        .no404-main{
            width: 700px;
            margin:0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 200px 0;
            box-sizing: border-box;
            .huojian404{
                width: 384px;
                // float: left;
                height: 280px;
            }
            .main-right{
                float: left;
                padding-top: 10px;
                text-align: center;
                box-sizing: border-box;
                p{
                    padding: 30px 0;
                    text-align: center;
                    font-size: 14px;
                    color: #999999;
                }
                .tap{
                    width: 176px;
                    display: inline-block;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    border:1px solid #91856F;
                    margin: 0 auto;
                    color: #91856F;
                    margin-top: 10px;
                }
            }
        }
    }
</style>
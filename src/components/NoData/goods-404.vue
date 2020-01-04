<template>
    <div class="goods-404">
        <img src="@/assets/img/goods-404.png" alt="">
        <p>商品已被下架，无法查看</p>
        <div class="tap" @click="$router.push('/goodsList')">查看全部商品</div>
    </div>
</template>
<style lang="less">
    .goods-404{
        padding-top: 50px;
        padding-bottom: 67px;
        background: #fff;
        width: 1200px;
        margin: 20px auto;
        text-align: center;
        p{
            margin-top: 20px;
            color: #999999;
            font-weight: 400;
        }
        .tap{
            width: 164px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #91856F;
            color: #91856F;
            text-align: center;
            background: #fff;
            border-radius: 4px;
            margin: 36px auto;
            transition: all 0.3s;
        }
        .tap:hover{
            background: #91856F;
            color: #fff;
        }
    }
</style>
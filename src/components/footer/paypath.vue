<template>
	<div class="paypath w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="pay_content user-shadow">
			<!-- <h1 class="coor_label">支付方式</h1> -->
			<div class="body_wrap">
				<div class="body_box clearfix">
					<div class="paybox b_left">
						<img src="@/assets/img/weipay.png" alt="" />
						<p class="pay_label">微信支付</p>
						<p class="pay_text">利汇优品支持微信支付方式，可直接扫码支付</p>
					</div>
					<div class="paybox b_right">
						<img src="@/assets/img/ali.png" alt="" />
						<p class="pay_label">支付宝支付</p>
						<p class="pay_text">利汇优品支持支付宝支付方式，可直接扫码支付</p>
					</div>
					<div class="paybox b_right">
						<img src="@/assets/img/pay-w.png" alt="" />
						<p class="pay_label">钱包支付</p>
						<p class="pay_text">钱包支付方式，余额足够可直接支付</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default{
		name:'paypath',
		components:{
			templateCrumbs
		},
		data(){
			return{
				crumbs:[
                {id:0,name:"首页",path:"/"},
                {id:1,name:"支付方式",path:"/paypath"},
            	],
			}
		}
	}
</script>

<style scoped lang="less">
	.paypath{
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		.pay_content{
			height:588px;
			.coor_label{
				color: #91856F;
				font-size: 16px;
				margin-top: 50px;
				margin-left: 170px;
			}
			.body_wrap{
				box-sizing: border-box;
				margin-top: 150px;
				text-align: center;
				font-weight: bold;
				line-height: 24px;
				.body_box{
					// margin-left: 170px;
					.paybox{
						float: left;
						width: 33.33%;
						text-align: center;
						font-size: 12px;
						line-height: 24px;
						font-weight: bold;
						img{
							height: 100px;
							width: 100px;
						}
						.pay_label{
							font-size: 16px;
							margin-top: 8px;
						}
						.pay_text{
							margin-top: 20px;
						}
					}
				}
			}
		}
		.clearfix:after {
            content: "";
            clear: both;
            display: block;
            overflow: hidden;
            font-size: 0;
            height: 0;
            zoom: 1;
            visibility: hidden;
        	}
		}
</style>
<template>
	<div class="aftersale w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="log_content user-shadow">
			<h1 class="coor_label">售后服务</h1>
			<div class="banner">
				<img src="@/assets/img/afterbanner.png"/>
			</div>
			<div class="log_list">
				<div class="log_item">
				<div class="item_title">7天退换货</div>
				<div class="item_content">
					<p>如果您在收到商品后需要退换货，请在自订单签收次日起7日内，联系利汇优品的客服进行处理，7天后将不予以处理。</p>
				</div>
				</div>
				<div class="log_item">
				<div class="item_title">运费承担</div>
				<div class="item_content">
					<p>1.因商品质量问题而产生的退货，退货运费由利汇优品承担；</p>
					<p>2.非商品质量问题而产生的退货，退货运费由您个人承担。</p>
				</div>
				</div>
				<div class="log_item">
				<div class="item_title">退货细则</div>
				<div class="item_content">
					<p class="title">退货成立条件</p>
					<p>1.商品质量问题；</p>
					<p>2.非质量问题：商品及商品本身包装保持利汇优品出售时原装且配件赠品资料齐全，不影响二次销售。</p>
					<p class="title" style="margin-top:20px;">注意事项</p>
					<p>非人为损坏，且产品有质量问题的，将说明书、购物凭证、原包装、商品等一并 返回利汇优品办理退货手续。</p>
					<p class="title" style="margin-top:20px;">不符合退货的情况</p>
					<p>1.已佩戴过的商品和受损的商品；</p>
					<p>2.任何因非正常使用及保管，导致出现质量问题的商品； </p>
					<p>3.缺少随商品附带的配件及赠品。</p>
				</div>
				</div>
				<div class="log_item">
				<div class="item_title">温馨提示</div>
				<div class="item_content">为了保证您的利益，请您在收到商品时，仔细检查，如果您发现有任何问题，请您及时联系利汇优品的客服。</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default{
		name:'footeraftersale',
		components:{
			templateCrumbs
		},
		data(){
			return{
				crumbs:[
					{id:0,name:"首页",path:"/"},
					{id:1,name:"售后服务",path:"/footeraftersale"},
            	],
			}
		}
	}
</script>
	
<style scoped lang="less">
	.aftersale{
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		.log_content{
			// height:588px;
			padding-bottom: 50px;
			.coor_label{
				color: #91856F;
				font-size: 16px;
				margin-top: 50px;
				margin-left: 170px;
			}
			.banner{
				box-sizing: border-box;
				margin-top: 40px;
				margin-left: 170px;
				img{
					width: 858px;
					height: 158px;
				}
			}
			.log_list{
				margin-top: 20px;
				margin-left: 170px;
				.log_item{
					margin-top:12px;
					.item_title{
						font-size: 12px;
						line-height: 24px;
						font-weight: bold;
						display: table-cell;
						white-space: nowrap;
						width: 88px;
					}
					.item_content{
						font-size: 12px;
						width: 450px;
						height: 22px;
						line-height: 22px;
						color: #928E85;
						display: table-cell;
						.title{
							font-weight: bold;
						}
					}
				}
				
			}
		}
	}
	
</style>
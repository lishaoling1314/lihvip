<template>
	<div class="logistics w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="log_content user-shadow">
			<h1 class="coor_label">物流配送</h1>
			<div class="banner">
				<img src="../../assets/img/logbanner.png"/>
			</div>
			<ol class="log_list">
				<li class="log_item">一、活动结束后由供应商统一发货</li>
				<li class="log_item">二、普通快递不到的地区——新疆、西藏、宁夏、青海、内蒙古统一发EMS</li>
				<li class="log_item">三、港、澳、台及海外暂不支持配送</li>
				<li class="log_item">四、如有任何问题或特殊配送需求请在下单前咨询客服：400-007-0755</li>
			</ol>
		</div>
	</div>
</template>

<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default{
		name:'logistics',
		components:{
			templateCrumbs
		},
		data(){
			return{
				crumbs:[
                {id:0,name:"首页",path:"/"},
                {id:1,name:"物流配送",path:"/logistics"},
            	],
			}
		}
	}
</script>
	
<style scoped lang="less">
	.logistics{
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		.log_content{
			margin: 0 auto;
			height:588px;
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
					margin-top: 12px;
					font-size: 12px;
					height: 22px;
					line-height: 22px;
				}
			}
		}
	}
	
</style>
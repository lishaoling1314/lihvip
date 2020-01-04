<template>
	<div class="relateus w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="rel_content user-shadow">
			<h1 class="coor_label">联系我们</h1>
			<div class="rel_body">
				<div class="body_wrap">
					<img src="@/assets/img/service.png"/>
					<p class="serv_font">客服服务</p>
					<p class="serv_mobile">400-007-0755</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default{
		name:'relateus',
		components:{
			templateCrumbs
		},
		data(){
			return{
				crumbs:[
                {id:0,name:"首页",path:"/"},
                {id:1,name:"联系我们",path:"/relateus"},
            	],
			}
		}
	}
</script>
<style scoped lang="less">
	.relateus{
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		height: 100%;
		.rel_content{
			height:588px;
			.coor_label{
				color: #91856F;
				font-size: 16px;
				margin-top: 50px;
				margin-left: 170px;
			}
			.rel_body{
				box-sizing: border-box;
				margin-top: 100px;
				text-align: center;
				font-weight: bold;
				line-height: 24px;
				.body_wrap{
					img{
						height: 62px;
						width: 62px;
					}
					.serv_font{
						font-size: 16px;
						margin-top: 5px;
					}
					.serv_mobile{
						font-size: 36px;
						font-weight: bold;
						margin-top: 20px;
					
					}
					
				}
			}
		}
	}
</style>
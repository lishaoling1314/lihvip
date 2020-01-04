<template>
	<div class="cooperation w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="coor_box user-shadow">
			<h1 class="coor_label">商务合作</h1>
			<p class="headline">合作方式建议</p>
			<div style="text-align: center;">
			<div class="coor_list clearfix">
				<div class="coor_item" v-for="(item,index) in modeList" :key="`coop${index}`">
					<div class="coor_wrap">
						<img src="@/assets/img/coopicon.png" alt="" />
						<p class="coor_body">{{item.body}}</p>
					</div>
				</div>
			</div>
			</div>
			<div class="relateus">
				<p>如有意向，请联系我们</p>
				<p class="mobile">400-007-0755</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default{
		name:'cooperation',
		components:{
			templateCrumbs
		},
		data() {
			return{
				crumbs:[
                {id:0,name:"首页",path:"/"},
                {id:1,name:"商务合作",path:"/coopertaion"},
            	],
				modeList:[
					{body:'1、市场活动合作'},
					{body:'2、同业流量交换和用户共享'},
					{body:'3、销售合作分成'},
					{body:'4、其他合作方式'},
				]
			}
		}
	}
</script>

<style scoped lang="less">
	.cooperation{
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		.el-breadcrumb{
			height: 50px;
			line-height: 50px;
		}
		.coor_box{
			width: 100%;
			background: #fff;
			margin-top: 10px;
			height:588px;
			.coor_label{
				color: #91856F;
				font-size: 16px;
				margin-top: 50px;
				margin-left: 170px;
			}
			.headline{
				margin: 0 auto;
				font-weight: bold;
				margin-top: 40px;
				text-align: center;
			}
			.coor_list{
				margin-top: 50px;
				text-align: center;
				display: inline-block;
				.coor_item{
					float: left;
					height: 270px;
					width: 200px;
					background: rgba(145,133,111,.2);
					position: relative;
					margin-right:20px;
					.coor_wrap{
						width: 100%;
						text-align: center;
						position: absolute;
						top: 30%;
						font-size: 13px;
						p{margin-top: 20px;}
						img{
						text-align: center;
						height: 60px;
						width: 60px;
					}
					}
					
				}
				
			}
			
		}
		.relateus{
			text-align: center;
			font-size: 12px;
			color: #666;
			margin: 20px 0;
			.mobile{
				margin-top: 9px;
				color: #91856F;
				font-weight: bold;
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
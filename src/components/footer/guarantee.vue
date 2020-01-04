<template>
	<div class="guarantee w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="gur_content user-shadow">
			<h1 class="coor_label">正品保障</h1>
			<p class="sub_coor_label">利汇优品以专业化和个性化吸引厂家，并和厂家达成深度合作，拿到远远低于市场价的折扣优惠，真正让利于消费者。</p>
			<div>
			<div class="gur_list">
				<div class="gur_item" v-for="(item,index) in guaranteeList" :key="index">
					<div class="body_wrap">
						<img :src="item.imgPath" alt="" />
						<h3 class="body_title">{{item.title}}</h3>
						<p class="body_content">{{item.content}}</p>
					</div>
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default{
		name:'guarantee',
		components:{
			templateCrumbs
		},
		data() {
			return{
				crumbs:[
                {id:0,name:"首页",path:"/"},
                {id:1,name:"正品保障",path:"/guarantee"},
            	],
            	guaranteeList:[
            		{imgPath:require("@/assets/img/guarantee_1.png"),title:'厂家直采',content:'对于每一个合作的厂家，利汇优品都会对其进行实地考察，对其生产环境、生产质量进行查验，保证商品质量。'},
            		{imgPath:require("@/assets/img/guarantee_2.png"),title:'一手货源',content:'利汇优品与多家优秀厂家签订战略合作协议，直接从厂家处拿货，从源头保质保真。'},
            		{imgPath:require("@/assets/img/guarantee_3.png"),title:'品质保证',content:'商品发货前，厂家会严格按照利汇优品的产品审核标准进行检测，保证消费者购买的每一件商品质量都有保障。'},
            		{imgPath:require("@/assets/img/guarantee_4.png"),title:'深度折扣',content:'利汇优品以独有的销售模式吸引厂家，并和厂家达成深度合作，拿到远远低于市场价的折扣优惠，真正让利于消费者。'},
            	]
			}
		}
	}
</script>

<style scoped lang="less">
	.guarantee{
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		.gur_content{
			width: 100%;
			background: #fff;
			margin-top: 10px;
			margin-bottom:50px;
			height:588px;
			.coor_label{
				color: #91856F;
				font-size: 16px;
				margin-top: 50px;
				margin-left: 170px;
			}
			.sub_coor_label{
				margin-top: 12px;
				font-size: 12px;
				height: 22px;
				line-height: 22px;
				margin-left: 170px;
			}
			.gur_list{
				display: inline-block;
				margin-top: 30px;
				margin-left: 170px;
				.gur_item{
					float: left;
					margin-right: 10px;
					height: 390px;
					width: 210px;
					padding: 8px 20px;
					box-sizing: border-box;
					background: #EFE8DA;
					&:nth-child(even){
						background: #FBF8F1;
					}
					.body_wrap{
						text-align: center;
						img{
							height: 80px;
							width: 80px;
							margin-top: 45px;
						}
						.body_title{
							margin-top: 50px;
							font-size: 12px;
						}
						.body_content{
							font-size: 12px;
							line-height: 24px;
							margin-top: 50px;
							text-align: left;
						}
					}
				}
			}
			
			
		}
	}
</style>
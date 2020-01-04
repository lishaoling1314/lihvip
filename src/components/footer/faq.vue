<template>
	<div class="faq w-1200">
		<template-crumbs :crumbsdata="crumbs"></template-crumbs>
		<div class="faq_container user-shadow">
			<h1 class="coor_label">常见问题</h1>
			<div class="faq_content">
				<div class="faq_table">
					<div class="faq_cell faq_menu">
						<ul class="menu_list">
							<li class="menu_item" v-for="(item,index) in dataList" :key="'menu'+index" @click="queryJson(item.id)" :class="{active:item.id==faqid}">{{item.menu}}</li>
						</ul>
					</div>
					<div class="faq_cell faq_body">
						<dl v-for="(faq,index2) in answerList[0].qa" :key="'faq'+index2">
							<dt>{{faq.question}}</dt>
							<dd v-html="faq.answer"></dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import templateCrumbs from '@/components/component/template_crumbs';
	export default {
		name: 'faq',
		components: {
			templateCrumbs
		},
		data() {
			return {
				crumbs: [{
						id: 0,
						name: "首页",
						path: "/"
					},
					{
						id: 1,
						name: "常见问题",
						path: "/faq"
					},
				],
				answerList:[],
				faqid:1,
				dataList: [
					{
						"id": 1,
						"menu": "注册问题",
						"qa": [{
								"question": "1、注册需要什么资料？",
								"answer": "答：平台注册很简单，只需用手机号码注册即可。"
							},
							{
								"question": "2、需要实名认证吗？",
								"answer": "答：不需要实名认证，但需要在个人中心填写收货地址和银行信息。"
							},
							{
								"question": "3、利汇优品的购买金额有限制吗？",
								"answer": "答：抢购商品一件起购，不设上限。"
							}
						]
					},
					{
						"id": 2,
						"menu": "支付问题",
						"qa": [{
								"question": "1、如何付款？拍下有货吗？",
								"answer": "答：利汇优品支持微信支付、支付宝支付等线上支付平台，确保您的货款安全。所有抢购商品显示有货，即可购买。"
							},
							{
								"question": "2、我已支付成功，为什么还没显示订单？",
								"answer": "答：手机扫码支付成功后，需点击“已支付成功”后跳转至订单详情页。"
							}
						]
					},
					// {
					// 	"id": 3,
					// 	"menu": "代售问题",
					// 	"qa": [
					// 		{
					// 			"question": "1、选择由平台代售，如何结算利润？",
					// 			"answer": "答：由平台待售后，除收回货款外，还可获得利润，利润=下单金额*利率*周期;"
					// 		},
					// 		{
					// 			"question": "2、由平台代售后，多久可以拿到货款和利润？",
					// 			"answer": "答：在代售到期后，用户绑定银行卡即可提现货款和代售利润; "
					// 		}
					// 	]
					// },
					{
						"id": 4,
						"menu": "发货问题",
						"qa": [{
								"question": "1、活动结束后，何时发货？",
								"answer": "答：商品活动结束后，合作厂家将在7个工作日内发货，请您耐心等候。"
							},
							{
								"question": "2、商品收货后，发现漏发了或者错发了，应该怎么办？",
								"answer": "答：请您准备好漏发、错发的相关商品图片（拍摄图片），再通过客服核实，我们需要和厂家方面进行确认，待客服确认后再进行补发或退款。"
							}
						]
					},
					// {
					// 	"id": 5,
					// 	"menu": "退款、退换货问题",
					// 	"qa": [{
					// 			"question": "1、退款后资金多长时间返还？",
					// 			"answer": "答：我们退款路径有两种：退回到您填写的银行卡账户或原路径退款。不管是哪种方式，均为申请退款成功后10个工作日内发放到账。"
					// 		},
					// 		{
					// 			"question": "2、售后退货？",
					// 			"answer": "（1）如果您在收到商品后需要退换货，请在7天内联系利汇优品的客服进行处理，7天后我们将不予以处理（以快递签收日为准）；<br/>（2）由于商品质量问题造成的退换货，相应运费由利汇优品平台承担；<br/>（3）由非质量问题产生的退换货要求，客户需自行承担来回运费。"
					// 		}
					// 	]
					// }

				]
			}
		},
		created(){
			this.queryJson(1)
		},
		methods:{
			queryJson(id){
				this.faqid = id
				this.answerList=this.dataList.filter((item)=>{
					return id == item.id
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.faq {
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		color: #91856F;
		.faq_container {
			height:588px;
			.coor_label {
				color: #91856F;
				font-size: 16px;
				margin-top: 50px;
				margin-left: 170px;
			}
			.faq_content {
				.faq_table {
					margin-left: 170px;
					border-collapse: separate;
					border-spacing:40px 40px;
					// display: table;
					.faq_cell {
						float: left;
						font-weight: bold;
						margin-top: 40px;
						display: table-cell;
						.menu_list {
							.menu_item {
								height: 40px;
								line-height: 40px;
								font-size: 16px;
								width: 150px;
								text-align: center;
								cursor: pointer;
								margin-top: 5px;
								&:hover {
									background: #91856F;
									color: #fff;
								}
								&.active {
									background: #91856F;
									color: #fff;
								}
							}
						}
					}
					
				}
				.faq_menu{width: 150px}
				.faq_body {
					width: 800px;
					margin-left: 40px;
					dl{
						margin-top: 30px;
					}
					dl:nth-child(1){margin-top: 0}
					dt {
						font-size: 14px;
						line-height: 30px;
						font-weight: bold;
					}
					dd {
						color: #333333;
						font-size: 14px;
						font-weight: 100;
						line-height: 30px;
					}
				}
			}
		}
	}
</style>
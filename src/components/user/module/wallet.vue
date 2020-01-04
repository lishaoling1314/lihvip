<template>
  <div class="wallet">
  	<div class="wallet-header-plus">
  		<div class="w-section w-one">
  			<div class="w-s-wrap">
  			<h3 class="w-title">我的资产</h3>
  			<ul class="w-list">
  				<li class="w-item">
            <!-- 总资产 -->
  					<div class="item-wrap">
              <div class="w-desc">
                <div class="w-d-wrap w-wrapin">
                  <p>总资产</p>
                  <el-tooltip class="item" effect="dark" content="代售金额+利润+可用资产的总和" placement="right">
                      <div slot>
                        <i class="user-icon i-m"></i>
                      </div>
                    </el-tooltip>
                </div>
                <div class="price symbol_price w-box"><span>¥</span>{{assets?assets:'0'}}</div>
              </div> 					
  					</div>
            <!--  可用资产-->
            <div class="item-wrap">
              <div class="w-desc">
                <div class="w-d-wrap w-wrapin">
                  <p>可用资产</p>
                  <el-tooltip class="item" effect="dark" content="可用资产" placement="right">
                      <div slot>
                        <i class="user-icon i-m"></i>
                      </div>
                    </el-tooltip>
                </div>
                <div class="price symbol_price w-box"><span>¥</span>{{user.availableFund}}</div>
              </div>

  					  
  						
  					</div>
  				</li>
  				<!-- <li class="w-item">
  					<div class="item-wrap">
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<p>代售金额</p>
		  					<el-tooltip class="item" effect="dark" content="代售中订单的总金额" placement="right">
				            <div slot>
				              <i class="user-icon i-m"></i>
				            </div>
				           </el-tooltip>
  							
  						</div>
  					</div>
  					<div style="clear:both"></div>
  					<div class="price">
			            <span>¥</span>
			            {{user.saleAmount}}
		          	</div>
  						
  					</div>
  				</li>
  				<li class="w-item">
  					<div class="item-wrap">
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<p>利润</p>
		  					<el-tooltip class="item" effect="dark" content="代售订单利润的总金额" placement="right">
				            <div slot>
				              <i class="user-icon i-m"></i>
				            </div>
				          </el-tooltip>
  							
  						</div>
  					</div>
  					<div style="clear:both"></div>
  					<div class="price">
			            <span>¥</span>
            			{{user.saleProfit}}
		          	</div>
  						
  					</div>
  				</li>
  				<li class="w-item">
  					<div class="item-wrap">
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<p>累计利润</p>
		  					<el-tooltip class="item" effect="dark" content="从注册至数据截止时间的已收代售利润总和" placement="right">
				            <div slot>
				              <i class="user-icon i-m"></i>
				            </div>
				          	</el-tooltip>
  						</div>
  					</div>
  					<div style="clear:both"></div>
  					<div class="price">
			            <span>¥</span>
            			{{user.accumulatedIncome}}
		          	</div>
  						
  					</div>
  				</li> -->
  			</ul>
  				
  			</div>
  		</div>
  		<div class="tap-section"></div>
  		<div class="w-section w-two">
  			<div class="w-s-wrap">
  			<ul class="w-list w-ulist">
  				<li class="w-item">           
              <div class="item-wrap clearfix" style="display:block">
                  <div class="w-desc">
                    <div class="w-d-wrap">
                      <p>（代售）可用资产</p>
                        <el-tooltip class="item" effect="dark" content="代售中订单的总金额" placement="right">
                          <div slot>
                            <i class="user-icon i-m"></i>
                          </div>
                        </el-tooltip>
                    </div>
                  </div>
                  <div style="clear:both"></div>
                  <div class="price symbol_price"><span>¥</span>{{user.saleAmount}}</div> 						
              </div>
              <div class="tap w-utap" style="font-size: 12px;" @click="refundTap()">厂商回款</div>
              <ul class="ulist-wrap">
                <li>
                  <div class="item-wrap">
                    <div class="w-desc">
                      <div class="w-d-wrap">
                        <p>代售金额</p>
                        <el-tooltip class="item" effect="dark" content="代售中订单的总金额" placement="right">
                            <div slot>
                              <i class="user-icon i-m"></i>
                            </div>
                          </el-tooltip>
                        
                      </div>
                    </div>
                    <div style="clear:both"></div>
                    <div class="price">
                          <span>¥</span>
                          {{user.saleAmount}}
                        </div>
                      
                    </div>
                    <div class="item-wrap">
                      <div class="w-desc">
                        <div class="w-d-wrap">
                          <p>利润</p>
                          <el-tooltip class="item" effect="dark" content="代售订单利润的总金额" placement="right">
                              <div slot>
                                <i class="user-icon i-m"></i>
                              </div>
                            </el-tooltip>
                          
                        </div>
                      </div>
                      <div style="clear:both"></div>
                      <div class="price">
                            <span>¥</span>
                            {{user.saleProfit}}
                          </div>
                        
                      </div>
                    <div class="item-wrap">
                      <div class="w-desc">
                        <div class="w-d-wrap">
                          <p>累计利润</p>
                          <el-tooltip class="item" effect="dark" content="从注册至数据截止时间的已收代售利润总和" placement="right">
                              <div slot>
                                <i class="user-icon i-m"></i>
                              </div>
                              </el-tooltip>
                        </div>
                      </div>
                      <div style="clear:both"></div>
                      <div class="price">
                        <span>¥</span>
                        {{user.accumulatedIncome}}
                      </div>
                        
                    </div>
                </li>
              </ul>
  				</li>
          <li class="w-item right-item">           
              <div class="item-wrap clearfix" style="display:block">
                  <div class="w-desc">
                    <div class="w-d-wrap">
                      <p>可提现资产</p>
                        <el-tooltip class="item" effect="dark" content="代售中订单的总金额" placement="right">
                          <div slot>
                            <i class="user-icon i-m"></i>
                          </div>
                        </el-tooltip>
                    </div>
                  </div>
                  <div style="clear:both"></div>
                  <div class="price symbol_price"><span>¥</span>{{user.frozenSum}}</div> 						
              </div>
              <div class="tap w-utap" style="font-size: 12px;" @click="refundTap()">提现</div>
              <ul class="ulist-wrap">
                <li>
                  <div class="item-wrap">
                    <div class="w-desc">
                      <div class="w-d-wrap">
                        <p>待入账佣金</p>
                        <!-- <el-tooltip class="item" effect="dark" content="代售中订单的总金额" placement="right">
                            <div slot>
                              <i class="user-icon i-m"></i>
                            </div>
                          </el-tooltip> -->
                        
                      </div>
                    </div>
                    <div style="clear:both"></div>
                    <div class="price">
                          <span>¥</span>
                          {{user.pendingCommission}}
                        </div>
                      
                    </div>
                    <div class="item-wrap">
                      <div class="w-desc">
                        <div class="w-d-wrap">
                          <p>累计提成</p>
                          <!-- <el-tooltip class="item" effect="dark" content="代售订单利润的总金额" placement="right">
                              <div slot>
                                <i class="user-icon i-m"></i>
                              </div>
                            </el-tooltip> -->
                          
                        </div>
                      </div>
                      <div style="clear:both"></div>
                      <div class="price">
                            <span>¥</span>
                            {{user.saleProfit}}
                          </div>
                        
                      </div>
                    <div class="item-wrap">
                      <div class="w-desc">
                        <div class="w-d-wrap">
                          <p>本月推荐奖励</p>
                          <!-- <el-tooltip class="item" effect="dark" content="从注册至数据截止时间的已收代售利润总和" placement="right">
                              <div slot>
                                <i class="user-icon i-m"></i>
                              </div>
                              </el-tooltip> -->
                        </div>
                      </div>
                      <div style="clear:both"></div>
                      <div class="price">
                        <span>¥</span>
                        {{user.accumulatedIncome}}
                      </div>
                        
                    </div>
                </li>
              </ul>
  				</li>
  				<!-- <li class="w-item" v-if="user.frozenSum>0">
  					<div class="item-wrap">
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<p>待回款金额</p>
  						</div>
  					</div>
  					<div style="clear:both"></div>
  					<div class="price">
			            <span>¥</span>
			            {{user.frozenSum}}
		          	</div>
  						
  					</div>
  				</li>
  				<li class="w-item" v-if="user.pendingCommission>0">
  					<div class="item-wrap">
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<p>待入账佣金</p>
  						</div>
  					</div>
  					<div style="clear:both"></div>
  					<div class="price">
			            <span>¥</span>
            			{{user.pendingCommission}}
		          	</div>
  						
  					</div>
  				</li>
  				<li class="w-item">
  					<div class="item-wrap">
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<div class="tap" style="font-size: 12px;" @click="refundTap()">厂商回款&gt;</div>
  						</div>
  					</div>
  					<div style="clear:both"></div>
  					<div class="w-desc">
  						<div class="w-d-wrap">
		  					<div class="tap" style="font-size: 12px;" @click="$router.push('/goodsList')">继续购物&gt;</div>
  						</div>
  					</div>
  						
  					</div>
  				</li> -->
  			</ul>
  				
  			</div>
  		</div>
  	</div>
  	<div class="w-divider"></div>
    

    <el-dialog :visible.sync="MoneyBack" width="569px" v-if="MoneyBack">
      <!-- 银行卡 -->
      <el-form :model="dataForm" ref="dataForm" label-width="80px" class="form" @keyup.enter.native="submitTap()">
        <div class="MoneyBack-back">
          <div class="text">
            <span>{{bankCard.cardRealName}}</span>
            <span>{{bankCard.cardBank}}</span>
            <div style="clear:both"></div>
          </div>
          <p>{{bankCard.cardId}}</p>
        </div>
        <el-form-item label="提现金额：" label-width="120px" class="moneyInput">
          <el-input v-model="dataForm.withdrawAmount" placeholder="请输入提现金额" type="number" @blur="blurInput($event)" oninput="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" @input="changeInput($event)"></el-input>
          <div class="money-text">
            <div class="money-text-border">余额<span>¥</span>{{user.availableFund}}</div>
          </div>
        </el-form-item>
        <div style="clear:both"></div>
        <el-form-item label="手续费：" label-width="120px" class="procedures">
          <div class="withdrawFee">
            ¥{{withdrawFee}}
          </div>
          <el-tooltip class="item" effect="dark" placement="bottom">
            <div slot="content" v-html="dialogVisibleTitle" style="line-height:24px;"></div>
            <div class="input-mark">
              <i class="user-icon i-m"></i>
            </div>
          </el-tooltip>
          <div style="clear:both"></div>
        </el-form-item>
        <el-form-item label="手机号：" label-width="120px">
          <el-input v-model="dataForm.phoneNo" placeholder="请填写手机号！" type="text" disabled style="width:284px;"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" label-width="120px">
          <el-input placeholder="请输入验证码" v-model="dataForm.verifyCode" type="text" name="code">
            <el-button slot="append" @click="codeTap()" :disabled="disabled" style="width:134px">{{codeText}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="支付密码：" label-width="120px" class="passwd-config">
          <ant-design @getPwd="getPwdTap" ref="templateAntDesign" style="float:left;"></ant-design>
          <div class="layer" v-if="passwdConfig"  @click="dialogVisible = true">设置支付密码</div>
        </el-form-item>
        <div class="Modifypassword" @click="dialogVisible = true">忘记交易密码?</div>
        <div class="MoneyBack-tap" @click="MoneyBackTap()">提交申请</div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="MoneyBackSuccess" width="400px" v-if="MoneyBackSuccess">
      <div class="MoneyBackSuccess">
        <img src="@/assets/img/success.png" alt="">
        <p class="p1">提交申请成功</p>
        <p class="p2">我们将在一个工作日内处理您的提现申请,提现成功后一般将在1-2个工作日到账，非工作日顺延。(根据不同银行的转账规则而定)。</p>
        <p style="letter-spacing: 3.3px;text-align:left;">如在提现过程中有任何疑问,请致利汇优品客服电话：<span style="color:#91856f;letter-spacing: 0px;">400-007-0755</span></p>
        <p></p>
        <div @click="MoneyBackSuccess = false" class="MoneyBackSuccessTap">确认</div>
      </div>
    </el-dialog>
    <div class="wallet-content">
      <div class="title" :class="{'tab1':titleCol==1}">
        <div class="title-col">
          <div :class="titleCol==1?'active':''" @click="colTap(1)"><em></em><span>资产记录</span></div>
          <div :class="titleCol==2?'active':''" @click="colTap(2)"><em></em><span>分销关系</span></div>
          <div :class="titleCol==3?'active':''" @click="colTap(3)"><em></em><span>佣金记录</span></div>
        </div>
        <div style="float:right" class="p" v-if="titleCol==1">（资产来源： 1.佣金&nbsp;&nbsp;2.代售回款完成&nbsp;&nbsp;3.厂商回款操作&nbsp;&nbsp;4.可用资产支付操作）</div>
        <div style="float:right" class="p" v-else-if="titleCol==2">（分销记录： 1.记录上级&nbsp;&nbsp;2.记录一级下级/二级下级的消费总金额和总提成）</div>
        <div class="right-btn-group" v-else>
        	<el-popover
        		trigger="click"
        		placement="bottom"
        		v-model="popoverVisible1"
        		width="287"
        		:popper-options="{ boundariesElement: 'body', gpuAcceleration: false }"
        		popper-class="c-wrapper">
        		<div class="c-calendar clearfix">
			        <div class="c-turning">
			          <span :class="{'pre':year<=2019}" @click="preYear">&lt;</span>
			          <span>{{year}}</span>
			          <span @click="nextYear" :class="{'pre':year>=calYear}">&gt;</span>
			        </div>
			        <div class="calendar-box">
			          <ul class="calendar-list clearfix" v-cloak>
			            <li class="calendar-item" :class="{'active':index+1==cal1mon}" v-for="(item,index) in 12" :key="index" @click="selectDate('cal1',year,index+1)">
			            	{{`${index+1}月`}}
			            </li>
			          </ul>
			        </div>
			      </div>
        		<button slot="reference" class="btn-item" :class="{active:out==1}" @click="filterItem(1)"><em><img src="@/assets/img/filter@2x.png" v-if="out==1"/><img src="@/assets/img/filter-active@2x.png"  v-else/></em><span>佣金发放</span></button>
        	</el-popover>
        	<el-popover
        		trigger="click"
        		placement="bottom"
        		v-model="popoverVisible2"
        		width="287"
        		:popper-options="{ boundariesElement: 'body', gpuAcceleration: false }">
        		<div class="c-calendar clearfix">
			        <div class="c-turning">
			          <span :class="{'pre':year<=2019}" @click="preYear">&lt;</span>
			          <span>{{year}}年</span>
			          <span @click="nextYear" :class="{'pre':year>=calYear}">&gt;</span>
			        </div>
			        <div class="calendar-box">
			          <ul class="calendar-list clearfix" v-cloak>
			            <li class="calendar-item" :class="{'active':index+1==cal2mon}"  v-for="(item,index) in 12" :key="index" @click="selectDate('cal2',year,index+1)">
			            	{{`${index+1}月`}}
			            </li>
			          </ul>
			        </div>
			      </div>
        		<button slot="reference" class="btn-item" :class="{active:out==2}" @click="filterItem(2)"><em><img src="@/assets/img/filter@2x.png" v-if="out==2"/><img src="@/assets/img/filter-active@2x.png" v-else/></em><span>下单日期</span></button>
        	</el-popover>
        </div>
        <div style="clear:both"></div>
      </div>
      <el-table :data="tableData" header-align="left" max-height="335" v-if="titleCol==1">
        <el-table-column prop="updateTime" label="日期" align="left" width="165"></el-table-column>
        <el-table-column prop="operType" label="操作" align="left" width="150"></el-table-column>
        <el-table-column prop="sum" label="金额" align="left" width="100">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.sumtas" style="color:#CC6666">{{scope.row.sum}}</span>
              <span v-else style="color:#669966">¥{{scope.row.sum}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="newSurplusSum" label="余额" align="left" width="100">
          <template slot-scope="scope">
            <p>¥{{scope.row.newSurplusSum}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="userPhone" label="用户手机号" align="left" width="120"></el-table-column>
        <el-table-column prop="remark" label="状态" align="left" width="170"></el-table-column>
      </el-table>
			
      <div class="distribution-table" v-else-if="titleCol==2">
        <ul class="ul">
          <li>日期</li>
          <li>用户手机号</li>
          <li>关系</li>
          <li>消费总额</li>
          <li>提成</li>
          <div style="clear:both"></div>
        </ul>
        <div class="table-mai"><!-- 分销关系 -->
          <ul class="mai-col" v-if="father.realtionPhone && pageNum == 1 && titleCol==2" style="border-bottom:1px solid #EBEEF5;">
            <li>{{father.createTime}}</li>
            <li>{{father.realtionPhone}}</li>
            <li>上级</li>
            <li>无</li>
            <li>无</li>
            <div style="clear:both"></div>
          </ul>
          <div style="width:100%;height:40px;" v-if="father.realtionPhone && pageNum == 1 && titleCol==2"></div>
          <ul class="mai-col" v-for="(item,index) in distributionList" :key="index">
            <li>{{item.createTime}}</li>
            <li>{{item.realtionPhone}}</li>
            <li v-if="item.relation=='ONELEVLE' && item.isDel == 'NO'">一级关系</li>
            <li v-else-if="item.relation=='ONELEVLE' && item.isDel == 'YES'">一级关系(已解除)</li>
            <li v-else-if="item.relation!='ONELEVLE' && item.isDel == 'NO'">二级关系</li>
            <li v-else-if="item.relation!='ONELEVLE' && item.isDel == 'YES'">二级关系(已解除)</li>
            <li>
              <span v-if="item.consumeSum>0">¥{{item.consumeSum}}</span>
              <span v-else>无</span>
            </li>
            <li>
              <span v-if="item.royaltySum > 0" style="color:#669966;">+¥{{item.royaltySum}}</span>
              <span v-else>无</span>
              </li>
            <div style="clear:both"></div>
          </ul>
          <div class="el-table__empty-block" style="width: 805px;" v-if="!distributionList.length"><span class="el-table__empty-text">暂无下级</span></div>
        </div>
      </div>
      
      <!--佣金记录-->
      <div class="panel3" v-if="titleCol==3">
      	<p class="tags">
      		<span>{{`${year}年${month}月`}}</span>
      		<span v-if="cal1mon">待入账佣金：￥{{pendingCommission}}</span>
      		<span v-if="cal1mon">已入账佣金：￥{{pendedCommission}}</span>
      	</p>
      	<el-table :data="tableData" row-class-name="row-class-name" max-height="335" stripe header-align="left">
        <el-table-column prop="createTime" label="下单日期" align="left" width="110"></el-table-column>
        <el-table-column prop="orderNumber" label="订单编号" align="left" width="110"></el-table-column>
        <el-table-column prop="orderType" label="订单类型"  align="left" width="80">
        	<template slot-scope="scope" >
        		{{scope.row.orderType=='Ordinary'?'普通订单':(scope.row.orderType=='AgentSale'?'代售订单':(scope.row.orderType=='Presell'?'预售订单':''))}}
        	</template>
        </el-table-column>
        <el-table-column prop="phone" label="推荐人手机号（1级/2级）" align="left" width="120">
        	<template slot-scope="scope" >
        		{{scope.row.phone}}{{scope.row.userType == 'Member'?'（用户）':(scope.row.userType == 'Sale'?'（销售）':'')}}
        	</template>
        </el-table-column>
        <el-table-column prop="rate" label="佣金比例" align="left" width="80">
        	<template slot-scope="scope" >
        		{{`${scope.row.rate}%`}}
        	</template>
        </el-table-column>
        <el-table-column prop="amount" class-name="cell-class-name" label="成交金额" align="left" width="115">
        	<template slot-scope="scope">
        		{{'¥'+Math.abs(scope.row.amount)}}
        	</template>
        </el-table-column>
        <el-table-column prop="royaltyLogs" class-name="cell-class-name" label="佣金发放" align="left">
        	<template slot-scope="scope">
        		<div class="commission" v-if="scope.row.royaltyLogs.length" v-for="(sec,index) in scope.row.royaltyLogs" :key="index">
        			<span class="sp1">
        				{{'¥'+Math.abs(sec.paymenAmount)}}
        			</span>
        			<span class="sp2">({{sec.paymentDate | timeFormate}}{{sec.isPayment=='YES'?'已入账':(sec.isPayment=='NO'?'待入账':(sec.isPayment=='REFUND'?'已退款':''))}})</span>
        		</div>
        		<div class="commission" v-else>
        			<span class="sp1">
        					{{`¥0`}}
        			</span>
        		</div>
        	</template>
        </el-table-column>
      </el-table>
      </div>
      
      <el-pagination style="text-align:center;margin:50px 0 50px 0;" background layout="prev, pager, next,sizes, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[15,30,45,50]" :page-size="pageSize" :total="totalPage"></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="617px" v-if="dialogVisible" top="25vh" custom-class="chgtranspassword"  title="修改交易密码">
      <!-- 修改交易密码 -->
      <chgtranspassword @closeDialog="closeDialog" v-if="dialogVisible"></chgtranspassword>
    </el-dialog>
  </div>
</template>
<script>
import antDesign from '@/components/template/ant-design'
import Cookies from 'js-cookie'
import chgtranspassword from '@/components/template/chg_trans_password'
import { setTimeout } from 'timers'
import { release } from 'os'
export default {
  data() {
    return {
      dialogVisibleTitle: '',
      MoneyBack: false, //回款
      MoneyBackSuccess: false, //回款成功
      disabled: false, //是否禁用验证码
      codeText: '获取验证码',
      dialogVisible: null, //交易密码
      passwdConfig:false,
      withdrawFee: '0.00',
      titleCol:1,//true资产记录、false分销关系
      distributionList:[],//分销关系
      father:{},
      user: {
        saleAmount: '', //代售金额
        saleProfit: '', //代售利润
        accumulatedIncome: '', //代售累计收益
        availableFund: '', //可用资产(代售回款总金额+佣金总额)
        frozenSum: '' //冻结金额
      },
      dataForm: {
        withdrawAmount: '', //提现金额
        phoneNo: '', //手机号
        verifyCode: '', //手机验证码
        traderPwd: '' //交易密码
      },
      bankCard: {},
      tableData: [],
      pageNum: 1,
      pageSize: 15,
      totalPage: 0, //总条目数
      out:0,//筛选条件
      year: '',
      month: '',
      cal1mon:'',
      cal2mon:'',
      pendedCommission:'',
      pendingCommission:'',
      popoverVisible1:false,
      popoverVisible2:false,
    }
  },
  filters:{
  	timeFormate(val){
  		if(val) {
  			val.toString().split(' ')[0].replace(/-/g,'.')
  			return val.toString().split(' ')[0].replace(/-/g,'.')
  		}
  	}
  },
  computed: {
    assets() {
      let A = this.user.saleAmount + this.user.saleProfit + this.user.availableFund + this.user.frozenSum;
      return parseFloat(A).toFixed(2)
    },
    calYear() {
      const d = new Date()
      return d.getFullYear()
    },
    calMonth() {
      const d = new Date()
      return d.getMonth() + 1
    }
  },
  watch: {
    $route() {
      this.MoneyBack = false;
      this.pageNum = 1;
      this.fundData();
      this.fundList();
      this.$store.state.dialogVisible = false;
      this.titleCol = 1;
      this.passwdConfig = false
    }
  },
  mounted() {
    this.fundData()
    this.fundList();
    this.dialogVisible = this.$store.state.dialogVisible
    this.year = this.calYear
    this.month = this.calMonth
    this.cal2mon = this.calMonth
    this.cal1mon = ''
    const calmon = this.month<10?`0${this.month}`:this.month
    this.createTime=`${this.year}-${calmon}`
    this.out = 2
    this.passwdConfig = JSON.parse(localStorage.getItem('user')).issetTradePassword
  },
  components: { antDesign,chgtranspassword },
  methods: {
    changeInput(v){//体现金额不能大于5W
      if (v > 50000) {
        this.dataForm.withdrawAmount = 50000
        this.$message({ title: '错误', message: '单次提现金额不能超过五万!', type: 'error' })
        return false
      }
      if (v > this.user.availableFund) {
        this.dataForm.withdrawAmount = this.user.availableFund
        this.$message({ title: '错误', message: '提现金额不能大于余额!', type: 'error' })
        return false
      }
    },
    colTap(type){//资产管理、分销关系
      this.titleCol = type;
      this.pageNum = 1;
      // this.pageSize = 2;
      this.totalPage = 0;
      switch (this.titleCol){
      	case 1:this.fundList();
			      	this.month = this.calMonth
					    this.cal2mon = this.calMonth
					    this.cal1mon = ''
					    const calmon1 = this.month<10?`0${this.month}`:this.month
					    this.createTime=`${this.year}-${calmon1}`
					    this.payDate = ''
					    this.out = 2
		      		break;
      	case 2:this.distributionLog()
      				this.month = this.calMonth
					    this.cal2mon = this.calMonth
					    this.cal1mon = ''
					    const calmon2 = this.month<10?`0${this.month}`:this.month
					    this.createTime=`${this.year}-${calmon2}`
					    this.payDate = ''
					    this.out = 2
      		break;
      	case 3:this.getRoyLog();
      		break;
      	default:
      		break;
      }
    },
    filterItem(type) {
    	this.out = type
    },
    preYear() {
      //上一年度
      if (this.year <= 2019) {
        return false
      }
      this.year--
    },
    nextYear() {
      //下一年度
      if (this.year >= this.calYear) {
        return false
      }
      this.year++
    },
    closeDialog() {
      //交易密码回调
      this.dialogVisible = false
      this.$store.state.dialogVisible = false
      this.passwdConfig = JSON.parse(localStorage.getItem('user')).issetTradePassword
    },
    MoneyBackTap() {
      //申请提现

      this.loading = this.$loading({ text: '提现申请中，请稍后...' })

      if (!this.dataForm.withdrawAmount || this.dataForm.withdrawAmount == '') {
        this.$message({ title: '错误', message: '请输入提现金额！', type: 'error' })
        this.loading.close()
        return false
      }

      if (!this.dataForm.verifyCode || this.dataForm.verifyCode == '') {
        this.$message({ title: '错误', message: '请输入验证码！', type: 'error' })
        this.loading.close()
        return false
      }

      if (!this.dataForm.traderPwd || this.dataForm.traderPwd == '') {
        this.$message({ title: '错误', message: '请输入交易密码！', type: 'error' })
        this.loading.close()
        return false
      }

      if (!this.dataForm.verifyCode || this.dataForm.verifyCode == '') {
        this.$message({ title: '错误', message: '请输入验证码！', type: 'error' })
        this.fullscreenLoading = false
        return false
      }

      if (!this.dataForm.traderPwd || this.dataForm.traderPwd == '') {
        this.$message({ title: '错误', message: '请输入交易密码！', type: 'error' })
        this.fullscreenLoading = false
        return false
      }

      let H = '';
      H =
        'user/withdrawApply.do?token=' +
        Cookies.get('Gtoken') +
        '&withdrawAmount=' +
        this.dataForm.withdrawAmount +
        '&withdrawFee=' +
        this.withdrawFee +
        '&verifyCode=' +
        this.dataForm.verifyCode +
        '&traderPwd=' +
        this.dataForm.traderPwd
      this.$post(H, {}).then(({ data }) => {
        if (data.code == '0000') {
          setTimeout(() => {
            this.MoneyBack = false
            this.MoneyBackSuccess = true
            this.fundData()
            this.fundList()
          }, 500)
        }
        this.loading.close()
      })
    },
    refundTap() {
      //厂商回款
      if (this.bankCard.cardId) {
        this.withdrawFee = '0.00'
        this.dataForm = {}
        this.dataForm.phoneNo = JSON.parse(localStorage.getItem('user')).phone
        this.MoneyBack = true;
        this.codeText = '获取验证码'
        this.disabled = false
        if(this.setDate){
          clearInterval(this.setDate)
        }
        this.passwdConfig = JSON.parse(localStorage.getItem('user')).issetTradePassword
      } else {
        if(!this.bankCard.cardId || this.bankCard.cardId==''){
          this.$message.error('请先绑定银行卡后进行操作!')
        }
      }
    },
    fundData() {
      //资产数据
      this.loading = this.$loading({ text: '数据加载中，请稍后...' })
      this.$get('user/fund.do').then(({ data }) => {
        if (data.code == '0000' && this.$store.state.user && localStorage.getItem('user')) {
          this.user = data.fund;



          let userInfo = JSON.parse(localStorage.getItem('user'));
          userInfo.availableFund =  this.user.availableFund
          this.$store.commit('handleUserName',userInfo)


          
          // localStorage.setItem('user',)
          this.dialogVisibleTitle = data.title
          if (data.bankCard) {
            this.bankCard = data.bankCard
          }
        }
        this.loading.close()
      })
    },
    distributionLog(){//分销关系
      
      this.loading = this.$loading({ text: '数据加载中，请稍后...' })
      this.$get('user/distributionLog.do', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(({ data }) => {
        if (data.code == '0000') {
          this.father = data.father;
          this.distributionList = data.list.data
          this.tableData = data.list.data
          this.totalPage = data.list.count
        }
        this.loading.close()
      })
    },
    fundList() {
      //资产列表
      this.loading = this.$loading({ text: '数据加载中，请稍后...' })
      this.$get('user/fundList.do', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(({ data }) => {
        if (data.code == '0000') {
          data.list.data.map((item, index) => {
            item.sum = item.sum + ''
            item.operType = this.operType(item.operType)
            if (item.sum.indexOf('-') >= 0) {
              
              item.sum = item.sum.slice(1)
              item.sum = '-¥' + item.sum
              item.sumtas = true
            }
            // console.log(item.sum)
          })
          this.tableData = data.list.data
          this.totalPage = data.list.count
        }
        this.loading.close()
      })
    },
    getRoyLog(){//佣金记录
    	this.loading = this.$loading({ text: '数据加载中，请稍后...' })
      this.$get('user/getRoyLog.do', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          payDate:this.cal1mon?this.payDate:'',//佣金入账时间
          createTime:this.cal2mon?this.createTime:''//下单时间
        }
      }).then(({ data }) => {
        if (data.code == '0000') {
          this.tableData = data.data.data
          this.totalPage = data.data.count
          this.pendingCommission = data.pendingCommission
          this.pendedCommission = data.pendedCommission
          
        }
        this.loading.close()
      })
    },
    selectDate(type,year,month) {
    	const mon = month<10?`0${month}`:month
    	let dateStr = `${year}-${mon}`
    	this.month = month
    	this.pageNum = 1
    	if(type=='cal1') {
    		this.payDate = dateStr
    		this.createTime = ''
    		this.cal1mon = month
    		this.cal2mon = ''
    	}else if(type=='cal2'){
    		this.payDate = ''
    		this.createTime = dateStr
    		this.cal1mon = ''
    		this.cal2mon = month
    	}
    	this.popoverVisible1 = false
    	this.popoverVisible2 = false
    	this.getRoyLog()
    },
    operType(text) {
      //订单类型判断
      let T = ''
      if (text == 'COMMISION') {
        T = '佣金(推荐注册)'
      } else if (text == 'COMMISION_GOODS') {
        T = '佣金(购买商品)'
      } else if (text == 'SALE') {
        T = '代售回款'
      } else if (text == 'WITHDRAW') {
        T = '厂商回款'
      } else if (text == 'PAY') {
        T = '可用资产支付'
      } else if (text == 'ROYALTY_AGENT') {
        T = '代售商品收益返佣'
      } else if (text == 'ROYALTY_PRE') {
        T = '抢购商品返佣'
      }else if (text == 'REFUND') {
        T = '退款'
      }else if (text == 'ROYALTY_REFUND') {
        T = '一/二级下级退款扣除佣金'
      }
      return T
    },
    blurInput(v) {
      //计算手续费

      if (v.target.value == '' || v.target.value == 0) {
        this.withdrawFee = '0.00'
        return false
      }
     
      this.$get('user/withdrawFee.do', {
        params: {
          withdrawAmount: v.target.value
        }
      }).then(({ data }) => {
        if (data.code == '0000') {
          this.withdrawFee = ''
          this.withdrawFee = data.withdrawFee
        }
      })
    },
    codeTap() {
      //获取验证码
      this.fullscreenLoading = true;

      this.$get('sendCode.do', {
        params: {
          phoneOremail: this.dataForm.phone,
          type: 'tixian'
        }
      })
        .then(({ data }) => {
          //console.log(data)
          if (data.code == '0000') {
            this.$message({
              message: '验证码发送成功',
              type: 'success'
            })
            let T = this.codeText
            T = Number(60)
            let setDate = window.setInterval(() => {
              //console.log(T)
              if (T >= 1) {
                T--;
                this.codeText = T + 's'
                this.disabled = true
              }else {
                this.codeText = "重新获取";
                this.disabled = false;
                clearInterval(setDate);
              }
            }, 1000)
          }
          this.fullscreenLoading = false
        })
        .catch(err => {
          console.log(err);
        })
    },
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageNum = 1
      
      switch (this.titleCol){
      	case 1:this.fundList();
      		break;
      	case 2:this.distributionLog()
      		break;
      	case 3:this.getRoyLog();
      		break;
      	default:
      		break;
      }
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageNum = val
      switch (this.titleCol){
      	case 1:this.fundList();
      		break;
      	case 2:this.distributionLog()
      		break;
      	case 3:this.getRoyLog();
      		break;
      	default:
      		break;
      }
    },
    submitTap() {},
    getPwdTap(v) {
      //交易密码
      this.dataForm.traderPwd = v
    }
  }
}
</script>

<style lang="less">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.wallet{
   .el-input__inner{
      border-radius: 0;
    }
}
.moneyInput{
    .el-input__inner{
      border-right: none;
    }
}

</style>
<style scoped lang="less">
.wallet {
  /*height: 940px;
  max-height: 940px;*/
  width: 100%;
  max-width: 100%;
  overflow-y: hidden;
  // 处理input type = number的上下箭头
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  .form {
    .passwd-config{
      position: relative;
      .layer{
        position: absolute;
        left:-3px;
        top: 0;
        width: 286px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border:1px solid #dcdfe6;
        color: #89673c;
        background: #fff;
      }
    }
    .MoneyBack-back {
      width: 284px;
      height: 80px;
      margin-left: 120px;
      margin-bottom: 30px;
      padding: 20px 23px;
      box-sizing: border-box;
      color: #89673c;
      font-weight: bold;
      border-radius: 4px;
      /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#faf2dd+0,d0c6b3+99 */
      background: #faf2dd; /* Old browsers */
      background: -moz-linear-gradient(top, #faf2dd 0%, #d0c6b3 99%); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        top,
        #faf2dd 0%,
        #d0c6b3 99%
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to bottom,
        #faf2dd 0%,
        #d0c6b3 99%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#faf2dd', endColorstr='#d0c6b3',GradientType=0 ); /* IE6-9 */
      .text {
        span {
          margin-bottom: 10px;
        }
        span:nth-child(1) {
          float: left;
        }
        span:nth-child(2) {
          float: right;
          font-weight: 400;
        }
      }
    }
    .Modifypassword {
      color: #bebebe;
      font-size: 12px;
      margin-left: 120px;
      cursor: pointer;
    }
    .MoneyBack-tap {
      margin-left: 120px;
      width: 170px;
      height: 36px;
      line-height: 36px;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      background: #91856f;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  // 修改兼容

  .el-input-group {
    width: 284px;
  }
  .el-dialog {
    .el-input__inner {
      border-radius: 0;
      width: 284px;
    }
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background: #fff;
    border-radius: 0;
  }
  .moneyInput {
    .el-input {
      width: 146px;
      float: left;
      .el-input__inner {
        width: 146px;
        
      }
    }
    .money-text {
      float: left;
      border-right: 1px solid #dcdfe6;
      border-top: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      height: 40px;
      width: 140px;
      box-sizing: border-box;
      .money-text-border {
        height: 26px;
        line-height: 26px;
        margin-top: 7px;
        padding: 0 10px;
        box-sizing: border-box;
        border-left: 1px solid #dcdfe6;
        font-size: 12px;
        color: #cc6666;
        text-align: center;
        span {
          margin: 0 5px;
        }
      }
    }
  }
  .money-text {
    width: 100px;
  }
  .procedures {
    .withdrawFee {
      width: 284px;
      padding: 0 20px;
      box-sizing: border-box;
      height: 40px;
      border: 1px solid #dcdfe6;
      float: left;
      color: #999;
    }
    .el-input {
      // padding-left: 20px;
      float: left;
      .el-input__inner {
        padding-left: 25px;
      }
      .el-input-group__prepend {
        padding: 0;
        border: 0;
        position: absolute;
        top: 10px;
        left: 10px;
      }
    }
    .input-mark {
      float: left;
      margin-top: 8px;
      margin-left: 10px;
    }
  }
  .el-input__inner[name='code'] {
    width: 150px;
    border-radius: 0;
    .el-button {
      padding: 3px;
    }
  }
  .wallet-header-plus{
  	width: 100%;
  	margin-bottom: 10px;
  	.w-section{
  		padding: 50px;
  		display: table;
  		width: calc(100% - 100px);
  		.w-s-wrap{
  			display: table-cell;
  			vertical-align: middle;
	  		.w-title{
	  			color: #666666;
	  			font-size: 18px;
	  		}
	  		.w-list{
	  			margin-top: 8px;
	  			width: 100%;
	  			.w-item{
	  				height: 100%;
	  				display: table;
	  				float: left;
	  				position: relative;
	  				// &:first-child{
	  				// 	width: 254px;
	  				// }
	  				// &:not(:first-child){
	  				// 	width: calc((100% - 254px)/3 - 6px);
	  				// }
	  				// &:first-child:after{
	  				// 	content: '';
	  				// 	display: inline-block;
	  				// 	height: 100%;
	  				// 	width: 1px;
	  				// 	background: #EEEEEE;
	  				// 	position: absolute;
	  				// 	top: 0;
	  				// 	left: 210px;
	  				// }
	  				.item-wrap{
	  					display: table-cell;
	  					vertical-align: middle;
	  					.w-desc{
	  						display: table;
	  						height: 48px;
	  						.w-d-wrap{
	  							display: table-cell;
	  							vertical-align: middle;
	  							font-size: 14px;
                  color: #999999;
                  .tap{
                    cursor: pointer;
                  }
	  							p{
	  								float: left;
	  								display: table-cell;
	  							}
	  							.el-tooltip{
	  								float: left;
	  								.user-icon{
	  									margin-top: 0;
	  								}
	  							}
	  						}
	  					}
	  					.price{
	  							color: #666666;
	  							font-size: 18px;
	  							font-weight: bold;
	  							span{
	  								font-size: 12px;
	  							}
	  						}
						.symbol_price{
              font-size: 24px;
							  color: #91856F;
              }
            .w-box{
              width: 210px;
              line-height: 48px;
            }
            .w-wrapin{
              width: 99px;
            }
	  				}
	  			}
        }
        .w-ulist{
          >li{
            width: 50%;
            float: left;
            .w-utap{
              position: absolute;
              right: 50px;
              top: 30px;
              width: 88px;
              height: 30px;
              border: 1px solid #C2AB82;
              color: #C2AB82;
              cursor: pointer;
              border-radius:4px;
              text-align: center;
              line-height: 30px;
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              &:hover{
                background: #C2AB82;
                color: #FFF;
              }
            }
            
          }
          >.right-item{
              padding-left: 50px;
              width: 369px;
              .w-utap{
                right: 0;
              }
          }
          >li+li{
            border-left: 1px solid #EEEEEE;
          }
        }
        .ulist-wrap{
          padding-top: 30px;
          >li{
            >.item-wrap{
              width: 125px;
            }
          }
        }
  		}
    }
    .w-one{
      padding-bottom:26px; 
    }
  	.w-two{
  		height: 165px;
  		padding: 0 50px 10px;
  	}
  }
  .tap-section{
  	background: #999999;
  	padding:0 20px;
  	box-shadow: 1px 1px 2px 1px #FBFBFB;
  }
  .w-divider{
  	height: 10px;
  	background: #F2F2F2;
  	width: 100%;
  }
  .wallet-header {
    width: 100%;
    height: 350px;
    background: #fff;
    padding: 50px 40px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .title {
      color: #333333;
      font-size: 18px;

      p,
      .el-tooltip,
      .price {
        float: left;
      }

      .price {
        margin-left: 10px;
        color: #91856f;
        font-weight: bold;
        font-size: 22px;
        margin-top: -2px;
      }
    }
    .wallet-header-view {
      margin-top: 30px;
      margin-left: -10px;
      .col {
        width: 206px;
        height: 193px;
        border-radius: 10px;
        margin: 0 10px;
        float: left;
        padding: 20px;
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;
        p {
          float: left;
        }
        .item {
          width: 20px;
          float: left;
        }
        .user-icon {
          margin-top: 0;
        }
        .price {
          font-size: 23px;
          color: #fff;
          margin-top: 15px;
          font-weight: bold;
          span {
            font-size: 14px;
          }
        }
        .duce {
          font-size: 12px;
        }
        .profit {
          color: #fff;
          font-weight: bold;
          margin-top: 10px;
          font-size: 16px;
          span {
            margin-right: 5px;
          }
        }
        .col-tap {
          margin-top: 10px;
          margin-left: -5px;
          .tap {
            float: left;
            width: 72px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #fff;
            border-radius: 15px;
            border: 1px solid #fff;
            text-align: center;
            margin: 0 5px;
            transition: all 0.3s;
            cursor: pointer;
          }
          .tap:hover {
            border-color: #aec5d9;
            color: #aec5d9;
          }
        }
        .user-icon.i-m {
          background: url(../../../../static/icon/icon-mark-x16.png) right no-repeat;
          background-size: 15px 15px;
        }
      }
      .col:nth-child(1) {
        background: url(../../../assets/img/user-wallet-b1.png) no-repeat;
      }
      .col:nth-child(2) {
        background: url(../../../assets/img/user-wallet-b2.png) no-repeat;
      }
      .col:nth-child(3) {
        background: url(../../../assets/img/user-wallet-b3.png) no-repeat;
      }
    }
  }
  .wallet-content {
    background: #fff;
  }
  .wallet-content {
    padding: 50px 40px;
    box-sizing: border-box;
    /*height: 580px;*/
    .title.tab1{
    	border-bottom:1px solid #f1f1f1;	
    }
    .title {
      font-size: 18px;
      color: #333333;
      padding-bottom: 10px;
      position: relative;
      .title-col{
        float: left;
        div{
          width: 110px;
          display:inline-block;
          text-align: center;
          color: #999999;
          font-size: 14px;
          transition:all 0.3s; 
          -webkit-transition:all 0.3s;
          cursor: pointer;
        }
        div.active{
        	color: #666666;
        	font-size: 18px;
        	font-weight: bold;
        	position: relative;
        	em{
        		display: block;
        		height: 3px;
        		background: #D8CBB4;
        		width: 80px;
        		position: absolute;
        		left: 50%;
        		margin-left: -40px;
        		bottom: 2px;
        	}
        	span{
        		position: relative;
        	}
        	}
        .border{
          width: 100px;
          height: 2px;
          background: #91856F;
          position: absolute;
          bottom: -2px;
          transition:all 0.3s;
          -webkit-transition:all 0.3s; 
        }
      }
      .right-btn-group{
        	float: right;
        	.btn-item{
        		height: 30px;
        		width: 112px;
        		font-size: 12px;
        		color: #C2AB82;
        		text-align: center;
        		background: #fff;
        		border:1px solid #C2AB82;
        		border-radius: 4px;
        		outline: none;
        		&:first-child{
        			margin-right: 10px;
        		}
        		&.active{
        			background: #C2AB82;
        			color: #fff;
        		}
        		em{
        			height: 100%;
        			display: inline-block;
        			margin-right: 5px;
        			img{
	        			height: 16px;
	        			width: 16px;
	        			vertical-align: middle;
	        		}
        		}
        		
        		span{
        			display: inline-block;
        			height: 100%;
        			line-height: 28px;
        		}
        	}
        }
      .p {
        color: #999999;
        font-size: 14px;
      }
    }
    .el-table td,
    .el-table th {
      padding: 8px 0;
    }
    /deep/ .el-table .row-class-name{
    	font-size: 14px;
    	color: #666666;
    		td{
    			vertical-align:top;
    		}
    		.cell-class-name{
    			color: #CC6666;
    			.sp2{
    				color: #666666;
    			}
    		}
    }
  }

  .user-icon {
    width: 20px;
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    margin: 0 5px;
    float: left;
    margin-top: 2px;
  }
  .user-icon.i-m {
    background: url(../../../../static/icon/icon-mark.png) right no-repeat;
    background-size: 15px 15px;
  }
  .MoneyBackSuccess {
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #666666;
    img {
      width: 90px;
      height: 90px;
      margin: 0 auto;
    }
    .p1 {
      font-size: 30px;
      color: #28ae3d;
      margin-top: 24px;
    }
    .p2 {
      color: #666666;
      margin-top: 28px;
      text-align: left;
      letter-spacing: 0px;
    }
    .MoneyBackSuccessTap {
      width: 130px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      background: #91856f;
      color: #fff;
      text-align: center;
      margin: 30px auto 0 auto;
    }
  }
  .distribution-table{
    .ul{
      display: flex;
      justify-content: space-between;
      li{
        font-weight: bold
      }
    }
    .table-mai{
      border-bottom: 1px solid #EBEEF5;
      max-height: 295px;
      overflow-y: auto;
      
      .mai-col{
        li{
          font-weight: none;
        }
      }
    }
    
    li{
      float: left;
      word-wrap: normal;
      text-overflow: ellipsis;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 23px;
      padding: 8px 10px;
      color: #909399;
      border-top: 1px solid #EBEEF5;
    }
    li:nth-child(1){width:20%}
    li:nth-child(2){width:20%}
    li:nth-child(3){width:20%}
    li:nth-child(4){width:20%}
    li:nth-child(5){width:20%;}
  }
  
  .panel3 {
  	.tags{
  		font-size: 14px;
  		color: #C2AB82;
  		font-weight: bold;
  		margin: 33px 25px;
  		span{
  			margin-right: 25px;
  		}
  		
  	}
  }
  // ::-webkit-scrollbar {display:none}
}
.c-calendar {
	padding: 15px;
      .c-turning {
        color: #333333;
        text-align: center;
        span {
          padding: 0 25px;
        }
        .pre {
          color: #cccccc;
          cursor: pointer;
        }
        .next {
          color: #cccccc;
          cursor: pointer;
        }
      }
      .calendar-box {
        margin-top: 25px;
        .calendar-list {
        	text-align: center;
          .calendar-item {
          	float: left;
          	height: 40px;
          	width: 40px;
          	border-radius: 50%;
          	font-size: 12px;
          	color: #333;
          	line-height: 40px;
          	text-align: center;
          	cursor: pointer;
          	&.active{
          		background: #C2AB82;
          		color: #fff;
          	}
          	&:hover{
          		background: #C2AB82;
          		color: #fff;
          	}
          }
        }
      }
    }
</style>


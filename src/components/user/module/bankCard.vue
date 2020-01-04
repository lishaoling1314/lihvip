
<template>
  <div class="bankCard" >
    <div class="bankCard-tabel" style="margin:0 auto;">
      <div class="backcard-content" v-if="bankCardId">
        <div class="title">
          <p>{{bankCard.cardBank}}</p>
          <p>{{bankCard.cardId}}</p>
        </div>
        <div class="back-info">
          <p>姓名：{{bankCard.cardRealName}}</p>
          <p>银行预留手机号：{{bankCard.Phone}}</p>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="bankCardTap" v-if="bankCardId">
        <div class="tap-btn" @click="modifyBankCard()">修改</div>
        <div class="tap-btn" @click="removeBackCard()">删除</div>
      </div>
      <div class="no-bankCard" v-if="!bankCardId">
        <img src="@/assets/img/user.png" alt="">
        <p>您还没有绑定银行卡，赶紧来添加吧!</p>
        <button @click="addBackcardTap()">添加银行卡</button>
      </div>
    </div>
  
    <el-dialog :visible.sync="checkPhone" width="617px" v-if="checkPhone"><!-- 验证码 -->
        <template-checkPhone @twoSuccKey='twoSuccKeyinfo' v-if="checkPhone" :checkBankDelete="checkBankDelete"></template-checkPhone>
    </el-dialog>



    <el-dialog :visible.sync="isbankCard" width="617px" v-if="isbankCard"><!-- 银行卡 -->
        <template-bankCard ref="templateBankCard" @closeLater="closeLaterBankCard"></template-bankCard>
    </el-dialog>




    
  </div>
</template>
<script>
import templateCheckPhone from '@/components/template/template-checkPhone'
import templateBankCard from './template-bankCard'
import Qs from 'qs'
import { setTimeout } from 'timers'
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      checkBankDelete:'',
      bankCardId:false,//是否有银行卡
      isbankCard:false,//新增修改银行卡
      checkPhone:false,//校验银行卡
      bankCard:{}
    }
  },
  components: {
    templateCheckPhone,
    templateBankCard
  },
  mounted() {
     this.bankCardList();
  },
  watch:{
    '$route'(){
      this.checkPhone = false;
      this.isbankCard = false;
    },
  },
  methods: {
    addBackcardTap(){
      this.checkPhone = true;
      this.isbankCard = false;
    },
    closeLaterBankCard(){
      this.checkPhone = false;
      this.isbankCard = false;
      this.bankCardList();
    },
    twoSuccKeyinfo(key){
      let _this = this
      this.loading = this.$loading({text: '数据加载中，请稍后...'});
      this.checkPhone = false;
      if(this.isremove){//删除

        this.$get('user/bankcard/del.do', {
            params: {
              bankCardId: this.bankCard.id,
              twoSuccKey:key
            }
          }).then(({ data }) => {
            if (data.code == '0000') {
              this.isremove = false;
              this.bankCard = {}
              this.$message({
                type: 'success',
                message: '删除成功!', 
                onClose() {
                  _this.bankCardId = false
                }
              })
            }
          })


      }else{//修改


        this.isbankCard = true;
        this.$nextTick(() => {
            this.$refs.templateBankCard.init(this.bankCard,key);
        });


      }
      


      this.loading.close()

    },
    bankCardList() {
      this.loading = this.$loading({text: '数据加载中，请稍后...'});
      //所有银行卡
      this.$get('user/bankcard/all.do').then(({ data }) => {



        if(data.bankCard){
          this.bankCardId = true;
          // console.log(data.bankCard.cardReservePhone.slice(0,3))
          data.bankCard.Phone = data.bankCard.cardReservePhone.slice(0,3)+'****'+data.bankCard.cardReservePhone.slice(8)
        }
        if ((data.code == '0000' || data.code=='1013') && data.bankCard) {
          this.bankCard = data.bankCard
        }
        if(data.code=='1013' && this.$router.history.current.name=='bankCard'){
           this.checkPhone = true;
        }
       

        this.loading.close()

      })
    },
    removeBackCard() {//删除
      this.isremove = true
      this.checkPhone = true
      this.checkBankDelete = 'checkBankDelete'
    },
    modifyBankCard() {//修改
      this.checkBankDelete = ''
      this.isremove = false
      this.checkPhone = true
    },
    
  }
}
</script>
<style lang="less">
.bankCard{
  height: 708px;
  background: #fff;
  padding-top:65px;
  box-sizing: border-box; 

  // .el-button:focus, .el-button:hover{background:#91856F; }
  .el-dialog__wrapper{top:100px;}
  .bankCard .el-table__header-wrapper .el-table td, .el-table th.is-leaf{background: #D9D9D9};
  .el-table th>.cell{color: #333}

}
.bankCard-tabel {
  height: auto;
  .tabel {
    border: 1px solid #ebeef5;
  }
    .backcard-content{
      width: 447px;
      height: 281px;
      background: url(../../../assets/img/backcard-content-back.png)no-repeat;
      background-size:447px 281px;
      margin: 0 auto 70px auto;
      padding: 40px;
      box-sizing: border-box;
      position: relative;
      .title{
        p{ margin-bottom: 20px; color:#89673C; }
        p:nth-child(2){
          font-size: 24px;
        }
      }
      .back-info{
        position: absolute;
        bottom: 20px;
        color: #DDC9AC;
        p{float: left;}
        p:nth-child(2){margin-left: 30px}
      }
    }
}
.bankCard .el-table__header-wrapper .el-table td,
.el-table th.is-leaf {
  background-color: #fafafa;
}
.bankCardTap {
  text-align: right;
  overflow: hidden;
  // display: flex;
  // justify-content: flex-end;
  width: 360px;
  margin: 0 auto;
  .tap-btn {
    width: 158px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    margin: 0 10px;
    cursor: pointer;
    float: right;
    border-radius: 4px;
  }
  .tap-btn:nth-child(1) {
    color: #fff;
    border: 1px solid #91856F;
    background: #91856F;
  }
  .tap-btn:nth-child(2) {
    color: #91856F;
    border: 1px solid #91856F;
    background: none;
  }
  
}
.no-bankCard {
  display: flex;
  margin-top: 125px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  img {
    width: 96px;
  }
  p {
    margin: 20px 0;
    color: #999999;
  }
  button {
    border: none;
    background: #91856F;
    color: #fff;
    text-align: center;
    font-size: 18px;
    width: 146px;
    height: 46px;
    line-height: 46px;
  }
}


</style>
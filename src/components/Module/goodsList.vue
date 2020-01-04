<template>
  <div class="goodsList w-1200">
    <div class="goodslist-class">
      <div class="search-result" v-if="searchList.q == '' && searchList.w == '' && searchList.e == ''?false:true">
        <div class="title">搜索结果</div>
        <div class="search-mai">
          <div class="col" v-if="searchList.q!=''">{{searchList.q}}<i class="i" @click="moreveSearch('q')">x</i></div><!-- 搜索框q -->
          <div class="col" v-if="searchList.w!=''">{{searchList.wName}}<i class="i" @click="moreveSearch('w')">x</i></div><!-- 类型w -->
          <div class="col" v-if="searchList.e!=''">{{searchList.eName}}<i class="i" @click="moreveSearch('e')">x</i></div><!-- 分类e -->
        </div>
      </div>
      <div class="type-col">
        <div class="title">类型</div>
        <div class="col">
          <div class="col-l a" @click="addSearch(1,'','')" :style="{color:searchList.wName==''?'#91856F':''}">全部</div>
          <div class="col-l a" @click="addSearch(1,'PRESELL','限时抢购')" :style="{color:searchList.wName=='限时抢购'?'#91856F':''}">限时抢购</div>
          <div class="col-l a" @click="addSearch(1,'AGENT_SALE','平台代售')" :style="{color:searchList.wName=='平台代售'?'#91856F':''}" v-if="$store.state.isAgentSale">平台代售</div>
          <!-- <div class="col-l a" @click="addSearch(1,'ORDINARY','普通商品')">普通商品</div> -->
        </div>
      </div>
      <div class="type-col">
        <div class="title">分类</div>
        <div class="col">
          <div class="col-l b" v-for="(item,index) in goodsTypes" :key="index">
            {{item.name}}
            <i class="col-i"></i>
            <div class="col-layer">
              <div class="layer-li" @click="addSearch(3,item.key,'全部'+item.name)">全部</div>
              <div class="layer-li" @click="addSearch(2,item.key,item.name)" v-for="(item,indexs) in item.children" :key="indexs">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goodsList-content user-shadow">
      <div class="screen">
        <div class="screen-col" v-for="(item,index) in screenList" :key="index" @click="screenTap(index)" :class="item.active?'active':''">
          <div class="iecol">
            <div class="text">{{item.name}}</div>
            <div class="een" v-if="item.name=='价格'">
              <img :src="item.top?require('@/assets/img/top-hover.png'):require('@/assets/img/top.png')" class="icon">
              <img :src="item.bottom?require('@/assets/img/bottom-hover.png'):require('@/assets/img/bottom.png')" class="icon">
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-main">
          <div class="goods-view" v-for="(item,index) in goodsList" :key="index">
            <div class="goods-item" @click="pathGoods(item)">

              <!-- <div class="goods-isPresell" v-if="item.isPresell == 'YES' && !item.isExpire">
                <p>预售中</p>
              </div>
              <div class="goods-isPresell" v-if="item.isPresell == 'YES' && item.isExpire">
                <p>预热中</p>
              </div> -->
              <div class="goods-img"><img alt="" v-lazy="item.showImgs[0]" :key="item.showImgs[0]"></div>
              <!-- <div class="goods-layer">
                <div class="layer"></div>
                <div class="layer-text">商品周期：<span v-for="(item,index) in item.periodInfo" :key="index">{{index!=0?'、':''}}{{item.periodDay}}天</span></div>
              </div> -->
              <div class="goods-price"><em>¥</em>{{item.activityType == 'AGENT_SALE'?item.marketPrice : item.salePrice}}
               
              </div>
              <div class="goods-sale">
                  <span class="vipbox">
                    VIP
                  </span>
                   <span style="color:#666666;font-size:14px;margin-left:5px;font-weight:400;" v-if="item.activityType != 'AGENT_SALE'">¥{{item.marketPrice}}</span>
              </div>
              <!-- <div class="goods-label">
                <p v-for="(item,index) in item.goodsLabel" :key="index">{{item.name}}</p>
              </div> -->
              <div style="clear:both"></div>
              <div class="goods-name" :title="item.name">{{item.name}}</div>
              <div class="goods-class">
                <div class="class-col" v-if="item.activityType=='PRESELL'" style="background:#E51C34">限时抢购</div>
                <div class="class-col" v-if="item.activityType=='AGENT_SALE'" style="background:#91856F">平台代售</div>
              </div>

            </div>
            <div style="clear:both"></div>
          </div>
          <div class="no-data" style="margin-top:30px;" v-if="!goodsList.length">
            <img src="@/assets/img/no-goodsList-data.png" alt="">
            <p>抱歉，暂时没有找到相关商品</p>
            <div class="tap" @click="addSearch(4)">查看全部商品</div>
          </div>
        </div>

        <el-pagination v-if="goodsList.length" style="text-align:center;margin:50px 0;" background layout="prev, pager, next,sizes, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[40, 8, 16, 24]" :page-size="pageSize" :total="totalPage"></el-pagination>
      </div>
      <div style="clear:both"></div><!-- 兼容IE9 -->
    </div>
  </div>
</template>
<script>
import Qs from 'qs';
export default {
  data() {
    return {
      goodsList: [], //商品数据
      searchList: {
        q: '', //搜索框
        w: '', //类型
        e: '', //分类
        wName: '', //类型名字，用于渲染
        eName: '' //分类名字，用于渲染
      }, //搜索条件
      layerHeight: '0', //active.top
      screenText: '',
      loadingInstance: null,
      type: [], //分类列表
      typeId: '', //分类列表ID
      screenList: [
        { id: 0, name: '默认', active: false },
        { id: 1, name: '价格', top: false, bottom: false, active: false }
        // { id: 2, name: '利润', top: false, bottom: false, active: false },
        // { id: 3, name: '利率', top: false, bottom: false, active: false }
      ],
      pageNum: 1,
      pageSize: 40,
      totalPage: 0 //总条目数
    }
  },
  
  mounted() {


    // console.log(2504/12/30)
    // 2204+1362
    // console.log(2292+1362+2500+2000)

    this.loading = this.$loading({ text: '数据加载中，请稍后...' });
    if (this.$store.state.inputValue && this.$store.state.inputValue != '') {
      this.searchList.q = this.$store.state.inputValue;
    }
    
    if(sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).menuKey){//首页选项卡
      this.searchList.e = JSON.parse(sessionStorage.getItem('goodsListObj')).menuKey;
      this.searchList.eName = JSON.parse(sessionStorage.getItem('goodsListObj')).menuName;
    }
    
    if(sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).typeKey){//首页代售、首页预售
      this.searchList.w = JSON.parse(sessionStorage.getItem('goodsListObj')).typeKey;
      this.searchList.wName = JSON.parse(sessionStorage.getItem('goodsListObj')).typeName;
    }

     if(sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClass){//首页商品分类更多
      this.searchList.e = JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClass;
      this.searchList.eName = JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClassName;
    }

    // if(!sessionStorage.getItem('goodsListObj')){
      // }
    
    
    setTimeout(()=>{
      this.goodsData();
      this.goodsTypes();
    },100)
  },
  watch: {
    '$store.state.inputValue'() {
      if (this.$store.state.inputValue && this.$store.state.inputValue != '') {
        this.searchList.q = this.$store.state.inputValue;
      }
    },
    searchList:{//监听筛选数据变化
      handler(newValue,oldValue){
        setTimeout(()=>{
          this.goodsData();
        },300)

      },
      deep:true//必须使用深度监听
    }
  },
  methods: {
    pathGoods(item){//新页面打开商品详情 
        let routeData = this.$router.resolve({path:'/goodsdetalis',query:{goodsId:item.id,ab:'path',periodId:item.periodId,activityType:item.activityType}})
        window.open(routeData.href, '_blank');
        // this.$router.push({path:'/goodsdetalis',query:{goodsId:item.id,ab:'path',periodId:item.periodId,activityType:item.activityType}})
    },
    addSearch(t, n, m) {
      //点击筛选
      //1代表类型
      //2代表分类
      // console.log(location.href)
      // return 
      // console.log(t)
      // console.log(n)
      // console.log(m)

      // window.location.href = ""
      let Obj = {};


      if(t == 2 && sessionStorage.getItem('goodsListObj')){//全部分类和子分类不能共存
        let o = JSON.parse(sessionStorage.getItem('goodsListObj'));
        o.goodsClass = '';
        o.goodsClassName = '';
        sessionStorage.setItem('goodsListObj',JSON.stringify(o))
      }else if(t == 3 && sessionStorage.getItem('goodsListObj')){
        let o = JSON.parse(sessionStorage.getItem('goodsListObj'));
        o.menuKey = '';
        o.menuName = '';
        sessionStorage.setItem('goodsListObj',JSON.stringify(o))
      }else if (t == 4 && sessionStorage.getItem('goodsListObj')){
        sessionStorage.removeItem('goodsListObj')
      }
      

      Obj.typeKey = t == 1 ? n : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).typeKey ? JSON.parse(sessionStorage.getItem('goodsListObj')).typeKey : '';
      Obj.typeName = t == 1 ? m : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).typeName ? JSON.parse(sessionStorage.getItem('goodsListObj')).typeName : '';

      Obj.menuKey = t == 2 ? n : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).menuKey ? JSON.parse(sessionStorage.getItem('goodsListObj')).menuKey : '';
      Obj.menuName = t == 2 ? m : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).menuName ? JSON.parse(sessionStorage.getItem('goodsListObj')).menuName : '';




      Obj.goodsClass = t == 3 ? n : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClass ? JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClass : '';
      Obj.goodsClassName = t == 3 ? m : sessionStorage.getItem('goodsListObj') && JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClassName ? JSON.parse(sessionStorage.getItem('goodsListObj')).goodsClassName : '';

      sessionStorage.setItem('goodsListObj',JSON.stringify(Obj))

      



      t == 1 ? (this.searchList.wName = m) : (this.searchList.eName = m);
      t == 1 ? (this.searchList.w = n) : (this.searchList.e = n);
      if(t == 4){
        this.searchList.q = '';
        this.searchList.w = '';
        this.searchList.e = '';
        this.searchList.wName = '';
        this.searchList.eName = '';
      }
      
    },
    moreveSearch(t){//删除筛选条件
    // console.log(t)
    // return 
    let Obj = JSON.parse(sessionStorage.getItem('goodsListObj'));
      if(t == 'w'){
        Obj.typeKey = '';
        Obj.typeName = '';
      }else if(t == 'e'){
        Obj.menuKey = '';
        Obj.menuName = '';
        Obj.goodsClass = '';
        Obj.goodsClassName = '';
      }
      sessionStorage.setItem('goodsListObj',JSON.stringify(Obj))

      t == 'q' ? this.searchList.q = '' : t == 'w' ? this.searchList.w = '' : this.searchList.e = '';
      
    },
    screenTap(id) {
      //排序
      this.loading = this.$loading({ text: '数据加载中，请稍后...' })
      this.pageNum = 1
      this.screenList.map((item, index) => {
        if (id == item.id) {
          item.active = true
          if (item.name == '价格') {
            if (!item.bottom) {
              //首次点击价格【高到底】
              item.bottom = true //true
              item.top = false //true
              this.goodsData('salePrice0')
              this.screenText = 'salePrice0'
            } else {
              //再次点击价格【底到高】
              item.bottom = false //false
              this.goodsData('salePrice1')
              this.screenText = 'salePrice1'
              item.top = true //true
            }
            return false
          } else if (item.name == '默认' || !item.active) {
            this.screenText = ''
            this.goodsData()
          }
        } else {
          item.active = false
          item.top = false
          item.bottom = false
        }
      })
    },
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageNum = 1
      document.documentElement.scrollTop = 0
      this.goodsData()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageNum = val
      document.documentElement.scrollTop = 0
      this.goodsData()
    },
    goodsTypes() {
      this.$get('selectAllType.do', {}).then(({ data }) => {
        if (data.code == '0000') {
          // console.log(data)
          // console.log(data.goodsTypes)
          this.goodsTypes = data.goodsType
        }
      })
    },
    goodsData(orderBy) {
      //商品数据
      // console.log(this.searchList)
      this.$get('goodsList.do', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          orderBy: orderBy || this.screenText, //商品排序
          searchKey: this.searchList.q || '', //搜索关键字
          goodsType: this.searchList.w || '', //商品类型
          type: this.searchList.e || '' //商品分类
        }
      }).then(({ data }) => {
        if (data.code == '0000') {
          data.list.data.map(item => {
            if (item.activityType == 'AGENT_SALE') {
              //商品详情需要传周期ID，这里默认新增一个参数为默认第一个周期ID
              item.periodId = item.periodInfo[0].id
            }

            // if (item.presellBeginTime && item.presellEndTime) {
            //   let D = new Date().getTime()
            //   let F = item.presellBeginTime.replace(/-/g, '/')
            //   let J = new Date(F).getTime()
            //   // //console.log(J)
            //   if (D <= J) {
            //     //预售周期到了
            //     item.isExpire = true
            //     //console.log(item)
            //   }
            // }
          })

          let l = data.list.count
          let GoodsArray = []
          
          if(this.$store.state.isAgentSale){//销售显示代售【2.0.1需求】
            GoodsArray = data.list.data;
            l = data.list.count
          }else{
             data.list.data.map((item,index)=> {
              if(item.activityType != 'AGENT_SALE'){
                GoodsArray.push(item)
              }else{
                l --
              }
            })
          }

          this.totalPage = l
          this.goodsList = GoodsArray;
          this.$store.state.inputValue = '';
        }
        this.loading.close()
      })
    }
  }
}
</script>



<style lang="less">
.el-select-dropdown__item.selected,
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #91856f !important;
}
.el-select .el-input.is-focus .el-input__inner,
.el-pagination__sizes .el-input .el-input__inner:hover,
.el-select .el-input__inner:focus {
  border-color: #91856f !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #E7D4B2 !important;
  color: #fff !important;
}
.goodsList {
  .el-pagination {
    width: 100%;
    float: left;
  }
  // margin: 50px auto;
  border-radius: 5px;
  // box-shadow:0px 0px 43px 0px rgba(55,58,79,0.15);
  // -webkit-box-shadow:0px 0px 43px 0px rgba(55,58,79,0.15);
  padding: 30px 0;
  box-sizing: border-box;

  .goodsList-content {
    // display: flex;
  }

  .goodslist-class {
    .search-result {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      .title {
        color: #000000;
        font-weight: bold;
        display: inline-block;
      }
      .search-mai {
        // float: left;
        display: inline-block;
        margin-left: 20px;
        .col {
          padding: 5px 5px 5px 10px;
          background: #eaeaea;
          color: #91856f;
          border-radius: 4px;
          display: inline-block;
          margin-right: 15px;
          border: 1px solid #eaeaea;
          transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          i {
            color: #91856f;
            padding: 0 5px;
          }
        }
        .col:hover {
          border: 1px solid #91856f;
        }
      }
    }
    .type-col {
      width: 100%;
      height: 48px;
      line-height: 48px;
      .title {
        float: left;
        width: 182px;
        text-align: center;
        color: #999999;
        background: rgba(248, 248, 248, 1);
      }
      .col {
        float: left;
        padding: 0 30px;
        box-sizing: border-box;
        background: #fff;
        width: calc(100% - 182px);
        height: 48px;
        position: relative;
        z-index: 10;
        .col-l {
          display: inline-block;
          padding: 0 20px;
          height: 40px;
          margin-top: 0;
          line-height: 35px;
          border: 1px solid #fff;
          color: #666666;
          cursor: pointer;
          .col-i {
            border: solid #666666;
            border-width: 0 1px 1px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            margin-left: 2px;
            margin-bottom: 3px;
          }
        }
        .col-layer {
          width: calc(1200px - 182px);
          border: 1px solid #ecdab8;
          position: absolute;
          bottom: -45px;
          left: 0;
          padding: 5px 0;
          box-sizing: border-box;
          top: 45px;
          left: 0;
          display: none;
          box-sizing: border-box;
          background: #fff;
          z-index: -10;
          overflow: hidden;
          .layer-li {
            display: inline-block;
            // float: left;
            padding: 0 30px;
            color: #666;
          }
          .layer-li:hover {
            color: #91856f;
            cursor: pointer;
          }
        }
        .col-l.a:hover {
          color: #91856f;
        }
        .col-l.b:hover {
          background: #fff;
          border: 1px solid #ecdab8;
          border-radius: 4px 4px 0 0;
          border-bottom: none;
          color: #91856f;
          .col-layer {
            display: block;
          }
          .col-i {
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            margin-bottom: 0;
            border-color: #91856f;
          }
        }
      }
    }
    .type-col:nth-child(1){
      border-bottom: 1px solid #EAEAEA;
    }
  }
  .content {
    // flex: 1;
    width: 100%;
    // margin-left: 30px;
    display: block;
    //  width: 885px;

    .content-main {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      // margin-left: -10px;
      margin-left: -20px;
      .no-data {
        width: 100%;
        text-align: center;
        p {
          margin-top: 35px;
        }
        // 18888
        .tap {
          width: 142px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          color: #fff;
          background: #ded4c1;
          margin: 0 auto;
          margin-top: 40px;
          transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
        }
        .tap:hover {
          background: #91856f;
        }
      }
      .goods-view {
        // flex-basis: calc(25% - 20px);
        // height: 460px;
        margin: 10px 0;
        // padding: 10px 0;
        border-radius: 5px;
        // padding-left: 10px;
        box-sizing: border-box;
        // display: flex;
        float: left;
        flex-direction: column;
        justify-content: center;
        width: calc(25% - 20px);
        margin-left: 20px;
        .goods-item {
          flex-basis: 25%;
          float: left;
          text-align: center;
          // padding: 10px;
          box-sizing: border-box;
          border: 1px solid #fff;
          // padding-bottom: 20px;
          position: relative;
          height: 470px;
          cursor: pointer;
          transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          .goods-isPresell {
            position: absolute;
            top: 0;
            left: 0;
            background: #91856f;
            padding: 5px 10px;
            font-size: 12px;
            color: #fff;
            z-index: 99;
            border-radius: 0 0 10px 0;
            p:nth-child(1) {
              font-size: 16px;
            }
          }
          .goods-img {
            width: 280px;
            height: 280px;
            margin: 0 auto;
            position: relative;

            img {
              width: 280px;
              height: 280px;
              // border: 1px solid #c8c8c8;
              box-sizing: border-box;
            }
          }
          .goods-layer {
            position: absolute;
            top: 235px;
            left: 0;
            z-index: 99;
            width: 100%;
            background: rgba(62, 54, 41, 0.5);
            height: 40px;
            .layer-text {
              z-index: 99;
              color: #fff;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              line-height: 40px;
              height: 40px;
              font-size: 12px;
              overflow: hidden;
              text-align: left;
              padding-left: 20px;
              box-sizing: border-box;
            }
          }

          .goods-label {
            width: 100%;
            padding-left: 20px;
            margin-top: 20px;
            box-sizing: border-box;
            margin-left: -5px;
            p {
              float: left;
              margin: 0 5px;
              padding: 4px 7px;
              background: #f0f0f0;
              color: #999999;
              border-radius: 15px;
              font-size: 12px;
            }
          }
          .goods-price {
            margin-top: 9px ;
            line-height: 45px;
            color: #f71929;
            font-size: 20px;
            padding-left: 20px;
            box-sizing: border-box;
            text-align: left;
            em{
              font-size: 12px;
            }
            // span {
            //   font-size: 14px;
            //   color: #bdbdbd;
            //   margin-left: 5px;
            //   text-decoration: line-through;
            // }
          }
          .goods-sale{
            height: 17px;
            text-align: left;
            .vipbox{
              background:url(../../assets/img/huiy.png) no-repeat;
                width: 50px;
                height: 18px;
                text-align: center;
                line-height: 18px;
                color: #FFF;
                font-size:12px;
                font-family:Adobe Heiti Std;
                font-weight:normal;
                margin: 0px 0 0 20px;
                padding-left: 12px;
                display: inline-block;
            }
          }
          .goods-daishou {
            color: #856020;

            font-size: 14px;
            span {
              color: #999999;
            }
            margin-bottom: 14px;
          }
          .goods-name {
            height: 46px;
            overflow: hidden;
            padding: 0 20px;
            box-sizing: border-box;
            width: 100%;
            text-align: left;
            // display: flex;
            // justify-content: center;
            margin-top: 14px;
            font-weight: 400;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 24px;
            .path {
              font-weight: 400;
            
              font-size: 14px;
              display: -webkit-box;
              text-align: left;
            }
          }
          .goods-class {
            margin-top: 16px;
            text-align: left;
            padding: 0 20px;
            box-sizing: border-box;
            .class-col {
              // background: #E51C34;
              display: inline-block;
              color: #fff;
              font-size: 12px;
              padding: 3px 5px;
            }
          }
          // .goods-rate {
          //   box-sizing: border-box;
          //   margin-top: 20px;
          //   position: absolute;
          //   bottom: 20px;
          //   left: 0;
          //   .rate-content{
          //     margin-bottom: 5px;
          //     text-align: left;
          //     padding-left: 20px;
          //     box-sizing: border-box;
          //   }
          //   .rate {
          //     position: relative;
          //     color: #856020;
          //     font-size: 12px;
          //     display: inline-block;
          //     box-sizing: border-box;
          //     text-align: left;
          //     background: rgba(192, 179, 133, .3);
          //     padding: 3px 13px;
          //     border-radius: 15px;
          //     del {
          //       color: #999;
          //     }
          //   }
          //   .rate:nth-child(1) {
          //     margin-right: 2px;
          //   }
          //   .rate:nth-child(2) {
          //     margin-right: 2px;
          //     margin-top: 5px;
          //   }
          // }
          a {
            font-size: 16px;
            color: #000;
          }
        }
        .goods-item:hover {
          // box-shadow: 0px 0px 21px 0px rgba(28, 25, 25, 0.2);
          // -webkit-box-shadow: 0px 0px 21px 0px rgba(28, 25, 25, 0.2);
          border: 1px solid #ecdab8;
        }
      }
    }
  }
  .screen {
    display: flex;
    flex-direction: row;
    background: #fff;
    padding-right: 32px;
    box-sizing: border-box;
    align-content: center;
    // line-height: 50px;
    height: 50px;
    // justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;

    .screen-col {
      display: flex;
      float: left;
      // flex-basis: 110px;
      // width: 110px;
      padding-right: 10px;
      cursor: pointer;
      justify-content: center;
      text-align: center;
      align-content: center;
      transition: all 0.3s;
      .iecol {
        // width: 110px;
        height: 50px;
        padding: 0 0 0 13px;
        // margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;
        .text {
          float: left;
        }
        .enn {
          float: left;
        }
      }
      .text {
        float: left;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 12px;
        color: #999999;
      }
      .een {
        display: flex;
        float: left;
        // position: absolute;right: 10px;
        top: 0;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        height: 50px;
        // padding-top: 7px;
        // padding-top: 5px;
        width: 12px;
        margin-left: 5px;
        box-sizing: border-box;

        .icon {
          width: 12px;
          vertical-align: middle;
          line-height: 0;
          // margin: 2px 0;
        }
      }
    }
    .screen-col:hover {
      background: #f1f1f1;
    }

    .screen-col.active .text {
      color: #91856f;
    }
  }
}
</style>
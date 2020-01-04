<template>
  <div class="templateNews">
    <img src="@/assets/img/laba.png" alt />
    <div class="content">{{notice}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notice:""
    };
  },
  mounted(){
    
      this.$get('announcement/list.do',{
       params:{
          pageNum:1,
          pageSize:1,
       }
      }).then(({data})=>{
        // console.log(data)
        if(data.code=='0000'){
          this.notice = data.pageList.data.length ? data.pageList.data[0].name : ''
        }
      })
      this.lampMsg();
  },
  methods:{
    lampMsg() {
      var _this = this
      // if (_this.notice.length <= 20) {
      //   return false
      // }
      _this.interval = setInterval(function() {
        //获取第一个字符
        // console.log(_this.msg)
        var start = _this.notice.substring(0, 1)
        //得到后面的字符
        var end = _this.notice.substring(1)
        //重新赋值
        _this.notice = end + start
      }, 300)
    },
  }
};
</script>
<style lang="less" scoped>
.templateNews {
  margin-left: 40px;
  img {
    // float: left;
    width: auto;
    height: auto;
    vertical-align: middle;
    // margin-top: -10px;
    float: left;
  }
  .content {
    float: left;
    width: 332px;
    overflow: hidden;
    line-height: normal;
    color: #8E8067;
    margin-left: 5px;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 16px;
    cursor: pointer;
    text-overflow: ellipsis;
  }
}
</style>



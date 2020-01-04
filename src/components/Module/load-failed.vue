<template>
  <div class="w-1200">
    <div class="user-shadow loadfailed">
      <img src="@/assets/img/no_page.png" alt="">
      <div class="loadfailed_content">
        <p>系统正在升级维护中，请稍后再试 ...
        </p>
        <span>如有疑问请联系客服400-007-0755</span>
        <router-link :to="'/home'">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  // mounted() {},
  methods: {}
}
</script>
<style lang="less">
.loadfailed {
  overflow: hidden;
  img {
    width: 386px;
    height: 287px;
    margin: 70px 8px 70px 205px;
    float: left;
  }
  .loadfailed_content {
    float: left;
    width: 390px;
    margin-top: 129px;
    p {
      color: #91856f;
      font-size: 24px;
      margin-bottom: 23px;
    }
    span {
      color: #999;
      font-size: 16px;
      display: block;
      text-align: center;
    }
    a {
      width: 176px;
      height: 50px;
      border: 1px solid rgba(145, 133, 111, 1);
      color: #91856f;
      display: block;
      margin: 73px auto 0 auto;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
    }
  }
}
</style>
<template>
  <div class="am_payPwd" :id="`ids_${id}`">
    <input
      type="password"
      maxlength="1"
      @input="changeInput"
      @click="changePwd"
      v-model="pwdList[i]"
      @keyup="keyUp($event)"
      @keydown="oldPwdList = pwdList.length"
      class="shortInput"
      v-for="(v, i) in 6"
      :key="i"
    >
  </div>
</template>
<style lang="less">
.am_payPwd {
  width: 252px;
  height: 45px;
  margin-top: 20px;
  border: 1px solid #C6C6C6;
  padding: 8px 5px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  .shortInput {
    text-align: center;
    font-size: 20px;
    // float: left;
    width: 40px;
    height: 27px;
    border:none;
    border-right: 1px solid #D9D9D9;
    color: #333;
    outline: #ff0067;
  }
  .shortInput:last-child{border-right:none;}
}
</style>
<script>
export default {
  data() {
    return {
      pwdList: [],
      oldPwdList: [],
      isDelete: false,
      ipt: ""
    };
  },
  props: {
    id: Number, // 当一个页面有多个密码输入框时，用id来区分
    default: "1"
  },
  mounted() {
      //console.log(this.id)
    this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`);
  },
  methods: {
    keyUp(ev) {
      let index = this.pwdList.length;
      if (!index) return;
      if (ev.keyCode === 8) {
        this.isDelete = true;
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop();
          }
          index--;
        } else {
          index > 0 && index--;
        }
        this.ipt[index].focus();
      } else if (
        this.isDelete &&
        index === this.pwdList.length &&
        /^\d$/.test(ev.key)
      ) {
        this.isDelete = false;
        this.pwdList.pop();
        this.pwdList.push(ev.key);
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus();
      }
      this.$emit("getPwd", this.pwdList.join(""));
    },
    changePwd() {//没有输入禁止点击
      let index = this.pwdList.length;
      index === 6 && index--;
      this.ipt[index].focus();
    },
    changeInput() {
      let index = this.pwdList.length;
      let val = this.pwdList[index - 1];
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop();
        return;
      }
      if (!val) {
        this.pwdList.pop();
        index--;
        if (index > 0) this.ipt[index - 1].focus();
      } else {
        if (index < 6) this.ipt[index].focus();
        
      }
      if(index===6){
        let passwd = this.pwdList.join('');//密码
        this.$emit('submitPasswd',passwd)
      }
    }
  }
};
</script>

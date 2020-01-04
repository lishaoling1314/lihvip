<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container clearfloat">
          <div class="modal-header">
            <slot name="header">
            </slot>
            <img src="../../assets/img/clostbtn.png" alt="" class="closebtn" @click="$emit('closemodalbtn')">
          </div>
          <div class="modal-body">
            <slot name="body">
            </slot> 
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 596px;
  margin: 0px auto;
  overflow-y: srcoll;
  background:rgba(255,255,255,1);
  padding:0 32px;
  box-shadow:6px 6px 20px rgba(212,216,220,0.2);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  ::-webkit-scrollbar {
    width: 12px; 
    height: 10px;
    background:rgba(255,255,255,1);
    cursor: pointer
  }
  ::-webkit-scrollbar-track {
    background:rgba(255,255,255,1);
  } 
  ::-webkit-scrollbar-thumb {
    border-radius: 10px; 
    background-color: #eee;
  }
}

.modal-header {
  width:100%;
  height:35px;
  font-size:18px;
  font-weight:400;
  color:rgba(51,51,51,1);
  text-align:left;
  padding-top: 21px;
  position:relative;
  border-bottom: 1px solid rgba(234,234,234,1);
  .closebtn {
    position:absolute;
    right:0px;
    top:25px;
    width: 15px;
    height: 15px;
    cursor:pointer;
  }
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
//   margin: 20px 0;
}
.controlfooter {
  height:84px;
  border-top:1px solid #e5e5e5;
  margin-top:33px;
  padding-top:25px
}
.modal-footer {
  height:80px;
  border-top:1px solid #e5e5e5;
  padding-top:22px;
  .spanbtn {
    width:124px;
    height:36px;
    cursor:pointer;
    text-align:center;
  }
  .cancelbtn {
    margin-left:167px;
    color:rgba(48,48,48,1);
    p{
      display: inline-block;
      width: 124px;
      height: 36px;
    }
  }
  .surebtn {
      margin-left:67px;
      color:rgba(255,255,255,1);
      background:rgba(48,48,48,1);
  }
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.clearfloat::after {
  content: '';
  display: block;
  clear: both;
}
</style>

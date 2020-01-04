<template>
  <div class="demo">
      
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data(){
    return {
    }
  },
  mounted(){
    const M = new Map([
      [
        {A:'111'},
        {B:'222'},
        {C:'333'}
      ]
    ])
      console.log(M.get(0))
    // let map = (val)=>{
    //   return M.get(val)
    // }
  },
  methods:{
    getList(){
      
    }
  }
}
</script>


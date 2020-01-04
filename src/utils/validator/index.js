import Vue from 'vue'
import VeeValidate from 'vee-validate'
import './validator-local'
import './validator'
const config = {
    errorBagName: 'errorBag',
    fieldsBagName: 'fieldBag'
}
Vue.use(VeeValidate,config)
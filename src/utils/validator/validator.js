import { Validator } from 'vee-validate'
// 护照验证
Validator.extend('isPassport', {
	getMessage: (field, args, data) => {
		return (data && data.message) || '护照格式不正确'
	},
	validate: (value, data) => {
		var re1 = /^[a-zA-Z]{5,17}$/
		var re2 = /^[a-zA-Z0-9]{5,17}$/
		return (re2.test(value)) || re1.test(value)
	}
})
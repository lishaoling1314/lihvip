'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST: 'http://192.168.1.106:8082',//后端接口地址
API_HOST: '"http://192.168.1.88:8082"' // 开发环境接口地址(这里是增加的内容)
//API_HOST: '"http://pcapi.test.lihvip.com"' // 开发环境接口地址(这里是增加的内容)
  // API_HOST: '"http://pcapi.test.lihvip.com"' // 开发环境接口地址(这里是增加的内容)
})

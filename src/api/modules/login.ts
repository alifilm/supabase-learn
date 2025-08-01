import request from '../request'

export default {
  getOpenId: function(code) {
    return request.post('/functions/v1/get-wechat-openid', { code })
  },

  createUser: function(data) {
    return request.post('/functions/v1/login-by-openid', data)
  }
}
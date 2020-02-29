const util = require('util')
const axios = require('axios')
const User = require('../models/user')
const {
  generateToken
} = require('../utils/token-util')
const {
  Auth
} = require('../../middlewares/auth')

class WXManager {
  constructor() {

  }
  static async codeToToken(code) {
    // 普通：账号 password
    //小程序登录：code，小程序生成code发回来，调用微信接口校验code是否合法，合法就返回openid回来
    // openid: 唯一标识，鉴定
    // 不需要显示注册

    //调用微信接口： 
    //code，
    //appId， appSecret（开通开发者就有）
    //url: GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    let retryCount = 0
    while (retryCount < 5) {
      const url = util.format(
        global.config.wx.loginUrl,
        global.config.wx.appId,
        global.config.wx.appSecret,
        code)
      const result = await axios.get(url)
      // openid	string	用户唯一标识
      // session_key	string	会话密钥（unionid加密在这里）
      // unionid	string	（跨多程序应该）用户在开放平台的唯一标识符。就是在微信，qq等腾讯开发者应该上，unionid是一样的，但是openid不同
      // errcode	number	错误码
      // errmsg	string	错误信息
      if (result.status !== 200) {
        throw new global.errs.AuthorizeException('openid获取失败')
      }
      // -1	系统繁忙，此时请开发者稍候再试
      // 0	请求成功
      // 40029	code 无效
      // 45011	频率限制，每个用户每分钟100次
      console.log('====output===wechat=result>>>>', JSON.stringify(result.data));

      const errorcode = result.data.errcode
      if (!errorcode || errorcode === 0) {
        // openid防止泄露，同一个用户，openid不会变，但是系统的token会过期，所以openid需要存入db，防止重复获取
        const openid = result.data.openid
        let user = await User.getUserByOpenid(openid)
        if (!user) {
          user = await User.registerByOpenid(openid)
        }
        return generateToken(user.id, Auth.USER)
      } else if (errorcode === -1) {
        retryCount++
      } else if (errorcode === 45011) {
        throw new global.errs.AuthorizeException('登录次数频繁，请稍后再试')
      } else {
        throw new global.errs.AuthorizeException('无效的code')
      }
    }
  }
}
module.exports = {
  WXManager
}
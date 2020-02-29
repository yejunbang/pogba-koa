const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')


class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  get m() {
    return async (ctx, next) => {
      // 校验token
      // Http 规定 身份验证机制：HttpBasicAuth，会把token放在name或password里，用md5加密发过来
      const userToken = basicAuth(ctx.req) // 解密，获取的是node.js的request，如果是ctx.request，获取的是koa封装的request
      if (!userToken || !userToken.name) {
        throw new global.errs.AuthorizeException()
      }
      let decode
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          throw new global.errs.AuthorizeException("令牌已过期")
        }
        throw new global.errs.AuthorizeException("令牌不合法")
      }
      if (decode.scope < this.level) {
        throw new global.errs.AuthorizeException()
      }
      ctx.auth = {
        uid: decode.uid,
        // user: user  拿到user uid，可以查询出实体存进redis
        scope: decode.scope
      }
      await next()
    }
  }
  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}


module.exports = {
  Auth
}
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})
const User = require('../../../models/user')
const {
  LoginType
} = require('../../../enum/user')
const validator = require('validator')
const {
  generateToken
} = require('../../../utils/token-util')
const {
  Auth
} = require('../../../../middlewares/auth')
const {
  WXManager
} = require('../../../services/wx')

//普通用户需要账号密码，小程序微信已经认证了，不需要密码
router.post("/", async (ctx, next) => {
  await ctx.validate({
    account: 'required|maxLength:255',
    secret: 'user-token',
    type: 'required|user-type'
  });
  const body = ctx.request.body
  let token;
  switch (body.type) {
    case LoginType.USER_EMAIL:
      token = await loginByEmail(body.account, body.secret)
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(body.account)
      break;
    case LoginType.ADMIN_EMAIL:

      break;
    default:
      throw new global.errs.ParameterException("请输入登录类型")
  }
  ctx.body = {
    token
  }
  // ctx.success({})
});

async function loginByEmail(account, secret) {
  if (!validator.isEmail(account)) throw new global.errs.ParameterException("请输入正确的邮箱地址")
  const user = await User.loginByEmail(account, secret)
  return generateToken(user.id, Auth.USER)
}

router.post('/verify', async (ctx, next) => {
  await ctx.validate({
    token: 'required'
  })
  const body = ctx.request.body

  const result = Auth.verifyToken(body.token)
  ctx.body = {
    result
  }
})

module.exports = router
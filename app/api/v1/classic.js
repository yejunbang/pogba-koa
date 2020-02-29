const Router = require('koa-router')
const ResolvedException = require('../../../core/exception/resolved_exception')
const router = new Router()
const {
  Auth
} = require('../../../middlewares/auth')

router.get("/v1/classic/latest", (ctx, next) => {
  throw new global.errs.ServerException('出错啦', 100202)
  ctx.body = {
    key: "classic"
  };
});

// 传参
router.post("/v1/classic/latest", new Auth().m, (ctx, next) => {
  const pathParam = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  console.log('====output===ctx.auth=>>>>', JSON.stringify(ctx.auth));
  ctx.body = ctx.auth.uid
});

module.exports = router
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const User = require('../../../models/user')
// 第一种
// const v = await ctx.validator(ctx.request.body, {
//   name: 'required|maxLength:50',
//   username: 'required|maxLength:15',
//   email: 'required|email',
//   password: 'required'
// });
// // in case validation fails
// if (v.fails()) {
//   ctx.status = 422;
//   ctx.body = v.errors;
//   return;
// }
// 第二种
// await ctx.validate({
//   name: 'required|maxLength:50',
//   username: 'required|maxLength:15',
//   email: 'required|email',
//   password: 'required'
// }, ctx.request.body);
router.post("/register", async (ctx, next) => {
  const body = ctx.request.body
  const v = await ctx.validate({
    name: 'required|maxLength:255|register-existed:name',
    email: 'required|email|register-existed:email',
    password: 'required|user-password',
    openid: 'required|register-existed:openid'
  });
  const user = {
    name: body.name,
    email: body.email,
    password: body.password,
    openid: body.openid
  }
  console.log('====output====>>>>', JSON.stringify(user));
  User.create(user)
  ctx.success({})
});

module.exports = router
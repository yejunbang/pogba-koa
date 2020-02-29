class Response {
  constructor(code, msg, data) {
    this.code = code
    this.msg = msg
    this.data
  }
}

function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function ({
      code,
      msg,
      data
    }) {
      ctx.type = option.type || 'json'
      ctx.body = new Response(option.successCode || code || 200, option.successMsg || msg || 'success', data)
      // ctx.body = {
      //   code: option.successCode || 200,
      //   msg: option.successMsg || 'success',
      //   data: data
      // }
    }

    ctx.fail = function (msg, code) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 99,
        msg: msg || option.successMsg || 'fail',
      }
    }
    await next()
  }
}

module.exports = routerResponse
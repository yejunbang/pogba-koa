const ResolvedException = require('../core/exception/resolved_exception')


const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // if (global.config.env === 'dev') {
    //   throw error
    // }
    if (error instanceof ResolvedException) {
      error.printStackTrace();
      error.toJsonString(ctx)
    } else {
      console.error('[class=System Error][SYS ERROR]', error)
      ctx.body = {
        code: 100001,
        msg: 'System Error',
        m: ctx.method,
        url: ctx.path
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
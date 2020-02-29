// 401: 身份验证失败
// 403: 没有权限访问
// 100001: 全局的默认系统异常
// 200001: server exception
// 300001: 业务异常
// 400001: 参数异常

class ResolvedException extends Error {
  // tag是打印的log的分类，方便统计
  constructor(msg = '系统内部错误', code = 100001, clazz = 'ResolvedException', tag = 'Resolved', http_code = 400) {
    super();
    this.code = code;
    this.msg = msg;
    this.clazz = clazz
    this.tag = tag
    this.http_code = http_code;
  }
  toJsonString(ctx) {
    ctx.body = {
      code: this.code,
      msg: this.msg,
      m: ctx.method,
      url: ctx.path
    }
    ctx.status = this.http_code
  }
  printStackTrace() {
    console.error(`[class=${this.clazz}][${this.tag}]`, this)
  }
}
module.exports = ResolvedException
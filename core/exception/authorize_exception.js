const ResolvedException = require('./resolved_exception')

class AuthorizeException extends ResolvedException {
  constructor(msg = '身份验证失败', code = 401, tag = 'Authorization', http_code = 401) {
    super(msg, code, 'AuthorizeException', tag, http_code);
  }
}
module.exports = AuthorizeException
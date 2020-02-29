const ResolvedException = require('../resolved_exception')

class BusinessException extends ResolvedException {
  constructor(msg = '系统业务错误', code = 300001, tag = 'Business', http_code = 400) {
    super(msg, code, 'BusinessException', tag, http_code);
  }
}
module.exports = BusinessException
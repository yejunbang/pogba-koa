const ResolvedException = require('./resolved_exception')

class ParameterException extends ResolvedException {
  constructor(msg = '参数校验错误', code = 400001, tag = 'Parameter', http_code = 400) {
    super(msg, code, 'ParameterException', tag, http_code);
  }
}
module.exports = ParameterException
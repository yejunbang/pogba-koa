const ResolvedException = require('./resolved_exception')

class ForbbidenException extends ResolvedException {
  constructor(msg = '权限不足', code = 403, tag = 'Forbbiden', http_code = 403) {
    super(msg, code, 'ForbbidenException', tag, http_code);
  }
}
module.exports = ForbbidenException
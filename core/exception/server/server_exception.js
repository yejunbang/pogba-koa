const ResolvedException = require('../resolved_exception')

class ServerException extends ResolvedException {
  constructor(msg = '系统内部错误', code = 200001, tag = 'Server', http_code = 500) {
    super(msg, code, 'ServerException', tag, http_code);
  }
}
module.exports = ServerException
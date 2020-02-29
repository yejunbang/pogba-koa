const jwt = require('jsonwebtoken')

const generateToken = function (uid, scope) {
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  // uid是用户uid
  // scope是权限等级，不同api访问的角色不同，分普通用户，管理员等
  const token = jwt.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn
  })
  return token
}

module.exports = {
  generateToken
}
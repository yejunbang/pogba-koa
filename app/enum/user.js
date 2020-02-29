const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType(value) {
    for (let key in this) {
      if (this[key] === value) {
        return true
      }
    }
    return false
  }
}

module.exports = {
  LoginType
}
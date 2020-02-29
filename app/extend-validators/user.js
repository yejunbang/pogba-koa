const niv = require('node-input-validator')
const User = require('../models/user')
const {
  LoginType
} = require('../enum/user')

niv.extend('register-existed', async ({
  value,
  args
}, validator) => {
  const field = args[0]
  const existed = await User.findOne({
    where: {
      [field]: value
    }
  })
  return !existed
})

niv.extend('user-password', ({
  value,
  args
}, validator) => {
  const password2 = validator.inputs.password2
  if (!password2) throw new global.errs.BusinessException('password2 not null')
  return value === password2
})

niv.extend('user-token', ({
  value,
  args
}, validator) => {
  if (value) {
    if (value.length < 6) throw new global.errs.BusinessException('password length at least 6')
    return true
  }
  return true
})

niv.extend('user-type', ({
  value,
  args
}, validator) => {
  if (!LoginType.isThisType(value)) {
    throw new global.errs.BusinessException('type not match')
  }
  return true
})
const bcrypt = require('bcryptjs')

const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class User extends Model {
  static async loginByEmail(account, secret) {
    const user = await User.findOne({
      where: {
        email: account
      }
    })
    if (!user) throw new global.errs.ParameterException("账号或密码错误")
    const correct = bcrypt.compareSync(secret, user.password)
    if (!correct) throw new global.errs.ParameterException("账号或密码错误")
    return user
  }
  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }
  static async registerByOpenid(openid) {
    const user = await User.create({
      openid
    })
    return user
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10) //数字越大，生成成本越高，越安全
      const password = bcrypt.hashSync(val, salt) // 密码加密，明文的密码相同，但生成的加密密码式不同的
      this.setDataValue('password', password)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  indexes: [{
    unique: true,
    fields: ['openid']
  }],
  // 定义表的名称
  tableName: 'users',
  version: true,
  // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时). 
  // paranoid 只有在启用时间戳时才能工作
  paranoid: true,
  sequelize
})

module.exports = User
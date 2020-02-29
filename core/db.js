const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true, //输出sql
  timezone: '+08:00',
  define: {
    // create_time update_time
    timestamps: true
  }
});

// sequelize.drop()
// 同步所有尚未在数据库中的模型
// sequelize.sync()
// 强制同步所有模型
// sequelize.sync({force: true})

module.exports = {
  sequelize
}
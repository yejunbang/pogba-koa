module.exports = {
  env: 'dev',
  database: {
    dbName: 'micro-land',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: '592f2578f9455414920dc88aed6f39df',
    expiresIn: 4 * 60 * 60 // 过期时间
  },
  wx: {
    appId: 'wx772fa6a87ff7e2f0',
    appSecret: 'd12dc0a197cc49c137e4f47f9b25ec1b',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
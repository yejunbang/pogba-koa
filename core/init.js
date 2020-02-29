const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadResolvedException()
    InitManager.initConfig()
    InitManager.initExtendValidators()
  }
  static initConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
  static initLoadRouters() {
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: function (obj) {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes()); // 自动扫描api下文件，注册router
        }
      }
    })
  }
  static loadResolvedException() {
    // 加载所有异常类
    requireDirectory(module, `${process.cwd()}/core/exception`, {
      visit: function (obj) {
        let item = obj
        if (typeof obj === 'function') {
          item = {
            [obj.name]: obj
          }
        }
        global.errs = Object.assign(global.errs || {}, item)
      }
    })
  }
  static initExtendValidators() {
    requireDirectory(module, `${process.cwd()}/app/extend-validators`, {
      include: function (path) {
        require(path)
        return true;
      }
    })
  }
}
module.exports = InitManager
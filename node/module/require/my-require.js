const path = require('path')
const fs = require('fs')
const vm = require('vm')
class Module {
  constructor(id) {
    // 记录路径，要导出的内容
    this.id = id
    this.exports = Object.create(null)
  }
  load() {
    const extName = path.extname(this.id)
    // 模块化动态处理
    Module._extensions[extName](this)
  }
}
Module.warp = function (script) {
  let arr = [
    '(function (exports, require, module, __filename, __dirname) { console.log(this.prototype);',
    script,
    '\nconsole.log(module);})'
  ]
  return arr.join('')
}
// 策略模式，不同文件走不同返回方式
Module._extensions = {
  '.js': function (module) {
    const content = fs.readFileSync(module.id, 'utf-8')
    // 处理js文件，通过一个自运行函数
    const fnStr = Module.warp(content)
    // 把自运行函数变成一个函数
    const fn = vm.runInThisContext(fnStr)
    const exports = module.exports
    const require = myRequire
    const __filename = module.id
    const __dirname = path.dirname(module.id)
    // 这里特意指向exports，方便两种写法，
    // module.exprots / exports 直接导出 / 或者  this.a
    fn.call(exports, exports, require, module, __filename, __dirname)
  },
  '.json': function (module) {
    const content = fs.readFileSync(module.id, 'utf-8')
    module.exports = JSON.parse(content)
  }
}
// 获取文件路径
Module._getFilePath = (filepath) => {
  // 补全路径同时判断 文件是否存在
  const getPath = path.resolve(__dirname, filepath)
  const isExit = fs.existsSync(getPath)
  if (isExit) return getPath
  const keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    if (fs.existsSync(getPath + keys[i])) {
      return getPath + keys[i]
    }
  }
}
Module.cache = {}
Module._load = function (path) {
  const filePath = Module._getFilePath(path)
  // 缓存文件信息
  const cacheModule = Module.cache[filePath]
  if (cacheModule) {
    return cacheModule.exports
  }
  const module = new Module(filePath)
  Module.cache[filePath] = module
  module.load()
  return module.exports
}
function myRequire(path) {
  return Module._load(path)
}
const _test = myRequire('./name')
console.log(_test.sum(1, 2))

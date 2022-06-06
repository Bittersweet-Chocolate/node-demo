// 自定义模板引擎
const path = require('path')
const fs = require('fs')
const renderFile = (path, obj, cb) => {
  fs.readFile(path, 'utf-8', (err, html) => {
    // arguments[0] 元字符串， arguments[1] 捕获括号
    // []集合范围，^非该字符串，+匹配1到多次
    html = html.replace(/\{\{([^}]+)\}\}/g, function () {
      let key = arguments[1].trim()
      return obj[key] || ''
    })
    cb(err, html)
  })
}
renderFile(
  path.resolve(__dirname, 'my-template.html'),
  { name: 'test' },
  (err, data) => {
    console.log(data)
  }
)

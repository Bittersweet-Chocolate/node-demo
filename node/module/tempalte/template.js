const path = require('path')
const fs = require('fs')
// const ejs = require('ejs')
// ejs.renderFile(
//   path.resolve(__dirname, 'template.html'),
//   { name: 'test', arr: [1, 2, 3] },
//   (err, data) => {
//     console.log(err)
//     console.log(data)
//   }
// )

// 自生成
function renderFile(path, obj, cb) {
  fs.readFile(path, 'utf-8', (err, html) => {
    // 通过with解析obj，模板赋值
    let head = "let str = ''; \r\n with(obj){ \r\n str+=`"
    html = html.replace(/<%=([^%]+)%>/g, function () {
      return '${' + arguments[1].trim() + '}'
    })
    html = html.replace(/<%([^-%]+)%>/g, function () {
      return '`\r\n' + arguments[1].trim() + '\r\nstr+=`'
    })
    html = html.replace(/<%-([^%]+)%>/g, function () {
      return '${' + arguments[1].trim() + '}'
    })
    let end = '`}\r\n return str'
    // new function的形式，字符串运行
    const fn = new Function('obj', head + html + end)
    cb(err, fn(obj))
  })
}
renderFile(
  path.resolve(__dirname, 'template.html'),
  { name: 'test', arr: [1, 2, 3] },
  (err, data) => {
    console.log(err)
    console.log(data)
  }
)

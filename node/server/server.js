const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, `public/${pathname}`)
  console.log(req.url)
  // 先判断文件是否存在
  fs.stat(filePath, (err, sataObj) => {
    if (err) {
      res.end('Not Found')
    } else {
      fs.createReadStream(filePath).pipe(res)
    }
  })
  // 处理是单线程（代码需要异步，否则会阻塞主进程）
  // fs.readFile(filePath, (err, data) => {
  //   res.end(data)
  // })
  // res.end('123')
})
server.listen(3001)

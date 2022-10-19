/*
 * @Author: czh-mac
 * @Date: 2022-09-07 16:23
 * @LastEditTime: 2022-10-19 16:31
 * @Description: 头部注释
 */
const http = require('http')
const url = require('url')

const server = http.createServer()
server.on('request', (req, res) => {
  // 请求方法
  // 请求的方法
  // console.dir(req.method)
  // true 把query解析成对象
  let { query, pathname } = url.parse(req.url, true)
  // console.log(query, pathname)
  // 可写流  end = write+close
  // 必须有请求体，内部才会解析触发data事件
  var arr = []
  req.on('data', function (chunk) {
    console.log(chunk.toString())
    arr.push(chunk)
  })
  req.on('end', function () {
    let str = Buffer.concat(arr).toString()
    console.log(str)
  })
  res.statusCode = '222'
  res.statusMessage = 'my konw'
  res.setHeader('a', 1)
  res.setHeader('Content-type', 'text/html;charset=utf8')
  res.end('world')
})

const port = 3000
server.listen(port, () => {
  console.log('satrt', port)
})
server.on('error', (err) => {
  if (err.errno === 'EADDRINUSE') {
    server.listen(port++)
  }
})

const http = require('http')
const url = require('url')
const querystring = require('querystring')

let server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  // 配置跨域
  res.setHeader('Access-Control-Allow-Origin', '*') // 允许任何网站访问
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Anthorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT')
  // options 预检请求 默认浏览器会在请求发送过去10s左右，再次发送
  // 自定义OPTIONS存活时间 30s，一般是30分钟
  res.setHeader('Access-Control-Max-Age', '30')
  // 增加了自定义头，会把post变成options请求
  // 遇到options请求直接成功
  if (req.method === 'OPTIONS') {
    console.log('请求经过', req.method)
    res.statusCode = 200
    res.end('ok') //内部会自己判断是否增加了跨域
  }

  let arr = []
  req.on('data', function (chunk) {
    arr.push(chunk)
  })
  req.on('end', function () {
    const value = Buffer.concat(arr).toString()
    console.log(value)
    if (pathname === '/login') {
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let obj = querystring.parse(value, '&', '=')
        console.log(obj)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(obj))
      }
      return
    }
    if (pathname === '/reg' && req.method === 'POST') {
      // 进来两次是因为OPTIONS复杂请求也来一次
      console.log('进来了')
      if (req.headers['content-type'] === 'application/json') {
        const obj = JSON.parse(value)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(obj))
      }
    }
  })
})

server.listen(3000)

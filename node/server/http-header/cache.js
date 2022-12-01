/*
 * @Author: czh-mac
 * @Date: 2022-11-30 10:40
 * @LastEditTime: 2022-12-01 09:34
 * @Description: 缓存相关
 */
// 配置强制缓存和协商缓存
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

http
  .createServer((res, req) => {
    const { pathname } = url.parse(res.url)
    const filePath = path.join(__dirname, pathname)
    fs.stat(filePath, (err, sataObj) => {
      if (err) {
        req.end('Not Found')
      } else {
        fs.createReadStream(filePath).pipe(req)
      }
    })
  })
  .listen(3000)

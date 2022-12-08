/*
 * @Author: czh-mac
 * @Date: 2022-11-30 10:40
 * @LastEditTime: 2022-12-06 09:27
 * @Description: 缓存相关
 */
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const filePath = path.join(__dirname, `../${pathname}`)
    console.log(filePath)
    // 对比缓存
    fs.stat(filePath, (err, statObj) => {
      let lastModified = statObj.ctime.toGMTString()
      res.setHeader('Last-Modified', lastModified)
      if (err) {
        res.end('Not Found')
      } else {
        if (statObj.isFile()) {
          fs.createReadStream(filePath).pipe(res)
        } else {
          res.end('Not Found')
        }
      }
    })
  })
  .listen(3000)

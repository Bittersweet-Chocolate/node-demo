/*
 * @Author: czh-mac
 * @Date: 2022-11-30 10:40
 * @LastEditTime: 2022-12-09 17:18
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
    let ifModifiedSince = req.headers['if-modified-since']
    // 对比缓存
    fs.stat(filePath, (err, statObj) => {
      if (err) {
        res.statusCode = 404
        res.end('Not Found')
      } else {
        // 查看文件时间
        let lastModified = statObj.ctime.toGMTString()
        if (ifModifiedSince === lastModified) {
          res.statusCode = 304
          return res.end()
        }
        res.setHeader('Last-Modified', lastModified)
        if (statObj.isFile()) {
          fs.createReadStream(filePath).pipe(res)
        } else {
          res.end('Not Found')
        }
      }
    })
  })
  .listen(3000)

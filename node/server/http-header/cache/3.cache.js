/*
 * @Author: czh-mac
 * @Date: 2023-01-31 14:47
 * @LastEditTime: 2023-02-01 15:18
 * @Description: 对比缓存-Etag
 */
//  根据文件内容进行对比，生成指定标识判断
// 客服端 etag + 客户端返回 if-none-match 比较精准，但是文件过大会有问题
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const crypto = require('crypto')
http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const filePath = path.join(__dirname, `../${pathname}`)
    const reqHash = req.headers['if-none-match']
    fs.stat(filePath, (err, statObj) => {
      if (err) {
        res.statusCode = 404
        res.end('Not Found')
      } else {
        let contentHash = crypto
          .createHash('md5')
          .update(fs.readFileSync(filePath))
          .digest('base64')
        if (contentHash === reqHash) {
          res.statusCode = 304
          return res.end()
        }
        res.setHeader('Etag', contentHash)
        if (statObj.isFile()) {
          fs.createReadStream(filePath).pipe(res)
        } else {
          res.end('Not Found')
        }
      }
    })
  })
  .listen(3000)

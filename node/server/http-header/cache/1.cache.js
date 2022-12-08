/*
 * @Author: czh-mac
 * @Date: 2022-11-30 10:40
 * @LastEditTime: 2022-12-02 16:34
 * @Description: 缓存相关
 */
// 配置强制缓存和协商缓存
// 强制缓存永远是 200
// 协商缓存是 304
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    console.log(pathname)
    const filePath = path.join(__dirname, pathname)
    // expires 绝对时间 老版本浏览器支持
    // cache-control 相对时间
    // 默认强制缓存， 不缓存首页（如果已经断网，那这个页面应该访问不到，所以页面不会被强制缓存）
    res.setHeader('Cache-Control', 'max-age=100') // 缓存的是秒
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString())
    // res.setHeader('Cache-Control', 'no-cache') // 不是不缓存，而是会放到缓存中，但是每次都会发起请求
    // res.setHeader('Cache-Control', 'no-store') // 真正的不缓存
    fs.stat(filePath, (err, statObj) => {
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

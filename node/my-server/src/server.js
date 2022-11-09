const http = require('http')
const fs = require('fs').promises
const { createReadStream, createWirteStream, readFileSync } = require('fs')
const url = require('url')
const path = require('path')
const zlib = require('zlib')
const ejs = require('ejs')
// echo $DEBUG
// DEBUG=server node www.js
// unset DEBUG
const debug = require('debug')('server')
const mime = require('mime')
const chalk = require('chalk')

const template = readFileSync(path.resolve(__dirname, 'template.ejs'), 'utf-8')
class Server {
  constructor(config) {
    this.port = config.port
    this.dir = config.dir
    this.host = config.host
    this.template = template
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url)
    // 解码一下带中文的文件处理。
    pathname = decodeURIComponent(pathname)
    const filePath = path.join(this.dir, pathname)
    console.log(filePath)
    try {
      let statObj = await fs.stat(filePath)
      if (statObj.isFile()) {
        this.sendFile(req, res, filePath, statObj)
      } else {
        // const concatPath = path.join(filePath, 'index.html')
        const concatPath = path.join(filePath)
        let statObj = await fs.stat(concatPath)
        statObj.isFile()
          ? this.sendFile(req, res, concatPath, statObj)
          : this.showList(req, res, filePath, statObj, pathname)
      }
    } catch (e) {
      this.sendError(req, res, e)
    }
  }
  // 读取目录信息
  async showList(req, res, filePath, statObj, pathname) {
    console.log(path.join(pathname, 'pulic'))
    let dirs = await fs.readdir(filePath)
    dirs = dirs.map((item) => ({
      dir: item,
      href: path.join(pathname, item)
    }))
    // 渲染模板
    let templateStr = await ejs.render(this.template, { dirs }, { async: true })
    res.setHeader('Contetn-Type', mime.getType('index.html') + ';charset=uft-8')
    res.end(templateStr)
  }
  gzip() {
    return zlib.createGzip()
  }
  sendFile(req, res, filePath, statObj) {
    // 服务端文件=》压缩 =》 客户端
    // 需要根据header 看浏览器是否支持压缩
    let gzip = this.gzip(req, res, filePath, statObj)
    if (gzip) {
      createReadStream(filePath).pipe(gzip).pipe(res)
      return
    }
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=uft-8')
    createReadStream(filePath).pipe(res)
  }
  sendError(req, res, e) {
    debug(e)
    res.statusCode = 404
    res.end('Not Found')
  }
  start() {
    // 改变this指向为当前实例
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, this.host, () => {
      console.log(
        chalk.yellow(`Starting up http-sever, serving on ${this.dir}`)
      )
      console.log(chalk.green(`${this.host}:${this.port}`))
    })
  }
}

module.exports = Server

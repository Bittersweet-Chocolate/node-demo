/*
 * @Author: czh-mac
 * @Date: 2022-07-07 17:08
 * @LastEditTime: 2022-08-11 15:39
 * @Description: 手动实现fs的流读取
 */
const EventEmitter = require('events')
const fs = require('fs')
class readStream extends EventEmitter {
  constructor(path, opts = {}) {
    super()
    this.path = path
    this.flags = opts.flags || 'r'
    this.mode = opts.mode || 0o666
    this.autoClose = opts.autoClose
    this.start = opts.start || 0
    this.end = opts.end
    // 读取数量默认是64k 如果文件大于64，则直接采用流的方式读取
    this.highWaterMark = opts.highWaterMark || 64 * 1024
    // 记录偏移量
    this.pos = this.start
    // 默认创建一个可读流，是非流动模式，控制pause
    this.flowing = false
    // 记录打开的fd为读取做操作
    this.fd = null
    // 打开文件
    this.open()
    // 监听用户是否进行了data方法监听，则开始读取文件
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.$emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read() {
    // 读取必须先等文件打开
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    // 限制读取内容多少
    const buffer = Buffer.alloc(this.highWaterMark || 3)
    // 0 1 2 3 4 5 6
    // 从零开始读，读3个，到3开始继续读，直到6然后读1位就够
    // 0 3
    // 3 3
    // 6 1
    // 应该读取几个，根据用户设置的end 进行截取
    // 0 1 2 3 4 highWaterMark = 3 end = 4
    // 0 1 2 ops + = 读取的字节数，对于read来说是从0开始，所以加3刚好下次的偏移量从3数值开始。
    // 下一次就是  4-3+1 = 2  还剩下 3 4 需要存入
    // +1 是因为从0位开始读。写入的时候，会比pos增加的字节数少1
    const howMuchRead = this.end
      ? Math.min(this.end - this.pos + 1, this.highWaterMark)
      : this.highWaterMark
    fs.read(this.fd, buffer, 0, howMuchRead, this.pos, (err, bytesRead) => {
      // bytesRead 即文件读取字节数
      if (bytesRead) {
        this.pos += bytesRead
        this.emit('data', buffer.slice(0, bytesRead))
        this.flowing && this.read()
      } else {
        this.emit('end')
        if (this.autoClose) {
          fs.close(this.fd, () => {
            this.emit('close')
          })
        }
      }
    })
  }
  pause() {
    this.flowing = false
  }
  resume() {
    if (!this.flowing) {
      this.flowing = true
      this.read()
    }
  }
  pipe(dest) {
    // 管道， 优势 不会浪费可用内存，导入的过程无法获取到内存
    this.on('data', (data) => {
      let flag = dest.write(data)
      // 超出写的范围，则暂停
      if (!flag) {
        this.pause()
      }
    })

    dest.on('drain', () => {
      this.resume()
    })
  }
}
module.exports = readStream

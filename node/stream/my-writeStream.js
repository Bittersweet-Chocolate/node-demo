/*
 * @Author: czh-mac
 * @Date: 2022-08-02 15:46
 * @LastEditTime: 2022-08-04 16:41
 * @Description: 实现可写入流
 */

const EventEmitter = require('events')
const fs = require('fs')
const LinkList = require('../linkList/linkList')

class Queue {
  constructor() {
    this.LinkList = new LinkList()
  }
  offer(el) {
    this.LinkList.add(el)
  }
  poll() {
    return this.LinkList.remove(0)
  }
}

class myWriteStream extends EventEmitter {
  constructor(path, opts) {
    super()
    this.path = path
    this.flags = opts.flags || 'w'
    this.mode = opts.mode || 0o666
    this.autoClose = opts.autoClose
    this.start = opts.start || 0
    // 记录打开的fd
    this.fd = null
    this.highWaterMark = opts.highWaterMark || 16 * 1024
    // 当前缓存的写入个数
    this.len = 0
    this.writing = false // 当前写入数据时候， 是否正在写入
    this.needDrain = false // 是否需要 drain
    this.offset = this.start // 写入偏移量
    this.cache = new Queue() // 用来缓存 多次写入的操作（除了第一次）
    this.open() // 默认先打开的问题件
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.$emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  write(chunk, encoding = 'utf8', cb = () => {}) {
    // 用户的接入操作
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length
    console.log('len----', this.len)
    // 判断是否触发drain
    let flag = this.len < this.highWaterMark
    this.needDrain = !flag
    // 是否写入中，塞入缓存或者真正写入
    if (this.writing) {
      this.cache.offer({
        chunk,
        encoding,
        cb
      })
    } else {
      this.writing = true
      this._wirte(chunk, encoding, () => {
        cb()
        this.cleanBuffer()
      })
    }
    return flag
  }
  _wirte(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._wirte(chunk, encoding, cb))
    }
    // 用户的数据写入文件中
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.len -= written
      this.offset += written
      cb()
    })
  }
  cleanBuffer() {
    let data = this.cache.poll()
    if (data) {
      const { chunk, encoding, cb } = data
      console.log(chunk.toString())
      this._wirte(chunk, encoding, () => {
        cb()
        this.cleanBuffer()
      })
    } else {
      this.writing = false
      if (this.needDrain) {
        this.needDrain = false
        this.emit('darin')
      }
    }
  }
}
module.exports = myWriteStream

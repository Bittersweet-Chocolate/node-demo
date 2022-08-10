/*
 * @Author: czh-mac
 * @Date: 2022-08-02 14:39
 * @LastEditTime: 2022-08-10 16:21
 * @Description: 头部注释
 */
const fs = require('fs')
const path = require('path')
const myWriteStream = require('./my-writeStream')
// 内部也是基于 event 模块。默认清空文件并些人
// let ws = fs.createWriteStream(path.resolve(__dirname, '../file/name.txt'), {
let ws = new myWriteStream(path.resolve(__dirname, '../file/name.txt'), {
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  start: 0,
  highWaterMark: 3 // (预期占用内存)  代指的不是每次写多少，不会影响内容的写入
})

// 写入的类型必须是string or buffer
// 根据highWaterMark设定的预期占用，返回一个boolean
let flag = ws.write('你号', () => {
  console.log('成功1')
})
console.log(flag)
ws.write('好', () => {
  console.log('成功2')
})
// 触发条件：必须达到预期或者超过预期 || 内存中的内容被情况
ws.on('drain', () => {
  console.log('drain')
})
// 最后一次end 也会写入
ws.end('啊!!', () => {
  console.log('成功3')
})

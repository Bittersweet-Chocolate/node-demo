/*
 * @Author: czh-mac
 * @Date: 2022-07-07 15:29
 * @LastEditTime: 2022-07-11 10:28
 * @Description: node自带的stream模块
 */
const fs = require('fs')
// fs.createReadStream
const myStream = require('./my-createStream')
console.log('====', myStream)
let rs = new myStream('../file/age.txt', {
  flags: 'r', // r读取
  encoding: null, // 默认buffer
  mode: 0o666, // 读写权限
  start: 0,
  end: 8,
  autoClose: true, // 关闭 fs.close
  highWaterMark: 3 // 每次读3个
})
// 可读流默认继承了 events 模块，名字必须叫做data，如果监听了data则会一直读取文件
// 常用的监听触发  open data error end close
let bufferArr = []
rs.on('open', (fd) => {
  console.log('open', fd)
})
rs.on('data', (data) => {
  // 让可读流暂停触发data
  // rs.pause()
  // setTimeout(() => {
  //   rs.resume()
  // }, 1000)
  bufferArr.push(data)
})
rs.on('end', () => {
  console.log('end', bufferArr.join('').toString())
})
rs.on('error', (err) => {
  console.log(err)
})
rs.on('close', () => {
  console.log('close')
})

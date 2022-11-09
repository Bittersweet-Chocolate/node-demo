/*
 * @Author: czh-mac
 * @Date: 2022-07-04 19:09
 * @LastEditTime: 2022-11-07 14:59
 * @Description: 流的原理
 */
const fs = require('fs')
const path = require('path')

// 读取默认不指定类型，都是buffer
let rf = fs.readFileSync(path.resolve(__dirname, '../file/name.txt'))
// 默认会将二进制转换成字符串写到文件中
fs.writeFileSync(path.resolve(__dirname, '../file/age.txt'), rf)

// node 是单线程吗？ libuv 内部工作源流是多线程
// 不会阻塞进程
// copyfile 会默认把拷贝的文件“整个”读取一遍。特点不能读取比内存大的文件
// 会占用很多内存
fs.readFile('./name.txt', function (err, data) {
  if (err) {
    return console.error(err)
  }
  fs.writeFile('./age.txt', data, function (err, data) {
    console.log('写入成功')
  })
})

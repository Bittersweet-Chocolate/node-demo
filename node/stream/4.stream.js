// stream 边读边写 （采用 分块读取写入的方式 实现拷贝）
// I/O 操作
// 读取 把内容写入到内存中去
// 写入 把内存的内容读取出来

const fs = require('fs')
// 先读取三个到内存中去
const buffer = Buffer.alloc(3)
// fd 文件描述是一个数字
fs.open('../file/name.txt', 'r', function (err, fd) {
  console.log(fd)
  // buffer的第0个位置开始写入，写入到buffer中几个，文件读取位置多少
  fs.read(fd, buffer, 0, 3, 0, function (err, byteRead) {
    // byteRead 真正的读取个数
    console.log(byteRead, buffer.toString())
    fs.close(fd, () => {})
  })
})

// 写操作
const wBuffer = Buffer.from('测试你好')
// path flag mode callback
// w 表示写入，默认先清空在写入
// a apend 表示追加 原有的基础上增加
// 0o666 默认权限可读写
fs.open('../file/age.txt', 'w', 0o666, function (err, fd) {
  err && console.log(err)
  fs.write(fd, wBuffer, 0, 3, 0, function (err, written) {
    console.log(err)
    console.log('成功')
    fs.close(fd, () => {})
  })
})

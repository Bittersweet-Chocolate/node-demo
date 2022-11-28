const zlib = require('zlib')
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, '../file/age.txt')
const targetPath = path.resolve(__dirname, '2.txt.gz')
// 重复率越高压缩结果越小
// 如果文件大的话 都读取内存中 耗内存
// zlib.gzip(fs.readFileSync(filePath), (err, data) => {
//   console.log(data)
//   fs.writeFileSync(path.resolve(__dirname, '2.txt.gz'), data)
// })

// 转化流 （服务端文件=》压缩 =》 客户端）
fs.createReadStream(filePath)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(targetPath))

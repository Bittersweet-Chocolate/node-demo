const fs = require('fs')
const { nameRead, nameWrite } = require('./getFile')
const ReadStream = require('./my-readStream')
const WriteStream = require('./my-writeStream')
// 官方读取是64k读取，16k写入。读取写入比例4:1

// 可读流.pipe(可写流) 1.一步的 2.可以实现 读一点写一点
// fs.createReadStream(nameRead).pipe(fs.createWriteStream(nameWrite))

let rs = new ReadStream(nameRead, { highWaterMark: 4 })
let ws = new WriteStream(nameWrite, { highWaterMark: 1 })

rs.pipe(ws)

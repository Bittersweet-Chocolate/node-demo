/*
 * @Author: czh-mac
 * @Date: 2022-07-07 11:19
 * @LastEditTime: 2022-08-10 16:31
 * @Description: 手动实现copy
 */
const fs = require('fs')
const path = require('path')

function copy(soucre, target, callback) {
  const SIZE = 3
  const buffer = Buffer.alloc(SIZE)
  let rOffset = 0
  let wOffset = 0
  fs.open(soucre, 'r', (err, rfd) => {
    if (err) return callback(err)
    fs.open(target, 'w', (err, wfd) => {
      if (err) return callback(err)
      function next() {
        fs.read(rfd, buffer, 0, SIZE, rOffset, (err, byteRead) => {
          // console.log(buffer.toString())
          if (err) return callback(err)
          rOffset += byteRead
          fs.write(wfd, buffer, 0, byteRead, wOffset, (err, written) => {
            if (err) return callback(err)
            wOffset += written
            if (byteRead === SIZE) {
              return next()
            }
            fs.close(rfd, () => {})
            fs.close(wfd, () => {})
            callback()
          })
        })
      }
      next()
    })
  })
}

copy(
  path.resolve(__dirname, '../file/age.txt'),
  path.resolve(__dirname, '../file/age_2.txt'),
  () => {
    console.log('succee!')
  }
)

/*
 * @Author: czh-mac
 * @Date: 2022-08-19 10:45
 * @LastEditTime: 2022-08-22 09:28
 * @Description: 文件夹删除实现
 */
const fs = require('fs')
// 删除文件会遇到 串行 并发  异步等情况

// 1.删除文件  fs.unlink   fs.readdirSync (子目录)
console.log(fs.readdirSync('a'))
// 先序 同步删除目录

// 异步串行 删除文件夹
function rmdir(dir, cb) {
  // 检测是文件or目录
  fs.stat(dir, (err, statObj) => {
    if (statObj.isDirectory()) {
    } else {
      fs.unlink(dir, cb)
    }
  })
}

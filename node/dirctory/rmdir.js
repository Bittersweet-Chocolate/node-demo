/*
 * @Author: czh-mac
 * @Date: 2022-08-19 10:45
 * @LastEditTime: 2022-08-24 09:07
 * @Description: 文件夹删除实现
 */
const fs = require('fs')
const path = require('path')
// 删除文件会遇到 串行 并发  异步等情况
// 1.删除文件  fs.unlink   fs.readdirSync (子目录)
// 先序
function rmdirSync(dir, cb) {
  let state = fs.statSync(dir)
  if (state.isDirectory()) {
    let dirs = fs.readdirSync(dir)
    dirs.forEach((d) => rmdirSync(path.join(dir, d)))
    fs.rmdirSync(dir)
  } else {
    fs.unlinkSync(dir)
  }
}
// rmdirSync('a')

// 异步串行  a
//        b c
function rmdir(dir, cb) {
  // 检测是文件or目录
  fs.stat(dir, (err, statObj) => {
    if (statObj.isDirectory()) {
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map((d) => path.join(dir, d))
        // dirs ['a/b','a/c']
        let idx = 0
        function next() {
          if (idx === dirs.length) return fs.rmdir(dir, cb)
          const current = dirs[idx++]
          // 'a/b'
          // 使用了闭包 先删除  a/b
          // 然后next idx++ 删除a/c
          // 在next idx===dirs.length  删除dir a
          rmdir(current, next)
        }
        next()
      })
    } else {
      fs.unlink(dir, cb)
    }
  })
}

function rmdir2(dir, cb) {
  // 检测是文件or目录
  fs.stat(dir, (err, statObj) => {
    if (statObj.isDirectory()) {
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map((d) => path.join(dir, d))
        if (!dirs.length) return fs.rmdir(dir, cb)
        // 并发异步删除
        // 删除结束 删除自己
        function done() {
          if (++i === dirs.length) {
            fs.rmdir(dir, cb)
          }
        }
        for (let i = 0; i < dirs.length; i++) {
          rmdir(dirs[i], done)
        }
      })
    } else {
      fs.unlink(dir, cb)
    }
  })
}
rmdir('a', () => {
  console.log('成功')
})

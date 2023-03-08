/*
 * @Author: czh-mac
 * @Date: 2023-03-07 16:32
 * @LastEditTime: 2023-03-07 16:55
 * @Description: 多个异步请求，获取最终结果
 */
const fs = require('fs')
const path = require('path')

const namePath = path.resolve(__dirname, './file/name.txt')
const agePath = path.resolve(__dirname, './file/age.txt')

let school = {}
const after = function (times, callback) {
  return function () {
    if (--times === 0) {
      callback()
    }
  }
}
const cb = after(2, function () {
  console.log(school)
})
fs.readFile(namePath, 'utf-8', function (err, data) {
  school.name = data
  cb()
  console.log(data)
})

fs.readFile(agePath, 'utf-8', function (err, data) {
  school.age = data
  cb()
  console.log(data)
})

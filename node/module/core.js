const fs = require('fs')
const path = require('path')
// 获取当前目录 process.cwd() 可变  __dirname 不可变
// resolve 一定是绝对路径，当前的绝对路径。
// resolve不能遇到 / 否则会回到目录下
// __dirname 代表当前文件所在的文件夹，不属于global
const resUrl = path.resolve(__dirname, '../file/name.txt') // resolve不能遇到 /
const joinUrl = path.join(__dirname, '../file/name.txt') // 拼接
const extName = path.extname('a/a/b/min.js') //获取文件拓展名
// console.log(resUrl)
// console.log(joinUrl)
// console.log(extName)

// 同步判断
console.log(fs.existsSync(resUrl))
console.log(fs.readFileSync(joinUrl, 'utf8'))

// 虚拟机模块
const a = 100
// 仅在node环境可用，node的顶级作用域不是全局作用域
// 可以使用 new Function创建沙箱环境
let fn = new Function('a', 'b', 'console.log(a)')
console.log(fn(a))
// 虚拟机模块
const vm = require('vm')
vm.runInThisContext(`console.log(a)`)

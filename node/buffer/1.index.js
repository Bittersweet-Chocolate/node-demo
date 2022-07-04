/*
 * @Author: czh-mac
 * @Date: 2022-07-01 10:44
 * @LastEditTime: 2022-07-04 11:10
 * @Description: 进制转换
 */
// 任意进制转换成10进制
console.log(parseInt('377', 8))
// 任意进制转换成任意进制
console.log((0x16).toString(16))

// node文件读取，操作的内容会默认存在内存中，但是内存中默认是二进制
// node会把二进制转换成16进制来展示
const fs = require('fs')
const r = fs.readFileSync('./note.md')
console.log(r)
console.log(r.toString()) // buffer 和 字符串可以相互转换

// base64用于传输数据，减少http请求
// 常见是 3 * 8 规则，
// base64 改成了 4 * 6的方式
// 举例
let buffer = Buffer.from('陈')
console.log(buffer) // e9 99 88
console.log(buffer.toString('base64'))
console.log((0xe9).toString(2)) // 11101001
console.log((0x99).toString(2)) // 10011001
console.log((0x88).toString(2)) // 10001000
// 3 * 8
// 11101001 10011001 10001000
// 4 * 6 每一位永远不会大于64 最高 0b111111
// 111010 011001 100110 001000
// 然后转成10进制
console.log(parseInt('111010', 2)) // 58
console.log(parseInt('011001', 2)) // 25
console.log(parseInt('100110', 2)) // 38
console.log(parseInt('001000', 2)) // 8
// 根据编码规则寻找对应数组位置，就是对应base64转码
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLowerCase()
str += '0123456789'
str += '+/'
console.log(str[58] + str[25] + str[38] + str[8])

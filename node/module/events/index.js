/*
 * @Author: Telescope
 * @Date: 2022-06-07 14:30
 * @LastEditTime: 2022-06-29 15:12
 * @Description: node中自己实现的发布订阅
 */
const eventEmit = require('events')
const event = new eventEmit()

var a = Object.create(event.__proto__)
// es6 设置原型链的方式
// Object.setPrototypeOf(a.prototype, event.__proto__)
// console.log('a-----', Object.getPrototypeOf(a))
a.on('test', (_) => console.log('😭'))
a.on('test', (_) => console.log('😁'))
a.emit('test')

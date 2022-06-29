/*
 * @Author: czh-mac
 * @Date: 2022-06-29 15:13
 * @LastEditTime: 2022-06-29 16:14
 * @Description: 手动实现发布订阅
 */
function EventEmitter() {
  this._events = {}
}

EventEmitter.prototype.on = function (eventName, cb) {
  if (!this._events) this._events = {}
  if (eventName !== 'newListener') {
    this.emit('newListener', eventName)
  }
  this._events[eventName] || (this._events[eventName] = [])
  this._events[eventName].push(cb)
}
EventEmitter.prototype.emit = function (eventName, ...args) {
  if (!this._events || !this._events[eventName]) return
  this._events[eventName].forEach((fn) => fn(...args))
}
EventEmitter.prototype.off = function (eventName, cb) {
  if (!this._events || !this._events[eventName]) return
  this._events[eventName] = this._events[eventName].filter(
    (fn) => fn !== cb && fn.l !== cb
  )
}
EventEmitter.prototype.once = function (eventName, cb) {
  const once = (...args) => {
    cb(...args)
    this.off(eventName, once)
  }
  // once 增加cb的标识，方便手动off
  once.l = cb
  this.on(eventName, once)
}

// protype
// console.log('prototype===', EventEmitter.prototype)
// function a() {}
// Object.setPrototypeOf(a.prototype, EventEmitter.prototype)
// var b = new a()
// var c = new EventEmitter()
// 使用原型链继承不会继承this上的
// console.log(b._events)
// console.log(c._events)

module.exports = EventEmitter

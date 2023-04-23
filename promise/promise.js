/*
 * @Author: czh-mac
 * @Date: 2023-03-08 15:18
 * @LastEditTime: 2023-04-18 10:08
 * @Description: promise 实现
 */

const PENDING = 'PENDING'
const RESLOVED = 'RESLOVED'
const REJECTED = 'REJECTED'
const reslovePromise = (promise2, x, reslove, reject) => {
  // 循环引用，用一个类型错误，结束掉promise
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle for promise'))
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCB = [] // 成功的方法
    this.onRejectedCB = [] // 失败的方法
    let reslove = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = RESLOVED
        this.onResolvedCB.forEach((fn) => fn())
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCB.forEach((fn) => fn())
      }
    }
    // 不能捕获异步的错误
    try {
      executor(reslove, reject) // 立即执行
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((reslove, reject) => {
      if (this.status === RESLOVED) {
        // 通过浏览器task执行的方式，可以拿到promise2
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            reslovePromise(promise2, x, reslove, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            reslovePromise(promise2, x, reslove, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      // promise 内异步执行的情况，状态还是pendding
      // 通过发布订阅的方式存储失败或者错误的方法，等执行resolve 或者 reject在触发
      if (this.status === PENDING) {
        onFulfilled &&
          this.onResolvedCB.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value)
                reslovePromise(promise2, x, reslove, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
        onRejected &&
          this.onRejectedCB.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason)
                reslovePromise(promise2, x, reslove, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
      }
    })
    return promise2
  }
}

module.exports = Promise

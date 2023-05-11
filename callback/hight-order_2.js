/*
 * @Author: czh-mac
 * @Date: 2023-03-07 14:49
 * @LastEditTime: 2023-04-27 14:33
 * @Description: 柯理化函数
 */
function isType(typing) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`
  }
}

let utils = {}

;[('String', 'Number')].forEach((item) => {
  utils[`is${item}`] = isType(item)
})

// console.log(utils.isString('123'))

// 柯理化的方式，内置参数

function showType(type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

// currying(sum)(1,2)(3,4)
// function sum(a,b,c,d)
const currying = (fn, arr = []) => {
  let len = fn.length
  return function (...args) {
    let concatVal = [...arr, ...args]
    if (arr.length < len) {
      return currying(fn, concatVal) // 递归不停的产生函数
    } else {
      return fn(...arr)
    }
  }
}

let isArray = currying(showType)('Array')
console.log(isArray())

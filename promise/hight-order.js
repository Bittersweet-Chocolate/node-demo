// 高阶函数
function isType(typing) {
  return function(val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`
  }
}

let utils = {};

["String", "Number"].forEach(item => {
  utils[`is${item}`] = isType(item)
})

console.log(utils.isString("123"))

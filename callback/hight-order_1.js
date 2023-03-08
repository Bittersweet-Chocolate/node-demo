/*
 * @Author: czh-mac
 * @Date: 2022-05-12 16:57
 * @LastEditTime: 2023-03-07 14:49
 * @Description: 高阶函数
 */
// 装饰器模式
function core(a, b, c) {
  console.log(a, b, c)
}

Function.prototype.before = function (beforeFun) {
  return (...args) => {
    beforeFun()
    this(...args)
  }
}

const newFun = core.before(() => {
  console.log('before')
})

newFun(1, 2, 3)

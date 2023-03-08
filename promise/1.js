const Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  // resolve('yes')

  // 处理异步相关的时候需要 通过发布订阅
  // setTimeout(() => {
  resolve('yes')
  // }, 1000)
})

// promise 成功或者失败的回调返回值，会传递到下一个then
// 如果返回的是普通值（则直接传递到下一次成功），出错的情况，promise的情况
// 错误处理，如果离自己最近的then，没有错误处理，会向下找
// promise.then 返回后都是一个新的promise
p.then(
  (res) => {
    console.log(1, res)
    return res // 普通值
    // return new Promise((res, rej) => {
    //   res('yes2')
    // })
  },
  (err) => {
    return 200
    // throw err
  }
).then((res) => {
  console.log(2, res)
})

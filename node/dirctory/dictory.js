// var fs = require('fs').promises
// 使用promises 既返回的是promise类型
var fs = require('fs')

// 同步性能更好
function mkdirP(path, cb) {
  const arr = path.split('/')
  let currrentPath = ''
  arr.forEach((item) => {
    currrentPath += `${item}/`
    if (!fs.existsSync(currrentPath)) {
      fs.mkdirSync(currrentPath)
    }
  })
  cb()
}

// 异步行为不会阻塞进程
// function mkdirP(path, cb) {
//   const arr = path.split('/')
//   let index = 0
//   function next() {
//     if (index === arr.length) return cb()
//     let currrentPath = arr.slice(0, ++index).join('/')
//     fs.access(currrentPath, (err) => {
//       if (err) {
//         fs.mkdir(currrentPath, next)
//       } else {
//         next()
//       }
//     })
//   }
//   next()
// }

mkdirP('a/b/c/d/e', () => {
  console.log('创建完成')
})

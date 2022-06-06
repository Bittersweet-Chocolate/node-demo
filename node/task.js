// 常见宏任务 script / requestFrameAnimation / setTimeOut / setInterval
// setImmediate / ajax / messageChannal
// 微任务 promise / mutationObserver / nextTick

// node 宏任务，微任务
// 先执行timer相关，执行pending-cb，idel/prepare，poll
setTimeout(() => {
  console.log('timeOut')
}, 0)
setImmediate(() => {
  console.log('Immediate')
})
// 先 poll，immediate，timeout
const fs = require('fs')
fs.readFile('./commander.js', () => {
  setTimeout(() => {
    console.log('timeOut')
  }, 0)
  setImmediate(() => {
    console.log('Immediate')
  })
})

setTimeout(() => {
  console.log(1)
  Promise.resolve().then(() => console.log('promise'))
  // nextTick 不属于时间环的一部分，在本轮代码执行后执行，
  // 也是个微任务 比 promise要快
  process.nextTick(() => console.log('nextTick'))
})

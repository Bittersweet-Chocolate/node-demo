const EventEmitter = require('./my-events')

var event = new EventEmitter()

// 自带的默认方法，监听每次on响应的名称
// 执行在push方法进入数组之前
event.on('newListener', (type) => {
  if (type === 'test') {
    console.log('type', type)
    event.emit('test')
  }
})

var one = (name) => console.log(1, name)
var two = (name) => console.log(2, name)
var three = (name) => console.log(3, name)
event.on('test', one)
event.on('test', two)
event.once('name', three)
// event.emit('test', 'czh')
// event.off('name', three)
event.emit('name', 'zzz')
// event.off('test', one)
// event.emit('test', 'yyx')

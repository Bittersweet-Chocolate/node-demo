// require，对于js文件解析，默认传入this 指向 exports
// 由于 exports 和 module.exports 都是引用类型，所以可以使用
// this/exports 来返回数据
// 但是最终返回的是 module.exports
this.a = 1
exports.b = 2
module.exports.c = 'hello'
// 这里改变了 module.exports的指向，所以返回的是hello字符串
module.exports = 'hello'

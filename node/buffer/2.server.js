// 服务端操作二进制 Buffer 可以和字符串进行相互转化
// buffer的三种声明方式
const buffer = Buffer.alloc(5) // 开发中数字都是字节单位
const buffer1 = Buffer.from('测试')
const buffer2 = Buffer.from([0x11, 0x22])
console.log(buffer2)
// Buffer的常用方法
// isBuffer copy concat length

// 一个汉字3个字节
console.log(buffer1.length) // 6
// buffer 不具备拓展push shift 这些方法
// const a = useUint8Array.prototype.slice.call(buffer, 0, 1)
console.log(buffer.slice(0, 1))

// 是否buffer
console.log(Buffer.isBuffer(buffer1))

// copy 拷贝的buffer 拷贝到start，被拷贝的start，被拷贝的end
const buf1 = Buffer.from('测试')
const bigBuf = Buffer.alloc(6)
buf1.copy(bigBuf, 0, 0, 6)
console.log(bigBuf.toString())

// concat
console.log(Buffer.concat([buf1, bigBuf]).toString())

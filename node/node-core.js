// 执行node文件名，然后加参数 node xxx --mode
// 可用commander这个包
console.log(process.argv) // 解析用户自己传递的参数
let obj = {}
let args = process.argv.slice(2)
args.forEach((item, idx) => {
  if (item.startsWith('--')) {
    obj[item.slice(2)] = args[idx + 1]
  }
})
console.log(obj)

// 用户在哪儿执行node，就去哪里找配置文件
console.log(process.cwd()) // 用户当前工作目录
// 当前文件所在目录，不可手动修改
console.log(__dirname)
// 环境变量
console.log(process.env.NODE_ENV)

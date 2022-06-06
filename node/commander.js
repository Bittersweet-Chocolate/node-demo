const { program } = require('commander')
program
  .version('0.0.1')
  .command('create <t>', '自定义操作') // 自定义操作
  .action(() => {
    console.log('创建项目')
  })
  .name('vue') // help相关提示
  .description('这是简介')
  .usage('my-server') // help相关提示
  .option('-p,--port <v>', '设置你的端口号') // 设定局限入参
  .parse(process.argv)
const options = program.opts()
console.log(options)
console.log(process.argv)

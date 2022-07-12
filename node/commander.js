/*
 * @Author: czh-mac
 * @Date: 2022-05-31 15:27
 * @LastEditTime: 2022-07-01 09:14
 * @Description: 头部注释
 */
const { Command } = require('commander')
const program = new Command()
program
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log('do service start', port) // 8080
  })
  .parse(process.argv)
// program
//   .version('0.0.1')
//   .command('start [port]') // 自定义操作
//   .name('vue') // help相关提示
//   .usage('my-server') // help相关提示
//   .description('这是简介')
//   .action((projectName) => {
//     console.log(`创建项目${projectName}`)
//   })
//   // <v>必填 [v]选填
//   .option('-p,--port <v>', '设置你的端口号') // 设定局限入参
//   .parse(process.argv)
const options = program.opts()
// console.log(options)
// console.log(process.argv)

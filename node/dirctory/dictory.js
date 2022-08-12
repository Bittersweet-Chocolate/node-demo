/*
 * @Author: czh-mac
 * @Date: 2022-08-11 16:31
 * @LastEditTime: 2022-08-12 09:02
 * @Description: 头部注释
 */
var fs = require('fs')
function mkdirP(path) {
  const arr = path.split('/')
  let currendPath = ''
  arr.forEach((item) => {
    currendPath += `${item}/`.slice(0, -1)
    // const p = currendPath.slice(0, -1)
    // if (!fs.existsSync(p)) {
    //   fs.mkdirSync(p)
    // }
  })
}

mkdirP('a/b')

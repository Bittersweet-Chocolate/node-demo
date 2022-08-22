/*
 * @Author: czh-mac
 * @Date: 2022-08-11 16:28
 * @LastEditTime: 2022-08-22 14:55
 * @Description: 文件夹相关操作
 */
const fs = require('fs')

// 创建目录要保证 父目录存在
fs.mkdirSync('a/b')
fs.rmdirSync('a')

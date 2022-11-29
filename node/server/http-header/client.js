/*
 * @Author: czh-mac
 * @Date: 2022-11-28 16:53
 * @LastEditTime: 2022-11-29 10:09
 * @Description: 中间层
 */
// 中间层的方式，node请求别的服务没有跨域问题
const http = require('http')

const client = http.request(
  {
    path: '/reg',
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  function (res) {
    console.log('进来了')
    res.on('data', function (data) {
      console.log(data.toString())
    })
  }
)
client.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
})
client.write(`{"name":456}`)
client.end()

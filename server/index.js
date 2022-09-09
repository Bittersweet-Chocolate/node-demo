const http = require('http')

const server = http.createServer((req, res) => {
  // 请求方法
  console.dir(req)
  // 可写流  end = write+close
  res.end('world')
})
const port = 3000
server.listen(port, () => {
  console.log('satrt', port)
})
server.on('error', (err) => {
  if (err.errno === 'EADDRINUSE') {
    server.listen(port++)
  }
})

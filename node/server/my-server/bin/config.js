const config = {
  port: {
    option: '-p, --port <val>',
    des: 'set your server port',
    usage: 'czhs -p 3000',
    default: '3000'
  },
  dir: {
    option: '-d, --dir <val>',
    des: 'set your start dir',
    usage: 'czhs -d D:',
    default: process.cwd()
  },
  host: {
    option: '-h, --host <val>',
    des: 'set your hostname',
    usage: 'czhs -h 127.0.0.1',
    default: 'localhost'
  }
}
module.exports = config

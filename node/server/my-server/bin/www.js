#! /usr/bin/env node
const { program } = require('commander')
const { version } = require('../package.json')
const config = require('./config.js')
const Server = require('../src/server')

const resConfig = {}
Object.values(config).forEach((val) => {
  if (val.option) program.option(val.option, val.des)
})

program.version(version)
program.on('--help', () => {
  console.log('Examples:')
  Object.values(config).forEach((val) => {
    if (val.usage) console.log(val.usage)
  })
})
program.parse()

function init() {
  const parseObj = program.opts()
  Object.keys(config).forEach((key) => {
    resConfig[key] = parseObj[key] || config[key].default
  })
}

init()

let server = new Server(resConfig)
server.start()

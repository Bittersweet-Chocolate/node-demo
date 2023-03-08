const Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  resolve(1)
})
let p1 = p.then(() => {
  return p1
})

p1.then(
  () => {},
  (err) => {
    console.log(err)
  }
)

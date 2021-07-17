const os = require('os')

console.log(os.userInfo())
console.log(os.freemem())

const currentOs = {
  name: os.type(),
  freeMem: os.freemem(),
  ttlMem: os.totalmem(),
  release: os.release(),
}

console.log(currentOs)

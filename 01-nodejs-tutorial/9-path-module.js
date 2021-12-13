const path = require('path')

console.log(path.sep)

const filePath = path.join('/conetent', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolutePath = path.resolve(
  __dirname,
  'conetent',
  'subfolder',
  'test2.txt'
)

console.log(`Absolute path: ${absolutePath}`)

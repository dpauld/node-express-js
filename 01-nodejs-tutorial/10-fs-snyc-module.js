// const fs = require('fs')
// fs.readFileSync()
// fs.writeFileSync()

const { readFileSync, writeFileSync } = require('fs')

let first = readFileSync('./content/first.txt', 'utf8')
console.log(first)

let second = readFileSync('./content/second.txt', 'utf-8')

//overwrite one
/* writeFileSync(
  './content/result-sync.txt',
  `Here is the result: ${first} ${second}`
) */

//apend one: just add flag 'a'
writeFileSync(
  './content/result-sync.txt',
  `Here is the result: ${first} ${second}`,
  { flag: a }
)

const { readFile, writeFile } = require('fs')

console.log('Start')
readFile('./content/first.txt', 'utf-8', (err, result) => {
  if (err) {
    console.log('Error')
    return
  }
  const first = result
  // console.log(first)
  // console.log('Done reading first file')

  readFile('./content/second.txt', 'utf-8', (err, result) => {
    if (err) {
      console.log('Error')
      return
    }
    const second = result
    writeFile(
      './content/result-async.txt',
      `The result is: ${first} ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log('Done with the task')
      }
    )
  })
})
console.log('Starting the next task')

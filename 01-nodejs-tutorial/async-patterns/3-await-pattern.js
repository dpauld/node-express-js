/* Issue: callback hell;*/
/**** Solution to Callback Hell : Use Async-Await with Promise; Async-Await makes the code more simpler ****/

const {readFile, writeFile} = require("fs").promises

const start = async () => {
  try {
    // console.log("hello")
    const first = await readFile('./content/first.txt', "utf8")
    const second = await readFile('./content/second.txt', "utf8")
    await writeFile("./content/result-mind-granade.txt", `This is AWESOME: ${first} ${second}`, {flag:'a'})
    console.log(first,second)
  } catch (err) {
    console.log(err)
  }
}
start()

//__________________##Using promisify##_____________
/* const {readFile, writeFile} = require("fs")
const util = require("util")
const readFilePromise = util.promisify(readFile) // Using promisify to make the readFile a promise based one
const writeFilePromise = util.promisify(writeFile)

const start = async () => {
  try {
    const first = await readFilePromise('./content/first.txt', "utf8")//waits untill promise fulfills, then return the resulting value
    const second = await readFilePromise('./content/second.txt', "utf8")
    await writeFilePromise("./content/result-mind-granade.txt", `This is awesome: ${first} ${second}`)
    console.log(first,second)
  } catch (error) {
    console.log(error)
  }
}
start()
 */

// ___________________________## Without Promisify##________________

/* const getText = (path) => {
  return new Promise ((resolve,reject)=>{ // this function returns a promise, we used promisify or promises property to do a similar trick
    readFile(path, 'utf8', (err, data)=>{
      if(err){
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}  */

/* const start = async () => {
  try {
    const first = await getText('./content/first.txt')//waits untill promise fulfills, then return the resulting value
    const second = await getText('./content/second.txt')
    console.log(first,second)
  } catch (error) {
    console.log(error)
  }
}
start() */

/* Related Readings
//1) https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
//2) https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
//3) https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513
//4) Promise.all() function to work with multiple promise: https://stackoverflow.com/questions/50147684/reading-two-csv-files-at-a-time-with-promises-nodejs
//5) https://dev.to/reubengt/promises-promise-all-and-async-await-explained-in-5-minutes-2dld
*/
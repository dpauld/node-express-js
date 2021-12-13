const {readFile} = require("fs")

const getText = (path) => {
  return new Promise ((resolve,reject)=>{
    readFile(path, 'utf8', (err, data)=>{
      if(err){
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// getText('./content/first.txt').then((res)=> console.log(res)).catch((err)=> console.log(err))
/**** Again Call Back Hell ****/
/* getText('./content/first.txt').then((res)=> {
  first = res; // if we do this, then read second file in this function scope we will end-up in the same previous callback hell
  console.log(first)
}) */

/**** Solution to Callback Hell : Using only Promise ****/
// let bigPromise = Promise.all([getText('./content/first.txt'), getText('./content/second.txt')]).then((res)=> console.log(res))

/**** Solution to Callback Hell : Use Async-Await with Promise, Async-Await makes the code more simpler ****/
const start = async () => {
  try {
    const first = await getText('./content/first.txt')//waits untill promise fulfills, then return the resulting value
    const second = await getText('./content/second.txt')
    console.log(first,second)
  } catch (error) {
    console.log(error)
  }
}
start()

/* Related Readings
//1) https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
//2) https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
//3) https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513
//4) Promise.all() function to work with multiple promise: https://stackoverflow.com/questions/50147684/reading-two-csv-files-at-a-time-with-promises-nodejs
//5) https://dev.to/reubengt/promises-promise-all-and-async-await-explained-in-5-minutes-2dld
*/
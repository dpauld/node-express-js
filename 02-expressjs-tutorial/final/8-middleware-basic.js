//This shows what is middleware and how we can make one.

const express = require('express')
const app = express()

/*############### Middleware ###############*/
// req => Middleware => res //middleware runs between a request received and a response is send. Sometimes middleware serves the response, in that case the server does not need to go to next() middleware.

/* ##### 1) Not a better aproach ##### */

// app.get('/',(req,res)=>{
//     //Middleware: Sits/Works between req and response
//     const method = req.method
//     const url = req.url
//     const time = new Date().getFullYear()
//     console.log(method, url, time)
//     //
//     res.send("<h1>Home page</h1>")
// })

// app.get('/about',(req,res)=>{
//      //Middleware: Sits/Works between req and response, not a efficient approach, right? for 100 routes if have to do it everytime.
//      const method = req.method
//      const url = req.url
//      const time = new Date().getFullYear()
//      console.log(method, url, time)
//      //
//     res.send("<h1>About page</h1>")
// })

/* ##### 2) A little better aproach ##### */

//Middleware: Moving the middleware code inside a seperate function
 const logger = (req, res, next) => { //req, res is needed as we use theme inside the function, then express provides an extra method, conventionally called next() to go to the next method, in this case the get method. Without this, the programm will stuck and won't reach res.send(), which internnaly use res.end() method. Although we could use res.send() inside the middle ware but this not an ideal practice
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    // res.send("hello") // the looping of req-res cycle can be avoided by using send method, which internally calls res.end() method of http, but it is not ideal practice. 
    next() //Express provides this function to go to the next middleware or go to the get method as per the req url
}

app.get('/',logger,(req,res)=>{
    res.send("<h1>Home page</h1>")
})
app.get('/about',logger, (req,res)=>{
    res.send("<h1>About page</h1>")
}) 

/* ##### 3) Best aproach ##### */
// See in the next File, Achieved using app.use() method

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
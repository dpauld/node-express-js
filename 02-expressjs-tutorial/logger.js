//this is an user defined middleware, used in files named 11-methods-* examples.

const logger = (req, res, next) => { //req, res is needed as we use theme inside the function, then express provides an extra method, conventionally called next() to go to the next method, in this case the get method. Without this, the programm will stuck and won't reach res.send(), which internnaly use res.end() method. Although we could use res.send() inside the middle ware but this not an ideal practice
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    // res.send("hello") // the looping can be avoided by using send method, which internally calls res.end() method of http, but it is not ideal practice. 
    next() //Express provides this function to go to the next method as per the req url
}

module.exports = {logger}
// This example shows how to use a single middleware

const express = require('express')
const app = express()
/* ##### 3) Best aproach ##### */

//Middleware: Using app.use() method for all, instead of writing the logger function in each get function
const {logger} = require('./logger') //moved the middleware into a seperate file for easy maintanance

// app.use(logger)// see the magic, logger performs in all the get function, use method runs any middleware for all the get method
app.use('/api',logger)// Now we don't want to run it for all, we can specify a prefix path, the logger will execute for those url which has prefix path of "/api"; Eg of such url is: "/api/products"

app.get('/',(req,res)=>{
    res.send("<h1>Home page</h1>")
})
app.get('/about', (req,res)=>{
    res.send("<h1>About page</h1>")
})
app.get('/api/products', (req,res)=>{
    res.json([{productId:1, name:'Alu'}, {productId:2, name:'Bhaji'}])
})
app.get('/api/items', (req,res)=>{
    res.json([{productId:1, name:'Ecommerce Project'}, {productId:2, name:'School Management'}])
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
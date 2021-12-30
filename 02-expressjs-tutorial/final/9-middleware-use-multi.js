// This example shows how to use multiple middleware

const express = require('express')
const app = express()

//Middleware: Using app.use() method for all, instead of writing the logger function in each get function
const {logger} = require('./logger') //moved the middleware into a seperate file for easy maintanance
const loggerTime = require('./loggerTime')
const authorize = require('./authorize')

// app.use([logger, authorize])//array is used to add multiple middleware inside app.use() method; the order of the array element matters
app.use(logger)//not everypage requires authorisation

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
app.get('/api/checkout', authorize, (req,res)=>{//user only require authorization when he want to checkout orders
    console.log(req.user) //sample url: localhost:5000/api/checkout?username=dipto
    res.json([{productId:1, name:'Alu'}])//user want to confirm these orders
})
app.get('/api/confirmOrder', [loggerTime, authorize] , (req,res)=>{//user only require authorization when he want to confirm orders
    console.log(req.user) 
    res.json([{productId:1, name:'Alu'}])//user want to confirm these orders
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
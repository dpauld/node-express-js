//this file show how to handle a post rquest for the type of form which does not contain post url in the action property of html form, instead a javascript event listener triggeres a post request

const express = require('express')
const app = express()
let {people} = require('./data.js')

app.use(express.static('./methods-public'))//method public contains forms that runs in all routes, as it is used as middleware
// app.use(express.static('./new'))//method public contains forms that runs in all routes, as it is used as middleware

// parse json,
app.use(express.json())

//this is useless if public contains index.html
app.get('/', (req,res) =>{
    // console.log(people)
    console.log("Request type :", req.get('Content-Type'));
    console.log("Hello")
    res.end()
})

//exmaple of get method, use url in the browser: localhost:5000/api/people
app.get('/api/people', (req,res)=>{
    // const {name} = req.body// you can make post request (add values) in the body of get request, but usually we don't do this
    res.json({success: true, data: people})
})

// In-case of form and reading form values :
// 1) we need to setup a post request with the url of form action link or axios post request link 
// 2) Need middlewares to access the form data for json type post request data we need express.json() and for urlencoded we need express.urlencoded
app.post('/api/people', (req, res) => {
    // console.log(req.body)//middlware express.json() adds the request body property to body property of req object
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).json({success: true, person: name, msg:'your name is added'})
})

app.listen(5000, () => {
    console.log('Server is listening in port 5000')
})
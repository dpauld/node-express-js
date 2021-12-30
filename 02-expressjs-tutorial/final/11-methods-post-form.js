//this file is for the type of form which contains post url in the action property of html form, it handles post request

const express = require('express')
const app = express()
const {people} = require('./data.js')

app.use(express.static('./methods-public'))//method public contains forms that runs in all routes, as it is used as middleware
// app.use(express.static('./new'))//method public contains forms that runs in all routes, as it is used as middleware

// parse form data, 'urlencoded()' is used to recognize the incoming Request Object as strings or arrays. Mostly, used for req by html form post
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) =>{
    // console.log(people)
    console.log("Request type :", req.get('Content-Type'));
    console.log("Hello")
    res.end()
})

//exmaple of get method, use url in the browser: localhost:5000/api/people
app.get('/api/people', (req,res)=>{
    res.json({success: true, data: people})
})

// In-case of traditional form:
// 1) we need to setup a post request with the url of form action link
// 2) Need some middleware to access the form data 
app.post('/login', (req,res)=>{
    const {name} = req.body
    console.log(name)
    if(!name){
        return res.status(401).send('Please provide name')
    }
    res.status(200).send(`<h2>Welcome ${name}</h2>`)
})

app.listen(5000, () => {
    console.log('Server is listening in port 5000')
})

///Readings:
// 1) express.json() vs express.urlencoded({extended:false}) => [ https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded ] [https://stackoverflow.com/a/51844327/7828981]
//so the difference is express.json() is a body parser for post/fetch request except html post form and express.urlencoded({extended: false}) is a body parser for html post form
// 2) {extend:options} => [https://stackoverflow.com/a/50199038/7828981]
    // an example: https://stackblitz.com/edit/node-xa27zd?file=index.js
// 3)
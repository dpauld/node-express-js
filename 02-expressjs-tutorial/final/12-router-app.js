//app.js file for handling routes and controller as a mvc model

const express = require('express')
const app = express()

//exporting the route files
const people = require('./route/people')
const auth = require('./route/auth')

app.use(express.static('./methods-public'))//method public contains forms that runs in all routes, as it is used as middleware

// parse form data, 'urlencoded()' is used to recognize the incoming Request Object as strings or arrays. Mostly, used for req by html form post
app.use(express.urlencoded({extended:false}))

// parse json,
app.use(express.json())

//this routes all the request url located inside people route file
app.use('/api/people', people)

//this routes all the request url located inside auth route file
app.use('/login', auth)

app.listen(5000, () => {
    console.log('Server is listening in port 5000')
})

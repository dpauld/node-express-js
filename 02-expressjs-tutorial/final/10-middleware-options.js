//This files shows what are the options to pick middlewares?

const express = require('express')
const app = express()
const morgan = require('morgan')//third party
const {logger} = require('./logger')
const authorize = require('./authorize')

// 1) USE vs Route
// 2) Options - User Defined/ express / third party

//option 3: Third party middleware
app.use(morgan('tiny')) //order of app.use() matters
//option 1: Builtin express middleware
app.use(express.static('./public')) //order of app.use() matters
//option 2: User defined middleware
app.use(logger)

app.get('/',(req,res)=>{
    res.send("<h1>Home page</h1>")
})
app.get('/about', (req,res)=>{
    res.send("<h1>About page</h1>")
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
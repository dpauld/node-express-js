//contains route files related to authentication

const express = require('express')
const router = express.Router()
let {people} = require('../data.js')

router.post('/', (req,res)=>{
    const {name} = req.body
    console.log(name)
    if(!name){
        return res.status(401).send('Please provide name')
    }
    res.status(200).send(`<h2>Welcome ${name}</h2>`)
})

module.exports = router
const express = require('express')
const app = express()
const {products} = require('./data.js')

//for simplification, we are serving to the home page only
app.get('/',(req,res)=>{
    res.json([{'name':'dipto', 'age':25},{'name':'shahriar', 'age':26}])
})

app.get('/products',(req,res)=>{
    res.json(products)
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
  })
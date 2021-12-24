const express = require('express')
const app = express()
const {products} = require('./data.js')

//for simplification, we are serving to the home page only
app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="./api/products">Products</a>')
})

//we want to show all products but not each product details, like we see in real world
app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image} = product
        return {id,name,image}
    })
    res.json(newProducts)
})

//here we want to show single product with details
//#Options: 1)Inefficient approach with specifying path for each product or 2)Efficient approach with Raout Parameter
//1)Inefficient approach
/* app.get('/api/products/1',(req,res)=>{
    const singleProduct = products.find((product)=>product.id===1)
    res.json(singleProduct)
})
 */
//2)Effiecient approach, note: Route parameter always comes as string
app.get('/api/products/:productID',(req,res)=>{
    // console.log(req.params)
    const {productID} = req.params 
    const singleProduct = products.find((product)=>product.id===Number(productID))
    res.json(singleProduct)
})

app.all('*', (req,res) => {
    res.status(404).send('Not avialable')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
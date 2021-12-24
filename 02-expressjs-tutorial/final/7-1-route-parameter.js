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

    //How do you handle if there is no product with searched productID(eg: /api/products/abc)?
    if(!singleProduct){ //if singleProduct is invalid then there is no product, right?
        return res.status(404).send('<h1>Product does not exists</h1>')
    }
    res.json(singleProduct)
})

//An example of complex usage of route parameters
app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params)//see params outputs an object containing all the route parameters
    const {reviewID, productID} = req.params
    res.send(`<h2>A review(Id: ${reviewID}) for the product with (Id:${productID})</h2>`)
})

app.all('*', (req,res) => {
    res.status(404).send('Not avialable')
})
app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
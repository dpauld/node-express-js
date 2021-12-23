const express = require('express')
const app = express()

app.get('/', (req, res)=> {
    console.log("User hit the resource")
    res.send("Homepage")
})
app.get('/about', (req, res)=>{
    res.status(200).send('About Page')
})
//instead of responding with automatic response from express we can define our custome 404 response for all including get resource,post resource
app.all('*', (req,res) => {
    res.status(404).send('Not avialable')
})
app.listen(5000, () =>{
    console.log("server is listening on port 5000")
})

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen
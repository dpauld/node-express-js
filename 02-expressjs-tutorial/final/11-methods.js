//this contains all the methods(get, post, put, delete) of form handeling including browser example and postman(find the postman name in the url) example. 

const express = require('express')
const app = express()
let {people} = require('./data.js')

app.use(express.static('./methods-public'))//method public contains forms that runs in all routes, as it is used as middleware
// app.use(express.static('./new'))//method public contains forms that runs in all routes, as it is used as middleware

// parse form data, 'urlencoded()' is used to recognize the incoming Request Object as strings or arrays. Mostly, used for req by html form post
app.use(express.urlencoded({extended:false}))

// parse json,
app.use(express.json())

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
app.post('/login', (req,res)=>{
    const {name} = req.body
    console.log(name)
    if(!name){
        return res.status(401).send('Please provide name')
    }
    res.status(200).send(`<h2>Welcome ${name}</h2>`)
})

app.post('/api/people', (req, res) => {
    // console.log(req.body)//middlware express.json() adds the request body property to body property of req object
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).json({success: true, person: name, msg:'your name is added'})
})

//use this request url in postman => localhost:5000/api/postman/people
app.post('/api/postman/people',(req,res) => {
    const {name} = req.body
    if(!name){
        res.status(400).json({success: false, msg: 'please provide name value'})
    }
    res.status(201).json({ success: true, data: [...people, name] })
})

//incase of update we expect the new value as well as an identification to update that specific element
app.put('/api/people/:id',)

//we not expecting a new value, only identification of the element to be deleted needed
app.delete('/api/people/:id',(req, res)=>{
    const {id} = req.params
    const personExists = people.find((person)=>person.id===Number(id))
    console.log(personExists)
    if(!personExists){
        return res.status(404).json({success:false, msg:"Could not delete, the person does not exits"})
    }
    //replace newPeople with people to delete all the item at a permanent basis untill the local server closes, what happens is with current setup if we delete one element now, then after trying another delete operation the previous delete operation comes back as we are not updating the people array after deleting, so every time we deal with the initial people array, incase of post the appending operation with html result makes an illution. 
    const newPeople = people.filter((person)=>person.id!==Number(id))// if newPeople is used each time we delete one item, it will come back when we try to delete another one. Using the original people array solves it. Make sure to convert people const to let/var
    res.status(200).send({success:true, data:newPeople})
})
app.listen(5000, () => {
    console.log('Server is listening in port 5000')
})

///Readings:
// 1) express.json() vs express.urlencoded({extended:false}) => [ https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded ] [https://stackoverflow.com/a/51844327/7828981]
//so the difference is express.json() is a body parser for post/fetch request except html post form and express.urlencoded({extended: false}) is a body parser for html post form
// 2) {extend:options} => [https://stackoverflow.com/a/50199038/7828981]
    // an example: https://stackblitz.com/edit/node-xa27zd?file=index.js
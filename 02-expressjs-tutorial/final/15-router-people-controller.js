//this file contains all the controller methods that is used inside people route file

let {people} = require('../data.js')

const getPeople = (req,res)=>{
    // const {name} = req.body// you can make post request (add values) in the body of get request, but usually we don't do this
    res.json({success: true, data: people})
}

const createPeople = (req, res) => {
    // console.log(req.body)//middlware express.json() adds the request body property to body property of req object
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).json({success: true, person: name, msg:'your name is added'})
}

const createPeoplePostman = (req,res) => {
    const {name} = req.body
    if(!name){
        res.status(400).json({success: false, msg: 'please provide name value'})
    }
    res.status(201).json({ success: true, data: [...people, name] })
}

const updatePeople = (req,res) => {//expecting a id and value
    const {id} = req.params
    const {name} = req.body 
    console.log(req.params, id, name)
    const personExists = people.find((person)=>person.id === Number(id))
    if(!personExists){
        return res.status(404).json({success:false, msg: "person doesn't exists"})
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id)){
            person.name = name
        }
        return person
    })
    res.status(200).json({success: true, data: newPeople})
}
const deletePeople = (req, res)=>{//not expecting a new value, only identification of the element to be deleted needed
    const {id} = req.params
    const personExists = people.find((person)=>person.id===Number(id))
    console.log(personExists)
    if(!personExists){
        return res.status(404).json({success:false, msg:"Could not delete, the person does not exits"})
    }
    //replace newPeople with people to delete all the item at a permanent basis untill the local server closes, what hrouterens is with current setup if we delete one element now, then after trying another delete operation the previous delete operation comes back as we are not updating the people array after deleting, so every time we deal with the initial people array, incase of post the routerending operation with html result makes an illution. 
    const newPeople = people.filter((person)=>person.id!==Number(id))// if newPeople is used each time we delete one item, it will come back when we try to delete another one. Using the original people array solves it. Make sure to convert people const to let/var
    res.status(200).send({success:true, data:newPeople})
}


module.exports = {getPeople, createPeople, updatePeople, deletePeople, createPeoplePostman}
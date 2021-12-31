//contains codes to handle routes to different request url
const express = require('express')
const router = express.Router()
const {getPeople, createPeople, updatePeople, deletePeople, createPeoplePostman} = require('../controllers/people')

// let {people} = require('../data.js')// we usually don't use data here, insted data is used in controllers. This will be moved.

//??? Why root URL used? As we defined the base url as /api/people inside the app.js while setting up routing, we went with root path instead of using /api/people.   
/* //use this request url in the browser => localhost:5000/api/people
router.get('/', getPeople)
//use this request url with values in the postman => localhost:5000/api/people
router.post('/', createPeople)
//use this request url in postman => localhost:5000/api/people/postman
router.post('/postman', createPeoplePostman)
//use a request url like this with values in postman => localhost:5000/api/people/2
router.put('/:id', updatePeople)
//use a request url like in the postman => localhost:5000/api/people/1
router.delete('/:id', deletePeople) */

//chain routing
router.route('/').get(getPeople).post(createPeople)
router.route('/postman').post(createPeoplePostman)
router.route('/:id').put(updatePeople).delete(deletePeople)


module.exports = router
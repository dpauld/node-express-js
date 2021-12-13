const EventEmitter = require('events');

const customEmitter = new EventEmitter()

//on method start listening for the response event, with emit we trigger the response event
customEmitter.on("response", () => {
  console.log(`data received`)
})
// customEmitter.emit('response')// the order of emit matters, if we emit before listening the listen function will not work
customEmitter.on("response", (name, id) => {
  console.log(`the person is ${name} with ID: ${id}`)
})
customEmitter.emit('response','john', 34)// except the event name other arguements is optional
customEmitter.on("response", () => {
  console.log(`does not work`)
})


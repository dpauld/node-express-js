const http = require('http')

/* 
const server = http.createServer((req,res)=>{
  res.end('Hello from server')
}) */

const server = http.createServer()//server emits a request event when the user request for a resource

server.on('request',(req,res) => {
  res.end('Hello from Server with EventEmitter')
})

server.listen(5000)
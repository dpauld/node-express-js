const http = require('http')

const server = http.createServer((req, res) => {
    // console.log('user hit the server')
    // console.log(req.url)
    console.log(req.method)
    // res.writeHead(200,{'content-type':'text/plain'})//see the difference
    res.writeHead(200,{'content-type':'text/html'})
    res.write('<h1>home page</h1>')
    res.end()
})

server.listen(5000)
const http = require('http')
const fs = require('fs')
const homePage = fs.readFileSync('./index.html')

const server = http.createServer((req, res) => {
    // console.log('user hit the server')
    // console.log(req.method)
    // console.log(req.url)
    // res.writeHead(200,{'content-type':'text/plain'})//see the difference
    if(req.url === '/'){
        console.log(req.url)
        res.writeHead(200,{'content-type':'text/html'})
        // res.write('<h1>home page</h1>')
        res.write(homePage)
    }
    else if(req.url == '/about'){
        console.log(req.url)
        res.writeHead(200,{'content-type':'text/html'})
        res.write('<h1>about page</h1>')
    }
    else{
        console.log(req.url)
        res.writeHead(404,{'content-type':'text/html'})
        res.write('<h1>page not found</h1>')
    }
    res.end()
})

server.listen(5000)
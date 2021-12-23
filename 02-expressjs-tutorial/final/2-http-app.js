const http = require('http')
const fs = require('fs')

// get all files
const homePage = fs.readFileSync('./navbar-app/index.html')
const homeStyles = fs.readFileSync('./navbar-app/styles.css')
const homeLogo = fs.readFileSync('./navbar-app/logo.svg')
const homeLogic = fs.readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req, res) => {
    //home
    if(req.url === '/'){
        console.log(req.url)
        res.writeHead(200,{'content-type':'text/html'})
        res.write(homePage)
    }
    //about page
    else if(req.url == '/about'){
        console.log(req.url)
        res.writeHead(200,{'content-type':'text/html'})
        res.write('<h1>about page</h1>')
    }
    //home styles
    else if(req.url === '/styles.css'){
        res.writeHead(200,{'content-type':'text/css'})
        res.write(homeStyles)
    }
    //Home Javascript
    else if(req.url === '/browser-app.js'){
        res.writeHead(200,{'content-type':'script'})
        res.write(homeLogic)
    }
    //Home Logo
    else if(req.url === '/logo.svg'){
        res.writeHead(200,{'content-type':'image/svg+xml'})//Remove it and see what happens, Without specifying the content-type it won't show the image currectly, even for html sometimes not specifying content type is not a problem for server or browsers
        res.write(homeLogo)
    }
    //404
    else{
        console.log(req.url)
        res.writeHead(404,{'content-type':'text/html'})
        res.write('<h1>page not found</h1>')
    }
    res.end()
})

server.listen(5000)
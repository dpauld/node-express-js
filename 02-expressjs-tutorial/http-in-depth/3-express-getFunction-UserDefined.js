class Express{
    constructor(){
        http = require('http')
        server = http.createServer();
    }

    get = (url,cb) => {
        server.on("request",(req,res)=>{
            if(req.url === url){
             cb(req,res)
            }
        })
    }

    listen = (port,cb) => {
        server.listen(port)
        cb()
    }
    listen = (port,hostaname,cb) => {
        server.listen(port)
        cb()
    }
}
//
const exp = new Express()
exp.get('/',(req,res)=>{
    res.write('Home Page')
    res.end()
})
exp.get('/about',(req,res)=>{
    res.write('About Page')
    res.end()
})
exp.listen(5000)
class Express{
    constructor () {
        function express (){
            return (
                () => {
                    server = http.createServer();
                    http = require('http')
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
            )
        }
        return express
    }
}
//
const exp = new Express()
const app = exp()

app.get('/',(req,res)=>{
    res.write('Home Page')
    res.end()
})
// app.get('/about',(req,res)=>{
//     res.write('About Page')
//     res.end()
// })
// app.listen(5000)
const http = require('http')
var fs = require('fs')

const server = http.createServer()

server.on('request', (req,res) => {
  // res.end(fs.readFileSync('./content/big.txt','utf8'))
  const fileStream = fs.createReadStream('./content/big.txt','utf8')
  // fileStream.on('data',(data)=>{
  //   res.end(data)
  // })
  fileStream.on('open',()=>{
    fileStream.pipe(res)
  })

  fileStream.on('error', (err) => {
    res.end(err)
  })
})

server.listen(5000)
// var http=require('http')
// var fs=require('fs')
// http.createServer(function(req,res){
//     const text=fs.readFileSync('./content/big.txt','utf-8')
//     res.end(text)
// }).listen(5000)

var http=require('http')
var fs=require('fs')
http.createServer(function(req,res){
    // const text=fs.readFileSync('./content/big.txt','utf-8')
    // res.end(text) //content length:1788890
 const fileStream=fs.createReadStream('./content/big.txt','utf-8');
fileStream.on('open',()=>{
           fileStream.pipe(res) 
           //pipe connects a readable stream to a writable stream, so data flows from one to the other automatically.       
}) 
fileStream.on('error',(err)=>{
    res.end(err.message)        
})}).listen(5000)
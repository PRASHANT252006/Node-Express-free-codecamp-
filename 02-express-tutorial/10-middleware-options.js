const express = require('express');
const app = express();
const morgan=require('morgan');
const logger=require('./logger')
const authorize=require('./authorize')
// const logger=(req,res,next)=>{
//      const method=req.method
//     const url=req.url
//     const time=new Date().getFullYear()
//     console.log(method,url,time)
//     // res.send('Testing')
//     next()
// }
//req=> middleware => res

// app.use(logger)  //app.use(path(/api),logger)

//1.use vs api
//2options-our own/third party/express built-in
// app.use([path,]callback[,callback...])
app.use(morgan('tiny'))

// app.use([authorize,logger]);
app.get('/',(req,res)=>{
    res.status(200).send('Home Page')
})
app.get('/about',(req,res)=>{
    res.status(200).send('About Page')
})

app.get('/api/items',(req,res)=>{
//    console.log(req.user)
   res.status('Items')
})



app.listen(5000,()=>{
    console.log("Server is listening on port 5000....")
})
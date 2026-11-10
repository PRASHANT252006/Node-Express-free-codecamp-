const express = require('express');
const path=require('path');
const app=express();


//setup static and middleware
//app.use is for setting middleware
//static resource->server doesnt need to change it ex stylecss,image
app.use(express.static('./public'))

// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
// methods to send file   (2 other) ek method hai res.sendfile
//adding to static assets(dump in static file)=>app.use(express.static('./public'))
// server side redering
// })
app.all('/*splat',(req,res)=>{
    res.status(404).send('<h1>Resource Not found</h1>')
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...');
});


// res.sendFile(...) reads a file and sends it as the response. It sets the Content-Type automatically (for .html it uses text/html), so you do not need writeHead.
// path.resolve(...) builds the full path of the file.
//A full path (also called an absolute path) is the complete location of a file, starting from the root of the drive.
// __dirname is the folder of the current JS file.
// './navbar-app/index.html' is the file path, relative to that folder.
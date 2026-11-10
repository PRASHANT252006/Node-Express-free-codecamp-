// const http=require('http');


// const server=http.createServer((req,res)=>{
//     console.log("USER HIT THE SERVER");
//     res.end("Welcome to our home page")
// })

// server.listen(5001)

const http=require('http');
const {readFileSync}=require('fs');

const homePage=readFileSync('./navbar-app/index.html');
const homeStyles=readFileSync('./navbar-app/styles.css');
const homeImage=readFileSync('./navbar-app/logo.svg');
const homeLogic=readFileSync('./navbar-app/browser-app.js');




const server=http.createServer((req,res)=>{
    // console.log(req);//we are going to get giant request object
//    console.log(req.method);
// console.log(req.url);
const url=req.url;
if(url==='/'){
    res.writeHead(200,{'Content-Type':'text/html'})
   res.write(homePage)
    res.end()
}
else if(url==='/styles.css'){
     res.writeHead(200,{'Content-Type':'text/css'})
   res.write(homeStyles)
    res.end()
}
else if(url==='/logo.svg'){
     res.writeHead(200,{'Content-Type':'image/svg+xml'})
   res.write(homeImage)
    res.end()
}
else if(url==='/browser-app.js'){
     res.writeHead(200,{'Content-Type':'text/javascript'})
   res.write(homeLogic)
    res.end()
}
else {
     res.writeHead(404,{'Content-Type':'text/html'})
   res.write(`
    <h1>Page not found</h1></h1>
    <a href="/">Return to home page</a>
    `);
    res.end()
}


})

server.listen(5001)

// Node does not serve files automatically.
//  With the plain http module, you must write a route for every file yourself.
//  This shows how a web server really works.

//humko har static resource ke liye code likhna padta hai like css,js,image etc
//  Later, Express does this for you with one line:

// app.use(express.static('./navbar-app'))


// how js can be static although it makes app dynaic 
//bcoz it is a browser app so it makes dynamic on browser as far as server is concerned it is resource that doesneed change
// for dyanic we have server side rendering and template engine



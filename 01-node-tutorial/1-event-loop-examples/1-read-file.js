// const {readFile}=require('fs')

// console.log("Started a first task");
// //CHECK FILE PATH !!!
// readFile('./content/first.txt','utf8',(err,result)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(result);
//     console.log("Completed first task");
// })
// console.log("Starting next task");

//output
// Started a first task
// Starting next task
// (content of first.txt)
// Completed first task

// Your code  →  Call stack  →  readFile  →  libuv/OS reads file
//                                                   ↓ (done)
// Call stack  ←  Event loop  ←  Callback queue  ←  callback waits here

//The order is not top to bottom because readFile is async.
//Node reads the file in the background, and the event loop runs the callback when it is ready.

// console.log('First');
// setTimeout(() => {
//     console.log('Second');
// }, 0);
// console.log('Third');

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request event');
    res.end('Hello World');
});



//server stays alive bcoz listen is asynchronus
//// server stays alive because the open socket keeps the event loop running
server.listen(5000, () => {
    console.log('Server listening on port : 5000....');
});
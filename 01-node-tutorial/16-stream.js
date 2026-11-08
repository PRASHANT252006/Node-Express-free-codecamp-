// This code reads a big file in small pieces (chunks) instead of loading the whole file into memory.

const {createReadStream} = require('fs');
// createReadStream('./content/big.txt') opens the file as a stream. It does not read everything at once.
// const stream=createReadStream('./content/big.txt');

const stream=createReadStream('./content/big.txt',{highWaterMark:90000,encoding:'utf8'})    

//default 64kb buffer:each chuck isup to 64kb 
//last buffer - remainder  : if the file is 150 KB, you get 64 KB, 64 KB, then 22 KB. The last chunk is whatever is left.
//highWaterMark - control size
//const stream=createReadStream('./content/big.txt',{highWaterMark:90000})
//highWaterMark: sets the chunk size.
//const stream=createReadStream('./content/big.txt',{encoding:'utf8'})



// stream.on('data', callback) listens for the data event. The stream emits this event every time a new chunk is ready.
stream.on('data',(result)=>{
//  console.log(result) prints each chunk
//    , each chunk is a Buffer
    console.log(result)
})

stream.on('error',(err)=>console.log(err)) //listens for the error event. The stream emits this event if there is an error reading the file.
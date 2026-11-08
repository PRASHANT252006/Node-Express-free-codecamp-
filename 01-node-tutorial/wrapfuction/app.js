const { readFile,writeFile}=require('fs');

const util=require('util');
const readFilePromise=util.promisify(readFile);
const writeFilePromise=util.promisify(writeFile);

//const { readFile,writeFile}=require('fs').promises;remove 2,3,4 line and replace readFilePromise and writeFilePromise with readFile and writeFile 

const start=async()=>{
    try{
        const first=await readFilePromise('./content/first.txt','utf8');
        const second=await readFilePromise('./content/second.txt','utf8');
        await writeFilePromise('./content/result-mind-grenade.txt',`This is awesome: ${first} ${second}`,{flag:'a'});
        console.log(first,second);
    }
    catch(error){
        console.log(error);}}

        start();
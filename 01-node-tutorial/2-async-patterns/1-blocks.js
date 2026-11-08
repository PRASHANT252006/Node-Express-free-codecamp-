const {readFile}=require('fs');

const getText=(path)=>{
    return new Promise((resolve,reject)=>{
        readFile(path,'utf8',(err,result)=>{
    if(err){
        console.log(err);
     
    }
    else{
    resolve(result);
    }
})
    })
}

// getText('./content/first.txt').then(result=>console.log(result))
// .catch(err=>console.log(err));

// const start=async ()=>{
//     try{
//     const first=await getText('./content/first.txt');
//     const second=await getText('./content/second.txt');
//     console.log(second);
//     console.log(first);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// start()

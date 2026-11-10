const express=require ('express');
const app=express()

app.get('/',(req,res)=>{
    res.json([{name:'jhon'},{name:'susan'}])
    //res.json(body) send a json response.This method send a
    //respone (with the correct-type) that parameter converted to a JSONstring using JSON.stringify()
})

app.listen(5000,()=>{
    console.log('Server is listening')
}
)
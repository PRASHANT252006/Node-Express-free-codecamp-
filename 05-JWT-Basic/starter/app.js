require('dotenv').config();
const dns=require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const app=express();
// const connectdb=require('./db/connection.js');
const mainRouter=require('./routes/main.js');
const errorhandlerMiddleware=require('./middleware/error-handler.js');
const notfound=require('./middleware/not-found.js');
const port=process.env.PORT || 3000;


//middleware
app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1',mainRouter);
app.use(notfound);
app.use(errorhandlerMiddleware);
const start=async()=>{
   try{
     app.listen(port,()=>{
        console.log(`Server is listening on ${port}`);
    })}
    catch(error){   
        console.log(error.message);
    }   
}
start();
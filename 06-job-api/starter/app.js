require('dotenv').config();
const dns=require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const app=express();
const connectdb=require('./db/connection.js');
const errorhandlerMiddleware=require('./middleware/error-handler.js');
const notfound=require('./middleware/not-found.js');
const port=process.env.PORT || 3000;
const jobsRouter=require('./routes/jobs.js');
const authRouter=require('./routes/auth.js');
const cookieParser = require('cookie-parser');
const authMiddleware=require('./middleware/authentication.js');


//middleware
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authMiddleware,jobsRouter);



//extra packages



app.use(notfound);
app.use(errorhandlerMiddleware);
const connect=async()=>{
   try{
     await connectdb(process.env.MONGO_URI);
    console.log('DataBase is connected!!!');
    app.listen(port,()=>{
        console.log(`Server is listening on ${port}`);
    })
   }
   catch(error){
    console.log(error.message);
   }
}
connect();

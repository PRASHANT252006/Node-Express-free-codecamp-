require('dotenv').config()
const express = require("express")

const dns=require("dns")
dns.setServers(['8.8.8.8','1.1.1.1'])
const connectDB=require("./db/connect.js")
const app=express();
const notfound=require('./middleware/not-found.js')
const errorHandlerMiddleware=require('./middleware/error-handler.js')
const tasks=require('./routes/tasks.js')
const port=process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.static('./public') )
app.use(errorHandlerMiddleware)
//routes
app.use('/api/v1/tasks',tasks)
app.all('/*splat',notfound)
app.use(errorHandlerMiddleware)
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

start();
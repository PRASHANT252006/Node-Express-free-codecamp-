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


//extra security packages
const cors=require('cors');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
}));

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

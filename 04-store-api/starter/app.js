const connectDB=require("./db/connect.js")
const dns=require("dns")
dns.setServers(["8.8.8.8","1.1.1.1"])
const express=require("express")
const app=express()
const notFound=require("./middleware/notfound.js")
const errorHandlerMiddleware=require("./middleware/errorHandler.js")
require('dotenv').config()
const port=process.env.PORT || 3001;
const productsRouter=require("./routes/products.js")

//middleware
app.use(express.json())

//routes

app.use("/api/v1/products",productsRouter)
//products route
app.use (notFound)
app.use(errorHandlerMiddleware)



const start = () => {
    connectDB(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected");
            app.listen(port, () => {
                console.log(`server is running on ${port}`);
            });
        })
        .catch((error) => console.log(error.message));
};

start();
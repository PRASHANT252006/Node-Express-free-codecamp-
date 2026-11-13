require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);
const connectDB = require('./db/connect');
const Product = require('./models/models.js');
const jsonProducts = require('./product.json');

const start= async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        // process.exit(0);
    console.log("Success!!!!");
     process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start();

const mongoose = require('mongoose');

const connectdb = async (url) => {
    await mongoose.connect(url);

    console.log("MongoDB Connected Successfully");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
    console.log("Port:", mongoose.connection.port);
    console.log("Status:", mongoose.connection.readyState);
};

module.exports = connectdb;
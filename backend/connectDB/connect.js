const mongoose = require('mongoose');
const connectDB = (URI) => {
    return mongoose.connect(URI).then(() => {
        console.log("Connect succesfully to the database");
    });
}

module.exports = connectDB;
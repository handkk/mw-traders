const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch(err) {
        console.log('err connectDB ', err);
        process.exit(1);
    }
}

module.exports = connectDB;
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

//Connection à Mongoose avec le MONgo_URI
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Connected to MongoDB : ${mongoose.connection.host}`);
    }).catch((err) => {
        console.log(`Failed to connect to MongoDB`, err);
    });
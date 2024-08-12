const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
 
// Variables
const Port = process.env.PORT;
const MongoDB = process.env.MONGO_COM_URL;
const app = express();


// Middleware
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/userRoutes'));

// Connect to MongoDB

mongoose.connect(MongoDB,{
}).then(() => {
    app.listen(Port, () => {
        console.log(`Connected to MongoDB and Server is running on port ${Port} ...`);
    })
}).catch((error) => {
    console.log(error);
});
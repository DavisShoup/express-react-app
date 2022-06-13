// Dependencies
const express = require('express');
const { default: mongoose } = require('mongoose');

// Initialize the Express App
const app = express();

// Configure App Settings
require('dotenv').config();

const { PORT = 3000, MONGODB_URL } = process.env;

//Connect to mongoDB
mongoose.connect(MONGODB_URL);

// Mongo Status Listeners
mongoose.connection
.on('connected', () => {
    console.log('connected to MongoDB.')
})
.on('error', (err) => {
    console.log('Error with MongoDB: ' + err.message)
})

// Mount Middleware

// Mount Routes
app.get("/", (req,res) => {
    res.send("hello world");
});

// Tell Express to Listen
app.listen(PORT), () => {
    console.log(`Express is listening to ${PORT}`)
}

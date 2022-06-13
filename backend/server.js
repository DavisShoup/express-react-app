
// Dependencies
const express = require('express');

// Initialize the Express App
const app = express();

// Configure App Settings
require('dotenv').config();

const { PORT = 3000, MONGODB_URL } = process.env;

// Mount Middleware

// Mount Routes
app.get("/", (req,res) => {
    res.send("hello world");
});

// Tell Express to Listen
app.listen(PORT), () => {
    console.log(`Express is listening to ${PORT}`)
}

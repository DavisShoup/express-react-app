// Dependencies
const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')

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
});

// Set up our model
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
}, { timestamps: true });

const People = mongoose.model("People", peopleSchema);

// Mount Middleware
app.use(cors());// This sets up a default cors policy (Access-Control-Allow) '*'
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies, this creates req.body
// app.use(express.urlencoded({ extended: false }))
// ^ Only when express is serving HTML/ this also creates req.body

// Mount Routes
app.get("/", (req,res) => {
    res.send("hello world");
});

// Index
app.get('/people', async (req, res) => {
    try {
        const people = await People.find({});
        const blogs = await Blogs.find({people: people[0]});
        res.send(people);
    } catch (error) {
    console.log('error: ', error);
    res.send({error: 'something went wrong - check console'})
}
});
// Using async pattern ^
// ====== Callback pattern for non async await version ======
// app.get('/people', (req, res) => {
//     People.find({}, (err, people) => {
//         res.send(people);
//     })
// });

// New

// Delete

// Update

// Create
app.post('/people' , async (req, res) => {
    try {
        const person = await People.create(req.body);
        res.send(person);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong'});
    }
})

// Edit

// Show

// Tell Express to Listen
app.listen(PORT), () => {
    console.log(`Express is listening to ${PORT}`)
}

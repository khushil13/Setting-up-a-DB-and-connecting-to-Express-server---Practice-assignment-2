const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const User = require('./schema');
require('dotenv').config();

const { resolve } = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(express.json()); 
app.use(express.static('static'));

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to database');
})
.catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit if connection fails
});

// Routes

app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users', async (req, res) => {
    try {
        const {name,email,password} = req.body;

        const newUser = new User({name,email,password});

        await newUser.save();

        // Respond with Success (201 Created)
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        // Error Handling
       console.log("first error",error);
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${3010}`);
});
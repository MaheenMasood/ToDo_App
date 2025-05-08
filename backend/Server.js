const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/ToDoRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected To MongoDB...');
        // Start the server after the database connection is established
        app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
    })
    .catch((err) => console.log(err));

// Use routes with base path
app.use('/api/todos', routes);

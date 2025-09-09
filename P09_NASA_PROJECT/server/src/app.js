/*
This file sets up the main Express app. It adds important middlewares (like to read JSON data) and connects all routers, so the whole app works together properly.
 */

// Load the Express library to create a web server and handle routes
const path = require('path');
const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

// Create an Express application
const app = express();

// Middleware to automatically parse incoming JSON data in requests
app.use(cors({ 
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetsRouter);

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Export the app so it can be used in other files (like server.js)
module.exports = app;

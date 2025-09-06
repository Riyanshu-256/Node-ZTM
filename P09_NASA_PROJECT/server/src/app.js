// Load the Express library to create a web server and handle routes
const express = require('express');

// Create an Express application
const app = express();

// Middleware to automatically parse incoming JSON data in requests
app.use(express.json());

// Export the app so it can be used in other files (like server.js)
module.exports = app;

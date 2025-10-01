/*
This file sets up the main Express application for the NASA Project.
It connects all routes (planets, launches), adds middlewares (JSON parser, CORS, logging),
and serves static files so the entire backend works smoothly.
*/

const path = require('path');       // Built-in Node.js module for handling file paths
const express = require('express'); // Express framework to create a server and handle routes
const cors = require('cors');       // CORS middleware to allow frontend (React) to talk to backend
const morgan = require('morgan');   // Middleware to log HTTP requests (for debugging)

// Import route handlers (routers)
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

// Create the Express application (main app object)
const app = express();

// ----------- MIDDLEWARES -----------

// Enable CORS so requests from http://localhost:3000 are allowed
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Parse incoming JSON data automatically and store it in req.body
app.use(express.json());

// Serve static files (like index.html, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Log each HTTP request in the console (method, status, response time)
app.use(morgan('combined'));

// ----------- ROUTES -----------

// Attach planets-related routes (GET /planets)
app.use('/planets', planetsRouter);

// Attach launches-related routes (GET/POST /launches)
app.use('/launches', launchesRouter);

// Serve index.html for all client-side routes
app.get(/^(?!.*api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Export the app object so other files (like server.js) can use it to start the server
module.exports = app;

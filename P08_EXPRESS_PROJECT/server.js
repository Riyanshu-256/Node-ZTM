// Import the Express library to create a web server
const express = require('express');  

// Import routers for handling different routes
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

// Create an Express application
const app = express();   

// Define the port where the server will run
const PORT = 3000;  

// Sample data: list of friends
const friends = [
    { id: 0, name: 'Albert Einstein' },
    { id: 1, name: 'Sir Isaac Newton' }
];

// Middleware to log details of each request
app.use((req, res, next) => {
    const start = Date.now();  // Start time
    next();                    // Call the next middleware or route
    const delta = Date.now() - start;  // Time taken
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);  // Log method, URL, and duration
});

// Use the friends router for all routes starting with /friends
app.use('/friends', friendsRouter);

// Use the messages router for all routes starting with /messages
app.use('/messages', messagesRouter);

// Start the server and listen on the defined port
app.listen(PORT, () => {  
    console.log(`Listening on ${PORT}...`);  
});

const express = require('express');

// Import the messages controller which has functions to handle requests
const messagesController = require('../controllers/messages.controller');

// Create a router for messages routes
const messagesRouter = express.Router();

// Route to get messages (GET request)
// Calls the 'getMessages' function from the controller
messagesRouter.get('/', messagesController.getMessages);

// Route to post a new message (POST request)
// Calls the 'postMessage' function from the controller
messagesRouter.post('/', messagesController.postMessage);

// Export this router so it can be used in server.js
module.exports = messagesRouter;

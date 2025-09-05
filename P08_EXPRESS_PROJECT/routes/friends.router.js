const express = require('express');

// Import the friends controller which has functions to handle requests
const friendsController = require('../controllers/friends.controller');

// Create a new router object for friends routes
const friendsRouter = express.Router();

// Middleware to run for every request to this router
// It logs the IP address of the client making the request
friendsRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  next(); // Go to the next route or middleware
});

// Define a POST route at '/' to add a new friend
// Calls the 'postFriend' function in the controller
friendsRouter.post('/', friendsController.postFriend);

// Define a GET route at '/' to get all friends
// Calls the 'getFriends' function in the controller
friendsRouter.get('/', friendsController.getFriends);

// Define a GET route with a parameter ':friendId' to get a single friend by ID
// Calls the 'getFriend' function in the controller
friendsRouter.get('/:friendId', friendsController.getFriend);

// Export the router so it can be used in server.js
module.exports = friendsRouter;
// Import express package  
// This imports the "express" library so we can use it in our code
const express = require('express');  
  

// We create an Express app object, which will act as our server  
// This line creates an Express application (our server) that will handle requests and responses  
const app = express();   

// Port number where the server will run  
// This is the port number where our server will be available  
const PORT = 3000;  

// friends list
const friends = [
    { id: 0, name: 'Albert Einstein' },
    { id: 1, name: 'Sir Isaac Newton' }
];
// Middleware that logs each incoming request
app.use((req, res, next) => {
    const start = Date.now();  // Record the start time of the request
    next();                    // Pass control to the next middleware/route
    const delta = Date.now() - start;  // Calculate time taken for processing
    console.log(`${req.method} ${req.url} ${delta}ms`);  // Log method, URL, and response time
});

// Middleware to parse JSON data from incoming requests
// This lets us access req.body when we receive POST requests
app.use(express.json());

// ---- Routes Section ----

// POST route: Add a new friend
app.post('/friends', (req, res) => {
    // Check if 'name' is provided in the request body
    if(!req.body.name) {
        // If not, send a 400 Bad Request response with an error message
        return res.status(400).json({
            error: "Missing friend name"
        });
    }

    // Create a new friend object
    const newFriend = {
        name: req.body.name,
        id: friends.length  // Assign a new ID based on current array length
    };

    // Add the new friend to our friends array
    friends.push(newFriend);

    // Respond with the newly created friend as JSON
    res.json(newFriend); 
});

// Route to get all friends
app.get('/friends', (req, res) => {
  // Send the entire friends list in JSON format
  res.json(friends);
});

// Route to get a single friend by ID (dynamic route with parameter :friendId)
app.get('/friends/:friendId', (req, res) => {
  
  const friendId = Number(req.params.friendId);   // Extract friendId from the request parameters (comes as a string) and convert it to a number

  const friend = friends[friendId];   // Find the friend from the array using the friendId as an index

  // If the friend exists in the array
  if (friend) {
    res.status(200).json(friend);  // Respond with status code 200 (OK) and return the friend data in JSON
  } else {
    res.status(404).json({     // If the friend is not found, respond with status code 404 (Not Found) and return an error message in JSON format
      error: 'Friend does not exist'
    });
  }
});

// Start the server  
// The server will run on port 3000 and print a message on the console  
app.listen(PORT, () => {  
    console.log(`Listening on ${PORT}...`);  
}); 
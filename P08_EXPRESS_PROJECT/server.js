// Import express package  
const express = require('express');  
// This imports the "express" library so we can use it in our code  

// We create an Express app object, which will act as our server  
const app = express();  
// This line creates an Express application (our server) that will handle requests and responses  

// Port number where the server will run  
const PORT = 3000;  
// This is the port number where our server will be available  

// Route 1: Root URL ('/')  
// When the user opens http://localhost:3000/  
// A JSON object will be sent as the response (containing id and name)  
app.get('/', (req, res) => {  
    res.send({  
        id: 1,  
        name: 'Sir Isaac Newton'  
    });  
});  

// Route 2: '/messages'  
// When the user opens http://localhost:3000/messages  
// A simple HTML list will be sent as the response  
app.get('/messages', (req, res) => {  
    res.send('<ul><li>Hello Albert!</li></ul>');  
});  

// Start the server  
// The server will run on port 3000 and print a message on the console  
app.listen(PORT, () => {  
    console.log(`Listening on ${PORT}...`);  
});  

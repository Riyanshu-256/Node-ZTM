const http = require('http');  // Import http module to make a server

const PORT = 3000;  // Port number where server will run

const server = http.createServer();  // Create a server

// Some sample friends data
const friends = [
  { id: 0, name: 'Nikola Tesla' },
  { id: 1, name: 'Sir Isaac Newton' },
  { id: 2, name: 'Albert Einstein' }
];

// Handle requests
server.on('request', (req, res) => {
  const items = req.url.split('/'); // Split URL into parts. Example: /friends/2 → ['', 'friends', '2']

  // If user asks for /friends
  if (items[1] === 'friends') {
    res.statusCode = 200;  
    res.setHeader('Content-Type', 'application/json');  

    // If a specific ID is given like /friends/2
    if (items.length === 3) {
      const friendIndex = Number(items[2]);  
      res.end(JSON.stringify(friends[friendIndex]));  // Send only that one friend
    } else {
      res.end(JSON.stringify(friends));  // Send full friends list
    }

  // If user asks for /messages
  } else if (items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');  
    res.write('<html><body><ul>');  
    res.write('<li>Hello Isaac!</li>');  
    res.write('<li>What are your thoughts on astronomy?</li>');  
    res.write('</ul></body></html>');  
    res.end();  // Send HTML page with messages

  // If user asks for something else
  } else {
    res.statusCode = 404;  
    res.end();  // Send "Not Found"
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// Open in browser: http://localhost:3000

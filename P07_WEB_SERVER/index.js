const http = require('http');  // Load http module to make a server

const PORT = 3000;  // Port where server will run

const server = http.createServer();  // Create a server

// A list of friends (sample data)
const friends = [
  { id: 0, name: 'Nikola Tesla' },
  { id: 1, name: 'Sir Isaac Newton' },
  { id: 2, name: 'Albert Einstein' }
];

server.on('request', (req, res) => {
  const items = req.url.split('/');  // Break URL into parts like /friends/2 → ['', 'friends', '2']

  // Handle POST request → Add a new friend
  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', (data) => {
      const friend = data.toString();  // Convert data to string
      console.log('Request', data);  // Log received data
      friends.push(JSON.parse(friend));  // Add new friend to array
    });
    req.pipe(res); // Send back what was received

  // Handle GET request → Get all friends or one by ID
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (items.length === 3) {  
      const friendIndex = Number(items[2]);  // Take ID from URL
      res.end(JSON.stringify(friends[friendIndex]));  // Send one friend
    } else {
      res.end(JSON.stringify(friends));  // Send all friends
    }

  // Handle /messages → Send simple HTML page
  } else if (items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><ul>');
    res.write('<li>Hello Isaac!</li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul></body></html>');
    res.end();

  // Handle unknown URL → Show 404
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
// Open in browser: http://localhost:3000

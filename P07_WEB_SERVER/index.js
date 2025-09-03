// Load the 'http' module to create a web server
const http = require('http');

// Choose the port where the server will run
const PORT = 3000;

// Make a server that sends data when someone visits
const server = http.createServer((req, res) => {
    // Tell browser we are sending JSON data with status 200 (OK)
    res.writeHead(200, { 'Content-type': 'application/json' });

    // Send a simple JSON object as response
    res.end(JSON.stringify({ id: 1, name: 'Sir Isaac Newton' }));
});

// Start the server and show message in console
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

// 127.0.0.1 or localhost is the address to open this server in browser

// Load the 'http' module to make a web server
const http = require('http');

// Set the port number for the server
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {

    // If the user visits /friends
    if (req.url === '/friends') {
        res.statusCode = 200; // Status OK
        res.setHeader('Content-type', 'application/json'); // Tell browser it's JSON
        res.end(JSON.stringify({ id: 1, name: 'Sir Isaac Newton' })); // Send JSON data

    // If the user visits /messages
    } else if (req.url === '/messages') {
        res.setHeader('Content-type', 'text/html'); // Tell browser it's HTML
        // Send simple HTML message
        res.write('<html><body><ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('</ul></body></html>');
        res.end();

    // For any other page
    } else {
        res.statusCode = 404; // Page not found
        res.end();
    }
});

// Start the server and show message in console
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

// 127.0.0.1 or localhost is used to open this server in browser

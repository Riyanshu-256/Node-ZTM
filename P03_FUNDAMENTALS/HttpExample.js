const http = require('http');  // makes a request to a website (here, Google) or used to import a module

const req = http.request('http://www.google.com', (res) => {  // make an HTTP request
    res.on('data', (chunk) => {  // Starts whenever the website sends data
        console.log(`Data chunk: ${chunk}`);
    });
    res.on('end', () => {  // runs when all the data has arrived
        console.log('No more data');
    });
});

req.end();  // actually sends the request to the server
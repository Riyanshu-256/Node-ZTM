/*
// Import "send" function from request.js file
import { send } from './request';

// Import "read" function from response.js file
import { read } from './response';

// Function that sends a request and gets a response
function makeRequest(url, data) {
  // Send data to the given URL
  send(url, data);

  // Return the response
  return read();
}

// Call the function and store the response
const responseData = makeRequest('https://google.com', 'hello');

// Print the response on the console
console.log(responseData);
*/

//------------------------------------------------------------------------------------//

const request = require('./request');

request.send = function() {
  console.log('custom send function');
}

request.send();
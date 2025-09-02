// Import the functions and values from request.js
// const request = require('./request');

// Import the functions from response.js
// const response = require('./response');

// builtinModules.exports is exporting an object
builtinModules.exports = {
    // Import everything from './request' and add it to the export object
    ...require('./request'),
    
    // Import everything from './response' and add it to the export object
    ...require('./response'),
};


// Export selected items so other files can use them
// module.exports = {
    
  // Share the timeout setting from request.js
  // REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
  
  // Share the send function from request.js
  // send: request.send,
  
  // Share the read function from response.js
  // read: response.read,
// };
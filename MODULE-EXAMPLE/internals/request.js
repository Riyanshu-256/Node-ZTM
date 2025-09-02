const REQUEST_TIMEOUT = 500; 

// This function changes the data into a safe (encrypted) form
function encrypt(data) {
  return 'encrypted data' ; // give back the safe version of data
}

// This function sends the data to a website (URL)
function send(url, data) {
  // Make the data safe before sending
  const encryptedData = encrypt(data);

  // Show a message: what data is sent and where it is going
  console.log(`sending ${encryptedData} to ${url}`);
}

// Allow other files to use REQUEST_TIMEOUT and send
module.export = {
    REQUEST_TIMEOUT,
    send,
}

console.log('Hello from request.js!');
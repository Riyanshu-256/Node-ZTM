// It helps in making safe file paths (works on all OS)
const path = require('path');

// Function to handle GET request (when user opens / messages page)
function getMessages(req, res) {
  // Show the 'messages' page and send two values (title and friend)
  res.render('messages', {
    title: 'Messages to my Friends!',  // Page title
    friend: 'Elon Musk',   // Friend name to show
  });

  // (Optional) Instead of rendering the page, we can send an image file directly
  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'));
}

// Function to handle POST request (when user submits a message)
function postMessage(req, res) {
  // Print a message in the server console
  console.log('Updating messages...');

  // NOTE: No response is sent back to the user yet
  // Should add res.send("Message saved!") or res.redirect("/messages")
}

// Export both functions so they can be used in other files (like routes.js)
module.exports = {
  getMessages,   // For GET request
  postMessage,   // For POST request
};

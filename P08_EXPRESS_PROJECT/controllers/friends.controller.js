// Load the friends array (our data storage)
const model = require('../model/friends.model');

// Add a new friend (POST request)
function postFriend(req, res) {
  // If name is missing in request, return error
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Missing friend name'
    });
  }

  // Create a new friend object with name and ID
  const newFriend = {
    name: req.body.name,
    id: model.length, // ID is current number of friends
  };

  // Add the new friend to the array
  model.push(newFriend);

  // Send the new friend back to the user
  res.json(newFriend);
}

// Get all friends (GET request)
function getFriends(req, res) {
  // Return the whole friends array
  res.json(model);
}

// Get a single friend by ID (GET request)
function getFriend(req, res) {
  const friendId = Number(req.params.friendId); // Convert ID to number
  const friend = model[friendId];               // Find friend in array

  if (friend) {
    // If found, send friend data
    res.status(200).json(friend);
  } else {
    // If not found, send error message
    res.status(404).json({
      error: 'Friend does not exist'
    });
  }
}

// Export all functions so other files can use them
module.exports = {
  postFriend,
  getFriends,
  getFriend,
};

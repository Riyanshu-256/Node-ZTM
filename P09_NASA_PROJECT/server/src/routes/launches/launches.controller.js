// Import required functions from launches.model to interact with launch data
const { 
  getAllLaunches,   // Fetch all launches
  addNewLaunch,     // Add a new launch
  existsLaunchWithId, // Check if a launch exists with a given ID
  abortLaunchById,  // Abort a launch with a given ID
} = require('../../models/launches.model');

// Controller function to handle GET /launches
// Responds with all available launches as JSON
function httpGetAllLaunches(req, res) {
  // Get all launches and return as JSON with 200 (OK) status
  return res.status(200).json(getAllLaunches());
}

// Controller function to handle POST /launches
// Adds a new launch based on data sent in the request body
function httpAddNewLaunch(req, res) {
  const launch = req.body; // Extract launch data from request body

  // Validate that all required properties are present
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property', // Send error response if data is missing
    });
  }

  // Convert launchDate from string to Date object
  launch.launchDate = new Date(launch.launchDate);

  // Check if the provided date is invalid (NaN)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date', // Send error response for invalid date
    });
  }

  // Add the new launch using the model function
  addNewLaunch(launch);

  // Respond with 201 (Created) status and the added launch data
  return res.status(201).json(launch);
}

// Controller function to handle DELETE /launches/:id
// Aborts a launch with a given ID
function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); // Extract launch ID from URL and convert to number

  // Check if launch exists with the given ID
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found', // Send 404 if launch doesn't exist
    });
  }

  // Attempt to abort the launch
  const aborted = abortLaunchById(launchId);

  // If aborting failed, send a 400 error
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }

  // If successful, return a success response
  return res.status(200).json({
    ok: true,
  });
}

// Export controller functions so they can be used in routes
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};

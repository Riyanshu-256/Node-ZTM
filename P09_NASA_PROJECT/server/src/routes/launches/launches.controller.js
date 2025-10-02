// Importing functions from the launches model to interact with launch data
// - getAllLaunches: Fetches all launch records
// - scheduleNewLaunch: Adds a new launch to the data
// - existsLaunchWithId: Checks if a launch exists by its ID
// - abortLaunchById: Aborts a launch by its ID
const { 
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require('../../models/launches.model');

// Controller function to handle GET requests for all launches
// Sends a JSON response with status 200 (OK) containing all launches
async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

// Controller function to handle POST requests to add a new launch
async function httpAddNewLaunch(req, res) {
  const launch = req.body; // Extract launch data from the request body

  // Validate that all required properties are present
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  // Convert the launchDate string into a Date object
  launch.launchDate = new Date(launch.launchDate);

  // Check if the date is valid
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  // Schedule the new launch by adding it to the data
  await scheduleNewLaunch(launch);

console.log(launch);

  // Respond with status 201 (Created) and return the launch object
  return res.status(201).json(launch);
}

// Controller function to handle DELETE requests to abort a launch
function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); // Get launch ID from URL parameters

  // Check if a launch with the given ID exists
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  // Attempt to abort the launch
  const aborted = abortLaunchById(launchId);

  // If abort failed, return status 400
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }

  // If abort succeeded, return status 200 with confirmation
  return res.status(200).json({
    ok: true,
  });
}

// Export the controller functions so they can be used in route definitions
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};

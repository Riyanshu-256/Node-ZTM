/*
This file acts like a simple in-memory "database" for launches.
It stores all launch data, lets us add new launches, get all launches,
check if a launch exists, and mark a launch as aborted.
*/

// Store all launches in a Map (key = flightNumber, value = launch object)
const launches = new Map();

// Keep track of the latest flight number so each new launch gets a unique ID
let latestFlightNumber = 100;

// Initial launch data (sample launch)
const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,  // Still scheduled to launch
  success: true,   // Considered a successful mission
};

// Add the initial launch to the Map
launches.set(launch.flightNumber, launch);

/*
Check if a launch exists by its flight number
- Returns true if found, false if not
*/
function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

/*
Get all launches as an array
- Converts Map values into a simple array so we can send as JSON
*/
function getAllLaunches() {
  return Array.from(launches.values());
}

/*
Add a new launch
- Increments flight number
- Adds success, upcoming, and customers fields automatically
- Stores the new launch in the Map
*/
function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    launch.flightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}

/*
Abort a launch by ID
- Marks the launch as not upcoming and unsuccessful
- Returns the updated launch object
*/
function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

// Export functions so controllers can use them
module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

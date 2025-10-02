/*
This file acts like a simple in-memory "database" for launches.
It stores all launch data, lets us add new launches, get all launches,
check if a launch exists, and mark a launch as aborted.
*/

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

// Store all launches in a Map (key = flightNumber, value = launch object)
// const launches = new Map(); // Removed as we are using MongoDB now

// Keep track of the latest flight number so each new launch gets a unique ID
// let latestFlightNumber = 100; // Removed, now derived from DB

const DEFAULT_FLIGHT_NUMBER = 100;

// Initial launch data (sample launch)
const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,  // Still scheduled to launch
  success: true,   // Considered a successful mission
};

// saveLaunch(launch); // This call is moved to loadLaunchesData

// Add the initial launch to the Map
// launches.set(launch.flightNumber, launch);

async function loadLaunchesData() {
  await saveLaunch(launch);
}

/*
Check if a launch exists by its flight number
- Returns true if found, false if not
*/
async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

/*
Get all launches as an array
- Converts Map values into a simple array so we can send as JSON
*/
async function getAllLaunches() {
  return await launchesDatabase
  .find({}, { '_id': 0, '__v': 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    KeplerName: launch.target,
  });

  if(!planet){
    throw new Error('No matching planet found');
  }

  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

async function scheduleNewLaunch(launch){
  const newFlightNumber = await getLatestFlightNumber() + 1; 

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

/*
Abort a launch by ID
- Marks the launch as not upcoming and unsuccessful
- Returns the updated launch object
*/
async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  });
  return aborted.modifiedCount === 1;
}

// Export functions so controllers can use them
module.exports = {
  loadLaunchesData,
  existsLaunchWithId,
  getAllLaunches,
  abortLaunchById,
  scheduleNewLaunch,
};

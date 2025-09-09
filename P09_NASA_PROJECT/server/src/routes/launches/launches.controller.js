// Importing the data from launches.model so that we could access it 
const { 
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
} = require('../../models/launches.model');

// Creating the getAllLaunches function so that we could access all the launches data 
function httpGetAllLaunches(req, res) {

    // Geeting the data from launches by launches.values() and converting it to array by Array.from() and treating it as json 
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    const launchId = req.params.id;

    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
        error: 'Lunch not found',
    });
    }

    // if launch does exist
    return res.status(200).json(aborted);
}

// Exporting the data as module
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}
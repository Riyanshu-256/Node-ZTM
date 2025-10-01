/*
This file is like the “manager” for planets. It takes requests from users (like “give me all planets”), talks to the model to get or change data, and then sends the correct answer back to the user.
*/

// Import (load) the planets data from the planets.model file
const { getAllPlanets } = require('../../models/planets.model');

// Define a function to handle requests for "all planets"
async function httpGetAllPlanets(req, res) {
    // Send back a response with status 200 (OK) 
    // and return the planets data in JSON format
    const planetsData = await getAllPlanets();
    console.log('API Response Planets:', planetsData.length);
    return res.status(200).json(planetsData);
}

// Export the function so it can be used in other files (like routes)
module.exports = {
    httpGetAllPlanets,
}

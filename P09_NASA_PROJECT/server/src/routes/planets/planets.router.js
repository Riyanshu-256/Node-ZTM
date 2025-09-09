/*
This file defines routes for the planets API.
It connects the /planets endpoint to the correct controller function.
*/

const express = require('express');

// Import controller to handle getting all planets
const { httpGetAllPlanets } = require('./planets.controller');

// Create a router for /planets
const planetsRouter = express.Router();

// GET /planets → returns all planets
planetsRouter.get('/', httpGetAllPlanets);

// Export the router so app.js can use it
module.exports = planetsRouter;

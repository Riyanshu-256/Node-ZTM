// Import Express to create routes
const express = require('express');

// Import controller functions for launches
const {
  httpGetAllLaunches,  // Get all launches
  httpAddNewLaunch,    // Add a new launch
  httpAbortLaunch,     // Abort a launch by ID
} = require('./launches.controller');

// Create router for all /launches endpoints
const launchesRouter = express.Router();

// Define routes for launches
launchesRouter.get('/', httpGetAllLaunches);    // GET all launches
launchesRouter.post('/', httpAddNewLaunch);     // POST new launch
launchesRouter.delete('/:id', httpAbortLaunch); // DELETE launch by ID

// Export router to be used in app.js
module.exports = launchesRouter;

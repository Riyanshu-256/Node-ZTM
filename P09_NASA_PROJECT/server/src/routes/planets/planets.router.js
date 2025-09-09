/*
This file is like a “map” for the planets API. It matches URLs (like /planets) to the right controller function, so every request goes to the correct place.
*/

const express = require('express');

const {
  httpGetAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetAllPlanets);

module.exports = planetsRouter;

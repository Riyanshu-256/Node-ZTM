/*
This is the starting point of the project. It runs the app on a specific port so that users can send requests and get responses.
*/

// Load Node.js module to create an HTTP server
const http = require('http');

// Load your Express app which handles all routes and logic
const app = require('./app');

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

// Get the port number from environment variables (useful for hosting)
// If no port is set, use 8000 as default
const PORT = process.env.PORT || 8000;

// Create an HTTP server that uses your Express app to handle requests
const server = http.createServer(app);

async function startServer() {
  // Connect to MongoDB
  await mongoConnect();

  await loadPlanetsData();
  await loadLaunchesData();

  // Start the server and listen on the specified port
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
}

startServer();

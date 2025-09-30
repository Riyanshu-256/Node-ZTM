/*
This is the starting point of the project. It runs the app on a specific port so that users can send requests and get responses.
*/

// Load Node.js module to create an HTTP server
const http = require('http');
const mongoose = require('mongoose');

// Load your Express app which handles all routes and logic
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

// Get the port number from environment variables (useful for hosting)
// If no port is set, use 8000 as default
const PORT = process.env.PORT || 8000;

// Replace <db_password> with your actual password
const MONGO_URL =
  'mongodb+srv://nasa-api:mZW8omvljiskRwJf@nasacluster.kpehvk3.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster';

// Create an HTTP server that uses your Express app to handle requests
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

async function startServer() {
  // Connect to MongoDB
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  // Start the server and listen on the specified port
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
}

startServer();

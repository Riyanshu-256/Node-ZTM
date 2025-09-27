const { parse } = require('csv-parse');  // Import the csv-parse library
const fs = require('fs');  // Import the file system module

const habitablePlanets = [];  // Store only habitable planets here

// Function to check if a planet is habitable
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'   // Planet is confirmed
    && planet['koi_insol'] > 0.36   // Insolation (sunlight) not too low
    && planet['koi_insol'] < 1.11   // Insolation not too high
    && planet['koi_prad'] < 1.6;   // Planet size less than 1.6 Earth radius
}

// Read the CSV file as a stream
fs.createReadStream('kepler_data.csv')
  .pipe(parse({    // Parse the CSV line by line
    comment: '#',  // Skip lines that start with #
    columns: true,    // Use first row as column names
  }))
  .on('data', (data) => {    // For each row in the file
    if (isHabitablePlanet(data)) {  // If the planet is good for life
      habitablePlanets.push(data);  // Save it in the list
    }
  })
  .on('error', (err) => {    // If something goes wrong
    console.log(err);     // Show the error
  })
  .on('end', () => {    // When file is fully read
    console.log(habitablePlanets.map((planet) => {
      return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);  // Show total habitable planets
  });
const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs');
const planets = require('./planets.mongo');

const results = [];
const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    // TODO: Replace below create with insert + update = upset
                    // await planets.create({
                    //     KeplerName: data.kepler_name,
                    // });
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            }) 
            .on('end', () => {
                console.log(`Total habitable planets: ${habitablePlanets.length}`);
                resolve();
            });
    });
}

async function getAllPlanets(){
    return await planets.find({});
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}

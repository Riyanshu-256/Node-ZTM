const mongoose = require('mongoose');


// Replace <db_password> with your actual password
const MONGO_URL =
  'mongodb+srv://nasa-api:mZW8omvljiskRwJf@nasacluster.kpehvk3.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster';

// runs once when the connection is successfully opened.
mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

// listens continuously for any connection errors.
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}
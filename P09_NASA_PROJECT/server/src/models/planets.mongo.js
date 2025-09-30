const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    KeplerName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Planet', planetSchema);
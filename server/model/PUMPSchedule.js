const mongoose = require('mongoose');

const PUMPSchema = new mongoose.Schema({
    start: String,
    long: {
        type: Number,
        min: 1
    },
    day: Number,
    date: String,
    note: String,
    status: Number
});

module.exports = mongoose.model('PUMPDatabase', PUMPSchema);
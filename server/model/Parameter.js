const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
    name: String,
    value: mongoose.Schema.Types.Decimal128,
    timestamp: {
        type: Date,
        default: Date.now
    },
    device_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Parameter', parameterSchema);


const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: String,
    type: String,
    interval: [
        {
            start_time: {
                type: Date,
                default: Date.now
            },
            end_time: Date
        }
    ],
    state: Number
});

module.exports = mongoose.model('Device', deviceSchema);


const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    start_time: Date,
    end_time: Date,
    user_id: mongoose.Schema.Types.ObjectId,
    device_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Calendar', calendarSchema);


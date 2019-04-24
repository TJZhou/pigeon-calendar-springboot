const mongoose = require('mongoose');

// Set the eventSchema
const eventSchema = mongoose.Schema({
    // Special type a serial String ID
    // _id: mongoose.Types.ObjectId,
    // _id: mongoose.Schema.Types.ObjectId,
    username: String, 
    title: String,
    location: String,
    startTime: String,
    endTime: String
});

// Export Contact model
module.exports = mongoose.model('Event', eventSchema);
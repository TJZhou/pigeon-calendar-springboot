const mongoose = require('mongoose');

// Set the contactSchema
const userSchema = mongoose.Schema({
    // Special type a serial String ID
    // _id: mongoose.Types.ObjectId,
    // _id: mongoose.Schema.Types.ObjectId,
    username: String, 
    password: String, 
    email: String
});

// Export Contact model
module.exports = mongoose.model('User', userSchema);
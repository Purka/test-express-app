const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    text: String,
    date: Date,
    id: String
});

mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');
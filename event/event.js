const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    text: String,
    date: Date
});

mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');
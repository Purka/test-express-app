'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EventSchema = new mongoose.Schema({
    title: String,
    text: String,
    date: Date,
    owner: String
});

EventSchema.plugin(mongoosePaginate);
mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');
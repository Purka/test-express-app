const isValidDate = require('is-valid-date');

const validateEvent = (event) => {
    if(!event.title) throw new Error('Event title is required');
    if(!event.text) throw new Error('Event text is required');
    if(!event.date) throw new Error('Event date is required');
    if(!isValidDate(event.date)) throw new Error('Event date is invalid');
}

module.exports.validateEvent = validateEvent;

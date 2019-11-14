'use strict';

const Event = require('../models/EventModel');

exports.create = (req, res) => {
    const event = {
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        id: req.decoded.id
    };

    try {
        helpers.validateEvent(event);
    } catch (e) {
        return res.status(400).send(e.message);
    }

    Event.create(event, (err, event) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Fail to add the information to the database.'
            });
        }
        res.status(200).send(event.id);
    });
};

exports.getEvents = (req, res) => {
    let filter = { id: req.decoded.id };

    if (req.body.date) {
        filter.date = req.body.date
    }

    Event.paginate(filter, { page: 1, limit: 10 }, (err, events) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'There was a problem finding the events.'
            });
        }
        res.status(200).send(events.docs);
    });
};

exports.updateEvent = (req, res) => {
    const event = {
        title: req.body.title,
        text: req.body.text,
        date: req.body.date
    };

    try {
        helpers.validateEvent(event);
    } catch (e) {
        return res.status(400).send(e.message);
    }

    Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, event) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'There was a problem updating the event.'
            });
        }
        res.status(200).send(event);
    });
};

exports.deleteEvent = (req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'There was a problem deleting the event.'
            });
        }
        res.status(200).send('Event ' + event.title + ' was deleted.');
    });
};


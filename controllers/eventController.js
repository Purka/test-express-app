'use strict';

const Event = require('../models/EventModel');
const { oneOf, body, validationResult } = require("express-validator/check");

exports.validate = (method) => {
    switch (method) {
        case "create": {
            return [
                body("title", "title is missing").exists(),
                body("text", "text is missing").exists(),
                body("date", "date is missing").exists(),
                body("date", "date is wrong format").isISO8601()
            ]
        }
        case "update": {
            return [
                oneOf([
                    body("title", "title is missing").exists(),
                    body("text", "text is missing").exists(),
                    body("date", "date is missing").exists(),
                ]),
                body("date", "date is wrong format").isISO8601(),
            ]
        }
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

    const event = {
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        owner: req.decodedId
    };

    try {
        let result = await Event.create(event);

        return res.status(200).json({
            success: true,
            message: 'Event succesfully added',
            id: result._id
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Fail to add the information to the database.',
            err: err.message
        });
    }
};

exports.getEvents = async (req, res) => {
    let filter = { owner: req.decodedId };

    if (req.body.date) {
        filter.date = req.body.date
    }

    try {
        const events = await Event.paginate(filter, { page: 1, limit: 10 });
        return res.status(200).json(events.docs);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'There was a problem finding the events.'
        });
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

    let filter = { owner: req.decodedId, _id: req.params.id };

    const event = {};
    if (req.body.title) event.title = req.body.title;
    if (req.body.text) event.text = req.body.text;
    if (req.body.date) event.date = req.body.date;

    try {
        const result = await Event.findOneAndUpdate(filter, event);

        if (!result) return res.status(200).json({
            success: false,
            message: 'There is no such event'
        });

        return res.status(200).json({
            success: true,
            message: "Successfully updated",
            event: event
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'There was a problem finding the events.'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        let filter = { owner: req.decodedId, _id: req.params.id };
        let result = await (Event.findOneAndRemove(filter));

        if (!result) return res.status(500).json({
            success: false,
            message: 'Event with such id doe not exists'
        });

        return res.status(200).json({
            success: true,
            message: 'Event ' + req.params.id + ' was deleted.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'There was a problem deleting the event.',
            err: err.message
        });
    }
};


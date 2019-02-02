const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const assert = require('assert');
const Event = require('./Event');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    const event = { title: req.body.title, text: req.body.text, date: req.body.date };
    Event.create(event, (err, event) => {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(event);
    });
});

router.get('/', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) return res.status(500).send("There was a problem finding the events.");
        res.status(200).send(events);
    });
});

router.put('/:id', function (req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("There was a problem updating the event.");
        res.status(200).send(user);
    });
});

router.delete('/:id', (req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
        if (err) return res.status(500).send("There was a problem deleting the event.");
        res.status(200).send("Event "+ event.title +" was deleted.");
    });
});

module.exports = router;
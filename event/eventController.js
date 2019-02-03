const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const assert = require('assert');
const Event = require('./Event');
const User = require('../user/User');
const checkAuth = require('../auth/checkAuth')
const isValidDate = require('is-valid-date');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    checkAuth(req, res, userId => {
        if(!req.body.title) return res.status(400).send('You should enter a title for event');
        if(!req.body.text) return res.status(400).send('You should enter a text for event');
        if(!req.body.date) return res.status(400).send('You should enter a date for event');
        if(!isValidDate(req.body.date)) return res.status(400).send('Not valid date');

        const event = { title: req.body.title, text: req.body.text, date: req.body.date, id: userId };
        Event.create(event, (err, event) => {
            if (err) return res.status(500).send('There was a problem adding the information to the database.');
            res.status(200).send(event.id);
        });
    });
});

router.get('/', (req, res) => {
    checkAuth(req, res, userId => {
        Event.find({}, (err, events) => {
            if (err) return res.status(500).send('There was a problem finding the events.');
            let userEvents = showOnlyMyEvents(events, userId);
            res.status(200).send(userEvents);
        });
    });
});

router.put('/:id', function (req, res) {
    checkAuth(req, res, () => {
        if(!req.body.title) return res.status(400).send('You should enter a title for event');
        if(!req.body.text) return res.status(400).send('You should enter a text for event');
        if(!req.body.date) return res.status(400).send('You should enter a date for event');
        if(!isValidDate(req.body.date)) return res.status(400).send('Not valid date');

        Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, event) => {
            if (err) return res.status(500).send('There was a problem updating the event.');
            res.status(200).send(event);
        });
    });
});

router.delete('/:id', (req, res) => {
    checkAuth(req, res, () => {
        Event.findByIdAndRemove(req.params.id, (err, event) => {
            if (err) return res.status(500).send('There was a problem deleting the event.');
            res.status(200).send('Event '+ event.title +' was deleted.');
        });
    });
});

module.exports = router;


const showOnlyMyEvents = (events, userId) => {
    let eventsArr = []
    events.forEach(event => {
        if(event.id === userId) {
            eventsArr.push(event);
        }
    });
    return eventsArr;
}

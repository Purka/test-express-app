const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const isValidDate = require('is-valid-date');
const checkAuth = require('../auth/checkAuth');
const dateFormat = require('dateformat');
const Event = require('./Event');
const User = require('../user/User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    checkAuth(req, res, userId => {
        const event = { title: req.body.title, text: req.body.text, date: req.body.date, id: userId };

        try {
            validateEvent(event);
        } catch(e) {
            return res.status(400).send(e.message);
        }

        Event.create(event, (err, event) => {
            if (err) return res.status(500).send('There was a problem adding the information to the database.');
            res.status(200).send(event.id);
        });
    });
});

router.get('/', (req, res) => {
    checkAuth(req, res, userId => {
        Event.paginate({}, { page: 1, limit: 10 }, (err, events) => {
            if (err) return res.status(500).send('There was a problem finding the events.');
            let userEvents = showOnlyMyEvents(events.docs, userId);
            // filter events by user's choice
            let filtered = userEvents.filter((event) => {
                return dateFormat(event.date) === dateFormat(req.body.date);
            });

            res.status(200).send(filtered);
        });
    });
});

router.put('/:id', (req, res) => {
    checkAuth(req, res, () => {
        const event = { title: req.body.title, text: req.body.text, date: req.body.date };

        try {
            validateEvent(event);
        } catch(e) {
            return res.status(400).send(e.message);
        }

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


const validateEvent = (event) => {
    if(!event.title) throw new Error('Event title is required');
    if(!event.text) throw new Error('Event text is required');
    if(!event.date) throw new Error('Eevnt date is required');
    if(!isValidDate(event.date)) throw new Error('Event date is invalid');
}

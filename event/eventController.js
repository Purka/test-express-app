const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const checkAuth = require('../auth/checkAuth');
const Event = require('./Event');
const User = require('../user/User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    // TODO: figure out or ask someone how to take out checkAuth()
    checkAuth(req, res, userId => {
        const event = {
            title: req.body.title,
            text: req.body.text,
            date: req.body.date,
            id: userId
        };

        try {
            helpers.validateEvent(event);
        } catch(e) {
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
    });
});

router.get('/', (req, res) => {
    checkAuth(req, res, userId => {
        let filter = { id: userId };

        if(req.body.date) {
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
    });
});

router.put('/:id', (req, res) => {
    checkAuth(req, res, () => {
        const event = {
            title: req.body.title,
            text: req.body.text,
            date: req.body.date
        };

        try {
            helpers.validateEvent(event);
        } catch(e) {
            return res.status(400).send(e.message);
        }

        Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, event) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'There was a problem updating the event.'
                });
            }
            res.status(200).send(event);
        });
    });
});

router.delete('/:id', (req, res) => {
    checkAuth(req, res, () => {
        Event.findByIdAndRemove(req.params.id, (err, event) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'There was a problem deleting the event.'
                });
            }
            res.status(200).send('Event '+ event.title +' was deleted.');
        });
    });
});

module.exports = router;

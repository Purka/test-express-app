const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const assert = require('assert');
const User = require('./User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    User.find({}, { password: 0 }, (err, users) => {
        if (err) return res.status(500).send('There was a problem finding the user.');
        res.status(200).send(users);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send('There was a problem finding the user.');
        if (!user) return res.status(404).send('No user found.');
        res.status(200).send(user);
    });
});

module.exports = router;
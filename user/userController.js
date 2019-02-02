const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const assert = require('assert');
const User = require('./User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    const user = { name : req.body.name, email : req.body.email, password : req.body.password };
    User.create(user, (err, user) => {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
});

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        res.status(200).send(users);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

module.exports = router;
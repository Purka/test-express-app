const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const checkAuth = require('./checkAuth');
const validator = require('validator');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    const isEmail = validator.isEmail(req.body.email);
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    if(!isEmail) return res.status(400).send('Not valid email.');
    if(req.body.password.length < 8) {
        return res.status(400).send('Password should have at least 8 characters');
    }

    let user = { email : req.body.email, password : hashedPassword };

    User.create(user, (err, user) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'There was a problem registering the user.',
                error: err
            });
        }

        res.status(200).send('You are successfully registered');
    })

});

router.post('/login', (req, res) =>{
    const isEmail = validator.isEmail(req.body.email);

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        if(!isEmail) return res.status(400).send('Not valid email.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                token: null
            });
        }

        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400});
        res.status(200).send({ auth: true, token: token});
    })
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});


router.get('/me', (req, res) => {
    checkAuth(req, res, id => {
        User.findById(id, { password: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
});

module.exports = router;

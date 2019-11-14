'use strict';

const User = require('../models/UserModel');
const { body, validationResult } = require('express-validator/check');
const bcrypt = require('../helpers/bcrypt')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.validate = (method) => {
    switch (method) {
        case 'register': {
            let isEmailExist = async (value) => {
                let result = await User.find({ email: value })
                return result.length > 0;
            }

            return [
                body('email', 'email is missing or wrong').exists().isEmail(),
                body('email', 'email is already exist').not().custom(isEmailExist),
                body('password', 'password is missing').exists()
            ]
        }
    }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

    const hash = bcrypt.encrypt(req.body.password);
    let user = { email: req.body.email, password: hash.hash, salt: hash.salt };

    try {
        await User.create(user);
        res.status(200).send('You are successfully registered');
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'There was a problem registering the user.',
            error: err
        });
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const user = await passport.authenticate('local', { session: false });
        await req.logIn(user, { session: false });
        let secret = new Buffer(config.get('jwt_secret'), 'base64');
        let token = jwt.sign({ "email": user.email }, secret, { algorithm: 'HS256', expiresIn: "60000s" });
        return res.json({ token });
    } catch (err) {
        return next({ status: 400, message: err.message });
    }
};



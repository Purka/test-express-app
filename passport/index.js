'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('../helpers/bcrypt');
const User = require('../models/UserModel');

const localStrategy = () => {
    passport.serializeUser((user, cb) => {
        cb(null, JSON.stringify(user));
    });
    passport.deserializeUser((obj, cb) => {
        cb(null, JSON.parse(obj));
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email: email.toLocaleLowerCase() });
                    if (!user) return done(null, false, 'User with such email does not exists');

                    const isPassCorrect = bcrypt.compare(password, user.password);
                    if (!isPassCorrect) return done(null, false, 'Incorrect pasword');
                    return done(null, user, 'Logged In Successfully');
                } catch (err) {
                    return err;
                }
            }
        )
    );
};

module.exports.initializeStrategies = () => {
    localStrategy();
};

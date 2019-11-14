'use strict';

const User = require('../models/UserModel');

exports.getUser = (req, res) => {
    User.find({}, { password: 0 }, (err, users) => {
        if (err) return res.status(500).send('There was a problem finding the user.');
        res.status(200).send(users);
    });
};

exports.getUserById = (req, res) => {
    User.findById(req.params.id, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send('There was a problem finding the user.');
        if (!user) return res.status(404).send('No user found.');
        res.status(200).send(user);
    });
};

exports.deleteUser = async (req, res) => {
    try {
        console.log(req.decoded)
        //await User.findOneAndRemove({ email: email.toLocaleLowerCase() });
        return res.status(200).send('User ' + email + ' was deleted.');
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'There was a problem deleting the user.'
        });
    }
};
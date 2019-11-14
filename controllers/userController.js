'use strict';

const User = require('../models/UserModel');

exports.getUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.decoded }, { password: 0, salt: 0 });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            });
        }

        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "There was a problem finding the user.",
            error: err
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndRemove({ email: req.decoded });
        return res.status(200).json({
            success: true,
            message: 'User ' + req.decoded + ' was deleted.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'There was a problem deleting the user.'
        });
    }
};
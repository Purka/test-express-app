'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.checkAuth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.send({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    let secret = new Buffer(config.get('jwt_secret'), 'base64')
    if (token) {
        jwt.verify(token, secret, { algorithms: ['HS256'] }, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded.email;
                req.decodedId = decoded.id;
                next();
            }
        });
    }
};


let jwt = require('jsonwebtoken');
const config = require('../config/config.js');

module.exports = checkAuth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                req.userId = decoded.id;
                next();
            }
        });
    } else {
        return res.send({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};


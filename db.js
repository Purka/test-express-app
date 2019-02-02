const url = 'mongodb://purka:f1234567@ds159634.mlab.com:59634/content-base';
const mongoose = require('mongoose');

mongoose.connect(url, { useNewUrlParser: true });

module.exports = {
    url: url,
}



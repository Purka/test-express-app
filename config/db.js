const url = 'Add here your db link';
const mongoose = require('mongoose');

mongoose.connect(url, { useNewUrlParser: true });

module.exports = {
    url: url,
}



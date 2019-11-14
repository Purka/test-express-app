const url = 'mongodb://admin:test123@ds159634.mlab.com:59634/content-base';
const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    } catch (err) {
        return console.log(err)
    }
}

main()


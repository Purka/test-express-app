const url = 'mongodb://<user>:<password>.mlab.com:<number>/<dbname>';
const mongoose = require('mongoose');

const main = async () => {
    try {
        mongoose.set('useFindAndModify', false);
        await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    } catch (err) {
        return console.log(err)
    }
}

main()


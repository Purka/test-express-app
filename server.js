const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    assert.strictEqual(null, err);
    console.log("Connected correctly to server");

    const db = database.db('event-base');
    const collection = db.collection('events');

    app.post('/events', (req, res) => {
        const event = { text: req.body.body, title: req.body.title };
        collection.insertOne(event, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/events/:id', (req, res) => {
        const id = req.params.id;
        const filter = { '_id': new ObjectID(id) };

        collection.findOne(filter, (err, item) => {
            assert.strictEqual(null, err);
            res.send(item);
        });
    });

    app.delete('/events/:id', (req, res) => {
        const id = req.params.id;
        const filter = { '_id': new ObjectID(id) };

        collection.removeOne(filter, (err, item) => {
            assert.strictEqual(null, err);
            res.send('Event ' + id + ' deleted');
        });
    });

    app.put('/events/:id', (req, res) => {
        const id = req.params.id;
        const filter = { '_id': new ObjectID(id) };
        const event = { $set: {text: req.body.body, title: req.body.title} };

        collection.updateOne(filter, event, (err, result) => {
            assert.strictEqual(null, err);
            res.send(event);
        });
    });

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})




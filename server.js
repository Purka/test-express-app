const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const assert = require('assert');
const app = require('./app/app');
const port = 8000;

const HandlerGenerator = require('./token/handlerGenerator');

let jwt = require('jsonwebtoken');
let middleware = require('./token/middleware');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});





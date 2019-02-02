const express = require('express');
const app = express();
const db = require('../config/db');
const UserController = require('../user/UserController');
const EventController = require('../event/EventController');

app.use('/users', UserController);
app.use('/events', EventController);

module.exports = app;
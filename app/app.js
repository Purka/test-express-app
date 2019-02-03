const express = require('express');
const app = express();
const db = require('../config/db')
const UserController = require('../user/UserController');
const EventController = require('../event/EventController');
const AuthController = require('../auth/AuthController');

app.use('/users', UserController);
app.use('/events', EventController);
app.use('/api/auth', AuthController);

module.exports = app;
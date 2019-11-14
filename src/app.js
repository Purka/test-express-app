'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger('SampleWebApp');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const passport = require('passport');
const cors = require('cors');
const router = require('../routes');
const expressValidator = require('express-validator');
const util = require('./utils')
const db = require('../config/db')

require('../passport/').initializeStrategies();

logger.level = 'debug';

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(passport.initialize());
app.use(expressValidator());
app.use('/', router);

app.listen(port, function () {
    logger.info('****************** SERVER STARTED ************************');
    logger.info('***************  http://%s:%s  ******************', 'localhost', port);
});

// catch 404 and forward to error handler
app.use(util.catchNotFound);
app.use(util.errorHandler);

module.exports = app;
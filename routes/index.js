var express = require('express');
var router = express.Router();

const userRouter = require('../routes/user');
const eventRouter = require('../routes/event');
const authRouter = require('../routes/auth');
const { checkAuth } = require('../middleware/checkAuth');

router.use('/users', checkAuth, userRouter);
router.use('/events', checkAuth, eventRouter);
router.use('/auth', authRouter);

module.exports = router;

const router = require('express').Router();
const Auth = require('../controllers/authController');

router.post('/register', Auth.validate('register'), Auth.register);
router.post('/login', Auth.login);

module.exports = router;

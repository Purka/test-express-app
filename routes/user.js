const router = require('express').Router();
const User = require('../controllers/userController');

router.get('/me', User.getUser);
router.delete('/delete', User.deleteUser);

module.exports = router;

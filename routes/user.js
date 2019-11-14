const router = require('express').Router();
const User = require('../controllers/userController');

router.get('/', User.getUser);
router.get('/:id', User.getUserById);
router.delete('/delete', User.deleteUser);

module.exports = router;

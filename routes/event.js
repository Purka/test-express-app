const router = require('express').Router();
const Event = require('../controllers/eventController');

router.post('/', Event.validate('create'), Event.create);
router.get('/', Event.getEvents);
router.put('/:id', Event.validate('update'), Event.update);
router.delete('/:id', Event.delete);

module.exports = router;

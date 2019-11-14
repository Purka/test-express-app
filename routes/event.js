const router = require('express').Router();
const Event = require('../controllers/eventController');

router.post('/', Event.create);
router.get('/', Event.getEvents);
router.put('/:id', Event.updateEvent);
router.delete('/:id', Event.deleteEvent);

module.exports = router;

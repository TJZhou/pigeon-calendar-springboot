// Import things we need
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Handle incoming GET requrests to /contacts
router.get('/list', eventController.list);
router.get('/list/:username', eventController.userList);
router.post('/', eventController.post);

router.get('/:eventId', eventController.get);
router.patch('/:eventId', eventController.patch);
router.delete('/:eventId', eventController.delete);

// Export the router
module.exports = router;
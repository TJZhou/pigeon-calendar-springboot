// Import things we need
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Handle incoming GET requrests to /contacts
router.get('/', userController.list);
router.post('/', userController.post);

router.get('/:username', userController.get);
router.patch('/:username', userController.patch);
router.delete('/:username', userController.delete);

// Export the router
module.exports = router;
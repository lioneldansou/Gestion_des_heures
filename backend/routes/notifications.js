const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

router.get('/', notificationsController.getTous);
router.patch('/:id/lu', notificationsController.marquerLu);

module.exports = router;
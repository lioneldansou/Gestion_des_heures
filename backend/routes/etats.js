const express = require('express');
const router = express.Router();
const etatsController = require('../controllers/etatsController');

router.get('/', etatsController.getEtat);

module.exports = router;
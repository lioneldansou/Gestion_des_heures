const express = require('express');
const router = express.Router();
const parametresController = require('../controllers/parametresController');

router.get('/', parametresController.getTous);
router.post('/', parametresController.sauvegarder);

module.exports = router;
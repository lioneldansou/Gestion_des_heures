const express = require('express');
const router = express.Router();
const periodesController = require('../controllers/periodesController');

router.get('/', periodesController.getTous);
router.post('/', periodesController.ajouter);
router.delete('/:id', periodesController.supprimer);

module.exports = router;
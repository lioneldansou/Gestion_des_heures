const express = require('express');
const router = express.Router();
const departementsController = require('../controllers/departementsController');

router.get('/', departementsController.getTous);
router.post('/', departementsController.ajouter);
router.delete('/:id', departementsController.supprimer);

module.exports = router;
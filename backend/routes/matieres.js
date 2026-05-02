const express = require('express');
const router = express.Router();
const matieresController = require('../controllers/matieresController');

router.get('/', matieresController.getTous);
router.post('/', matieresController.ajouter);
router.delete('/:id', matieresController.supprimer);

module.exports = router;
const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateursController');

router.get('/', utilisateursController.getTous);
router.post('/', utilisateursController.ajouter);
router.delete('/:id', utilisateursController.supprimer);

module.exports = router;
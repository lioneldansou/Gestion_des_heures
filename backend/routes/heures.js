const express = require('express');
const router = express.Router();
const heuresController = require('../controllers/heuresController');

router.get('/', heuresController.getTous);
router.post('/', heuresController.ajouter);
router.delete('/:id', heuresController.supprimer);
router.patch('/:id/statut', heuresController.mettreAJourStatut);

module.exports = router;
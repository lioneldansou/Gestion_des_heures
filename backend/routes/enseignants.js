const express = require('express');
const router = express.Router();

// Importer le controller
const enseignantsController = require('../controllers/enseignantsController');

// Route GET - récupérer tous les éléments
router.get('/', enseignantsController.recup);

// Route POST - ajouter un élément
router.post('/', enseignantsController.ajouter);

// Route DELETE - supprimer un élément par id
router.delete('/:id', enseignantsController.supp);

module.exports = router;
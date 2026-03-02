const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');

router.post('/create', boxController.createBox);
router.put('/:id', boxController.updateBox);
router.get('/all', boxController.getAllBoxes);
router.get('/', boxController.getAllBoxesPaginated);
router.post('/statuscreate', boxController.createStatusDisponibilite);
router.post('/contrat/statuscreate', boxController.createStatusContrat);
router.post('/contrat/create', boxController.createContratBox);

module.exports = router;
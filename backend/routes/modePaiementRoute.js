const express = require('express');
const router = express.Router();
const modePaiementController = require('../controllers/modePaiementController');

router.post('/create', modePaiementController.createModePaiement);
router.get('/all', modePaiementController.getAllModesPaiement);

module.exports = router;
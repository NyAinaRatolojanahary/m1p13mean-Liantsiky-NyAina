const express = require('express');
const router = express.Router();
const etageController = require('../controllers/etageController');

router.post('/create', etageController.createEtage);

module.exports = router;
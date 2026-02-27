const express = require('express');
const router = express.Router();
const etageController = require('../controllers/etageController');

router.post('/create', etageController.createEtage);
router.get('/all', etageController.getAllEtages);
router.get('/', etageController.getAllEtagesPaginated);

module.exports = router;
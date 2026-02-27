const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');

router.post('/create', boxController.createBox);
router.get('/all', boxController.getAllBoxes);
router.get('/', boxController.getAllBoxesPaginated);

module.exports = router;
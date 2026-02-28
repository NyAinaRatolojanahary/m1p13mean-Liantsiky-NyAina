const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');

router.post('/create', boxController.createBox);
router.put('/:id', boxController.updateBox);
router.get('/all', boxController.getAllBoxes);
router.get('/', boxController.getAllBoxesPaginated);

module.exports = router;
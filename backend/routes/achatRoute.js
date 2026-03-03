const express = require('express');
const router = express.Router();
const controller = require('../controllers/achatController');

router.post('/acheter', controller.acheter);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/achatDetailsController');

router.get('/', controller.getAll);
router.get('/achat/:achatId', controller.getByAchatId);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);

module.exports = router;
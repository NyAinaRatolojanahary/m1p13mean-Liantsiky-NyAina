const express = require('express');
const router = express.Router();
const controller = require('../controllers/achatController');
const auth = require('../middlewares/authMiddleware');

router.post('/acheter', auth, controller.acheter);
router.get('/', controller.getAll);
router.get('/history', auth, controller.getUserHistory);
router.get('/details/:id', auth, controller.getDetails);
router.get('/:id', controller.getById);

module.exports = router;
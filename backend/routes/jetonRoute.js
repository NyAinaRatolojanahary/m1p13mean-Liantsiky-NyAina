const express = require('express');
const router = express.Router();
const jetonController = require('../controllers/jetonController');
const achatJetonController = require('../controllers/achatJetonController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', jetonController.createJeton);
router.post('/status-traitement/create', jetonController.createStatusTraitement);
router.get('/all', jetonController.getAllJetons);
router.get('/', jetonController.getAllJetonsPaginated);

// Routes d'achat de jetons
router.post('/buy', auth, achatJetonController.acheterJeton);
router.get('/history', auth, achatJetonController.getUserHistory);

module.exports = router;

const express = require('express');
const router = express.Router();
const jetonController = require('../controllers/jetonController');
const achatJetonController = require('../controllers/achatJetonController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', jetonController.createJeton);
router.post('/status-traitement/create', jetonController.createStatusTraitement);
router.get('/all', jetonController.getAllJetons);
router.get('/', jetonController.getAllJetonsPaginated);

// Routes traitement demande de jetons 
router.put('/traitement-demande/', achatJetonController.traiterDemandeAchatJeton);
router.get('/non-traiter/',achatJetonController.getNonTraiterPaginated);
router.get('/findById/', achatJetonController.findById);

router.post('/acheterJeton', achatJetonController.acheterJeton2);

// Routes d'achat de jetons
router.post('/buy', auth, achatJetonController.acheterJeton);
router.get('/history', auth, achatJetonController.getUserHistory);

module.exports = router;

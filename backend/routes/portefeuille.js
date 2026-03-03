const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const portefeuilleController = require('../controllers/portefeuilleController');

router.get('/history', auth, portefeuilleController.getHistorique);
router.get('/', auth, portefeuilleController.getSolde);

module.exports = router;
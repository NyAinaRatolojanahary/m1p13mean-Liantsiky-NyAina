const router = require('express').Router();
const auth = require('../middlewares/auth');
const portefeuilleController = require('../controllers/p');

router.get('/wallet', auth, portefeuilleController.getSolde);
router.post('/buy-product', auth, achatController.acheterProduit);

module.exports = router;
const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');
const authMiddleware = require('../middlewares/authMiddleware');
const ROLES = require('../constants/roles');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', produitController.getAllProduits);
router.get('/paginated', produitController.getAllProduitsPaginated);
router.get('/categorie/:categorieId', produitController.getProduitsByCategorie);
router.get('/boutique/:boutiqueId', produitController.getProduitByBoutique);
router.get('/categorie/:categorieId/boutique/:boutiqueId', produitController.getProduitByCategorieAndBoutique);
router.get('/:id', produitController.getProduitById);
router.post('/create', authMiddleware, roleMiddleware(ROLES.CLIENT), produitController.createProduit);
router.put('/update/:id', authMiddleware, roleMiddleware(ROLES.CLIENT), produitController.updateProduit);

module.exports = router;
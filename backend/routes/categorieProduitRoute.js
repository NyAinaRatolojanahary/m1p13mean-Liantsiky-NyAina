const express = require('express');
const router = express.Router();
const CategorieProduitController = require('../controllers/categorieProduitController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddlware = require('../middlewares/roleMiddleware');
const ROLES = require('../constants/roles');

router.post('/create', authMiddleware, roleMiddlware(ROLES.ADMIN), CategorieProduitController.createCategorieProduit)
router.get('/', CategorieProduitController.getAllCategorieProduit);
router.get('/paginated', CategorieProduitController.getAllCategorieProduitPaginated);
router.get('/status/:status', authMiddleware, roleMiddlware(ROLES.ADMIN), CategorieProduitController.getAllCategorieProduitByStatusPaginated);
router.put('/update/:id', authMiddleware, roleMiddlware(ROLES.ADMIN), CategorieProduitController.updateCategorieProduit);
router.get('/:id', CategorieProduitController.getCategorieProduitByID);

module.exports = router;
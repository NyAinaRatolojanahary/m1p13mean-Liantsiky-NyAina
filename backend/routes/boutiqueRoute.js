const express = require('express');
const router = express.Router();
const boutiqueController = require('../controllers/boutiqueController');
const authMiddleware = require('../middlewares/authMiddleware');
const ROLES = require('../constants/roles');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public routes (no auth required)
router.get('/public', boutiqueController.getAllBoutique);
router.get('/public/:id', boutiqueController.getBoutiqueByID);

// Admin-only routes
router.get('/', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getAllBoutique);
router.get('/paginated', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getAllBoutiquePaginated);
router.get('/stage/:idStage', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getBoutiquePerStage);
router.get('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getBoutiqueByID);
router.post('/create', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.createBoutique);
router.put('/update/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.updateBoutique);
// router.get('/', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getAllBoutique);
// router.get('/paginated', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getAllBoutiquePaginated);
// router.get('/stage/:idStage', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getBoutiquePerStage);
// router.get('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.getBoutiqueByID);
// // router.post('/create', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.createBoutique);
// router.put('/update/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), boutiqueController.updateBoutique);

//without middleware for testing
router.post('/create', boutiqueController.createBoutique);
router.get('/', boutiqueController.getAllBoutiquePaginated);
router.get('/all', boutiqueController.getAllBoutique);

module.exports = router;
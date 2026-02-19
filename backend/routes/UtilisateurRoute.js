const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/utilisateurController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddlware = require('../middlewares/roleMiddleware');
const ROLES = require('../constants/roles');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/profile', authMiddleware, UtilisateurController.getProfile);
router.get('/profile/:id',authMiddleware, roleMiddlware(ROLES.ADMIN), UtilisateurController.getProfileById);
router.get('/users',authMiddleware, roleMiddlware(ROLES.ADMIN), UtilisateurController.getAllUsers);
router.get('/paginated', authMiddleware, roleMiddlware(ROLES.ADMIN), UtilisateurController.getAllUsersPaginated);
router.get('/status-paginated/',authMiddleware, roleMiddlware(ROLES.ADMIN), UtilisateurController.getAllUsersByStatusPaginated);
router.post('/new-shop', authMiddleware, roleMiddlware(ROLES.ADMIN), UtilisateurController.createShopUser);
router.post('/new-admin', authMiddleware, roleMiddlware(ROLES.ADMIN), UtilisateurController.createAdminUser);
router.put('/update',authMiddleware, roleMiddleware(ROLES.ADMIN), UtilisateurController.updateUserInfo);

module.exports = router;
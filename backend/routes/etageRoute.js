const express = require('express');
const router = express.Router();
const etageController = require('../controllers/etageController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddlware = require('../middlewares/roleMiddleware');
const ROLES = require('../constants/roles');

router.post('/create', authMiddleware, roleMiddlware(ROLES.ADMIN), etageController.createEtage);
router.get('/', authMiddleware, roleMiddlware(ROLES.ADMIN), etageController.getAllEtage);
router.get('/paginated', authMiddleware, roleMiddlware(ROLES.ADMIN), etageController.getAllEtagePaginated);
router.get('/:id', authMiddleware, roleMiddlware(ROLES.ADMIN), etageController.getEtageByID);
router.put('/update/:id', authMiddleware, roleMiddlware(ROLES.ADMIN), etageController.updateEtage);

module.exports = router;
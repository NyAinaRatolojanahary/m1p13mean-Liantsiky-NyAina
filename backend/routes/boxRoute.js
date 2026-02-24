const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');
const authMiddleware = require('../middlewares/authMiddleware');
const ROLES = require('../constants/roles');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), boxController.getBoxByID);
router.get('/', authMiddleware, roleMiddleware(ROLES.ADMIN), boxController.getAllBoxes);
router.get('/paginated', authMiddleware, roleMiddleware(ROLES.ADMIN), boxController.getAllBoxesPaginated);
router.get('/stage/:idStage', authMiddleware, roleMiddleware(ROLES.ADMIN), boxController.getBoxesPerStage);
router.post('/create', authMiddleware, roleMiddleware(ROLES.ADMIN), boxController.createBox);
router.put('/update/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), boxController.updateBox);

module.exports = router;
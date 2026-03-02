const express = require('express');
const router = express.Router();
const jetonController = require('../controllers/jetonController')

router.post('/create', jetonController.createJeton);
router.get('/all',jetonController.getAllJetons);
router.get('/',jetonController.getAllJetonsPaginated);

module.exports = router;

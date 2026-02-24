const etageService = require('../services/etageService');

exports.createEtage = async (req, res) => {
    try {
        const etage = await etageService.createEtage(req.body);
        res.status(201).json(etage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
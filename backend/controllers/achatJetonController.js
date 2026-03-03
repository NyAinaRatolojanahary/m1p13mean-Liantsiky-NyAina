const achatJetonService = require('../services/achatJetonService');

exports.acheterJeton = async (req, res) => {
    try {
        const userId = req.user.id;
        const achat = await achatJetonService.acheterJeton(userId, req.body);
        res.status(201).json({ success: true, data: achat });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await achatJetonService.getUserHistory(userId);
        res.json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await achatJetonService.getAll();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

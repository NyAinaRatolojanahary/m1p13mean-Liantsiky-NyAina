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
exports.acheterJeton2 = async (req, res) => {
    try {
        // const userId = req.user.id;
        const achat = await achatJetonService.acheterJeton2(req.body);
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

exports.traiterDemandeAchatJeton = async (req,res) => {
    try {
        const demandeId = req.query.achatId
        const data = await achatJetonService.traiterDemandeAchatJetons(demandeId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getNonTraiterPaginated = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
    
        const result = await achatJetonService.getAchatNontraiterPaginated(page,limit);
    
        res.status(200).json({ success: true, ...result });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}
exports.findById = async (req,res) => { 
     try {
        const achatId = req.query.achatId
        const data = await achatJetonService.findById(achatId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
const etageService = require('../services/etageService');

exports.createEtage = async (req, res) => {
    try {
        const etage = await etageService.createEtage(req.body);
        res.status(201).json(etage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getAllEtages = async (req,res) => {
    try {
        const etages = await etageService.getAllEtages();
        res.json(etages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllEtagesPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const result = await etageService.getAllEtagesPaginated(page, limit);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
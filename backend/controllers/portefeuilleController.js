const portefeuilleService = require('../services/portefeuilleService');

exports.getSolde = async (req, res) => {
  try {
    const userId = req.user.id;
    const portefeuille = await portefeuilleService.getSolde(userId);
    res.json({ success: true, data: portefeuille });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHistorique = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await portefeuilleService.getHistorique(userId);
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
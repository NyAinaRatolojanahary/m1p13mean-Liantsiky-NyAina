const achatDetailsService = require('../services/achatDetailsService');

exports.getAll = async (req, res) => {
  try {
    const data = await achatDetailsService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getByAchatId = async (req, res) => {
  try {
    const data = await achatDetailsService.getByAchatId(req.params.achatId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await achatDetailsService.getById(req.params.id);

    if (!data)
      return res.status(404).json({ success: false, message: "Introuvable" });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await achatDetailsService.delete(req.params.id);
    res.json({ success: true, message: "Supprimé" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
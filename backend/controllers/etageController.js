const etageService = require('../services/etageService');

exports.createEtage = async (req, res) => {
  try {
    const etage = await etageService.createEtage(req.body);

    res.status(201).json({
      success: true,
      data: etage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllEtage = async (req, res) => {
  try {
    const data = await etageService.getAllEtage();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllEtagePaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await etageService.getAllEtagePaginated(page, limit);

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getEtageByID = async (req, res) => {
  try {
    const etage = await etageService.getEtageByID(req.params.id);

    res.status(200).json({
      success: true,
      data: etage
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.updateEtage = async (req, res) => {
  try {
    const result = await etageService.updateEtage(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Etage mis à jour",
      result
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
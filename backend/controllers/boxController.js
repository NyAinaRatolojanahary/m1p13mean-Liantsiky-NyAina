const boxService = require('../services/boxService');

exports.getAllBoxes = async (req, res) => {
  try {
    const data = await boxService.getAllBoxes();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBoxesPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await boxService.getAllBoxesPaginated(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBoxesPerStage = async (req, res) => {
  try {
    const data = await boxService.getBoxesPerStage(req.params.idStage);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createBox = async (req, res) => {
  try {
    const box = await boxService.createBox(req.body);

    res.status(201).json({
      success: true,
      data: box
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBox = async (req, res) => {
  try {
    const result = await boxService.updateBox(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Box mis à jour",
      result
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.getBoxByID = async (req, res) => {
  try {
    const box = await boxService.getBoxByID(req.params.id);

    res.status(200).json({
      success: true,
      data: box
    });
  } catch (error) {
    if (error.message === "ID invalide" || error.message === "Box introuvable") {
      return res.status(404).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};
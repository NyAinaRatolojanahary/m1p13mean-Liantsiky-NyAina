const achatService = require('../services/achatService');

exports.acheter = async (req, res) => {
  try {
    const userId = req.user.id; // ou req.body.userId
    const { items } = req.body;

    const achat = await achatService.acheterPanier(userId, items);

    res.status(201).json({
      success: true,
      data: achat
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await achatService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await achatService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
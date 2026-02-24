const boutiqueService = require('../services/boutiqueService');

exports.getAllBoutique = async (req, res) => {
  try {
    const data = await boutiqueService.getAllBoutique();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBoutiquePaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await boutiqueService.getAllBoutiquePaginated(page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBoutiquePerStage = async (req, res) => {
  try {
    const { idStage } = req.params;
    const data = await boutiqueService.getBoutiquePerStage(idStage);

    // filtre pour retirer les boutiques dont boxId est null (box pas dans cet étage)
    const filtered = data.filter(b => b.boxId !== null);

    res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createBoutique = async (req, res) => {
  try {
    const boutique = await boutiqueService.createBoutique(req.body);
    res.status(201).json({ success: true, data: boutique });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBoutique = async (req, res) => {
  try {
    const result = await boutiqueService.updateBoutique(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Boutique mise à jour", result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.getBoutiqueByID = async (req, res) => {
  try {
    const boutique = await boutiqueService.getBoutiqueByID(req.params.id);
    res.status(200).json({ success: true, data: boutique });
  } catch (error) {
    if (error.message.includes("invalide") || error.message.includes("introuvable")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
const produitService = require('../services/produitService');

exports.getAllProduits = async (req, res) => {
  try {
    const data = await produitService.getAllProduits();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllProduitsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await produitService.getAllProduitsPaginated(page, limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProduitsByCategorie = async (req, res) => {
  try {
    const data = await produitService.getProduitsByCategorie(req.params.categorieId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getProduitByBoutique = async (req, res) => {
  try {
    const data = await produitService.getProduitByBoutique(req.params.boutiqueId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getProduitByCategorieAndBoutique = async (req, res) => {
  try {
    const { categorieId, boutiqueId } = req.params;
    const data = await produitService.getProduitByCategorieAndBoutique(categorieId, boutiqueId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await produitService.getProduitById(req.params.id);
    res.status(200).json({ success: true, data: produit });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.createProduit = async (req, res) => {
  try {
    const produit = await produitService.createProduit(req.body);
    res.status(201).json({ success: true, data: produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const result = await produitService.updateProduit(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Produit mis à jour", result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
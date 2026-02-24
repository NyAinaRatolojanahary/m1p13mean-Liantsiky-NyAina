const categorieProduitService = require('../services/categorieProduitService');

exports.createCategorieProduit = async (req, res) => {
  try {
    const data = {
      nom: req.body.nom,
      status: req.body.status,
      image: req.file ? req.file.filename : null
    };

    const categorie = await categorieProduitService.createCategorieProduit(data);

    res.status(201).json(categorie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategorieProduitByID = async (req, res) => {
  try {
    const { id } = req.params;

    const categorie = await categorieProduitService.getCategorieProduitByID(id);

    return res.status(200).json({
      success: true,
      data: categorie
    });

  } catch (error) {

    if (error.message === 'Categorie Produit introuvable') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

exports.getAllCategorieProduit = async (req, res) => {
  try {
    const categories = await categorieProduitService.getAllCategorieProduit();

    res.status(200).json({
      success: true,
      data: categories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllCategorieProduitPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await categorieProduitService.getAllCategorieProduitPaginated(page, limit);

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllCategorieProduitByStatusPaginated = async (req, res) => {
  try {
    const { status } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result =
      await categorieProduitService.getAllCategorieProduitByStatusPaginated(
        status,
        page,
        limit
      );

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCategorieProduit = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categorieProduitService.updateCategorieProduit({
      categId: id,
      updates: req.body
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Catégorie introuvable"
      });
    }

    res.status(200).json({
      success: true,
      message: "Catégorie mise à jour",
      result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
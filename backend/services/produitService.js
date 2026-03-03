const Produit = require('../models/Produit');
const mongoose = require('mongoose');

exports.getAllProduits = async () => {
  return await Produit.find()
    .populate('categorieId')
    .populate('boutiqueId')
    .sort({ dateCreation: -1 });
};

exports.getAllProduitsPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Produit.find()
      .populate('categorieId')
      .populate('boutiqueId')
      .skip(skip)
      .limit(limit)
      .sort({ dateCreation: -1 }),
    Produit.countDocuments()
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

exports.getProduitsByCategorie = async (categorieId) => {
  if (!mongoose.Types.ObjectId.isValid(categorieId)) {
    throw new Error("ID catégorie invalide");
  }

  return await Produit.find({ categorieId: categorieId })
    .populate('categorieId')
    .populate('boutiqueId')
    .sort({ dateCreation: -1 });
};

exports.getProduitByBoutique = async (boutiqueId) => {
  if (!mongoose.Types.ObjectId.isValid(boutiqueId)) {
    throw new Error("ID boutique invalide");
  }

  return await Produit.find({ boutiqueId })
    .populate('categorieId')
    .populate('boutiqueId')
    .sort({ dateCreation: -1 });
};

exports.getProduitByCategorieAndBoutique = async (categorieId, boutiqueId) => {
  if (!mongoose.Types.ObjectId.isValid(categorieId) ||
      !mongoose.Types.ObjectId.isValid(boutiqueId)) {
    throw new Error("ID invalide");
  }

  return await Produit.find({ categorieId, boutiqueId })
    .populate('categorieId')
    .populate('boutiqueId')
    .sort({ dateCreation: -1 });
};

exports.getProduitById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID produit invalide");
  }

  const produit = await Produit.findById(id)
    .populate('categorieId')
    .populate('boutiqueId');

  if (!produit) {
    throw new Error("Produit introuvable");
  }

  return produit;
};

exports.createProduit = async (data) => {
  const produit = await Produit.create({
    nom: data.nom,
    prix: data.prix,
    details: data.details,
    images: data.images,
    stock: data.stock,
    status: data.status || 10,
    categorieId: data.categorieId,
    boutiqueId: data.boutiqueId
  });

  return produit;
};

exports.updateProduit = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID produit invalide");
  }

  const result = await Produit.updateOne(
    { _id: id },
    { $set: updates }
  );

  if (result.matchedCount === 0) {
    throw new Error("Produit introuvable");
  }

  return result;
};
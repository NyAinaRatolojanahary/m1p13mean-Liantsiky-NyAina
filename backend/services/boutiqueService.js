const Boutique = require('../models/Boutique');
const mongoose = require('mongoose');

exports.getAllBoutique = async () => {
  return await Boutique.find()
    .populate('proprietaireId')
    .populate('boxId')
    .sort({ dateCreation: -1 });
};

exports.getAllBoutiquePaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Boutique.find()
      .populate('proprietaireId')
      .populate('boxId')
      .skip(skip)
      .limit(limit)
      .sort({ dateCreation: -1 }),
    Boutique.countDocuments()
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

exports.getBoutiquePerStage = async (idStage) => {
  if (!mongoose.Types.ObjectId.isValid(idStage)) {
    throw new Error("ID étage invalide");
  }

  return await Boutique.find()
    .populate('proprietaireId')
    .populate({
      path: 'boxId',
      match: { etageId: idStage }, // filtre par étage
      populate: { path: 'etageId' }
    })
    .sort({ dateCreation: -1 });
};

exports.createBoutique = async (data) => {
  const boutique = await Boutique.create({
    nom: data.nom,
    description: data.description,
    proprietaireId: data.proprietaireId,
    boxId: data.boxId,
    status: data.status || 0
  });

  return boutique;
};

exports.updateBoutique = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID boutique invalide");
  }

  const result = await Boutique.updateOne(
    { _id: id },
    { $set: updates }
  );

  if (result.matchedCount === 0) {
    throw new Error("Boutique introuvable");
  }

  return result;
};

exports.getBoutiqueByID = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID boutique invalide");
  }

  const boutique = await Boutique.findById(id)
    .populate('proprietaireId')
    .populate({
      path: 'boxId',
      populate: { path: 'etageId' }
    });

  if (!boutique) {
    throw new Error("Boutique introuvable");
  }

  return boutique;
};
const Etage = require('../models/Etage');
const mongoose = require('mongoose');

/**
 * CREATE
 */
exports.createEtage = async (data) => {
  const etage = await Etage.create({
    nom: data.nom,
    nombreBox: data.nombreBox
  });

  return etage;
};

exports.getAllEtage = async () => {
  return await Etage.find().sort({ _id: -1 });
};

exports.getAllEtagePaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Etage.find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }),
    Etage.countDocuments()
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

exports.getEtageByID = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID invalide");
  }

  const etage = await Etage.findById(id);

  if (!etage) {
    throw new Error("Etage introuvable");
  }

  return etage;
};

exports.updateEtage = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID invalide");
  }

  const result = await Etage.updateOne(
    { _id: id },
    { $set: updates }
  );

  if (result.matchedCount === 0) {
    throw new Error("Etage introuvable");
  }

  return result;
};
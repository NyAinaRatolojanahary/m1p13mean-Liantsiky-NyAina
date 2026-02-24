const Box = require('../models/Box');
const mongoose = require('mongoose');

exports.getAllBoxes = async () => {
  return await Box.find()
    .populate('etageId')
    .sort({ _id: -1 });
};

exports.getAllBoxesPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Box.find()
      .populate('etageId')
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }),
    Box.countDocuments()
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

exports.getBoxesPerStage = async (idStage) => {
  if (!mongoose.Types.ObjectId.isValid(idStage)) {
    throw new Error("ID Etage invalide");
  }

  return await Box.find({ etageId: idStage })
    .populate('etageId')
    .sort({ _id: -1 });
};

exports.createBox = async (data) => {
  const box = await Box.create({
    nom: data.nom,
    espacem2: data.espacem2,
    loyer: data.loyer,
    etageId: data.etageId
  });

  return box;
};

exports.updateBox = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID invalide");
  }

  const result = await Box.updateOne(
    { _id: id },
    { $set: updates }
  );

  if (result.matchedCount === 0) {
    throw new Error("Box introuvable");
  }

  return result;
};

exports.getBoxByID = async (id) => {
  const mongoose = require('mongoose');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID invalide");
  }

  const box = await Box.findById(id).populate('etageId');

  if (!box) {
    throw new Error("Box introuvable");
  }

  return box;
};
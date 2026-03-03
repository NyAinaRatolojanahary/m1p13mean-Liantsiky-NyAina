const mongoose = require('mongoose');
const Boutique = require('../models/Boutique');
const Box = require('../models/Box');
const StatusDisponibilite = require('../models/StatusDisponibilite');
const StatusActive = require('../models/StatusActive');

exports.getAllBoutique = async () => {
  return await Boutique.find()
    .populate('proprietaireId')
    .populate('boxId')
    .populate('status')
    .sort({ dateCreation: -1 });
};

exports.getAllBoutiquePaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Boutique.find()
      .populate('proprietaireId')
      .populate('boxId')
      .populate('status')
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
  
  const activeStatus = await StatusActive.findOne({
      code: 10
    });
    
    if (!activeStatus) {
        throw new Error("Status active introuvable");
      }
      
    // await Box.findByIdAndUpdate(
    //     data.boxId,
    //     { status: activeStatus._id }
    //   );

  //create the boutique
  const boutique = await Boutique.create({
    nom: data.nom,
    description: data.description,
    proprietaireId: data.proprietaireId,
    boxId: null,
    status: activeStatus._id
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

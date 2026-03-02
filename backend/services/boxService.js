const mongoose = require('mongoose');
const LoyerBoxService = require('./loyerBoxService');

const Boutique = require('../models/Boutique');
const Box = require('../models/Box');
const StatusDisponibilite = require('../models/StatusDisponibilite');

exports.getAllBoxes = async () => {
  return await Box.find()
    .populate('etageId')
    .populate('status')
    .sort({ _id: -1 });
};

exports.getAllBoxesPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Box.find()
      .populate('etageId')
      .populate('status')
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

  if (!data.status) {

    const defaultStatus = await StatusDisponibilite.findOne({ code: 10 });

    if (!defaultStatus) {
      throw new Error('Default status (code 10) not found');
    }

    data.status = defaultStatus._id;
  }

  const box = await Box.create({
    nom: data.nom,
    espacem2: data.espacem2,
    loyer: data.loyer,
    etageId: data.etageId,
    status: data.status
  });

  await LoyerBoxService.createLoyerBox({
    loyer: box.loyer,
    boxId: box._id,
    dateApplication: data.dateApplication || Date.now()
  });
  
  return box;
};

exports.updateBox = async (id, updates,dateApplication) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID invalide");
  }

  try {
    const existingBox = await Box.findById(id);
    
    if (!existingBox) {
      throw new Error("Box introuvable");
    }

    const result = await Box.updateOne(
      { _id: id },
      { $set: updates }
    );
    //verify if loyer has changed and if so, create a new LoyerBox entry
    if(updates.loyer !== undefined && updates.loyer !== existingBox.loyer) {
      await LoyerBoxService.createLoyerBox({
        loyer: updates.loyer,
        boxId: id,
        dateApplication: dateApplication || new Date()
      });
    }
    return result;

  } catch (error) {
    throw error;
  }

  
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
}

exports.createStatusDisponibilite = async (data) => {
    const existingStatus = await StatusDisponibilite.findOne({ nom: data.nom });   
    if (existingStatus) throw new Error('Status Disponibilite déja existant');
    const status = await StatusDisponibilite.create({
        nom: data.nom,
        code: data.code
    });
    return status;
}


exports.createContratBox = async (data) => {
  const ContratBox = require('../models/ContratBox');
  try {
    const contrat = await ContratBox.create({
      boxId: data.boxId,
      boutiqueId: data.boutiqueId,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      loyer: data.loyer,
      datePayement: data.datePayement,
      statusContrat: data.statusContrat
    });

  //update status de Box => occupe
    const occupiedStatus = await StatusDisponibilite.findOne({
      code: 20
    });

    if (!occupiedStatus) {
      throw new Error("Status occupé introuvable");
    }
    // const boxUpdate = await Box.findOne({
    //   _id : data.boxId
    // });
    // if(!boxUpdate) {
    //   throw new Error("Box introuvable  introuvable");
    // }

    await Box.findByIdAndUpdate(
      data.boxId,
      { status: occupiedStatus._id },
      { new : true }
    );

  // update Boutique => assigner un box
  const boutique = await Boutique.findOne({
      _id : data.boutiqueId
    });

    if (!boutique) {
      throw new Error("Boutique introuvable");
    }

    await Boutique.findByIdAndUpdate(
      data.boutiqueId,
      { boxId : data.boxId },
      { new : true}
    );

  return contrat;
  }catch (err){
    console.error("CONTRAT FLOW ERROR:", err);
    throw err;
  }
}

exports.createStatusContrat = async (data) => {
  const StatusContrat = require('../models/StatusContrat');
  const existingStatus = await StatusContrat.findOne({ nom: data.nom });
  if (existingStatus) throw new Error('Status Contrat déja existant');
  const status = await StatusContrat.create({
      nom: data.nom,
      code: data.code
  });
  return status;
}
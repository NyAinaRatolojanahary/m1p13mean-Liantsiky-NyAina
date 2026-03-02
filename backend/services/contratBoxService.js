const mongoose = require('mongoose');
const ContratBox = require('../models/ContratBox');
const StatusContrat = require('../models/StatusContrat');
const Box = require('../models/Box');

exports.createContratBox = async (data) => {
    //put the status per default
    if (!data.status) {

        const defaultStatus = await StatusContrat.findOne({ code: 0 });

        if (!defaultStatus) {
            throw new Error('Default status (code 0) not found');
        }

        data.status = defaultStatus._id;
    }
    //put the loyer per default
    if (!data.loyer) {

        const box = await Box.findOne({ _id : data.boxId });

        if (!box) {
            throw new Error('Box not found');
        }

        data.loyer = box.loyer;
    }

  const contrat = await ContratBox.create({
    boxId: data.boxId,
    boutiqueId: data.boutiqueId,
    dateDebut: data.dateDebut,
    dateFin: data.dateFin,
    loyer: data.loyer,
    datePayement: data.datePayement,
    status: data.status
  });

  return contrat;
}

exports.createStatusContrat = async (data) => {
  const existingStatus = await StatusContrat.findOne({ nom: data.nom });
  if (existingStatus) throw new Error('Status Contrat déja existant');
  const status = await StatusContrat.create({
      nom: data.nom,
      code: data.code
  });
  return status;
}

exports.getContratBoxByID = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID contrat box invalide");
  }

  const contratBox = await ContratBox.findById(id)
    .populate('boxId')
    .populate('boutiqueId')
    .populate('statusContrat');

  if (!contratBox) {
    throw new Error("Contrat box introuvable");
  }

  return contratBox;
};
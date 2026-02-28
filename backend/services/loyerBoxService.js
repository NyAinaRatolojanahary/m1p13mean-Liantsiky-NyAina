const LoyerBox = require('../models/LoyerBox');
const mongoose = require('mongoose');

exports.createLoyerBox = async (data) => {
  const loyerBox = await LoyerBox.create({
    nom: data.nom,
    loyer: data.loyer,
    boxId: data.boxId,
    dateApplication: data.dateApplication || Date.now()
  });
  return loyerBox;
}

exports.getLoyerBox = async (boxId) => {
  if (!mongoose.Types.ObjectId.isValid(boxId)) {
    throw new Error("ID Box invalide");
  }

  return await LoyerBox.find({ boxId })
    .populate('boxId')
    .sort({ dateChangement: -1 });
};
const mongoose = require('mongoose');
const Etage = require('../models/Etage');

exports.createEtage = async (data) => {
    const existingEtage = await Etage.findOne({ nom: data.nom });   
    if (existingEtage) throw new Error('Etage déja existant');
    const etage = await Etage.create({
        nom: data.nom,
        nombreBox: data.nombreBox
    });
    return etage;
}
exports.getAllEtages = async () => {
  return await Etage
    .find()
};

exports.getAllEtagesPaginated = async (page = 1, limit = 2) => {
  const skip = (page - 1) * limit;

  const [etages, total] = await Promise.all([
    Etage.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    Etage.countDocuments()
  ]);

  return {
    data: etages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
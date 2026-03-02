const mongoose = require('mongoose')
const Jeton = require('../models/Jeton')
const StatusActive = require('../models/StatusActive')

exports.createJeton = async (data) => {
  
  const activeStatus = await StatusActive.findOne({
      code: Number(10)
    });
    
    if (!activeStatus) {
        throw new Error("Status active introuvable");
      }
  //create the jeton
  const jeton = await Jeton.create({
    nom: data.nom,
    montant: data.montant,
    status: activeStatus._id
  });

  return jeton;
};

exports.getAllJetons = async () => {
    return await Jeton.find()
        .populate('status')
        .sort({ _id: -1 });
}

exports.getAllJetonsPaginated = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
        Jeton.find()
            .populate('status')
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 }),
        Jeton.countDocuments()
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
}
const mongoose = require('mongoose');
const CategorieProduit = require('../models/CategorieProduit');

exports.createCategorieProduit = async (data) => {

    const categorie = await CategorieProduit.create({
        nom: data.nom,
        image: data.image,
        status: data.status
    });

  return categorie;
};

exports.getCategorieProduitByID = async (id) => {
    const categorie = await CategorieProduit.findById(id).select('-status');

    if(!categorie){ throw new Error('Categorie Produit introuvable');}
    return categorie;
}

exports.getAllCategorieProduit = async () => {
  return await CategorieProduit
    .find()
    .select('-status')
};

exports.getAllCategorieProduitPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [categorie, total] = await Promise.all([
    CategorieProduit.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    CategorieProduit.countDocuments()
  ]);

  return {
    data: categorie,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

exports.getAllCategorieProduitByStatusPaginated = async (status, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const filter = { status: status };

  const [categorie, total] = await Promise.all([
    CategorieProduit.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ dateCreation: -1 }),
    CategorieProduit.countDocuments(filter)
  ]);

  return {
    data: categorie,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

exports.updateCategorieProduit = async (data) => {
  const { categId, updates } = data;
  const result = await CategorieProduit.updateOne(
    { _id: categId },     
    { $set: updates }    
  );

  return result;
};
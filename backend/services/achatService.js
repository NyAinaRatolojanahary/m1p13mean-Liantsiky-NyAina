const Achat = require('../models/Achat');
const AchatDetails = require('../models/AchatDetails');
const Produit = require('../models/Produit');
const mongoose = require('mongoose');
const portefeuilleService = require('./portefeuilleService');

exports.acheterPanier = async (userId, items) => {
  try {
    let prixTotal = 0;
    const produits = [];

    for (const item of items) {
      const produit = await Produit.findById(item.produitId);

      if (!produit) throw new Error('Produit introuvable');
      if (produit.stock < item.quantite)
        throw new Error(`Stock insuffisant pour ${produit.nom}`);

      const totalProduit = produit.prixActuel * item.quantite;
      prixTotal += totalProduit;

      produits.push({
        produit,
        quantite: item.quantite,
        totalProduit
      });
    }

    await portefeuilleService.debiter(userId, prixTotal);

    const achat = await Achat.create({
      clientId: userId,
      prixTotal,
      status: 10
    });

    for (const p of produits) {
      await AchatDetails.create({
        achatId: achat._id,
        produitId: p.produit._id,
        nombre: p.quantite,
        prixUnitaire: p.produit.prixActuel,
        total: p.totalProduit
      });

      p.produit.stock -= p.quantite;
      await p.produit.save();
    }

    return achat;

  } catch (error) {
    throw error;
  }
};

exports.getAll = async () => {
  return await Achat.find().populate('clientId');
};

exports.getById = async (id) => {
  return await Achat.findById(id).populate('clientId');
};

exports.getUserHistory = async (userId) => {
  return await Achat.find({ clientId: userId })
    .sort({ dateAchat: -1 });
};

exports.getAchatDetails = async (achatId) => {
  return await AchatDetails.find({ achatId })
    .populate('produitId')
    .populate('boutiqueId');
};
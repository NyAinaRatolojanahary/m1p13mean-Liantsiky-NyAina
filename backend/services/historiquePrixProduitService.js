const mongoose = require('mongoose');

const HistoriquePrixProduit = require('../models/HistoriquePrixProduit');
const Produit = require('../models/Produit')


exports.createHistoriquePrixProduit = async (produitId,prix,dateChangement = Date.now(), dateApplication = Date.now()) => {
    const historique = await HistoriquePrixProduit.create({
        produitId : produitId,
        prix : prix,
        dateChangement : dateChangement,
        dateApplication : dateApplication
    });

  return historique;
};

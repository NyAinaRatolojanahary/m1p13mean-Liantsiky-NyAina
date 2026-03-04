const mongoose = require('mongoose');

const HistoriquePrixProduitSchema = new mongoose.Schema({
    produitId : { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    prix : Number,
    dateChangement : { type : Date, default : Date.now() },
    dateApplication : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('HistoriqueProduit', HistoriquePrixProduitSchema);
const mongoose = require('mongoose');

const EntreeProduitSchema = new mongoose.Schema({
  produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
  dateEntree: { type: Date, default: Date.now },
  quantite: Number
});

module.exports = mongoose.model('EntreeProduit', EntreeProduitSchema);
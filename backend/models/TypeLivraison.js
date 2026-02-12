const mongoose = require('mongoose');

const TypeLivraisonSchema = new mongoose.Schema({
  nom: {type: String,required: true},
  commission: { type: Number, default: 0 } // pourcentage ou montant fixe
});

module.exports = mongoose.model('TypeLivraison', TypeLivraisonSchema);

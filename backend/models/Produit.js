const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  prix: Number,
  remise: Number,
  details: String,
  images: String,
  stock: Number,
  status: { type: Number, default: 10 },
  categorieId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategorieProduit' },
  boutiqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produit', ProduitSchema);

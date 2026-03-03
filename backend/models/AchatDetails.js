const mongoose = require('mongoose');

const achatDetailsSchema = new mongoose.Schema({
  achatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achat',
    required: true
  },
  produitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true
  },
  nombre: {
    type: Number,
    required: true,
    min: 1
  },
  prixUnitaire: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AchatDetails', achatDetailsSchema);
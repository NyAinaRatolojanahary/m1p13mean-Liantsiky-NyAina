const mongoose = require('mongoose');

const AchatSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  prixTotal: Number,
  // commissionPlateforme: { type: Number, default: 0 },
  // typeLivraisonId: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeLivraison' },
  status: { type: Number, enum: [0,5,10], default: 0 },
  dateAchat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achat', AchatSchema);
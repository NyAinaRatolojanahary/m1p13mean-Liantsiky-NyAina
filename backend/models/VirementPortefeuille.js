const mongoose = require('mongoose');

const VirementPortefeuilleSchema = new mongoose.Schema({
  portefeuilleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portefeuille' },
  dateVirement: { type: Date, default: Date.now },
  montant: Number,
  origine: String // ex: "achat", "retrait", "ajout manuel"
});

module.exports = mongoose.model('VirementPortefeuille', VirementPortefeuilleSchema);

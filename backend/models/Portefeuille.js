const mongoose = require('mongoose');

const PortefeuilleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  solde: { type: Number, default: 0 }
});

module.exports = mongoose.model('Portefeuille', PortefeuilleSchema);

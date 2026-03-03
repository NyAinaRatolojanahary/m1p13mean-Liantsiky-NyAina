const mongoose = require('mongoose');

const PortefeuilleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  solde_actuel: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Portefeuille', PortefeuilleSchema);

const mongoose = require('mongoose');

const BoutiqueSchema = new mongoose.Schema({
  nom: String,
  description: String,
  proprietaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  boxId: { type: mongoose.Schema.Types.ObjectId, ref: 'Box' },
  dateCreation: { type: Date, default: Date.now },
  status: { type: Number, default: 0 } // 0 desactive, 10 active
});

module.exports = mongoose.model('Boutique', BoutiqueSchema);

const mongoose = require('mongoose');

const BoutiqueSchema = new mongoose.Schema({
  nom: String,
  description: String,
  proprietaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  boxId: { type: mongoose.Schema.Types.ObjectId, ref: 'Box' },
  image: { type: String, default: 'assets/img/logo.png' },
  dateCreation: { type: Date, default: Date.now },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'StatusActive' } // 0 desactive, 10 active
});

module.exports = mongoose.model('Boutique', BoutiqueSchema);

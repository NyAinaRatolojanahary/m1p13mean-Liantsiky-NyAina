const mongoose = require('mongoose');

const BoxSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  espacem2: Number,
  loyer: Number,
  boutiqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' },
  etageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Etage' }
});

module.exports = mongoose.model('Box', BoxSchema);

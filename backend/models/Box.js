const mongoose = require('mongoose');

const BoxSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  espacem2: Number,
  loyer: Number,
  etageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Etage' },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'StatusDisponibilite' }
});

module.exports = mongoose.model('Box', BoxSchema);

// status: { type: Number, enum: ['disponible', 'occupé', 'en maintenance'], default: 'disponible' } 